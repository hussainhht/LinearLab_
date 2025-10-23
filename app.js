// RREF Studio - Gauss-Jordan Elimination Visualizer
// Author: Dr. Hussain Ali

class RREFSolver {
    constructor() {
        this.matrix = [];
        this.steps = [];
        this.currentStep = 0;
        this.isAutoPlaying = false;
        this.autoPlayInterval = null;
        this.speed = 1500;
        this.rows = 3;
        this.cols = 3;

        this.initializeElements();
        this.attachEventListeners();
        this.createMatrixInput();
    }

    initializeElements() {
        // Input controls
        this.rowsInput = document.getElementById('rows');
        this.colsInput = document.getElementById('cols');

        // Buttons
        this.createMatrixBtn = document.getElementById('createMatrix');
        this.loadExampleBtn = document.getElementById('loadExample');
        this.randomMatrixBtn = document.getElementById('randomMatrix');
        this.clearMatrixBtn = document.getElementById('clearMatrix');
        this.startSolveBtn = document.getElementById('startSolve');
        this.nextStepBtn = document.getElementById('nextStep');
        this.autoPlayBtn = document.getElementById('autoPlay');
        this.resetBtn = document.getElementById('reset');

        // Display elements
        this.matrixContainer = document.getElementById('matrixContainer');
        this.explanationContent = document.getElementById('explanationContent');
        this.solutionPanel = document.getElementById('solutionPanel');
        this.solutionContent = document.getElementById('solutionContent');
        this.stepNumber = document.getElementById('stepNumber');
        this.totalSteps = document.getElementById('totalSteps');
        this.historyList = document.getElementById('historyList');

        // Speed control
        this.speedSlider = document.getElementById('speed');
        this.speedLabel = document.getElementById('speedLabel');
    }

    attachEventListeners() {
        this.createMatrixBtn.addEventListener('click', () => this.createMatrixInput());
        this.loadExampleBtn.addEventListener('click', () => this.loadExample());
        this.randomMatrixBtn.addEventListener('click', () => this.generateRandomMatrix());
        this.clearMatrixBtn.addEventListener('click', () => this.clearMatrix());
        this.startSolveBtn.addEventListener('click', () => this.startSolving());
        this.nextStepBtn.addEventListener('click', () => this.showNextStep());
        this.autoPlayBtn.addEventListener('click', () => this.toggleAutoPlay());
        this.resetBtn.addEventListener('click', () => this.reset());

        this.speedSlider.addEventListener('input', (e) => {
            this.speed = parseInt(e.target.value);
            this.speedLabel.textContent = `${(this.speed / 1000).toFixed(1)}s`;
        });
    }

    createMatrixInput() {
        this.rows = parseInt(this.rowsInput.value);
        this.cols = parseInt(this.colsInput.value);

        const table = document.createElement('table');
        table.className = 'matrix-table';

        for (let i = 0; i < this.rows; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j <= this.cols; j++) {
                const td = document.createElement('td');
                const input = document.createElement('input');
                input.type = 'number';
                input.className = 'matrix-cell';
                input.value = '0';
                input.dataset.row = i;
                input.dataset.col = j;

                // Add separator for augmented part
                if (j === this.cols) {
                    input.classList.add('augment-separator');
                }

                td.appendChild(input);
                row.appendChild(td);
            }
            table.appendChild(row);
        }

        this.matrixContainer.innerHTML = '';
        this.matrixContainer.appendChild(table);
    }

    loadExample() {
        this.rowsInput.value = 3;
        this.colsInput.value = 3;
        this.createMatrixInput();

        // Example: 3x3 system with unique solution
        const example = [
            [2, 1, -1, 8],
            [-3, -1, 2, -11],
            [-2, 1, 2, -3]
        ];

        const inputs = this.matrixContainer.querySelectorAll('.matrix-cell');
        example.forEach((row, i) => {
            row.forEach((val, j) => {
                const input = inputs[i * (this.cols + 1) + j];
                input.value = val;
            });
        });

        this.showMessage('📖 Example system loaded! Click "Start Solution" to solve.');
    }

    generateRandomMatrix() {
        const inputs = this.matrixContainer.querySelectorAll('.matrix-cell');
        inputs.forEach(input => {
            input.value = Math.floor(Math.random() * 20) - 10; // Random between -10 and 10
        });
        this.showMessage('🎲 Random matrix generated!');
    }

    clearMatrix() {
        const inputs = this.matrixContainer.querySelectorAll('.matrix-cell');
        inputs.forEach(input => input.value = '0');
        this.showMessage('🗑️ Matrix cleared.');
    }

    readMatrixFromInput() {
        const inputs = this.matrixContainer.querySelectorAll('.matrix-cell');
        this.matrix = [];

        for (let i = 0; i < this.rows; i++) {
            const row = [];
            for (let j = 0; j <= this.cols; j++) {
                const input = inputs[i * (this.cols + 1) + j];
                row.push(parseFloat(input.value) || 0);
            }
            this.matrix.push(row);
        }
    }

    startSolving() {
        this.readMatrixFromInput();
        this.steps = [];
        this.currentStep = 0;

        // Add initial state
        this.addStep('Initial Matrix', 'This is the augmented matrix [A|b] representing the system of equations.', -1, -1);

        // Perform Gauss-Jordan elimination
        this.gaussJordan();

        // Enable navigation
        this.nextStepBtn.disabled = false;
        this.autoPlayBtn.disabled = false;
        this.startSolveBtn.disabled = true;

        this.totalSteps.textContent = this.steps.length - 1;
        this.showStep(0);
        this.renderHistory();

        this.showMessage('✨ Solution process ready! Use "Next Step" or "Auto Play" to proceed.');
    }

    gaussJordan() {
        const m = this.matrix.length;
        const n = this.matrix[0].length - 1; // Exclude augmented column

        let pivotRow = 0;

        for (let col = 0; col < n && pivotRow < m; col++) {
            // Find pivot
            let maxRow = pivotRow;
            for (let i = pivotRow + 1; i < m; i++) {
                if (Math.abs(this.matrix[i][col]) > Math.abs(this.matrix[maxRow][col])) {
                    maxRow = i;
                }
            }

            // Check if pivot is zero
            if (Math.abs(this.matrix[maxRow][col]) < 1e-10) {
                continue; // Skip this column
            }

            // Swap rows if needed
            if (maxRow !== pivotRow) {
                this.swapRows(pivotRow, maxRow);
                this.addStep(
                    `Swap Rows`,
                    `Swap R${pivotRow + 1} ↔ R${maxRow + 1} to get the largest pivot in column ${col + 1}.`,
                    pivotRow,
                    col
                );
            }

            // Scale pivot row to make pivot = 1
            const pivotValue = this.matrix[pivotRow][col];
            if (Math.abs(pivotValue - 1) > 1e-10) {
                this.scaleRow(pivotRow, 1 / pivotValue);
                this.addStep(
                    `Scale Row`,
                    `R${pivotRow + 1} ← R${pivotRow + 1} / ${pivotValue.toFixed(2)} to make the pivot equal to 1.`,
                    pivotRow,
                    col
                );
            }

            // Eliminate all other entries in this column
            for (let i = 0; i < m; i++) {
                if (i !== pivotRow && Math.abs(this.matrix[i][col]) > 1e-10) {
                    const factor = this.matrix[i][col];
                    this.addRows(i, pivotRow, -factor);
                    this.addStep(
                        `Eliminate Entry`,
                        `R${i + 1} ← R${i + 1} - (${factor.toFixed(2)}) × R${pivotRow + 1} to eliminate x${col + 1} from row ${i + 1}.`,
                        i,
                        col
                    );
                }
            }

            pivotRow++;
        }

        // Determine solution type
        this.determineSolution();
    }

    swapRows(i, j) {
        const temp = [...this.matrix[i]];
        this.matrix[i] = [...this.matrix[j]];
        this.matrix[j] = temp;
    }

    scaleRow(i, factor) {
        for (let j = 0; j < this.matrix[i].length; j++) {
            this.matrix[i][j] *= factor;
            // Clean up floating point errors
            if (Math.abs(this.matrix[i][j]) < 1e-10) {
                this.matrix[i][j] = 0;
            }
        }
    }

    addRows(target, source, factor) {
        for (let j = 0; j < this.matrix[target].length; j++) {
            this.matrix[target][j] += factor * this.matrix[source][j];
            // Clean up floating point errors
            if (Math.abs(this.matrix[target][j]) < 1e-10) {
                this.matrix[target][j] = 0;
            }
        }
    }

    addStep(operation, explanation, highlightRow, highlightCol) {
        this.steps.push({
            operation,
            explanation,
            matrix: this.matrix.map(row => [...row]),
            highlightRow,
            highlightCol
        });
    }

    determineSolution() {
        const m = this.matrix.length;
        const n = this.matrix[0].length - 1;

        let solutionType = 'unique';
        let solutionText = '';

        // Check for inconsistent system (0 = c where c ≠ 0)
        for (let i = 0; i < m; i++) {
            const isZeroRow = this.matrix[i].slice(0, n).every(val => Math.abs(val) < 1e-10);
            const augmentValue = this.matrix[i][n];

            if (isZeroRow && Math.abs(augmentValue) > 1e-10) {
                solutionType = 'none';
                solutionText = `<p class="solution-type solution-none">❌ No Solution (Inconsistent System)</p>
                    <p>The system has no solution because row ${i + 1} represents: 0 = ${augmentValue.toFixed(2)}, which is impossible.</p>`;
                break;
            }
        }

        if (solutionType !== 'none') {
            // Count pivot positions
            let pivots = 0;
            for (let i = 0; i < m; i++) {
                for (let j = 0; j < n; j++) {
                    if (Math.abs(this.matrix[i][j] - 1) < 1e-10) {
                        // Check if this is a pivot (other entries in column are 0)
                        let isPivot = true;
                        for (let k = 0; k < m; k++) {
                            if (k !== i && Math.abs(this.matrix[k][j]) > 1e-10) {
                                isPivot = false;
                                break;
                            }
                        }
                        if (isPivot) {
                            pivots++;
                            break;
                        }
                    }
                }
            }

            if (pivots < n) {
                solutionType = 'infinite';
                solutionText = `<p class="solution-type solution-infinite">♾️ Infinite Solutions</p>
                    <p>The system has ${n - pivots} free variable(s). There are infinitely many solutions.</p>`;
            } else {
                solutionType = 'unique';
                solutionText = `<p class="solution-type solution-unique">✅ Unique Solution</p>`;

                // Extract solution
                for (let i = 0; i < Math.min(m, n); i++) {
                    const value = this.matrix[i][n];
                    solutionText += `<div class="variable-value">x<sub>${i + 1}</sub> = ${value.toFixed(4)}</div>`;
                }
            }
        }

        this.solutionContent.innerHTML = solutionText;
    }

    showStep(stepIndex) {
        this.currentStep = stepIndex;
        const step = this.steps[stepIndex];

        this.stepNumber.textContent = `Step ${stepIndex}`;

        // Render matrix
        this.renderMatrix(step.matrix, step.highlightRow, step.highlightCol);

        // Show explanation
        if (stepIndex === 0) {
            this.explanationContent.innerHTML = `
                <p class="instruction">${step.explanation}</p>
            `;
        } else {
            this.explanationContent.innerHTML = `
                <div class="step-description">
                    <strong>Step ${stepIndex}:</strong> ${step.operation}
                </div>
                <span class="operation">${step.operation}</span>
                <p class="reason">${step.explanation}</p>
            `;
        }

        // Show solution panel at the end
        if (stepIndex === this.steps.length - 1) {
            this.solutionPanel.style.display = 'block';
        } else {
            this.solutionPanel.style.display = 'none';
        }

        // Update history highlighting
        this.updateHistoryHighlight();
    }

    renderMatrix(matrix, highlightRow, highlightCol) {
        const table = document.createElement('table');
        table.className = 'matrix-table';

        matrix.forEach((row, i) => {
            const tr = document.createElement('tr');
            row.forEach((val, j) => {
                const td = document.createElement('td');
                const div = document.createElement('div');
                div.className = 'matrix-display';
                div.textContent = val.toFixed(2);

                // Highlight pivot
                if (i === highlightRow && j === highlightCol) {
                    div.classList.add('pivot');
                }

                // Highlight target row
                if (i === highlightRow && j !== highlightCol) {
                    div.classList.add('target');
                }

                // Mark zeros
                if (Math.abs(val) < 1e-10) {
                    div.classList.add('zero');
                }

                // Add separator for augmented part
                if (j === row.length - 1) {
                    div.classList.add('augment-separator');
                }

                td.appendChild(div);
                tr.appendChild(td);
            });
            table.appendChild(tr);
        });

        this.matrixContainer.innerHTML = '';
        this.matrixContainer.appendChild(table);
        this.matrixContainer.classList.add('animate-in');
    }

    renderHistory() {
        this.historyList.innerHTML = '';

        this.steps.forEach((step, index) => {
            const item = document.createElement('div');
            item.className = 'history-item';
            item.innerHTML = `
                <div class="history-step-number">Step ${index}</div>
                <div class="history-operation">${step.operation}</div>
            `;
            item.addEventListener('click', () => this.showStep(index));
            this.historyList.appendChild(item);
        });
    }

    updateHistoryHighlight() {
        const items = this.historyList.querySelectorAll('.history-item');
        items.forEach((item, index) => {
            if (index === this.currentStep) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    showNextStep() {
        if (this.currentStep < this.steps.length - 1) {
            this.showStep(this.currentStep + 1);
        } else {
            this.showMessage('✨ Solution complete! All steps have been shown.');
            this.stopAutoPlay();
        }
    }

    toggleAutoPlay() {
        if (this.isAutoPlaying) {
            this.stopAutoPlay();
        } else {
            this.startAutoPlay();
        }
    }

    startAutoPlay() {
        this.isAutoPlaying = true;
        this.autoPlayBtn.textContent = '⏸️ Pause';
        this.autoPlayBtn.classList.remove('btn-info');
        this.autoPlayBtn.classList.add('btn-warning');

        this.autoPlayInterval = setInterval(() => {
            if (this.currentStep < this.steps.length - 1) {
                this.showNextStep();
            } else {
                this.stopAutoPlay();
            }
        }, this.speed);
    }

    stopAutoPlay() {
        this.isAutoPlaying = false;
        this.autoPlayBtn.textContent = '⏩ Auto Play';
        this.autoPlayBtn.classList.remove('btn-warning');
        this.autoPlayBtn.classList.add('btn-info');

        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    reset() {
        this.stopAutoPlay();
        this.steps = [];
        this.currentStep = 0;

        this.nextStepBtn.disabled = true;
        this.autoPlayBtn.disabled = true;
        this.startSolveBtn.disabled = false;

        this.stepNumber.textContent = 'Step 0';
        this.totalSteps.textContent = '0';
        this.solutionPanel.style.display = 'none';

        this.historyList.innerHTML = '<p class="empty-state">No steps yet. Start solving to see the history.</p>';

        this.createMatrixInput();
        this.showMessage('🔄 Reset complete. Ready for a new problem!');
    }

    showMessage(message) {
        this.explanationContent.innerHTML = `<p class="instruction">${message}</p>`;
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new RREFSolver();
});
