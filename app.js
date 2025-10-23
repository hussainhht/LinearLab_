// RREF Studio - Gauss-Jordan Elimination Visualizer
// Author: Dr. Hussain Ali
// Enhanced with Matrix Operations (Level 1 & 2)

class MatrixOperations {
    constructor() {
        this.matrixA = [];
        this.matrixB = [];
        this.initializeOperations();
    }

    initializeOperations() {
        // Matrix A controls
        document.getElementById('matrixARows').addEventListener('change', () => this.createMatrixInput('A'));
        document.getElementById('matrixACols').addEventListener('change', () => this.createMatrixInput('A'));
        document.getElementById('createMatrixA').addEventListener('click', () => this.createMatrixInput('A'));
        document.getElementById('randomMatrixA').addEventListener('click', () => this.randomizeMatrix('A'));
        document.getElementById('clearMatrixA').addEventListener('click', () => this.clearMatrix('A'));

        // Matrix B controls
        document.getElementById('matrixBRows').addEventListener('change', () => this.createMatrixInput('B'));
        document.getElementById('matrixBCols').addEventListener('change', () => this.createMatrixInput('B'));
        document.getElementById('createMatrixB').addEventListener('click', () => this.createMatrixInput('B'));
        document.getElementById('randomMatrixB').addEventListener('click', () => this.randomizeMatrix('B'));
        document.getElementById('clearMatrixB').addEventListener('click', () => this.clearMatrix('B'));

        // Level 1 Operations
        document.getElementById('opAdd').addEventListener('click', () => this.add());
        document.getElementById('opSubtract').addEventListener('click', () => this.subtract());
        document.getElementById('opMultiply').addEventListener('click', () => this.multiply());
        document.getElementById('opTranspose').addEventListener('click', () => this.transpose());
        document.getElementById('opScalar').addEventListener('click', () => this.scalarMultiply());

        // Special matrices
        document.getElementById('createIdentity').addEventListener('click', () => this.createSpecialMatrix('identity'));
        document.getElementById('createZero').addEventListener('click', () => this.createSpecialMatrix('zero'));
        document.getElementById('createRandom').addEventListener('click', () => this.createSpecialMatrix('random'));

        // Level 2 Operations
        document.getElementById('opDeterminant').addEventListener('click', () => this.determinant());
        document.getElementById('opInverse').addEventListener('click', () => this.inverse());
        document.getElementById('opRank').addEventListener('click', () => this.rank());
        document.getElementById('opSpaces').addEventListener('click', () => this.columnNullSpace());

        // Quick Examples
        document.getElementById('exampleA1').addEventListener('click', () => this.loadExample('A', 'small'));
        document.getElementById('exampleA2').addEventListener('click', () => this.loadExample('A', 'medium'));
        document.getElementById('exampleB1').addEventListener('click', () => this.loadExample('B', 'small'));
        document.getElementById('exampleB2').addEventListener('click', () => this.loadExample('B', 'medium'));

        // Initialize matrices
        this.createMatrixInput('A');
        this.createMatrixInput('B');
    }

    createMatrixInput(matrixName) {
        const rows = parseInt(document.getElementById(`matrix${matrixName}Rows`).value);
        const cols = parseInt(document.getElementById(`matrix${matrixName}Cols`).value);
        const container = document.getElementById(`matrix${matrixName}Container`);

        const table = document.createElement('table');
        table.className = 'mini-matrix-table';

        for (let i = 0; i < rows; i++) {
            const tr = document.createElement('tr');
            for (let j = 0; j < cols; j++) {
                const td = document.createElement('td');
                const input = document.createElement('input');
                input.type = 'number';
                input.className = 'mini-matrix-cell';
                input.value = '0';
                input.dataset.matrix = matrixName;
                input.dataset.row = i;
                input.dataset.col = j;
                td.appendChild(input);
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }

        container.innerHTML = '';
        container.appendChild(table);
    }

    readMatrix(matrixName) {
        const rows = parseInt(document.getElementById(`matrix${matrixName}Rows`).value);
        const cols = parseInt(document.getElementById(`matrix${matrixName}Cols`).value);
        const matrix = [];

        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < cols; j++) {
                const input = document.querySelector(`input[data-matrix="${matrixName}"][data-row="${i}"][data-col="${j}"]`);
                row.push(parseFloat(input.value) || 0);
            }
            matrix.push(row);
        }

        return matrix;
    }

    randomizeMatrix(matrixName) {
        const rows = parseInt(document.getElementById(`matrix${matrixName}Rows`).value);
        const cols = parseInt(document.getElementById(`matrix${matrixName}Cols`).value);

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const input = document.querySelector(`input[data-matrix="${matrixName}"][data-row="${i}"][data-col="${j}"]`);
                if (input) {
                    input.value = Math.floor(Math.random() * 20) - 10; // Random between -10 and 10
                }
            }
        }

        // Show notification
        this.showNotification(`🎲 Matrix ${matrixName} randomized!`, 'success');
    }

    clearMatrix(matrixName) {
        const rows = parseInt(document.getElementById(`matrix${matrixName}Rows`).value);
        const cols = parseInt(document.getElementById(`matrix${matrixName}Cols`).value);

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const input = document.querySelector(`input[data-matrix="${matrixName}"][data-row="${i}"][data-col="${j}"]`);
                if (input) {
                    input.value = '0';
                }
            }
        }

        // Show notification
        this.showNotification(`🗑️ Matrix ${matrixName} cleared!`, 'info');
    }

    showNotification(message, type = 'info') {
        const resultContent = document.getElementById('resultContent');
        const className = type === 'success' ? 'success-message' : type === 'error' ? 'error-message' : 'info-box';
        resultContent.innerHTML = `<div class="${className}">${message}</div>`;

        // Auto-clear after 2 seconds
        setTimeout(() => {
            if (resultContent.innerHTML.includes(message)) {
                resultContent.innerHTML = '<p class="empty-state">Perform an operation to see results</p>';
            }
        }, 2000);
    }

    loadExample(matrixName, size) {
        let exampleMatrix;

        if (size === 'small') {
            // 2x2 examples
            if (matrixName === 'A') {
                exampleMatrix = [[1, 2], [3, 4]];
            } else {
                exampleMatrix = [[5, 6], [7, 8]];
            }
            document.getElementById(`matrix${matrixName}Rows`).value = 2;
            document.getElementById(`matrix${matrixName}Cols`).value = 2;
        } else if (size === 'medium') {
            // 3x3 examples
            if (matrixName === 'A') {
                exampleMatrix = [[1, 2, 3], [0, 1, 4], [5, 6, 0]];
            } else {
                exampleMatrix = [[2, 0, 1], [1, 3, 0], [0, 1, 2]];
            }
            document.getElementById(`matrix${matrixName}Rows`).value = 3;
            document.getElementById(`matrix${matrixName}Cols`).value = 3;
        }

        this.createMatrixInput(matrixName);

        // Fill in the values
        exampleMatrix.forEach((row, i) => {
            row.forEach((val, j) => {
                const input = document.querySelector(`input[data-matrix="${matrixName}"][data-row="${i}"][data-col="${j}"]`);
                if (input) {
                    input.value = val;
                }
            });
        });

        this.showNotification(`📖 Example loaded for Matrix ${matrixName}!`, 'success');
    }

    displayResult(matrix, title, explanation) {
        const resultContent = document.getElementById('resultContent');

        let html = `<h4>${title}</h4>`;

        if (matrix) {
            html += '<div class="result-matrix-display">';
            html += '<table class="result-matrix-table">';
            matrix.forEach(row => {
                html += '<tr>';
                row.forEach(val => {
                    html += `<td>${this.formatNumber(val)}</td>`;
                });
                html += '</tr>';
            });
            html += '</table></div>';
        }

        if (explanation) {
            html += `<div class="result-explanation">${explanation}</div>`;
        }

        resultContent.innerHTML = html;
    }

    displayError(message) {
        document.getElementById('resultContent').innerHTML =
            `<div class="error-message">❌ ${message}</div>`;
    }

    formatNumber(num) {
        if (Math.abs(num) < 1e-10) return '0';
        return Math.abs(num - Math.round(num)) < 1e-10 ? Math.round(num).toString() : num.toFixed(2);
    }

    // ========== LEVEL 1 OPERATIONS ==========

    add() {
        const A = this.readMatrix('A');
        const B = this.readMatrix('B');

        if (A.length !== B.length || A[0].length !== B[0].length) {
            this.displayError('Dimension mismatch! Matrices must have the same dimensions for addition.');
            return;
        }

        const result = A.map((row, i) => row.map((val, j) => val + B[i][j]));

        const explanation = `
            <h4>💡 Explanation: Matrix Addition</h4>
            <p><strong>Operation:</strong> A + B (Element-wise addition)</p>
            <p><strong>Properties:</strong></p>
            <ul class="property-list">
                <li>✅ Commutative: A + B = B + A</li>
                <li>✅ Associative: (A + B) + C = A + (B + C)</li>
                <li>✅ Requires same dimensions: ${A.length}×${A[0].length}</li>
            </ul>
            <p>Each element is computed as: (A + B)<sub>ij</sub> = A<sub>ij</sub> + B<sub>ij</sub></p>
        `;

        this.displayResult(result, 'A + B', explanation);
    }

    subtract() {
        const A = this.readMatrix('A');
        const B = this.readMatrix('B');

        if (A.length !== B.length || A[0].length !== B[0].length) {
            this.displayError('Dimension mismatch! Matrices must have the same dimensions for subtraction.');
            return;
        }

        const result = A.map((row, i) => row.map((val, j) => val - B[i][j]));

        const explanation = `
            <h4>💡 Explanation: Matrix Subtraction</h4>
            <p><strong>Operation:</strong> A - B (Element-wise subtraction)</p>
            <p><strong>Properties:</strong></p>
            <ul class="property-list">
                <li>❌ NOT Commutative: A - B ≠ B - A</li>
                <li>✅ Requires same dimensions: ${A.length}×${A[0].length}</li>
            </ul>
            <p>Each element is computed as: (A - B)<sub>ij</sub> = A<sub>ij</sub> - B<sub>ij</sub></p>
        `;

        this.displayResult(result, 'A - B', explanation);
    }

    multiply() {
        const A = this.readMatrix('A');
        const B = this.readMatrix('B');

        if (A[0].length !== B.length) {
            this.displayError(`Dimension mismatch! For A×B: columns(A)=${A[0].length} must equal rows(B)=${B.length}`);
            return;
        }

        // Show animation button
        this.showMultiplicationAnimation(A, B);
    }

    showMultiplicationAnimation(A, B) {
        const resultContent = document.getElementById('resultContent');

        // Calculate result
        const result = [];
        const steps = [];

        for (let i = 0; i < A.length; i++) {
            result[i] = [];
            for (let j = 0; j < B[0].length; j++) {
                let sum = 0;
                const calculations = [];

                for (let k = 0; k < A[0].length; k++) {
                    const product = A[i][k] * B[k][j];
                    sum += product;
                    calculations.push({
                        aValue: A[i][k],
                        bValue: B[k][j],
                        product: product,
                        aPos: [i, k],
                        bPos: [k, j]
                    });
                }

                result[i][j] = sum;
                steps.push({
                    resultPos: [i, j],
                    calculations: calculations,
                    sum: sum
                });
            }
        }

        // Display initial setup with matrices and animation control
        let html = `
            <h4>🎬 Matrix Multiplication Animation</h4>
            <p><strong>Computing:</strong> A × B = C</p>
            <p><strong>Dimensions:</strong> (${A.length}×${A[0].length}) × (${B.length}×${B[0].length}) = (${result.length}×${result[0].length})</p>
            
            <div class="animation-controls">
                <button id="startAnimation" class="btn-animate">▶️ Start Animation</button>
                <button id="stepAnimation" class="btn-animate" disabled>⏭️ Next Step</button>
                <button id="showResult" class="btn-animate">⏩ Show Final Result</button>
                <button id="resetAnimation" class="btn-animate">🔄 Reset</button>
            </div>
            
            <div class="multiplication-container">
                <div class="matrix-group">
                    <div class="matrix-label">Matrix A</div>
                    <div id="animMatrixA" class="anim-matrix"></div>
                </div>
                
                <div class="multiply-symbol">×</div>
                
                <div class="matrix-group">
                    <div class="matrix-label">Matrix B</div>
                    <div id="animMatrixB" class="anim-matrix"></div>
                </div>
                
                <div class="equals-symbol">=</div>
                
                <div class="matrix-group">
                    <div class="matrix-label">Result C</div>
                    <div id="animMatrixC" class="anim-matrix"></div>
                </div>
            </div>
            
            <div id="calculationSteps" class="calculation-steps"></div>
            
            <div class="result-explanation">
                <h4>💡 How it works:</h4>
                <p>Each element C<sub>ij</sub> is computed as the dot product of row i from A and column j from B:</p>
                <p class="formula">C<sub>ij</sub> = A<sub>i1</sub>×B<sub>1j</sub> + A<sub>i2</sub>×B<sub>2j</sub> + ... + A<sub>in</sub>×B<sub>nj</sub></p>
            </div>
        `;

        resultContent.innerHTML = html;

        // Render matrices
        this.renderAnimationMatrix('animMatrixA', A, 'A');
        this.renderAnimationMatrix('animMatrixB', B, 'B');
        this.renderAnimationMatrix('animMatrixC', result, 'C', true); // Initially empty

        // Store animation state
        this.animationState = {
            A: A,
            B: B,
            result: result,
            steps: steps,
            currentStep: 0,
            isAnimating: false
        };

        // Attach event listeners
        document.getElementById('startAnimation').addEventListener('click', () => this.startMultiplicationAnimation());
        document.getElementById('stepAnimation').addEventListener('click', () => this.nextAnimationStep());
        document.getElementById('showResult').addEventListener('click', () => this.showFinalResult());
        document.getElementById('resetAnimation').addEventListener('click', () => this.showMultiplicationAnimation(A, B));
    }

    renderAnimationMatrix(containerId, matrix, matrixName, empty = false) {
        const container = document.getElementById(containerId);
        let html = '<table class="anim-matrix-table">';

        for (let i = 0; i < matrix.length; i++) {
            html += '<tr>';
            for (let j = 0; j < matrix[0].length; j++) {
                const value = empty ? '?' : this.formatNumber(matrix[i][j]);
                html += `<td>
                    <div class="anim-cell" id="${matrixName}_${i}_${j}" data-row="${i}" data-col="${j}">
                        ${value}
                    </div>
                </td>`;
            }
            html += '</tr>';
        }

        html += '</table>';
        container.innerHTML = html;
    }

    startMultiplicationAnimation() {
        document.getElementById('startAnimation').disabled = true;
        document.getElementById('stepAnimation').disabled = false;
        this.animationState.isAnimating = true;
        this.animationState.currentStep = 0;

        this.showNotification('🎬 Animation started! Click "Next Step" to see each calculation.', 'success');
        this.nextAnimationStep();
    }

    nextAnimationStep() {
        const state = this.animationState;

        if (state.currentStep >= state.steps.length) {
            this.showNotification('✨ Animation complete!', 'success');
            document.getElementById('stepAnimation').disabled = true;
            return;
        }

        const step = state.steps[state.currentStep];
        const [i, j] = step.resultPos;

        // Clear previous highlights
        document.querySelectorAll('.anim-cell').forEach(cell => {
            cell.classList.remove('highlight-row', 'highlight-col', 'highlight-computing', 'highlight-result', 'highlight-current');
        });

        // Highlight current row in A
        for (let k = 0; k < state.A[0].length; k++) {
            const cell = document.getElementById(`A_${i}_${k}`);
            if (cell) cell.classList.add('highlight-row');
        }

        // Highlight current column in B
        for (let k = 0; k < state.B.length; k++) {
            const cell = document.getElementById(`B_${k}_${j}`);
            if (cell) cell.classList.add('highlight-col');
        }

        // Show calculation with step-by-step animation
        let calcHtml = `
            <div class="current-calculation">
                <h4>🎯 Computing C<sub>${i + 1},${j + 1}</sub> = Row ${i + 1} of A × Column ${j + 1} of B</h4>
                <div class="calculation-breakdown">
        `;

        // Create initial calculation display
        document.getElementById('calculationSteps').innerHTML = calcHtml + '</div></div>';

        // Animate each multiplication step
        step.calculations.forEach((calc, idx) => {
            setTimeout(() => {
                // Highlight the specific cells being multiplied
                const aCell = document.getElementById(`A_${calc.aPos[0]}_${calc.aPos[1]}`);
                const bCell = document.getElementById(`B_${calc.bPos[0]}_${calc.bPos[1]}`);

                if (!aCell || !bCell) {
                    console.error('Animation cells not found:', `A_${calc.aPos[0]}_${calc.aPos[1]}`, `B_${calc.bPos[0]}_${calc.bPos[1]}`);
                    return;
                }

                // Remove previous current highlights
                document.querySelectorAll('.highlight-current').forEach(cell => {
                    cell.classList.remove('highlight-current');
                });

                aCell.classList.add('highlight-current');
                bCell.classList.add('highlight-current');

                // Add calculation step
                let stepHtml = `
                    <div class="calc-step">
                        <span class="step-number">Step ${idx + 1}:</span>
                        <span class="calc-term">
                            <span class="highlight-a">A[${calc.aPos[0] + 1},${calc.aPos[1] + 1}] = ${this.formatNumber(calc.aValue)}</span>
                            <span class="multiply-sign">×</span>
                            <span class="highlight-b">B[${calc.bPos[0] + 1},${calc.bPos[1] + 1}] = ${this.formatNumber(calc.bValue)}</span>
                            <span class="equals-sign">=</span>
                            <span class="calc-product">${this.formatNumber(calc.product)}</span>
                        </span>
                    </div>
                `;

                const breakdownDiv = document.querySelector('.calculation-breakdown');
                if (breakdownDiv) {
                    breakdownDiv.innerHTML += stepHtml;
                }

            }, idx * 700);
        });

        // Show sum after all steps
        setTimeout(() => {
            const calcDiv = document.querySelector('.current-calculation');
            if (calcDiv) {
                calcDiv.innerHTML += `
                    <div class="calculation-sum">
                        <div class="sum-label">💡 Final Sum:</div>
                        <div class="sum-formula">${step.calculations.map(c => this.formatNumber(c.product)).join(' + ')} = <span class="final-sum">${this.formatNumber(step.sum)}</span></div>
                    </div>
                `;
            }

            // Clear current highlights
            document.querySelectorAll('.highlight-current').forEach(cell => {
                cell.classList.remove('highlight-current');
            });

            // Update result cell
            const resultCell = document.getElementById(`C_${i}_${j}`);
            if (resultCell) {
                resultCell.textContent = this.formatNumber(step.sum);
                resultCell.classList.add('highlight-result');

                // Animate the cell appearance
                setTimeout(() => {
                    resultCell.classList.remove('highlight-result');
                    resultCell.classList.add('completed');
                }, 600);
            }

        }, step.calculations.length * 700 + 200);

        state.currentStep++;

        // Auto-advance or stop
        if (state.currentStep >= state.steps.length) {
            setTimeout(() => {
                this.showNotification('✨ All elements computed! Matrix multiplication complete.', 'success');
                document.getElementById('stepAnimation').disabled = true;
            }, step.calculations.length * 700 + 1000);
        }
    }

    showFinalResult() {
        const state = this.animationState;

        // Clear highlights
        document.querySelectorAll('.anim-cell').forEach(cell => {
            cell.classList.remove('highlight-row', 'highlight-col', 'highlight-computing', 'highlight-result');
        });

        // Fill all result cells
        for (let i = 0; i < state.result.length; i++) {
            for (let j = 0; j < state.result[0].length; j++) {
                const cell = document.getElementById(`C_${i}_${j}`);
                cell.textContent = this.formatNumber(state.result[i][j]);
                cell.classList.add('completed');
            }
        }

        document.getElementById('calculationSteps').innerHTML = `
            <div class="success-message">
                ✅ Final Result: Matrix C computed successfully!
            </div>
        `;

        document.getElementById('startAnimation').disabled = true;
        document.getElementById('stepAnimation').disabled = true;
    }

    transpose() {
        const A = this.readMatrix('A');
        const result = A[0].map((_, colIndex) => A.map(row => row[colIndex]));

        const explanation = `
            <h4>💡 Explanation: Matrix Transpose</h4>
            <p><strong>Operation:</strong> A<sup>T</sup> (Transpose)</p>
            <p><strong>Dimensions:</strong> (${A.length}×${A[0].length}) → (${result.length}×${result[0].length})</p>
            <p><strong>Definition:</strong> Swaps rows and columns: (A<sup>T</sup>)<sub>ij</sub> = A<sub>ji</sub></p>
            <p><strong>Properties:</strong></p>
            <ul class="property-list">
                <li>✅ (A<sup>T</sup>)<sup>T</sup> = A</li>
                <li>✅ (A + B)<sup>T</sup> = A<sup>T</sup> + B<sup>T</sup></li>
                <li>✅ (AB)<sup>T</sup> = B<sup>T</sup>A<sup>T</sup></li>
                <li>✅ (kA)<sup>T</sup> = kA<sup>T</sup></li>
            </ul>
        `;

        this.displayResult(result, 'A<sup>T</sup>', explanation);
    }

    scalarMultiply() {
        const A = this.readMatrix('A');
        const k = parseFloat(document.getElementById('scalarValue').value);

        const result = A.map(row => row.map(val => k * val));

        const explanation = `
            <h4>💡 Explanation: Scalar Multiplication</h4>
            <p><strong>Operation:</strong> k · A where k = ${k}</p>
            <p><strong>Definition:</strong> Scales every element by k: (kA)<sub>ij</sub> = k · A<sub>ij</sub></p>
            <p><strong>Geometric Interpretation:</strong> Scales rows and columns by the same ratio.</p>
            <p><strong>Properties:</strong></p>
            <ul class="property-list">
                <li>✅ k(A + B) = kA + kB</li>
                <li>✅ (k + m)A = kA + mA</li>
                <li>✅ k(mA) = (km)A</li>
            </ul>
        `;

        this.displayResult(result, `${k} · A`, explanation);
    }

    createSpecialMatrix(type) {
        const size = parseInt(document.getElementById('specialSize').value);
        let result = [];

        switch (type) {
            case 'identity':
                for (let i = 0; i < size; i++) {
                    result[i] = [];
                    for (let j = 0; j < size; j++) {
                        result[i][j] = (i === j) ? 1 : 0;
                    }
                }
                this.displayResult(result, `I${size} (Identity Matrix)`, `
                    <h4>💡 Identity Matrix</h4>
                    <p><strong>Definition:</strong> Square matrix with 1's on the diagonal and 0's elsewhere.</p>
                    <p><strong>Properties:</strong></p>
                    <ul class="property-list">
                        <li>✅ AI = A and IA = A (Multiplicative identity)</li>
                        <li>✅ I<sup>T</sup> = I</li>
                        <li>✅ I<sup>-1</sup> = I</li>
                        <li>✅ det(I) = 1</li>
                    </ul>
                `);
                break;

            case 'zero':
                for (let i = 0; i < size; i++) {
                    result[i] = new Array(size).fill(0);
                }
                this.displayResult(result, `Zero Matrix (${size}×${size})`, `
                    <h4>💡 Zero Matrix</h4>
                    <p><strong>Definition:</strong> All elements are zero.</p>
                    <p><strong>Properties:</strong></p>
                    <ul class="property-list">
                        <li>✅ A + 0 = A (Additive identity)</li>
                        <li>✅ A · 0 = 0 and 0 · A = 0</li>
                        <li>✅ 0 · A = 0 (scalar)</li>
                    </ul>
                `);
                break;

            case 'random':
                for (let i = 0; i < size; i++) {
                    result[i] = [];
                    for (let j = 0; j < size; j++) {
                        result[i][j] = Math.floor(Math.random() * 20) - 10;
                    }
                }
                this.displayResult(result, `Random Matrix (${size}×${size})`, `
                    <h4>💡 Random Matrix</h4>
                    <p>Generated with random integers between -10 and 10.</p>
                    <p>Use this to experiment with matrix operations!</p>
                `);
                break;
        }
    }

    // ========== LEVEL 2 OPERATIONS ==========

    determinant() {
        const A = this.readMatrix('A');

        if (A.length !== A[0].length) {
            this.displayError('Determinant only exists for square matrices!');
            return;
        }

        const det = this.calculateDeterminant(A);

        let singularInfo = '';
        if (Math.abs(det) < 1e-10) {
            singularInfo = `
                <div class="error-message" style="margin-top: 15px;">
                    ⚠️ det(A) = 0 → Matrix is SINGULAR (no inverse exists)
                </div>
                <p><strong>Geometric Interpretation:</strong> The transformation collapses space into a lower dimension.</p>
            `;
        } else {
            singularInfo = `
                <div class="success-message" style="margin-top: 15px;">
                    ✅ det(A) ≠ 0 → Matrix is INVERTIBLE
                </div>
            `;
        }

        const explanation = `
            <h4>💡 Determinant: det(A) = ${this.formatNumber(det)}</h4>
            ${singularInfo}
            <p><strong>Properties:</strong></p>
            <ul class="property-list">
                <li>det(AB) = det(A) · det(B)</li>
                <li>det(A<sup>T</sup>) = det(A)</li>
                <li>det(kA) = k<sup>n</sup> · det(A) for n×n matrix</li>
                <li>det(A<sup>-1</sup>) = 1/det(A)</li>
                <li>Swapping rows changes sign</li>
                <li>Scaling a row multiplies det by that factor</li>
            </ul>
            <p><strong>Geometric Meaning:</strong> Represents the signed volume scaling factor of the linear transformation.</p>
        `;

        document.getElementById('resultContent').innerHTML = explanation;
    }

    calculateDeterminant(matrix) {
        const n = matrix.length;

        if (n === 1) return matrix[0][0];
        if (n === 2) return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];

        // LU decomposition method for efficiency
        let A = matrix.map(row => [...row]);
        let det = 1;
        let swaps = 0;

        for (let i = 0; i < n; i++) {
            // Find pivot
            let maxRow = i;
            for (let k = i + 1; k < n; k++) {
                if (Math.abs(A[k][i]) > Math.abs(A[maxRow][i])) {
                    maxRow = k;
                }
            }

            if (Math.abs(A[maxRow][i]) < 1e-10) return 0;

            if (maxRow !== i) {
                [A[i], A[maxRow]] = [A[maxRow], A[i]];
                swaps++;
            }

            det *= A[i][i];

            for (let k = i + 1; k < n; k++) {
                const factor = A[k][i] / A[i][i];
                for (let j = i; j < n; j++) {
                    A[k][j] -= factor * A[i][j];
                }
            }
        }

        return det * (swaps % 2 === 0 ? 1 : -1);
    }

    inverse() {
        const A = this.readMatrix('A');

        if (A.length !== A[0].length) {
            this.displayError('Inverse only exists for square matrices!');
            return;
        }

        const det = this.calculateDeterminant(A);
        if (Math.abs(det) < 1e-10) {
            this.displayError('Matrix is SINGULAR (det = 0). Inverse does not exist!');
            return;
        }

        const inv = this.calculateInverse(A);

        const explanation = `
            <h4>💡 Matrix Inverse: A<sup>-1</sup></h4>
            <p><strong>Method:</strong> Gauss-Jordan elimination on [A|I]</p>
            <div class="success-message">
                ✅ Verification: A · A<sup>-1</sup> = I (Identity Matrix)
            </div>
            <p><strong>Properties:</strong></p>
            <ul class="property-list">
                <li>(A<sup>-1</sup>)<sup>-1</sup> = A</li>
                <li>(AB)<sup>-1</sup> = B<sup>-1</sup>A<sup>-1</sup></li>
                <li>(A<sup>T</sup>)<sup>-1</sup> = (A<sup>-1</sup>)<sup>T</sup></li>
                <li>det(A<sup>-1</sup>) = 1/det(A) = ${this.formatNumber(1 / det)}</li>
            </ul>
            <p><strong>Application:</strong> Solve Ax = b by computing x = A<sup>-1</sup>b</p>
        `;

        this.displayResult(inv, 'A<sup>-1</sup>', explanation);
    }

    calculateInverse(matrix) {
        const n = matrix.length;
        const augmented = matrix.map((row, i) => {
            const newRow = [...row];
            for (let j = 0; j < n; j++) {
                newRow.push(i === j ? 1 : 0);
            }
            return newRow;
        });

        // Gauss-Jordan elimination
        for (let i = 0; i < n; i++) {
            // Find pivot
            let maxRow = i;
            for (let k = i + 1; k < n; k++) {
                if (Math.abs(augmented[k][i]) > Math.abs(augmented[maxRow][i])) {
                    maxRow = k;
                }
            }

            [augmented[i], augmented[maxRow]] = [augmented[maxRow], augmented[i]];

            // Scale pivot row
            const pivot = augmented[i][i];
            for (let j = 0; j < 2 * n; j++) {
                augmented[i][j] /= pivot;
            }

            // Eliminate column
            for (let k = 0; k < n; k++) {
                if (k !== i) {
                    const factor = augmented[k][i];
                    for (let j = 0; j < 2 * n; j++) {
                        augmented[k][j] -= factor * augmented[i][j];
                    }
                }
            }
        }

        return augmented.map(row => row.slice(n));
    }

    rank() {
        const A = this.readMatrix('A');
        const rref = this.calculateRREF(A);
        const rank = this.calculateRank(rref);

        const pivotCols = [];
        for (let i = 0; i < rref.length; i++) {
            for (let j = 0; j < rref[0].length; j++) {
                if (Math.abs(rref[i][j] - 1) < 1e-10) {
                    let isPivot = true;
                    for (let k = 0; k < rref.length; k++) {
                        if (k !== i && Math.abs(rref[k][j]) > 1e-10) {
                            isPivot = false;
                            break;
                        }
                    }
                    if (isPivot) {
                        pivotCols.push(j + 1);
                        break;
                    }
                }
            }
        }

        const explanation = `
            <h4>💡 Rank of Matrix</h4>
            <p><strong>Rank(A) = ${rank}</strong></p>
            <p><strong>Pivot Columns:</strong> ${pivotCols.join(', ')}</p>
            <p><strong>Definition:</strong> Number of linearly independent rows (or columns).</p>
            <p><strong>Interpretation:</strong></p>
            <ul class="property-list">
                <li>Dimension of column space = ${rank}</li>
                <li>Dimension of row space = ${rank}</li>
                <li>Nullity (dimension of null space) = ${A[0].length - rank}</li>
                <li>Rank-Nullity Theorem: rank + nullity = ${A[0].length}</li>
            </ul>
            <div class="info-box">
                <strong>RREF Form:</strong> The matrix has ${rank} pivot position(s).
            </div>
        `;

        this.displayResult(rref, 'RREF(A)', explanation);
    }

    calculateRREF(matrix) {
        const m = matrix.length;
        const n = matrix[0].length;
        const A = matrix.map(row => [...row]);

        let pivotRow = 0;

        for (let col = 0; col < n && pivotRow < m; col++) {
            let maxRow = pivotRow;
            for (let i = pivotRow + 1; i < m; i++) {
                if (Math.abs(A[i][col]) > Math.abs(A[maxRow][col])) {
                    maxRow = i;
                }
            }

            if (Math.abs(A[maxRow][col]) < 1e-10) continue;

            [A[pivotRow], A[maxRow]] = [A[maxRow], A[pivotRow]];

            const pivot = A[pivotRow][col];
            for (let j = 0; j < n; j++) {
                A[pivotRow][j] /= pivot;
            }

            for (let i = 0; i < m; i++) {
                if (i !== pivotRow) {
                    const factor = A[i][col];
                    for (let j = 0; j < n; j++) {
                        A[i][j] -= factor * A[pivotRow][j];
                    }
                }
            }

            pivotRow++;
        }

        return A.map(row => row.map(val => Math.abs(val) < 1e-10 ? 0 : val));
    }

    calculateRank(rref) {
        let rank = 0;
        for (let i = 0; i < rref.length; i++) {
            if (rref[i].some(val => Math.abs(val) > 1e-10)) {
                rank++;
            }
        }
        return rank;
    }

    columnNullSpace() {
        const A = this.readMatrix('A');
        const rref = this.calculateRREF(A);

        const pivotCols = [];
        const pivotRows = [];

        for (let i = 0; i < rref.length; i++) {
            for (let j = 0; j < rref[0].length; j++) {
                if (Math.abs(rref[i][j] - 1) < 1e-10) {
                    let isPivot = true;
                    for (let k = 0; k < rref.length; k++) {
                        if (k !== i && Math.abs(rref[k][j]) > 1e-10) {
                            isPivot = false;
                            break;
                        }
                    }
                    if (isPivot) {
                        pivotCols.push(j);
                        pivotRows.push(i);
                        break;
                    }
                }
            }
        }

        const freeCols = [];
        for (let j = 0; j < A[0].length; j++) {
            if (!pivotCols.includes(j)) {
                freeCols.push(j);
            }
        }

        let explanation = `
            <h4>💡 Column Space & Null Space Analysis</h4>
            
            <div class="success-message">
                <strong>Column Space Basis:</strong><br>
                Pivot columns from original matrix A: ${pivotCols.map(i => `Column ${i + 1}`).join(', ')}
            </div>
            
            <p><strong>Column Space Details:</strong></p>
            <ul class="property-list">
                <li>Dimension: ${pivotCols.length}</li>
                <li>Basis vectors from columns: ${pivotCols.map(i => i + 1).join(', ')}</li>
            </ul>

            <div class="info-box">
                <strong>Null Space (Solution to Ax = 0):</strong><br>
                Free variables: ${freeCols.length > 0 ? freeCols.map(i => `x${i + 1}`).join(', ') : 'None'}
            </div>

            <p><strong>Null Space Details:</strong></p>
            <ul class="property-list">
                <li>Dimension (Nullity): ${freeCols.length}</li>
                <li>${freeCols.length === 0 ? 'Null space = {0} (trivial)' : `${freeCols.length} basis vector(s) needed`}</li>
            </ul>

            <p><strong>Fundamental Theorem:</strong></p>
            <ul class="property-list">
                <li>rank(A) + nullity(A) = ${A[0].length}</li>
                <li>${pivotCols.length} + ${freeCols.length} = ${A[0].length} ✓</li>
            </ul>
        `;

        this.displayResult(rref, 'RREF Analysis', explanation);
    }
}

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

        // Matrix operation buttons
        document.getElementById('rrefTranspose').addEventListener('click', () => this.performTranspose());
        document.getElementById('rrefDeterminant').addEventListener('click', () => this.performDeterminant());
        document.getElementById('rrefInverse').addEventListener('click', () => this.performInverse());
        document.getElementById('rrefRank').addEventListener('click', () => this.performRank());
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

    // Get current matrix from input fields (excluding augmented column)
    getCurrentMatrix() {
        const matrix = [];
        const inputs = this.matrixContainer.querySelectorAll('input.matrix-cell');

        for (let i = 0; i < this.rows; i++) {
            matrix[i] = [];
            for (let j = 0; j < this.cols; j++) {
                const input = this.matrixContainer.querySelector(`input[data-row="${i}"][data-col="${j}"]`);
                matrix[i][j] = parseFloat(input.value) || 0;
            }
        }

        return matrix;
    }

    // Display operation result
    displayOperationResult(title, result, explanation = '') {
        let html = `<div class="operation-result">
            <h4>${title}</h4>`;

        if (typeof result === 'number') {
            html += `<p class="result-value">${result}</p>`;
        } else if (Array.isArray(result)) {
            html += '<div class="result-matrix"><table class="matrix-table">';
            result.forEach(row => {
                html += '<tr>';
                if (Array.isArray(row)) {
                    row.forEach(val => {
                        const displayVal = typeof val === 'number' ? val.toFixed(4) : val;
                        html += `<td>${displayVal}</td>`;
                    });
                } else {
                    html += `<td>${typeof row === 'number' ? row.toFixed(4) : row}</td>`;
                }
                html += '</tr>';
            });
            html += '</table></div>';
        } else if (typeof result === 'object' && result.columnSpace) {
            // Handle column/null space result
            html += '<div class="space-result">';
            html += '<h5>Column Space:</h5>';
            if (result.columnSpace.length > 0) {
                html += '<table class="matrix-table">';
                result.columnSpace.forEach(vector => {
                    html += '<tr>';
                    vector.forEach(val => {
                        html += `<td>${val.toFixed(4)}</td>`;
                    });
                    html += '</tr>';
                });
                html += '</table>';
            } else {
                html += '<p>Empty (zero matrix)</p>';
            }

            html += '<h5>Null Space:</h5>';
            if (result.nullSpace.length > 0) {
                html += '<table class="matrix-table">';
                result.nullSpace.forEach(vector => {
                    html += '<tr>';
                    vector.forEach(val => {
                        html += `<td>${val.toFixed(4)}</td>`;
                    });
                    html += '</tr>';
                });
                html += '</table>';
            } else {
                html += '<p>Empty (trivial)</p>';
            }
            html += '</div>';
        } else {
            html += `<p>${result}</p>`;
        }

        if (explanation) {
            html += `<p class="explanation">${explanation}</p>`;
        }

        html += '</div>';

        this.explanationContent.innerHTML = html;
    }

    // Matrix operation methods
    performTranspose() {
        try {
            const matrix = this.getCurrentMatrix();
            if (matrix.length === 0) {
                this.showMessage('⚠️ Please create a matrix first!');
                return;
            }

            const result = [];
            for (let j = 0; j < matrix[0].length; j++) {
                result[j] = [];
                for (let i = 0; i < matrix.length; i++) {
                    result[j][i] = matrix[i][j];
                }
            }

            this.displayOperationResult(
                '📐 Matrix Transpose',
                result,
                'The transpose flips the matrix over its diagonal, swapping rows and columns.'
            );
        } catch (error) {
            this.showMessage(`❌ Error: ${error.message}`);
        }
    }

    performDeterminant() {
        try {
            const matrix = this.getCurrentMatrix();
            if (matrix.length === 0) {
                this.showMessage('⚠️ Please create a matrix first!');
                return;
            }

            if (matrix.length !== matrix[0].length) {
                this.showMessage('⚠️ Determinant requires a square matrix!');
                return;
            }

            const det = this.calculateDeterminant(matrix);
            this.displayOperationResult(
                '🔢 Determinant',
                det,
                det === 0
                    ? 'Determinant is 0, meaning the matrix is singular (not invertible).'
                    : 'Determinant is non-zero, meaning the matrix is invertible.'
            );
        } catch (error) {
            this.showMessage(`❌ Error: ${error.message}`);
        }
    }

    performInverse() {
        try {
            const matrix = this.getCurrentMatrix();
            if (matrix.length === 0) {
                this.showMessage('⚠️ Please create a matrix first!');
                return;
            }

            if (matrix.length !== matrix[0].length) {
                this.showMessage('⚠️ Inverse requires a square matrix!');
                return;
            }

            const det = this.calculateDeterminant(matrix);
            if (Math.abs(det) < 1e-10) {
                this.showMessage('⚠️ Matrix is singular (determinant = 0), cannot compute inverse!');
                return;
            }

            const inverse = this.calculateInverse(matrix);
            this.displayOperationResult(
                '🔄 Matrix Inverse',
                inverse,
                'A × A⁻¹ = I (identity matrix). The inverse undoes the transformation of the original matrix.'
            );
        } catch (error) {
            this.showMessage(`❌ Error: ${error.message}`);
        }
    }

    performRank() {
        try {
            const matrix = this.getCurrentMatrix();
            if (matrix.length === 0) {
                this.showMessage('⚠️ Please create a matrix first!');
                return;
            }

            const rank = this.calculateRank(matrix);
            this.displayOperationResult(
                '📊 Matrix Rank',
                rank,
                `The rank is ${rank}, which is the dimension of the column space (number of linearly independent columns).`
            );
        } catch (error) {
            this.showMessage(`❌ Error: ${error.message}`);
        }
    }

    // Helper methods for calculations
    calculateDeterminant(matrix) {
        const n = matrix.length;
        if (n === 1) return matrix[0][0];
        if (n === 2) return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];

        let det = 0;
        for (let j = 0; j < n; j++) {
            const minor = [];
            for (let i = 1; i < n; i++) {
                minor[i - 1] = [];
                for (let k = 0; k < n; k++) {
                    if (k !== j) {
                        minor[i - 1].push(matrix[i][k]);
                    }
                }
            }
            det += Math.pow(-1, j) * matrix[0][j] * this.calculateDeterminant(minor);
        }
        return det;
    }

    calculateInverse(matrix) {
        const n = matrix.length;
        const augmented = matrix.map((row, i) => {
            const newRow = [...row];
            for (let j = 0; j < n; j++) {
                newRow.push(i === j ? 1 : 0);
            }
            return newRow;
        });

        // Gauss-Jordan elimination
        for (let i = 0; i < n; i++) {
            // Find pivot
            let maxRow = i;
            for (let k = i + 1; k < n; k++) {
                if (Math.abs(augmented[k][i]) > Math.abs(augmented[maxRow][i])) {
                    maxRow = k;
                }
            }
            [augmented[i], augmented[maxRow]] = [augmented[maxRow], augmented[i]];

            // Scale pivot row
            const pivot = augmented[i][i];
            for (let j = 0; j < 2 * n; j++) {
                augmented[i][j] /= pivot;
            }

            // Eliminate column
            for (let k = 0; k < n; k++) {
                if (k !== i) {
                    const factor = augmented[k][i];
                    for (let j = 0; j < 2 * n; j++) {
                        augmented[k][j] -= factor * augmented[i][j];
                    }
                }
            }
        }

        // Extract inverse from augmented matrix
        return augmented.map(row => row.slice(n));
    }

    calculateRank(matrix) {
        const m = matrix.length;
        const n = matrix[0].length;
        const temp = matrix.map(row => [...row]);

        let rank = 0;
        for (let col = 0; col < n && rank < m; col++) {
            // Find pivot
            let pivotRow = -1;
            for (let row = rank; row < m; row++) {
                if (Math.abs(temp[row][col]) > 1e-10) {
                    pivotRow = row;
                    break;
                }
            }

            if (pivotRow === -1) continue;

            // Swap rows
            [temp[rank], temp[pivotRow]] = [temp[pivotRow], temp[rank]];

            // Eliminate
            for (let row = rank + 1; row < m; row++) {
                const factor = temp[row][col] / temp[rank][col];
                for (let c = col; c < n; c++) {
                    temp[row][c] -= factor * temp[rank][c];
                }
            }

            rank++;
        }

        return rank;
    }

    showMessage(message) {
        this.explanationContent.innerHTML = `<p class="instruction">${message}</p>`;
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Initialize tab navigation
    initializeTabs();

    // Initialize components
    new RREFSolver();
    new MatrixOperations();
});

// Tab Navigation System
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.dataset.tab;

            // Remove active class from all buttons and contents
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');

            if (tabName === 'rref') {
                document.getElementById('rrefSection').classList.add('active');
            } else if (tabName === 'operations') {
                document.getElementById('operationsSection').classList.add('active');
            }
        });
    });
}
