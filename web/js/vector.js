// Vector Space & Subspace Analyzer
// Mathematical functions and UI handlers

// ========================================
// Mode Switching
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initializeModes();
    initializeEquationMode();
    initializeVectorMode();
    initializeAxiomMode();
    initializeLearningMode();
});

function initializeModes() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const mode = btn.dataset.mode;
            switchMode(mode);
        });
    });
}

function switchMode(mode) {
    // Update tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.mode === mode) {
            btn.classList.add('active');
        }
    });

    // Update content
    document.querySelectorAll('.mode-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(mode + 'Mode').classList.add('active');
}

// ========================================
// MODE 1: Check by Equation
// ========================================
function initializeEquationMode() {
    document.getElementById('equationDimension').addEventListener('change', updateEquationInputs);
    document.getElementById('checkEquation').addEventListener('click', checkEquationSubspace);
    document.getElementById('randomEquation').addEventListener('click', generateRandomEquation);
    updateEquationInputs();
}

function updateEquationInputs() {
    const dimension = document.getElementById('equationDimension').value;
    document.getElementById('equation2D').style.display = dimension === '2' ? 'block' : 'none';
    document.getElementById('equation3D').style.display = dimension === '3' ? 'block' : 'none';
}

function generateRandomEquation() {
    const dimension = document.getElementById('equationDimension').value;

    // Generate random integers between -5 and 5 (excluding 0)
    const randomCoeff = () => {
        let val = Math.floor(Math.random() * 11) - 5; // -5 to 5
        return val === 0 ? 1 : val; // Avoid zero coefficients
    };

    // Random constant (50% chance to be 0 for valid subspaces)
    const randomConstant = () => Math.random() < 0.5 ? 0 : Math.floor(Math.random() * 7) - 3;

    if (dimension === '2') {
        document.getElementById('eq2d_a').value = randomCoeff();
        document.getElementById('eq2d_b').value = randomCoeff();
        document.getElementById('eq2d_c').value = randomConstant();
    } else {
        document.getElementById('eq3d_a').value = randomCoeff();
        document.getElementById('eq3d_b').value = randomCoeff();
        document.getElementById('eq3d_c').value = randomCoeff();
        document.getElementById('eq3d_d').value = randomConstant();
    }
}

function checkEquationSubspace() {
    const dimension = document.getElementById('equationDimension').value;
    let coefficients, constant;

    if (dimension === '2') {
        coefficients = [
            parseFloat(document.getElementById('eq2d_a').value) || 0,
            parseFloat(document.getElementById('eq2d_b').value) || 0
        ];
        constant = parseFloat(document.getElementById('eq2d_c').value) || 0;
    } else {
        coefficients = [
            parseFloat(document.getElementById('eq3d_a').value) || 0,
            parseFloat(document.getElementById('eq3d_b').value) || 0,
            parseFloat(document.getElementById('eq3d_c').value) || 0
        ];
        constant = parseFloat(document.getElementById('eq3d_d').value) || 0;
    }

    // Check if all coefficients are zero
    if (coefficients.every(c => c === 0)) {
        displayEquationResult({
            isSubspace: false,
            reason: 'Invalid equation: all coefficients are zero',
            checks: []
        }, dimension);
        return;
    }

    const result = performSubspaceTest(coefficients, constant, dimension);
    displayEquationResult(result, dimension, coefficients, constant);
}

function performSubspaceTest(coefficients, constant, dimension) {
    const checks = [];
    let isSubspace = true;

    // Test 1: Contains zero vector
    const zeroTest = constant === 0;
    checks.push({
        name: '1. Contains Zero Vector',
        passed: zeroTest,
        explanation: zeroTest
            ? `When all variables = 0, the equation gives: 0 = ${constant} ✓`
            : `When all variables = 0, the equation gives: 0 ≠ ${constant} ✗`,
        detail: zeroTest
            ? 'The zero vector satisfies the equation.'
            : 'The zero vector does NOT satisfy the equation. This is NOT a subspace!'
    });

    if (!zeroTest) {
        return {
            isSubspace: false,
            reason: 'Fails the zero vector test',
            checks: checks
        };
    }

    // Test 2: Closed under addition
    // Generate two random vectors that satisfy the equation
    const v1 = generateSatisfyingVector(coefficients, dimension);
    const v2 = generateSatisfyingVector(coefficients, dimension);
    const sum = v1.map((val, i) => val + v2[i]);

    const sumTest = dotProduct(coefficients, sum) === constant;
    checks.push({
        name: '2. Closed Under Addition',
        passed: sumTest,
        explanation: `Test with v₁ = ${vectorToString(v1)} and v₂ = ${vectorToString(v2)}`,
        detail: sumTest
            ? `v₁ + v₂ = ${vectorToString(sum)} also satisfies the equation ✓`
            : `v₁ + v₂ = ${vectorToString(sum)} does NOT satisfy the equation ✗`
    });

    // Test 3: Closed under scalar multiplication
    const scalar = 2;
    const scaled = v1.map(val => scalar * val);
    const scalarTest = dotProduct(coefficients, scaled) === constant * scalar;
    checks.push({
        name: '3. Closed Under Scalar Multiplication',
        passed: scalarTest,
        explanation: `Test with v = ${vectorToString(v1)} and scalar c = ${scalar}`,
        detail: scalarTest
            ? `c·v = ${vectorToString(scaled)} satisfies the equation (with constant = ${constant * scalar}) ✓`
            : `c·v = ${vectorToString(scaled)} does NOT satisfy the equation ✗`
    });

    isSubspace = zeroTest && sumTest && scalarTest;

    return {
        isSubspace: isSubspace,
        reason: isSubspace ? 'Passes all three subspace tests' : 'Fails one or more subspace tests',
        checks: checks
    };
}

function generateSatisfyingVector(coefficients, dimension) {
    // Generate a random vector that satisfies ax + by (+ cz) = 0
    const vector = [];

    // Set all but the last component randomly
    for (let i = 0; i < dimension - 1; i++) {
        vector.push(Math.random() * 4 - 2); // Random value between -2 and 2
    }

    // Calculate the last component to satisfy the equation
    let sum = 0;
    for (let i = 0; i < vector.length; i++) {
        sum += coefficients[i] * vector[i];
    }

    const lastCoeff = coefficients[dimension - 1];
    const lastValue = lastCoeff !== 0 ? -sum / lastCoeff : 0;
    vector.push(lastValue);

    return vector.map(v => Math.round(v * 100) / 100);
}

function dotProduct(a, b) {
    return a.reduce((sum, val, i) => sum + val * b[i], 0);
}

function vectorToString(vec) {
    return '(' + vec.map(v => v.toFixed(2)).join(', ') + ')';
}

function displayEquationResult(result, dimension, coefficients, constant) {
    const resultDiv = document.getElementById('equationResult');
    const vizDiv = document.getElementById('equationVisualization');

    let html = '';

    if (result.isSubspace) {
        html += `<div class="result-box success">
            <h3>✅ This IS a Subspace!</h3>
            <p><strong>Conclusion:</strong> ${result.reason}</p>
        </div>`;
    } else {
        html += `<div class="result-box error">
            <h3>❌ This is NOT a Subspace</h3>
            <p><strong>Reason:</strong> ${result.reason}</p>
        </div>`;
    }

    // Display individual checks
    html += '<div class="result-box info"><h3>🔍 Detailed Verification</h3>';
    result.checks.forEach(check => {
        const icon = check.passed ? '✅' : '❌';
        const statusClass = check.passed ? 'success' : 'error';
        html += `
            <div class="check-item">
                <span class="check-icon">${icon}</span>
                <div>
                    <strong>${check.name}</strong>
                    <p>${check.explanation}</p>
                    <p class="${statusClass}">${check.detail}</p>
                </div>
            </div>
        `;
    });
    html += '</div>';

    resultDiv.innerHTML = html;

    // Show visualization if we have valid coefficients
    if (coefficients && constant !== undefined) {
        vizDiv.style.display = 'block';
        visualizeEquation(coefficients, constant, dimension);
    }

    // Scroll to result
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function visualizeEquation(coefficients, constant, dimension) {
    const graphDiv = document.getElementById('equationGraph');

    if (dimension === '2') {
        visualize2DEquation(graphDiv, coefficients, constant);
    } else {
        visualize3DEquation(graphDiv, coefficients, constant);
    }
}

function visualize2DEquation(div, coefficients, constant) {
    const [a, b] = coefficients;

    // Generate line points: ax + by = c
    const xRange = [-5, 5];
    const xPoints = [];
    const yPoints = [];

    for (let x = xRange[0]; x <= xRange[1]; x += 0.1) {
        if (b !== 0) {
            const y = (constant - a * x) / b;
            if (Math.abs(y) < 10) {
                xPoints.push(x);
                yPoints.push(y);
            }
        }
    }

    const trace = {
        x: xPoints,
        y: yPoints,
        mode: 'lines',
        name: `${a}x + ${b}y = ${constant}`,
        line: { color: constant === 0 ? '#10b981' : '#ef4444', width: 3 }
    };

    // Add origin point
    const origin = {
        x: [0],
        y: [0],
        mode: 'markers',
        name: 'Origin',
        marker: { size: 12, color: '#fbbf24' }
    };

    const layout = {
        title: {
            text: constant === 0 ? 'Subspace (Line through origin)' : 'NOT a Subspace (Line not through origin)',
            font: { color: '#e2e8f0' }
        },
        xaxis: {
            title: 'x',
            gridcolor: '#334155',
            zerolinecolor: '#64748b'
        },
        yaxis: {
            title: 'y',
            gridcolor: '#334155',
            zerolinecolor: '#64748b'
        },
        paper_bgcolor: '#1e293b',
        plot_bgcolor: '#0f172a',
        font: { color: '#e2e8f0' },
        showlegend: true
    };

    Plotly.newPlot(div, [trace, origin], layout, { responsive: true });
}

function visualize3DEquation(div, coefficients, constant) {
    const [a, b, c] = coefficients;

    // Generate plane mesh: ax + by + cz = d
    const range = 3;
    const step = 0.5;
    const xPoints = [];
    const yPoints = [];
    const zPoints = [];

    for (let x = -range; x <= range; x += step) {
        for (let y = -range; y <= range; y += step) {
            if (c !== 0) {
                const z = (constant - a * x - b * y) / c;
                if (Math.abs(z) <= range) {
                    xPoints.push(x);
                    yPoints.push(y);
                    zPoints.push(z);
                }
            }
        }
    }

    const plane = {
        x: xPoints,
        y: yPoints,
        z: zPoints,
        mode: 'markers',
        type: 'scatter3d',
        name: `${a}x + ${b}y + ${c}z = ${constant}`,
        marker: {
            size: 2,
            color: constant === 0 ? '#10b981' : '#ef4444',
            opacity: 0.6
        }
    };

    // Add origin
    const origin = {
        x: [0],
        y: [0],
        z: [0],
        mode: 'markers',
        type: 'scatter3d',
        name: 'Origin',
        marker: { size: 8, color: '#fbbf24' }
    };

    const layout = {
        title: {
            text: constant === 0 ? 'Subspace (Plane through origin)' : 'NOT a Subspace (Plane not through origin)',
            font: { color: '#e2e8f0' }
        },
        scene: {
            xaxis: { title: 'x', gridcolor: '#334155', backgroundcolor: '#0f172a' },
            yaxis: { title: 'y', gridcolor: '#334155', backgroundcolor: '#0f172a' },
            zaxis: { title: 'z', gridcolor: '#334155', backgroundcolor: '#0f172a' }
        },
        paper_bgcolor: '#1e293b',
        plot_bgcolor: '#0f172a',
        font: { color: '#e2e8f0' },
        showlegend: true
    };

    Plotly.newPlot(div, [plane, origin], layout, { responsive: true });
}

// ========================================
// MODE 2: Check by Vectors
// ========================================
function initializeVectorMode() {
    document.getElementById('vectorDimension').addEventListener('change', updateVectorInputs);
    document.getElementById('vectorCount').addEventListener('change', updateVectorInputs);
    document.getElementById('checkVectors').addEventListener('click', analyzeVectors);
    document.getElementById('randomVectors').addEventListener('click', generateRandomVectors);
    updateVectorInputs();
}

function updateVectorInputs() {
    const dimension = parseInt(document.getElementById('vectorDimension').value);
    const count = parseInt(document.getElementById('vectorCount').value);
    const container = document.getElementById('vectorInputs');

    let html = '';
    for (let i = 0; i < count; i++) {
        html += `<div class="vector-input-row">
            <h4>Vector v${i + 1}</h4>
            <div class="vector-components">`;

        const labels = ['x', 'y', 'z'];
        for (let j = 0; j < dimension; j++) {
            html += `<input type="number" id="v${i}_${j}" placeholder="${labels[j]}" value="0" step="any">`;
            if (j < dimension - 1) html += '<span>,</span>';
        }

        html += `</div></div>`;
    }

    container.innerHTML = html;
}

function generateRandomVectors() {
    const dimension = parseInt(document.getElementById('vectorDimension').value);
    const count = parseInt(document.getElementById('vectorCount').value);

    // Generate random integers between -5 and 5
    const randomValue = () => Math.floor(Math.random() * 11) - 5; // -5 to 5

    for (let i = 0; i < count; i++) {
        for (let j = 0; j < dimension; j++) {
            const input = document.getElementById(`v${i}_${j}`);
            if (input) {
                input.value = randomValue();
            }
        }
    }
}

function analyzeVectors() {
    const dimension = parseInt(document.getElementById('vectorDimension').value);
    const count = parseInt(document.getElementById('vectorCount').value);

    // Read vectors
    const vectors = [];
    for (let i = 0; i < count; i++) {
        const vector = [];
        for (let j = 0; j < dimension; j++) {
            const val = parseFloat(document.getElementById(`v${i}_${j}`).value) || 0;
            vector.push(val);
        }
        vectors.push(vector);
    }

    // Check if any vector is zero
    const hasZero = vectors.some(v => v.every(x => x === 0));
    if (hasZero) {
        displayVectorResult({
            linearlyIndependent: false,
            rank: 0,
            dimension: dimension,
            reason: 'Contains zero vector'
        }, vectors);
        return;
    }

    // Perform analysis
    const result = analyzeVectorSet(vectors, dimension);
    displayVectorResult(result, vectors);
}

function analyzeVectorSet(vectors, dimension) {
    // Create matrix from vectors (as rows)
    const matrix = vectors.map(v => [...v]);

    // Perform RREF
    const rref = computeRREF(matrix);

    // Count non-zero rows (rank)
    const rank = rref.filter(row => row.some(val => Math.abs(val) > 1e-10)).length;

    // Linear independence check
    const linearlyIndependent = rank === vectors.length;

    // Check if they form a basis
    const formBasis = linearlyIndependent && rank === dimension;

    // Calculate span dimension
    const spanDimension = rank;

    return {
        linearlyIndependent: linearlyIndependent,
        rank: rank,
        dimension: dimension,
        vectorCount: vectors.length,
        formBasis: formBasis,
        spanDimension: spanDimension,
        rref: rref
    };
}

function computeRREF(matrix) {
    const m = matrix.length;
    const n = matrix[0].length;
    const result = matrix.map(row => [...row]);

    let lead = 0;
    for (let r = 0; r < m; r++) {
        if (lead >= n) break;

        // Find pivot
        let i = r;
        while (Math.abs(result[i][lead]) < 1e-10) {
            i++;
            if (i === m) {
                i = r;
                lead++;
                if (lead === n) return result;
            }
        }

        // Swap rows
        [result[i], result[r]] = [result[r], result[i]];

        // Scale pivot to 1
        const pivot = result[r][lead];
        if (Math.abs(pivot) > 1e-10) {
            for (let j = 0; j < n; j++) {
                result[r][j] /= pivot;
            }
        }

        // Eliminate column
        for (let i = 0; i < m; i++) {
            if (i !== r) {
                const factor = result[i][lead];
                for (let j = 0; j < n; j++) {
                    result[i][j] -= factor * result[r][j];
                }
            }
        }

        lead++;
    }

    return result;
}

function displayVectorResult(result, vectors) {
    const resultDiv = document.getElementById('vectorResult');
    const vizDiv = document.getElementById('vectorVisualization');

    let html = '';

    // Main result
    if (result.linearlyIndependent) {
        html += `<div class="result-box success">
            <h3>✅ Linearly Independent!</h3>
            <p>These ${result.vectorCount} vectors are linearly independent.</p>
        </div>`;
    } else {
        html += `<div class="result-box error">
            <h3>❌ Linearly Dependent</h3>
            <p>These vectors are linearly dependent. ${result.reason || 'One vector can be expressed as a combination of others.'}</p>
        </div>`;
    }

    // Detailed analysis
    html += `<div class="result-box info">
        <h3>📊 Detailed Analysis</h3>
        <div class="check-item">
            <span class="check-icon">📏</span>
            <div>
                <strong>Rank:</strong> ${result.rank}
                <p>The vectors span a ${result.rank}-dimensional subspace of ℝ${result.dimension}</p>
            </div>
        </div>
        <div class="check-item">
            <span class="check-icon">${result.formBasis ? '✅' : '❌'}</span>
            <div>
                <strong>Forms a Basis:</strong> ${result.formBasis ? 'Yes' : 'No'}
                <p>${result.formBasis
            ? `These vectors form a basis for ℝ${result.dimension}`
            : `These vectors do not form a basis for ℝ${result.dimension}`}</p>
            </div>
        </div>
        <div class="check-item">
            <span class="check-icon">🎯</span>
            <div>
                <strong>Span Dimension:</strong> ${result.spanDimension}
                <p>The span of these vectors is a ${result.spanDimension}-dimensional subspace</p>
            </div>
        </div>
    </div>`;

    resultDiv.innerHTML = html;

    // Visualize if 2D or 3D
    if (result.dimension <= 3) {
        vizDiv.style.display = 'block';
        visualizeVectors(vectors, result.dimension);
    }

    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function visualizeVectors(vectors, dimension) {
    const graphDiv = document.getElementById('vectorGraph');

    if (dimension === 2) {
        visualize2DVectors(graphDiv, vectors);
    } else {
        visualize3DVectors(graphDiv, vectors);
    }
}

function visualize2DVectors(div, vectors) {
    const traces = [];
    const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b'];

    // Add origin
    traces.push({
        x: [0],
        y: [0],
        mode: 'markers',
        name: 'Origin',
        marker: { size: 10, color: '#fbbf24' }
    });

    // Add vectors
    vectors.forEach((v, i) => {
        traces.push({
            x: [0, v[0]],
            y: [0, v[1]],
            mode: 'lines+markers',
            name: `v${i + 1}`,
            line: { color: colors[i % colors.length], width: 3 },
            marker: { size: 8 }
        });
    });

    const layout = {
        title: { text: 'Vector Visualization', font: { color: '#e2e8f0' } },
        xaxis: {
            title: 'x',
            gridcolor: '#334155',
            zerolinecolor: '#64748b',
            range: [-5, 5]
        },
        yaxis: {
            title: 'y',
            gridcolor: '#334155',
            zerolinecolor: '#64748b',
            range: [-5, 5]
        },
        paper_bgcolor: '#1e293b',
        plot_bgcolor: '#0f172a',
        font: { color: '#e2e8f0' },
        showlegend: true
    };

    Plotly.newPlot(div, traces, layout, { responsive: true });
}

function visualize3DVectors(div, vectors) {
    const traces = [];
    const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b'];

    // Add origin
    traces.push({
        x: [0],
        y: [0],
        z: [0],
        mode: 'markers',
        type: 'scatter3d',
        name: 'Origin',
        marker: { size: 8, color: '#fbbf24' }
    });

    // Add vectors
    vectors.forEach((v, i) => {
        traces.push({
            x: [0, v[0]],
            y: [0, v[1]],
            z: [0, v[2]],
            mode: 'lines+markers',
            type: 'scatter3d',
            name: `v${i + 1}`,
            line: { color: colors[i % colors.length], width: 6 },
            marker: { size: 6 }
        });
    });

    const layout = {
        title: { text: 'Vector Visualization', font: { color: '#e2e8f0' } },
        scene: {
            xaxis: { title: 'x', gridcolor: '#334155', backgroundcolor: '#0f172a' },
            yaxis: { title: 'y', gridcolor: '#334155', backgroundcolor: '#0f172a' },
            zaxis: { title: 'z', gridcolor: '#334155', backgroundcolor: '#0f172a' }
        },
        paper_bgcolor: '#1e293b',
        plot_bgcolor: '#0f172a',
        font: { color: '#e2e8f0' },
        showlegend: true
    };

    Plotly.newPlot(div, traces, layout, { responsive: true });
}

// ========================================
// MODE 3: Check 8 Axioms
// ========================================
function initializeAxiomMode() {
    document.getElementById('spaceType').addEventListener('change', updateAxiomConfig);
    document.getElementById('axiomDimension').addEventListener('change', updateAxiomVectorInputs);
    document.getElementById('checkAxioms').addEventListener('click', checkAllAxioms);
    document.getElementById('randomAxiomVectors').addEventListener('click', generateRandomAxiomVectors);
    updateAxiomVectorInputs();
}

function updateAxiomConfig() {
    const spaceType = document.getElementById('spaceType').value;
    document.getElementById('rnConfig').style.display = spaceType === 'rn' ? 'block' : 'none';
    document.getElementById('customConfig').style.display = spaceType === 'custom' ? 'block' : 'none';
}

function updateAxiomVectorInputs() {
    const dimension = parseInt(document.getElementById('axiomDimension').value);
    const container = document.getElementById('axiomVectorInputs');

    let html = '<div class="vector-input-container">';

    // We need 3 vectors for testing (u, v, w)
    const vectorNames = ['u', 'v', 'w'];
    const labels = ['x', 'y', 'z', 'w'];

    for (let i = 0; i < 3; i++) {
        html += `<div class="vector-input-row">
            <h4>Vector ${vectorNames[i]}</h4>
            <div class="vector-components">`;

        for (let j = 0; j < dimension; j++) {
            html += `<input type="number" id="axiom_${vectorNames[i]}_${j}" placeholder="${labels[j]}" value="0" step="any">`;
            if (j < dimension - 1) html += '<span>,</span>';
        }

        html += `</div></div>`;
    }

    html += '</div>';
    container.innerHTML = html;
}

function generateRandomAxiomVectors() {
    const dimension = parseInt(document.getElementById('axiomDimension').value);
    const vectorNames = ['u', 'v', 'w'];

    // Generate random integers between -5 and 5
    const randomValue = () => Math.floor(Math.random() * 11) - 5;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < dimension; j++) {
            const input = document.getElementById(`axiom_${vectorNames[i]}_${j}`);
            if (input) {
                input.value = randomValue();
            }
        }
    }
}

function checkAllAxioms() {
    const dimension = parseInt(document.getElementById('axiomDimension').value);
    const vectorNames = ['u', 'v', 'w'];

    // Read vectors
    const vectors = {};
    for (let i = 0; i < 3; i++) {
        const vector = [];
        for (let j = 0; j < dimension; j++) {
            const val = parseFloat(document.getElementById(`axiom_${vectorNames[i]}_${j}`).value) || 0;
            vector.push(val);
        }
        vectors[vectorNames[i]] = vector;
    }

    // Perform all 8 axiom checks
    const results = verifyAllAxioms(vectors.u, vectors.v, vectors.w, dimension);
    displayAxiomResults(results, vectors, dimension);
}

function verifyAllAxioms(u, v, w, dimension) {
    const axioms = [];
    const tolerance = 1e-10;

    // Helper function to add vectors
    const addVectors = (a, b) => a.map((val, i) => val + b[i]);

    // Helper function to scale vector
    const scaleVector = (c, vec) => vec.map(val => c * val);

    // Helper function to check vector equality
    const vectorsEqual = (a, b) => a.every((val, i) => Math.abs(val - b[i]) < tolerance);

    // Helper function to check if vector is in Rn (always true for standard operations)
    const isInSpace = (vec) => vec.length === dimension && vec.every(val => isFinite(val));

    // Axiom 1: Closure under Addition (u + v ∈ V)
    const sum_uv = addVectors(u, v);
    axioms.push({
        number: 1,
        name: 'Closure under Addition',
        formula: 'u + v ∈ V',
        passed: isInSpace(sum_uv),
        explanation: `u + v = ${vectorToString(sum_uv)}`,
        detail: isInSpace(sum_uv) ? 'Result is in ℝⁿ ✓' : 'Result is not in ℝⁿ ✗'
    });

    // Axiom 2: Commutativity (u + v = v + u)
    const sum_vu = addVectors(v, u);
    const commutative = vectorsEqual(sum_uv, sum_vu);
    axioms.push({
        number: 2,
        name: 'Commutativity',
        formula: 'u + v = v + u',
        passed: commutative,
        explanation: `u + v = ${vectorToString(sum_uv)}\nv + u = ${vectorToString(sum_vu)}`,
        detail: commutative ? 'Both sums are equal ✓' : 'Sums are not equal ✗'
    });

    // Axiom 3: Associativity of Addition ((u + v) + w = u + (v + w))
    const left = addVectors(addVectors(u, v), w);
    const right = addVectors(u, addVectors(v, w));
    const associative = vectorsEqual(left, right);
    axioms.push({
        number: 3,
        name: 'Associativity of Addition',
        formula: '(u + v) + w = u + (v + w)',
        passed: associative,
        explanation: `(u + v) + w = ${vectorToString(left)}\nu + (v + w) = ${vectorToString(right)}`,
        detail: associative ? 'Both are equal ✓' : 'Not equal ✗'
    });

    // Axiom 4: Zero Vector (∃ 0 : u + 0 = u)
    const zero = new Array(dimension).fill(0);
    const u_plus_zero = addVectors(u, zero);
    const hasZero = vectorsEqual(u, u_plus_zero);
    axioms.push({
        number: 4,
        name: 'Zero Vector',
        formula: '∃ 0 : u + 0 = u',
        passed: hasZero,
        explanation: `Zero vector: ${vectorToString(zero)}\nu + 0 = ${vectorToString(u_plus_zero)}\nOriginal u = ${vectorToString(u)}`,
        detail: hasZero ? 'Zero vector exists and works correctly ✓' : 'Zero vector property fails ✗'
    });

    // Axiom 5: Additive Inverse (∃ -u : u + (-u) = 0)
    const neg_u = scaleVector(-1, u);
    const u_plus_neg_u = addVectors(u, neg_u);
    const hasInverse = vectorsEqual(u_plus_neg_u, zero);
    axioms.push({
        number: 5,
        name: 'Additive Inverse',
        formula: '∃ -u : u + (-u) = 0',
        passed: hasInverse,
        explanation: `-u = ${vectorToString(neg_u)}\nu + (-u) = ${vectorToString(u_plus_neg_u)}`,
        detail: hasInverse ? 'Additive inverse exists ✓' : 'Additive inverse fails ✗'
    });

    // Axiom 6: Closure under Scalar Multiplication (c·u ∈ V)
    const c = 2.5;
    const cu = scaleVector(c, u);
    const closureScalar = isInSpace(cu);
    axioms.push({
        number: 6,
        name: 'Closure under Scalar Multiplication',
        formula: 'c·u ∈ V',
        passed: closureScalar,
        explanation: `Scalar c = ${c}\nc·u = ${vectorToString(cu)}`,
        detail: closureScalar ? 'Result is in ℝⁿ ✓' : 'Result is not in ℝⁿ ✗'
    });

    // Axiom 7: Distributivity (c(u + v) = cu + cv)
    const c_uv = scaleVector(c, sum_uv);
    const cu_cv = addVectors(scaleVector(c, u), scaleVector(c, v));
    const distributive = vectorsEqual(c_uv, cu_cv);
    axioms.push({
        number: 7,
        name: 'Distributivity',
        formula: 'c(u + v) = c·u + c·v',
        passed: distributive,
        explanation: `c(u + v) = ${vectorToString(c_uv)}\nc·u + c·v = ${vectorToString(cu_cv)}`,
        detail: distributive ? 'Distributive property holds ✓' : 'Distributive property fails ✗'
    });

    // Axiom 8: Scalar Identity (1·u = u)
    const one_u = scaleVector(1, u);
    const scalarIdentity = vectorsEqual(one_u, u);
    axioms.push({
        number: 8,
        name: 'Scalar Identity',
        formula: '1·u = u',
        passed: scalarIdentity,
        explanation: `1·u = ${vectorToString(one_u)}\nOriginal u = ${vectorToString(u)}`,
        detail: scalarIdentity ? 'Scalar identity holds ✓' : 'Scalar identity fails ✗'
    });

    const allPassed = axioms.every(axiom => axiom.passed);

    return {
        axioms: axioms,
        allPassed: allPassed,
        passedCount: axioms.filter(a => a.passed).length,
        totalCount: axioms.length
    };
}

function displayAxiomResults(results, vectors, dimension) {
    const resultDiv = document.getElementById('axiomResult');
    const vizDiv = document.getElementById('axiomVisualization');

    let html = '';

    // Main result
    if (results.allPassed) {
        html += `<div class="result-box success">
            <h3>✅ This IS a Vector Space!</h3>
            <p>All ${results.totalCount} axioms are satisfied. The set ℝ${dimension} with standard addition and scalar multiplication forms a valid vector space.</p>
        </div>`;
    } else {
        html += `<div class="result-box error">
            <h3>❌ This is NOT a Vector Space</h3>
            <p>Failed ${results.totalCount - results.passedCount} out of ${results.totalCount} axioms. All 8 axioms must be satisfied for a vector space.</p>
        </div>`;
    }

    // Test vectors used
    html += `<div class="result-box info">
        <h3>📊 Test Vectors Used</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 10px;">
            <div>
                <strong>Vector u:</strong> ${vectorToString(vectors.u)}
            </div>
            <div>
                <strong>Vector v:</strong> ${vectorToString(vectors.v)}
            </div>
            <div>
                <strong>Vector w:</strong> ${vectorToString(vectors.w)}
            </div>
        </div>
    </div>`;

    // Individual axiom results
    html += '<div class="result-box info"><h3>📋 Individual Axiom Verification</h3>';
    html += '<div class="axiom-results">';

    results.axioms.forEach(axiom => {
        const icon = axiom.passed ? '✅' : '❌';
        const statusClass = axiom.passed ? 'success' : 'error';
        html += `
            <div class="axiom-check-item">
                <div class="axiom-header">
                    <span class="check-icon" style="font-size: 1.5em;">${icon}</span>
                    <div>
                        <strong>Axiom ${axiom.number}: ${axiom.name}</strong>
                        <div class="formula" style="margin: 5px 0; color: #818cf8; font-size: 1.1em;">${axiom.formula}</div>
                    </div>
                </div>
                <p style="white-space: pre-line; margin: 10px 0; color: #cbd5e1;">${axiom.explanation}</p>
                <p class="${statusClass}" style="font-weight: bold; margin-top: 5px;">${axiom.detail}</p>
            </div>
        `;
    });

    html += '</div></div>';

    resultDiv.innerHTML = html;

    // Show visualization
    vizDiv.style.display = 'block';
    visualizeAxiomResults(results);

    // Scroll to result
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function visualizeAxiomResults(results) {
    const chartDiv = document.getElementById('axiomChart');

    const axiomNames = results.axioms.map(a => `${a.number}. ${a.name}`);
    const axiomStatus = results.axioms.map(a => a.passed ? 1 : 0);
    const colors = results.axioms.map(a => a.passed ? '#10b981' : '#ef4444');

    const trace = {
        x: axiomNames,
        y: axiomStatus,
        type: 'bar',
        marker: {
            color: colors,
            line: {
                color: colors.map(c => c === '#10b981' ? '#059669' : '#dc2626'),
                width: 2
            }
        },
        text: axiomStatus.map(s => s === 1 ? '✓ PASSED' : '✗ FAILED'),
        textposition: 'outside',
        textfont: {
            size: 14,
            color: '#e2e8f0'
        },
        hovertemplate: '<b>%{x}</b><br>Status: %{text}<extra></extra>'
    };

    const layout = {
        title: {
            text: `Vector Space Axioms: ${results.passedCount}/${results.totalCount} Passed`,
            font: { color: '#e2e8f0', size: 20 }
        },
        xaxis: {
            title: '',
            tickangle: -45,
            tickfont: { size: 10, color: '#cbd5e1' },
            gridcolor: '#334155'
        },
        yaxis: {
            title: 'Status',
            tickvals: [0, 1],
            ticktext: ['Failed', 'Passed'],
            gridcolor: '#334155',
            range: [-0.1, 1.3],
            font: { color: '#e2e8f0' }
        },
        paper_bgcolor: '#1e293b',
        plot_bgcolor: '#0f172a',
        font: { color: '#e2e8f0' },
        margin: { b: 150, t: 80 },
        showlegend: false
    };

    Plotly.newPlot(chartDiv, [trace], layout, { responsive: true });
}

// ========================================
// MODE 4: Interactive Learning
// ========================================
function initializeLearningMode() {
    // Sections are collapsed by default
}

function toggleSection(index) {
    const sections = document.querySelectorAll('.learning-section');
    const section = sections[index];
    section.classList.toggle('active');
}

function showAnswer(problemId) {
    const answerBox = document.getElementById(`answer${problemId}`);
    if (answerBox.style.display === 'none') {
        answerBox.style.display = 'block';
    } else {
        answerBox.style.display = 'none';
    }
}

// ========================================
// Example Loaders
// ========================================
function loadEquationExample(exampleNum) {
    const dim = document.getElementById('equationDimension');

    if (exampleNum === 1) {
        // x + y + z = 0 (3D subspace)
        dim.value = '3';
        updateEquationInputs();
        document.getElementById('eq3d_a').value = '1';
        document.getElementById('eq3d_b').value = '1';
        document.getElementById('eq3d_c').value = '1';
        document.getElementById('eq3d_d').value = '0';
    } else if (exampleNum === 2) {
        // x = 2y => x - 2y = 0 (2D subspace)
        dim.value = '2';
        updateEquationInputs();
        document.getElementById('eq2d_a').value = '1';
        document.getElementById('eq2d_b').value = '-2';
        document.getElementById('eq2d_c').value = '0';
    } else if (exampleNum === 3) {
        // x + y = 1 (NOT a subspace)
        dim.value = '2';
        updateEquationInputs();
        document.getElementById('eq2d_a').value = '1';
        document.getElementById('eq2d_b').value = '1';
        document.getElementById('eq2d_c').value = '1';
    }
}

function loadVectorExample(exampleNum) {
    const dim = document.getElementById('vectorDimension');
    const count = document.getElementById('vectorCount');

    if (exampleNum === 1) {
        // Independent vectors in R3
        dim.value = '3';
        count.value = '2';
        updateVectorInputs();
        document.getElementById('v0_0').value = '1';
        document.getElementById('v0_1').value = '0';
        document.getElementById('v0_2').value = '1';
        document.getElementById('v1_0').value = '0';
        document.getElementById('v1_1').value = '1';
        document.getElementById('v1_2').value = '1';
    } else if (exampleNum === 2) {
        // Dependent vectors
        dim.value = '3';
        count.value = '2';
        updateVectorInputs();
        document.getElementById('v0_0').value = '1';
        document.getElementById('v0_1').value = '2';
        document.getElementById('v0_2').value = '3';
        document.getElementById('v1_0').value = '2';
        document.getElementById('v1_1').value = '4';
        document.getElementById('v1_2').value = '6';
    } else if (exampleNum === 3) {
        // Basis for R3
        dim.value = '3';
        count.value = '3';
        updateVectorInputs();
        document.getElementById('v0_0').value = '1';
        document.getElementById('v0_1').value = '0';
        document.getElementById('v0_2').value = '0';
        document.getElementById('v1_0').value = '0';
        document.getElementById('v1_1').value = '1';
        document.getElementById('v1_2').value = '0';
        document.getElementById('v2_0').value = '0';
        document.getElementById('v2_1').value = '0';
        document.getElementById('v2_2').value = '1';
    }
}

function loadAxiomExample(exampleNum) {
    const dim = document.getElementById('axiomDimension');

    if (exampleNum === 1) {
        // Standard R3 vectors
        dim.value = '3';
        updateAxiomVectorInputs();
        document.getElementById('axiom_u_0').value = '1';
        document.getElementById('axiom_u_1').value = '2';
        document.getElementById('axiom_u_2').value = '3';
        document.getElementById('axiom_v_0').value = '4';
        document.getElementById('axiom_v_1').value = '5';
        document.getElementById('axiom_v_2').value = '6';
        document.getElementById('axiom_w_0').value = '7';
        document.getElementById('axiom_w_1').value = '8';
        document.getElementById('axiom_w_2').value = '9';
    } else if (exampleNum === 2) {
        // R2 test
        dim.value = '2';
        updateAxiomVectorInputs();
        document.getElementById('axiom_u_0').value = '3';
        document.getElementById('axiom_u_1').value = '4';
        document.getElementById('axiom_v_0').value = '-1';
        document.getElementById('axiom_v_1').value = '2';
        document.getElementById('axiom_w_0').value = '5';
        document.getElementById('axiom_w_1').value = '-3';
    } else if (exampleNum === 3) {
        // Zero vectors
        dim.value = '3';
        updateAxiomVectorInputs();
        document.getElementById('axiom_u_0').value = '0';
        document.getElementById('axiom_u_1').value = '0';
        document.getElementById('axiom_u_2').value = '0';
        document.getElementById('axiom_v_0').value = '1';
        document.getElementById('axiom_v_1').value = '1';
        document.getElementById('axiom_v_2').value = '1';
        document.getElementById('axiom_w_0').value = '-2';
        document.getElementById('axiom_w_1').value = '3';
        document.getElementById('axiom_w_2').value = '1';
    }
}

// ============================================
// Theme Toggle Functions
// ============================================

function toggleTheme() {
    const body = document.body;
    const themeToggleBtn = document.getElementById('themeToggle');
    
    // Toggle dark mode class
    body.classList.toggle('dark-mode');
    
    // Check if dark mode is active
    const isDarkMode = body.classList.contains('dark-mode');
    
    // Update button text and icon
    if (isDarkMode) {
        themeToggleBtn.innerHTML = ' Light Mode';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggleBtn.innerHTML = ' Dark Mode';
        localStorage.setItem('theme', 'light');
    }
}

// Load saved theme on page load
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    const themeToggleBtn = document.getElementById('themeToggle');
    
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        if (themeToggleBtn) {
            themeToggleBtn.innerHTML = ' Light Mode';
        }
    } else {
        body.classList.remove('dark-mode');
        if (themeToggleBtn) {
            themeToggleBtn.innerHTML = ' Dark Mode';
        }
    }
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', loadTheme);
