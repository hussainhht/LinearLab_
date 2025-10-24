// Linear Algebra Learning Platform - Interactive Slides
// Author: Dr. Hussain Ali

// ============================================
// Determinant Calculator Functions
// ============================================

// 2x2 Determinant Calculator
function calculate2x2Det() {
    // Support multiple ID formats for different pages
    const a = parseFloat(document.getElementById('a_2x2')?.value || document.getElementById('a11_2x2')?.value) || 0;
    const b = parseFloat(document.getElementById('b_2x2')?.value || document.getElementById('a12_2x2')?.value) || 0;
    const c = parseFloat(document.getElementById('c_2x2')?.value || document.getElementById('a21_2x2')?.value) || 0;
    const d = parseFloat(document.getElementById('d_2x2')?.value || document.getElementById('a22_2x2')?.value) || 0;
    const det = a * d - b * c;
    const resultDiv = document.getElementById('result2x2Det') || document.getElementById('result2x2');
    if (resultDiv) {
        resultDiv.innerHTML = `
            <h4>Calculation Steps:</h4>
            <p>Matrix A = [[${a}, ${b}], [${c}, ${d}]]</p>
            <p>det(A) = (${a})(${d}) - (${b})(${c})</p>
            <p>det(A) = ${a * d} - ${b * c}</p>
            <p class="final-result"><strong>det(A) = ${det}</strong></p>
            ${det !== 0 ? '<p class="success">✅ Matrix is invertible!</p>' : '<p class="warning">⚠️ Matrix is NOT invertible (singular matrix)</p>'}
        `;
    }
}

// 3x3 Determinant Calculator (Sarrus Rule)
function calculate3x3Det() {
    // Support multiple ID formats
    const a11 = parseFloat(document.getElementById('a11_3x3')?.value || document.getElementById('b11')?.value) || 0;
    const a12 = parseFloat(document.getElementById('a12_3x3')?.value || document.getElementById('b12')?.value) || 0;
    const a13 = parseFloat(document.getElementById('a13_3x3')?.value || document.getElementById('b13')?.value) || 0;
    const a21 = parseFloat(document.getElementById('a21_3x3')?.value || document.getElementById('b21')?.value) || 0;
    const a22 = parseFloat(document.getElementById('a22_3x3')?.value || document.getElementById('b22')?.value) || 0;
    const a23 = parseFloat(document.getElementById('a23_3x3')?.value || document.getElementById('b23')?.value) || 0;
    const a31 = parseFloat(document.getElementById('a31_3x3')?.value || document.getElementById('b31')?.value) || 0;
    const a32 = parseFloat(document.getElementById('a32_3x3')?.value || document.getElementById('b32')?.value) || 0;
    const a33 = parseFloat(document.getElementById('a33_3x3')?.value || document.getElementById('b33')?.value) || 0;

    const term1 = a11 * (a22 * a33 - a23 * a32);
    const term2 = a12 * (a21 * a33 - a23 * a31);
    const term3 = a13 * (a21 * a32 - a22 * a31);
    const det = term1 - term2 + term3;

    const resultDiv = document.getElementById('result3x3Det') || document.getElementById('result3x3');
    if (resultDiv) {
        resultDiv.innerHTML = `
            <h4>Calculation Steps:</h4>
            <p>Matrix A = [[${a11}, ${a12}, ${a13}], [${a21}, ${a22}, ${a23}], [${a31}, ${a32}, ${a33}]]</p>
            <p>det(A) = ${a11}(${a22}×${a33} - ${a23}×${a32}) - ${a12}(${a21}×${a33} - ${a23}×${a31}) + ${a13}(${a21}×${a32} - ${a22}×${a31})</p>
            <p>det(A) = ${a11}(${a22 * a33 - a23 * a32}) - ${a12}(${a21 * a33 - a23 * a31}) + ${a13}(${a21 * a32 - a22 * a31})</p>
            <p>det(A) = ${term1} - ${term2} + ${term3}</p>
            <p class="final-result"><strong>det(A) = ${det}</strong></p>
            ${det !== 0 ? '<p class="success">✅ Matrix is invertible!</p>' : '<p class="warning">⚠️ Matrix is NOT invertible (singular matrix)</p>'}
        `;
    }
}

// ============================================
// Cramer's Rule Solvers
// ============================================

// 2x2 Cramer's Rule Solver
function solveCramers2x2() {
    // Support multiple ID formats
    const a1 = parseFloat(document.getElementById('a_2x2_cramers')?.value || document.getElementById('a1')?.value) || 0;
    const b1 = parseFloat(document.getElementById('b_2x2_cramers')?.value || document.getElementById('b1')?.value) || 0;
    const c1 = parseFloat(document.getElementById('e_2x2_cramers')?.value || document.getElementById('c1')?.value) || 0;
    const a2 = parseFloat(document.getElementById('c_2x2_cramers')?.value || document.getElementById('a2')?.value) || 0;
    const b2 = parseFloat(document.getElementById('d_2x2_cramers')?.value || document.getElementById('b2')?.value) || 0;
    const c2 = parseFloat(document.getElementById('f_2x2_cramers')?.value || document.getElementById('c2')?.value) || 0;

    const detA = a1 * b2 - a2 * b1;
    const resultDiv = document.getElementById('result2x2Cramers');
    if (!resultDiv) return;
    if (Math.abs(detA) < 1e-10) {
        resultDiv.innerHTML = `
            <p class="warning">⚠️ det(A) = 0</p>
            <p>Cramer's Rule cannot be used. The system either has no solution or infinitely many solutions.</p>
        `;
        return;
    }
    const detAx = c1 * b2 - c2 * b1;
    const detAy = a1 * c2 - a2 * c1;
    const x = detAx / detA;
    const y = detAy / detA;
    resultDiv.innerHTML = `
        <h4>Solution Steps:</h4>
        <p><strong>Coefficient Matrix A:</strong> [[${a1}, ${b1}], [${a2}, ${b2}]]</p>
        <p><strong>Step 1:</strong> det(A) = ${a1}×${b2} - ${a2}×${b1} = ${detA}</p>
        <p><strong>Step 2:</strong> det(Aₓ) = ${detAx} → x = ${x.toFixed(4)}</p>
        <p><strong>Step 3:</strong> det(Aᵧ) = ${detAy} → y = ${y.toFixed(4)}</p>
        <p class="final-result success">✅ <strong>Solution: x = ${x.toFixed(4)}, y = ${y.toFixed(4)}</strong></p>
    `;
}

// 3x3 Cramer's Rule Solver
function solveCramers3x3() {
    const a11 = parseFloat(document.getElementById('a11_3x3')?.value) || 0;
    const a12 = parseFloat(document.getElementById('a12_3x3')?.value) || 0;
    const a13 = parseFloat(document.getElementById('a13_3x3')?.value) || 0;
    const a21 = parseFloat(document.getElementById('a21_3x3')?.value) || 0;
    const a22 = parseFloat(document.getElementById('a22_3x3')?.value) || 0;
    const a23 = parseFloat(document.getElementById('a23_3x3')?.value) || 0;
    const a31 = parseFloat(document.getElementById('a31_3x3')?.value) || 0;
    const a32 = parseFloat(document.getElementById('a32_3x3')?.value) || 0;
    const a33 = parseFloat(document.getElementById('a33_3x3')?.value) || 0;
    const d1 = parseFloat(document.getElementById('d1_3x3')?.value) || 0;
    const d2 = parseFloat(document.getElementById('d2_3x3')?.value) || 0;
    const d3 = parseFloat(document.getElementById('d3_3x3')?.value) || 0;

    const detA = a11 * (a22 * a33 - a23 * a32) - a12 * (a21 * a33 - a23 * a31) + a13 * (a21 * a32 - a22 * a31);
    const resultDiv = document.getElementById('result3x3Cramers');
    if (!resultDiv) return;
    if (Math.abs(detA) < 1e-10) {
        resultDiv.innerHTML = `
            <p class="warning">⚠️ det(A) = 0</p>
            <p>Cramer's Rule cannot be used. The system either has no solution or infinitely many solutions.</p>
        `;
        return;
    }
    const detAx = d1 * (a22 * a33 - a23 * a32) - a12 * (d2 * a33 - a23 * d3) + a13 * (d2 * a32 - a22 * d3);
    const detAy = a11 * (d2 * a33 - a23 * d3) - d1 * (a21 * a33 - a23 * a31) + a13 * (a21 * d3 - d2 * a31);
    const detAz = a11 * (a22 * d3 - d2 * a32) - a12 * (a21 * d3 - d2 * a31) + d1 * (a21 * a32 - a22 * a31);
    const x = detAx / detA;
    const y = detAy / detA;
    const z = detAz / detA;
    resultDiv.innerHTML = `
        <h4>Solution Steps:</h4>
        <p><strong>Step 1:</strong> det(A) = ${detA.toFixed(4)}</p>
        <p><strong>Step 2:</strong> det(Aₓ) = ${detAx.toFixed(4)} → x = ${x.toFixed(4)}</p>
        <p><strong>Step 3:</strong> det(Aᵧ) = ${detAy.toFixed(4)} → y = ${y.toFixed(4)}</p>
        <p><strong>Step 4:</strong> det(A_z) = ${detAz.toFixed(4)} → z = ${z.toFixed(4)}</p>
        <p class="final-result success">✅ <strong>Solution:</strong> x = ${x.toFixed(4)}, y = ${y.toFixed(4)}, z = ${z.toFixed(4)}</p>
    `;
}

// Initialize calculators if their elements are present
window.addEventListener('load', () => {
    try { calculate2x2Det(); } catch (e) { }
    try { calculate3x3Det(); } catch (e) { }
    try { solveCramers2x2(); } catch (e) { }
    try { solveCramers3x3(); } catch (e) { }
});

// ============================================
// Matrix Solution Type Checker
// ============================================

function checkSolutionType() {
    // Get input values
    const a1 = parseFloat(document.getElementById('checker_a1').value) || 0;
    const b1 = parseFloat(document.getElementById('checker_b1').value) || 0;
    const c1 = parseFloat(document.getElementById('checker_c1').value) || 0;
    const a2 = parseFloat(document.getElementById('checker_a2').value) || 0;
    const b2 = parseFloat(document.getElementById('checker_b2').value) || 0;
    const c2 = parseFloat(document.getElementById('checker_c2').value) || 0;

    const resultDiv = document.getElementById('checkerResult');

    // Calculate determinant of coefficient matrix
    const det = a1 * b2 - a2 * b1;

    // Build the system display
    const systemDisplay = `
        <div style="background: rgba(99, 102, 241, 0.1); padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <h4 style="margin-bottom: 10px;">Your System:</h4>
            <div style="font-size: 1.1rem;">
                ${a1}x ${b1 >= 0 ? '+' : ''} ${b1}y = ${c1}<br>
                ${a2}x ${b2 >= 0 ? '+' : ''} ${b2}y = ${c2}
            </div>
        </div>
    `;

    let resultHTML = systemDisplay;
    let resultType = '';

    // Tolerance for floating point comparison
    const epsilon = 1e-10;

    if (Math.abs(det) > epsilon) {
        // Unique solution - determinant is non-zero
        const x = (c1 * b2 - c2 * b1) / det;
        const y = (a1 * c2 - a2 * c1) / det;

        resultType = 'unique';
        resultHTML += `
            <div style="background: rgba(52, 211, 153, 0.2); border-left: 4px solid var(--success-color); padding: 20px; border-radius: 8px;">
                <h3 style="color: var(--success-color); margin-bottom: 15px;">✅ UNIQUE SOLUTION</h3>
                <p style="font-size: 1.1rem; margin-bottom: 15px;"><strong>The system has exactly one solution!</strong></p>
                
                <div style="background: rgba(52, 211, 153, 0.1); padding: 15px; border-radius: 5px; margin: 15px 0;">
                    <h4>📊 Solution:</h4>
                    <p style="font-size: 1.2rem; font-weight: 700; color: var(--success-color);">
                        x = ${x.toFixed(4)}<br>
                        y = ${y.toFixed(4)}
                    </p>
                </div>
                
                <div style="margin-top: 15px;">
                    <h4>🔍 Analysis:</h4>
                    <ul style="line-height: 1.8;">
                        <li><strong>Determinant:</strong> ${det.toFixed(4)} ≠ 0</li>
                        <li><strong>Geometric meaning:</strong> The two lines intersect at exactly one point</li>
                        <li><strong>Matrix form:</strong> The coefficient matrix is invertible</li>
                        <li><strong>System type:</strong> Consistent and Independent</li>
                    </ul>
                </div>
            </div>
        `;
    } else {
        // Determinant is zero - check if lines are identical or parallel
        // Lines are identical if they are proportional INCLUDING the constant term
        // Check if a1/a2 = b1/b2 = c1/c2 (handling zero cases)

        let isIdentical = false;

        // Check if all coefficients are zero (degenerate case)
        if (Math.abs(a1) < epsilon && Math.abs(b1) < epsilon &&
            Math.abs(a2) < epsilon && Math.abs(b2) < epsilon) {
            // Both equations are 0 = c
            if (Math.abs(c1) < epsilon && Math.abs(c2) < epsilon) {
                isIdentical = true; // 0 = 0, trivial case
            } else {
                isIdentical = false; // 0 = non-zero, impossible
            }
        } else {
            // Check proportionality
            let ratio = null;

            // Find a non-zero coefficient to establish ratio
            if (Math.abs(a2) > epsilon) {
                ratio = a1 / a2;
                isIdentical = (Math.abs(b1 - ratio * b2) < epsilon) &&
                    (Math.abs(c1 - ratio * c2) < epsilon);
            } else if (Math.abs(b2) > epsilon) {
                ratio = b1 / b2;
                isIdentical = (Math.abs(a1 - ratio * a2) < epsilon) &&
                    (Math.abs(c1 - ratio * c2) < epsilon);
            } else if (Math.abs(a1) > epsilon) {
                // a2 = 0, b2 = 0, but a1 != 0
                isIdentical = (Math.abs(a2) < epsilon) &&
                    (Math.abs(b2) < epsilon) &&
                    (Math.abs(c2) < epsilon);
            } else if (Math.abs(b1) > epsilon) {
                // a1 = 0, a2 = 0, b2 = 0, but b1 != 0
                isIdentical = (Math.abs(a2) < epsilon) &&
                    (Math.abs(b2) < epsilon) &&
                    (Math.abs(c2) < epsilon);
            }
        }

        if (isIdentical) {
            // Infinite solutions
            resultType = 'infinite';
            resultHTML += `
                <div style="background: rgba(251, 191, 36, 0.2); border-left: 4px solid var(--pivot-color); padding: 20px; border-radius: 8px;">
                    <h3 style="color: var(--pivot-color); margin-bottom: 15px;">∞ INFINITE SOLUTIONS</h3>
                    <p style="font-size: 1.1rem; margin-bottom: 15px;"><strong>The system has infinitely many solutions!</strong></p>
                    
                    <div style="background: rgba(251, 191, 36, 0.1); padding: 15px; border-radius: 5px; margin: 15px 0;">
                        <h4>📊 Solution Set:</h4>
                        <p>The equations represent the <strong>same line</strong>. Any point on this line is a solution.</p>
                        <p style="margin-top: 10px;"><strong>Parametric form:</strong></p>
                        <p style="font-size: 1.1rem; margin-top: 10px;">
                            ${Math.abs(b1) > epsilon ?
                    `x = t, y = ${((c1 - a1) / b1).toFixed(4)} ${(a1 / b1) >= 0 ? '-' : '+'} ${Math.abs(a1 / b1).toFixed(4)}t` :
                    Math.abs(a1) > epsilon ?
                        `y = t, x = ${(c1 / a1).toFixed(4)}` :
                        `All points satisfy the system`
                }
                        </p>
                        <p style="margin-top: 5px; font-style: italic;">where t is any real number</p>
                    </div>
                    
                    <div style="margin-top: 15px;">
                        <h4>🔍 Analysis:</h4>
                        <ul style="line-height: 1.8;">
                            <li><strong>Determinant:</strong> ${det.toFixed(4)} = 0</li>
                            <li><strong>Geometric meaning:</strong> Both equations describe the same line</li>
                            <li><strong>Relationship:</strong> Second equation is a multiple of the first</li>
                            <li><strong>System type:</strong> Consistent and Dependent</li>
                        </ul>
                    </div>
                </div>
            `;
        } else {
            // No solution
            resultType = 'none';
            resultHTML += `
                <div style="background: rgba(239, 68, 68, 0.2); border-left: 4px solid var(--error-color); padding: 20px; border-radius: 8px;">
                    <h3 style="color: var(--error-color); margin-bottom: 15px;">❌ NO SOLUTION</h3>
                    <p style="font-size: 1.1rem; margin-bottom: 15px;"><strong>The system has no solution!</strong></p>
                    
                    <div style="background: rgba(239, 68, 68, 0.1); padding: 15px; border-radius: 5px; margin: 15px 0;">
                        <h4>📊 Analysis:</h4>
                        <p>The equations represent <strong>parallel lines</strong> that never intersect.</p>
                        <p style="margin-top: 10px;">They have the same slope but different y-intercepts.</p>
                    </div>
                    
                    <div style="margin-top: 15px;">
                        <h4>🔍 Details:</h4>
                        <ul style="line-height: 1.8;">
                            <li><strong>Determinant:</strong> ${det.toFixed(4)} = 0</li>
                            <li><strong>Geometric meaning:</strong> Parallel lines never meet</li>
                            <li><strong>Relationship:</strong> Same slope, different intercepts</li>
                            <li><strong>System type:</strong> Inconsistent</li>
                        </ul>
                    </div>
                    
                    <div style="background: rgba(239, 68, 68, 0.15); padding: 12px; border-radius: 5px; margin-top: 15px;">
                        <p style="font-weight: 600;">💡 Why no solution?</p>
                        <p>The slopes are equal (coefficients are proportional), but the constants are not. This means the lines run parallel to each other but are separated, so they can never intersect.</p>
                    </div>
                </div>
            `;
        }
    }

    // Show result with animation
    resultDiv.innerHTML = resultHTML;
    resultDiv.style.display = 'block';
    resultDiv.style.animation = 'fadeIn 0.5s ease-in';

    // Generate and display graph
    generateSolutionGraph(a1, b1, c1, a2, b2, c2, resultType, det > epsilon ? { x: (c1 * b2 - c2 * b1) / det, y: (a1 * c2 - a2 * c1) / det } : null);

    // Scroll to result
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Generate interactive graph for the system
function generateSolutionGraph(a1, b1, c1, a2, b2, c2, resultType, solution) {
    const graphContainer = document.getElementById('checkerGraphContainer');
    const graphDiv = document.getElementById('checkerGraph');

    if (!graphContainer || !graphDiv) return;

    // Show graph container
    graphContainer.style.display = 'block';
    graphContainer.style.animation = 'fadeIn 0.5s ease-in';

    // Calculate x range for plotting
    let xMin = -5, xMax = 5;

    // Adjust range based on solution if it exists
    if (solution) {
        xMin = Math.min(-5, solution.x - 3);
        xMax = Math.max(5, solution.x + 3);
    }

    // Generate x values for plotting
    const xValues = [];
    for (let x = xMin; x <= xMax; x += 0.1) {
        xValues.push(x);
    }

    // Calculate y values for both lines
    // Line 1: a1*x + b1*y = c1  =>  y = (c1 - a1*x) / b1
    // Line 2: a2*x + b2*y = c2  =>  y = (c2 - a2*x) / b2

    const epsilon = 1e-10;

    // Prepare traces for Plotly
    const traces = [];

    // Line 1
    if (Math.abs(b1) > epsilon) {
        const y1Values = xValues.map(x => (c1 - a1 * x) / b1);
        traces.push({
            x: xValues,
            y: y1Values,
            mode: 'lines',
            name: `${a1}x + ${b1}y = ${c1}`,
            line: {
                color: '#3b82f6',
                width: 3
            }
        });
    } else if (Math.abs(a1) > epsilon) {
        // Vertical line: x = c1/a1
        const xConst = c1 / a1;
        traces.push({
            x: [xConst, xConst],
            y: [xMin, xMax],
            mode: 'lines',
            name: `${a1}x = ${c1}`,
            line: {
                color: '#3b82f6',
                width: 3
            }
        });
    }

    // Line 2 (use different color/style based on result type)
    let line2Color = '#8b5cf6';
    let line2Dash = 'solid';

    if (resultType === 'infinite') {
        line2Color = '#f59e0b'; // Same line, use orange and dashed to show overlap
        line2Dash = 'dash';
    } else if (resultType === 'none') {
        line2Color = '#ef4444'; // Parallel, use red and dashed
        line2Dash = 'dash';
    }

    if (Math.abs(b2) > epsilon) {
        const y2Values = xValues.map(x => (c2 - a2 * x) / b2);
        traces.push({
            x: xValues,
            y: y2Values,
            mode: 'lines',
            name: `${a2}x + ${b2}y = ${c2}`,
            line: {
                color: line2Color,
                width: 3,
                dash: line2Dash
            }
        });
    } else if (Math.abs(a2) > epsilon) {
        // Vertical line: x = c2/a2
        const xConst = c2 / a2;
        traces.push({
            x: [xConst, xConst],
            y: [xMin, xMax],
            mode: 'lines',
            name: `${a2}x = ${c2}`,
            line: {
                color: line2Color,
                width: 3,
                dash: line2Dash
            }
        });
    }

    // Add intersection point if unique solution
    if (resultType === 'unique' && solution) {
        traces.push({
            x: [solution.x],
            y: [solution.y],
            mode: 'markers',
            name: `Solution (${solution.x.toFixed(2)}, ${solution.y.toFixed(2)})`,
            marker: {
                color: '#10b981',
                size: 15,
                symbol: 'circle',
                line: {
                    color: 'white',
                    width: 2
                }
            }
        });
    }

    // Determine title based on result type
    let titleText = '';
    let titleColor = '';

    if (resultType === 'unique') {
        titleText = '✅ Unique Solution: Lines Intersect at One Point';
        titleColor = '#10b981';
    } else if (resultType === 'infinite') {
        titleText = '∞ Infinite Solutions: Same Line';
        titleColor = '#f59e0b';
    } else {
        titleText = '❌ No Solution: Parallel Lines Never Meet';
        titleColor = '#ef4444';
    }

    // Layout configuration
    const layout = {
        title: {
            text: titleText,
            font: {
                size: 18,
                color: titleColor,
                family: 'Segoe UI, Arial, sans-serif'
            }
        },
        xaxis: {
            title: 'x',
            gridcolor: '#2d3748',
            zerolinecolor: '#4a5568',
            color: '#e2e8f0'
        },
        yaxis: {
            title: 'y',
            gridcolor: '#2d3748',
            zerolinecolor: '#4a5568',
            color: '#e2e8f0'
        },
        plot_bgcolor: '#1a202c',
        paper_bgcolor: '#1e293b',
        font: {
            color: '#e2e8f0'
        },
        showlegend: true,
        legend: {
            x: 0.02,
            y: 0.98,
            bgcolor: 'rgba(30, 41, 59, 0.8)',
            bordercolor: '#4a5568',
            borderwidth: 1
        },
        hovermode: 'closest'
    };

    // Configuration
    const config = {
        responsive: true,
        displayModeBar: true,
        displaylogo: false,
        modeBarButtonsToRemove: ['pan2d', 'lasso2d', 'select2d']
    };

    // Create the plot
    Plotly.newPlot(graphDiv, traces, layout, config);
}

// ============================================
// Slide Navigation System
// ============================================

let currentSlide = 0;
let totalSlides = 0;

// Update slide progress displays
function updateProgress() {
    // Update all current slide counters
    document.querySelectorAll('.currentSlide').forEach(el => {
        el.textContent = currentSlide + 1;
    });
    // Back-compat: legacy single counters with specific ids
    const cs = document.getElementById('currentSlide');
    const ts = document.getElementById('totalSlides');
    if (cs) cs.textContent = currentSlide + 1;
    if (ts) ts.textContent = totalSlides;
    // New: update all total counters with class
    document.querySelectorAll('.totalSlides').forEach(el => {
        el.textContent = totalSlides;
    });
}

// Show specific slide
function showSlide(index) {
    // Hide all slides
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => slide.classList.remove('active'));

    // Show selected slide
    currentSlide = index;
    if (slides[currentSlide]) {
        slides[currentSlide].classList.add('active');
    }

    // Update active lesson in sidebar (guarded)
    const lessonItems = document.querySelectorAll('.lesson-item');
    lessonItems.forEach(item => item.classList.remove('active'));
    if (lessonItems[currentSlide]) {
        lessonItems[currentSlide].classList.add('active');
    }

    // Update navigation buttons
    const prevBtn = document.querySelectorAll('.btn-prev');
    const nextBtn = document.querySelectorAll('.btn-next');

    prevBtn.forEach(btn => {
        btn.disabled = currentSlide === 0;
    });

    nextBtn.forEach(btn => {
        btn.disabled = currentSlide === totalSlides - 1;
    });

    // Update progress
    updateProgress();

    // Scroll to top of main content area
    const mainContent = document.querySelector('.main-learn-content');
    if (mainContent) {
        mainContent.scrollTop = 0;
    }
}

// Next slide
function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        showSlide(currentSlide + 1);
    }
}

// Previous slide
function prevSlide() {
    if (currentSlide > 0) {
        showSlide(currentSlide - 1);
    }
}

// Toggle chapter expansion
function toggleChapter(chapterIndex) {
    const chapters = document.querySelectorAll('.chapter');
    const chapter = chapters[chapterIndex];
    const lessons = chapter.querySelector('.lessons');
    const icon = chapter.querySelector('.chapter-icon');
    const title = chapter.querySelector('.chapter-title');

    // Toggle active state
    const wasActive = lessons.classList.contains('active');

    // Close all chapters
    document.querySelectorAll('.lessons').forEach(l => l.classList.remove('active'));
    document.querySelectorAll('.chapter-icon').forEach(i => i.textContent = '▶');
    document.querySelectorAll('.chapter-title').forEach(t => t.classList.remove('active'));

    // Open clicked chapter if it wasn't active
    if (!wasActive) {
        lessons.classList.add('active');
        icon.textContent = '▼';
        title.classList.add('active');
    }
}

// Toggle sidebar visibility (useful for mobile/tablet)
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.classList.toggle('sidebar-open');

        // If sidebar has the 'sidebar-open' class, it's visible
        // This is especially useful on mobile devices
        const isOpen = sidebar.classList.contains('sidebar-open');

        // Optional: You can also toggle the first chapter open when opening sidebar
        if (isOpen) {
            // Open the first chapter by default when menu is opened
            const firstChapter = document.querySelector('.chapter');
            if (firstChapter) {
                const lessons = firstChapter.querySelector('.lessons');
                const icon = firstChapter.querySelector('.chapter-icon');
                const title = firstChapter.querySelector('.chapter-title');

                if (lessons && !lessons.classList.contains('active')) {
                    lessons.classList.add('active');
                    if (icon) icon.textContent = '▼';
                    if (title) title.classList.add('active');
                }
            }

            // Add click listener to close sidebar when clicking outside on mobile
            setTimeout(() => {
                document.addEventListener('click', closeSidebarOnClickOutside);
            }, 100);
        } else {
            // Remove click listener when sidebar closes
            document.removeEventListener('click', closeSidebarOnClickOutside);
        }
    }
}

// Close sidebar when clicking outside (mobile only)
function closeSidebarOnClickOutside(event) {
    const sidebar = document.querySelector('.sidebar');
    const menuButton = event.target.closest('.btn-header');

    // Don't close if clicking inside sidebar or on menu button
    if (sidebar &&
        !sidebar.contains(event.target) &&
        !menuButton) {

        sidebar.classList.remove('sidebar-open');
        document.removeEventListener('click', closeSidebarOnClickOutside);
    }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
});

// Helper: Show slide by id
function showSlideById(id) {
    const slides = Array.from(document.querySelectorAll('.slide'));
    const idx = slides.findIndex(s => s.id === id);
    if (idx >= 0) showSlide(idx);
}

// Initialize
function initializeSlides() {
    totalSlides = document.querySelectorAll('.slide').length;
    updateProgress();
}

// Initialize when DOM is ready
initializeSlides();

// RREF Solver with 3D Visualization
function solveRREF() {
    // Get input values
    const a1 = parseFloat(document.getElementById('rref-a1').value);
    const b1 = parseFloat(document.getElementById('rref-b1').value);
    const c1 = parseFloat(document.getElementById('rref-c1').value);
    const d1 = parseFloat(document.getElementById('rref-d1').value);

    const a2 = parseFloat(document.getElementById('rref-a2').value);
    const b2 = parseFloat(document.getElementById('rref-b2').value);
    const c2 = parseFloat(document.getElementById('rref-c2').value);
    const d2 = parseFloat(document.getElementById('rref-d2').value);

    const a3 = parseFloat(document.getElementById('rref-a3').value);
    const b3 = parseFloat(document.getElementById('rref-b3').value);
    const c3 = parseFloat(document.getElementById('rref-c3').value);
    const d3 = parseFloat(document.getElementById('rref-d3').value);

    // Check for invalid inputs
    if (isNaN(a1) || isNaN(b1) || isNaN(c1) || isNaN(d1) ||
        isNaN(a2) || isNaN(b2) || isNaN(c2) || isNaN(d2) ||
        isNaN(a3) || isNaN(b3) || isNaN(c3) || isNaN(d3)) {
        document.getElementById('rref-result').innerHTML = `
            <div style="padding: 20px; background: rgba(239, 68, 68, 0.2); border-left: 4px solid #ef4444; border-radius: 8px;">
                <strong style="color: #ef4444;">⚠️ Error:</strong> Please fill in all coefficients with valid numbers.
            </div>
        `;
        return;
    }

    // Create augmented matrix
    let matrix = [
        [a1, b1, c1, d1],
        [a2, b2, c2, d2],
        [a3, b3, c3, d3]
    ];

    // Perform RREF
    const result = performRREF(matrix);

    // Display result
    displayRREFResult(result, matrix);

    // Generate 3D graph
    generate3DGraph(a1, b1, c1, d1, a2, b2, c2, d2, a3, b3, c3, d3, result);
}

// Perform RREF on augmented matrix
function performRREF(matrix) {
    const m = matrix.map(row => [...row]); // Deep copy
    const rows = m.length;
    const cols = m[0].length;
    let lead = 0;
    const epsilon = 1e-10;

    for (let r = 0; r < rows; r++) {
        if (lead >= cols - 1) break;

        // Find pivot
        let i = r;
        while (Math.abs(m[i][lead]) < epsilon) {
            i++;
            if (i === rows) {
                i = r;
                lead++;
                if (lead === cols - 1) break;
            }
        }
        if (lead === cols - 1) break;

        // Swap rows
        [m[i], m[r]] = [m[r], m[i]];

        // Scale pivot to 1
        const pivot = m[r][lead];
        if (Math.abs(pivot) > epsilon) {
            for (let j = 0; j < cols; j++) {
                m[r][j] /= pivot;
            }
        }

        // Eliminate column
        for (let i = 0; i < rows; i++) {
            if (i !== r) {
                const factor = m[i][lead];
                for (let j = 0; j < cols; j++) {
                    m[i][j] -= factor * m[r][j];
                }
            }
        }

        lead++;
    }

    // Clean up near-zero values
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (Math.abs(m[i][j]) < epsilon) {
                m[i][j] = 0;
            }
        }
    }

    return m;
}

// Display RREF result
function displayRREFResult(rref, original) {
    const epsilon = 1e-10;
    let solutionType = 'unique';
    let solution = { x: 0, y: 0, z: 0 };

    // Check for inconsistency (0 = non-zero)
    for (let i = 0; i < rref.length; i++) {
        const allZerosLeft = rref[i].slice(0, 3).every(val => Math.abs(val) < epsilon);
        const nonZeroRight = Math.abs(rref[i][3]) > epsilon;

        if (allZerosLeft && nonZeroRight) {
            solutionType = 'none';
            break;
        }
    }

    // Check for infinite solutions
    if (solutionType !== 'none') {
        const hasFreevariable = rref.some(row => {
            const leadingOnes = row.slice(0, 3).filter(val => Math.abs(val - 1) < epsilon).length;
            const zeros = row.slice(0, 3).filter(val => Math.abs(val) < epsilon).length;
            return zeros === 2 && leadingOnes === 0;
        });

        if (hasFreevariable) {
            solutionType = 'infinite';
        } else {
            // Extract unique solution
            solution.x = rref[0][3];
            solution.y = rref[1][3];
            solution.z = rref[2][3];
        }
    }

    // Format output
    let html = `
        <div style="padding: 20px; background: rgba(99, 102, 241, 0.1); border-left: 4px solid var(--primary-color); border-radius: 8px; margin-bottom: 20px;">
            <h3 style="margin-top: 0; color: var(--primary-color);">📋 Original Augmented Matrix:</h3>
            <div style="font-family: 'Courier New', monospace; font-size: 1.1rem; text-align: center;">
                \\[
                \\left[\\begin{array}{ccc|c}
                ${formatNumber(original[0][0])} & ${formatNumber(original[0][1])} & ${formatNumber(original[0][2])} & ${formatNumber(original[0][3])} \\\\
                ${formatNumber(original[1][0])} & ${formatNumber(original[1][1])} & ${formatNumber(original[1][2])} & ${formatNumber(original[1][3])} \\\\
                ${formatNumber(original[2][0])} & ${formatNumber(original[2][1])} & ${formatNumber(original[2][2])} & ${formatNumber(original[2][3])}
                \\end{array}\\right]
                \\]
            </div>
        </div>

        <div style="padding: 20px; background: rgba(52, 211, 153, 0.1); border-left: 4px solid #34d399; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="margin-top: 0; color: #34d399;">✅ RREF Matrix:</h3>
            <div style="font-family: 'Courier New', monospace; font-size: 1.1rem; text-align: center;">
                \\[
                \\left[\\begin{array}{ccc|c}
                ${formatNumber(rref[0][0])} & ${formatNumber(rref[0][1])} & ${formatNumber(rref[0][2])} & ${formatNumber(rref[0][3])} \\\\
                ${formatNumber(rref[1][0])} & ${formatNumber(rref[1][1])} & ${formatNumber(rref[1][2])} & ${formatNumber(rref[1][3])} \\\\
                ${formatNumber(rref[2][0])} & ${formatNumber(rref[2][1])} & ${formatNumber(rref[2][2])} & ${formatNumber(rref[2][3])}
                \\end{array}\\right]
                \\]
            </div>
        </div>
    `;

    if (solutionType === 'unique') {
        html += `
            <div style="padding: 20px; background: rgba(52, 211, 153, 0.2); border-left: 4px solid #10b981; border-radius: 8px;">
                <h3 style="margin-top: 0; color: #10b981;">🎯 Unique Solution:</h3>
                <div style="font-size: 1.2rem; text-align: center; margin: 15px 0;">
                    \\[
                    \\begin{align*}
                    x &= ${formatNumber(solution.x)} \\\\
                    y &= ${formatNumber(solution.y)} \\\\
                    z &= ${formatNumber(solution.z)}
                    \\end{align*}
                    \\]
                </div>
                <p style="margin-bottom: 0; color: var(--text-secondary);">The three planes intersect at a single point (${formatNumber(solution.x)}, ${formatNumber(solution.y)}, ${formatNumber(solution.z)}).</p>
            </div>
        `;
    } else if (solutionType === 'infinite') {
        html += `
            <div style="padding: 20px; background: rgba(251, 191, 36, 0.2); border-left: 4px solid #f59e0b; border-radius: 8px;">
                <h3 style="margin-top: 0; color: #f59e0b;">∞ Infinite Solutions:</h3>
                <p style="margin-bottom: 0;">The system has infinitely many solutions. The planes intersect along a line or coincide.</p>
            </div>
        `;
    } else {
        html += `
            <div style="padding: 20px; background: rgba(239, 68, 68, 0.2); border-left: 4px solid #ef4444; border-radius: 8px;">
                <h3 style="margin-top: 0; color: #ef4444;">❌ No Solution:</h3>
                <p style="margin-bottom: 0;">The system is inconsistent. The planes do not have a common intersection point.</p>
            </div>
        `;
    }

    document.getElementById('rref-result').innerHTML = html;

    // Re-render MathJax
    if (window.MathJax) {
        MathJax.typesetPromise([document.getElementById('rref-result')]);
    }
}

// Generate 3D graph
function generate3DGraph(a1, b1, c1, d1, a2, b2, c2, d2, a3, b3, c3, d3, rref) {
    const epsilon = 1e-10;

    // Determine solution type
    let solutionType = 'unique';
    let solution = { x: 0, y: 0, z: 0 };

    for (let i = 0; i < rref.length; i++) {
        const allZerosLeft = rref[i].slice(0, 3).every(val => Math.abs(val) < epsilon);
        const nonZeroRight = Math.abs(rref[i][3]) > epsilon;

        if (allZerosLeft && nonZeroRight) {
            solutionType = 'none';
            break;
        }
    }

    if (solutionType !== 'none') {
        solution.x = rref[0][3];
        solution.y = rref[1][3];
        solution.z = rref[2][3];
    }

    // Create mesh grid for planes
    const range = 10;
    const step = 1;
    const x = [];
    const y = [];

    for (let i = -range; i <= range; i += step) {
        x.push(i);
        y.push(i);
    }

    // Calculate z values for each plane
    const z1 = [], z2 = [], z3 = [];
    for (let i = 0; i < x.length; i++) {
        const row1 = [], row2 = [], row3 = [];
        for (let j = 0; j < y.length; j++) {
            // Plane 1: a1*x + b1*y + c1*z = d1 => z = (d1 - a1*x - b1*y) / c1
            row1.push(Math.abs(c1) > epsilon ? (d1 - a1 * x[i] - b1 * y[j]) / c1 : 0);
            // Plane 2
            row2.push(Math.abs(c2) > epsilon ? (d2 - a2 * x[i] - b2 * y[j]) / c2 : 0);
            // Plane 3
            row3.push(Math.abs(c3) > epsilon ? (d3 - a3 * x[i] - b3 * y[j]) / c3 : 0);
        }
        z1.push(row1);
        z2.push(row2);
        z3.push(row3);
    }

    // Create traces
    const traces = [
        {
            type: 'surface',
            x: x,
            y: y,
            z: z1,
            name: 'Plane 1',
            colorscale: [[0, 'rgba(99, 102, 241, 0.5)'], [1, 'rgba(99, 102, 241, 0.8)']],
            showscale: false,
            opacity: 0.6
        },
        {
            type: 'surface',
            x: x,
            y: y,
            z: z2,
            name: 'Plane 2',
            colorscale: [[0, 'rgba(139, 92, 246, 0.5)'], [1, 'rgba(139, 92, 246, 0.8)']],
            showscale: false,
            opacity: 0.6
        },
        {
            type: 'surface',
            x: x,
            y: y,
            z: z3,
            name: 'Plane 3',
            colorscale: [[0, 'rgba(236, 72, 153, 0.5)'], [1, 'rgba(236, 72, 153, 0.8)']],
            showscale: false,
            opacity: 0.6
        }
    ];

    // Add solution point if unique
    if (solutionType === 'unique') {
        traces.push({
            type: 'scatter3d',
            x: [solution.x],
            y: [solution.y],
            z: [solution.z],
            mode: 'markers',
            marker: {
                size: 10,
                color: '#10b981',
                symbol: 'circle'
            },
            name: `Solution (${formatNumber(solution.x)}, ${formatNumber(solution.y)}, ${formatNumber(solution.z)})`
        });
    }

    const layout = {
        title: {
            text: '3D Visualization of the System',
            font: { color: '#e5e7eb', size: 20 }
        },
        scene: {
            xaxis: { title: 'x', color: '#9ca3af' },
            yaxis: { title: 'y', color: '#9ca3af' },
            zaxis: { title: 'z', color: '#9ca3af' },
            bgcolor: '#1f2937'
        },
        paper_bgcolor: '#111827',
        plot_bgcolor: '#1f2937',
        font: { color: '#e5e7eb' },
        showlegend: true,
        legend: {
            x: 0,
            y: 1,
            bgcolor: 'rgba(31, 41, 55, 0.8)'
        }
    };

    Plotly.newPlot('rref-graph', traces, layout, { responsive: true });
}

// Helper function to format numbers
function formatNumber(num) {
    if (Math.abs(num) < 1e-10) return '0';
    if (Number.isInteger(num)) return num.toString();
    return num.toFixed(3);
}

// ============================================
// Vector Space Checker Functions
// ============================================

// Update description based on selected set
function updateVectorSpaceDescription() {
    const selectElement = document.getElementById('vectorSpaceSelect');
    const selectedValue = selectElement.value;
    const descriptionText = document.getElementById('descriptionText');
    const descriptionFormula = document.getElementById('descriptionFormula');

    const descriptions = {
        'r2': {
            text: 'All ordered pairs (x, y) where x, y ∈ ℝ',
            formula: '$$V = \\mathbb{R}^2 = \\{(x, y) : x, y \\in \\mathbb{R}\\}$$'
        },
        'r3': {
            text: 'All ordered triples (x, y, z) where x, y, z ∈ ℝ',
            formula: '$$V = \\mathbb{R}^3 = \\{(x, y, z) : x, y, z \\in \\mathbb{R}\\}$$'
        },
        'line_origin': {
            text: 'All points (x, y) that lie on the line y = 2x passing through the origin',
            formula: '$$V = \\{(x, y) : y = 2x\\}$$'
        },
        'line_not_origin': {
            text: 'All points (x, y) that lie on the line y = x + 1 (does NOT pass through origin)',
            formula: '$$V = \\{(x, y) : y = x + 1\\}$$'
        },
        'xy_plane': {
            text: 'All points in ℝ³ where the z-coordinate is 0 (the xy-plane)',
            formula: '$$V = \\{(x, y, z) \\in \\mathbb{R}^3 : z = 0\\}$$'
        },
        'first_quadrant': {
            text: 'All points in the first quadrant only (both coordinates non-negative)',
            formula: '$$V = \\{(x, y) : x \\geq 0, y \\geq 0\\}$$'
        },
        'positive_reals': {
            text: 'Only positive real numbers',
            formula: '$$V = \\{x \\in \\mathbb{R} : x > 0\\}$$'
        },
        'matrices_2x2': {
            text: 'All 2×2 matrices with real entries',
            formula: '$$V = \\left\\{\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} : a, b, c, d \\in \\mathbb{R}\\right\\}$$'
        },
        'polynomials': {
            text: 'All polynomials of degree at most 2',
            formula: '$$V = \\{a_0 + a_1x + a_2x^2 : a_0, a_1, a_2 \\in \\mathbb{R}\\}$$'
        },
        'integers': {
            text: 'All ordered pairs (x, y) where x, y are integers only',
            formula: '$$V = \\{(x, y) : x, y \\in \\mathbb{Z}\\}$$'
        }
    };

    descriptionText.textContent = descriptions[selectedValue].text;
    descriptionFormula.innerHTML = descriptions[selectedValue].formula;

    // Re-render MathJax
    if (window.MathJax) {
        MathJax.typesetPromise([descriptionFormula]);
    }
}

// Check if selected set is a vector space
function checkVectorSpace() {
    const selectElement = document.getElementById('vectorSpaceSelect');
    const selectedValue = selectElement.value;
    const resultDiv = document.getElementById('vectorSpaceResult');

    // Define test results for each set
    const testResults = {
        'r2': {
            isVectorSpace: true,
            axioms: [
                { name: 'Closure under addition', passed: true, explanation: 'Adding two vectors (x₁, y₁) + (x₂, y₂) = (x₁+x₂, y₁+y₂) always gives another vector in ℝ²' },
                { name: 'Commutativity', passed: true, explanation: 'u + v = v + u for all vectors in ℝ²' },
                { name: 'Associativity', passed: true, explanation: '(u + v) + w = u + (v + w) for all vectors' },
                { name: 'Zero vector exists', passed: true, explanation: 'The zero vector (0, 0) is in ℝ²' },
                { name: 'Additive inverse exists', passed: true, explanation: 'For every (x, y), there exists (-x, -y) in ℝ²' },
                { name: 'Closure under scalar multiplication', passed: true, explanation: 'Multiplying c(x, y) = (cx, cy) gives another vector in ℝ²' },
                { name: 'Distributive properties', passed: true, explanation: 'Both c(u + v) = cu + cv and (c + d)u = cu + du hold' },
                { name: 'Scalar multiplication identity', passed: true, explanation: '1·v = v for all vectors' }
            ]
        },
        'r3': {
            isVectorSpace: true,
            axioms: [
                { name: 'Closure under addition', passed: true, explanation: 'Adding two vectors always gives another vector in ℝ³' },
                { name: 'Commutativity', passed: true, explanation: 'u + v = v + u for all vectors' },
                { name: 'Associativity', passed: true, explanation: '(u + v) + w = u + (v + w)' },
                { name: 'Zero vector exists', passed: true, explanation: '(0, 0, 0) ∈ ℝ³' },
                { name: 'Additive inverse exists', passed: true, explanation: 'For every vector v, -v exists in ℝ³' },
                { name: 'Closure under scalar multiplication', passed: true, explanation: 'cv is in ℝ³ for any scalar c' },
                { name: 'Distributive properties', passed: true, explanation: 'All distributive laws hold' },
                { name: 'Scalar multiplication identity', passed: true, explanation: '1·v = v' }
            ]
        },
        'line_origin': {
            isVectorSpace: true,
            axioms: [
                { name: 'Closure under addition', passed: true, explanation: 'If y₁ = 2x₁ and y₂ = 2x₂, then y₁+y₂ = 2(x₁+x₂) ✓' },
                { name: 'Commutativity', passed: true, explanation: 'Inherited from ℝ²' },
                { name: 'Associativity', passed: true, explanation: 'Inherited from ℝ²' },
                { name: 'Zero vector exists', passed: true, explanation: '(0, 0) satisfies y = 2x since 0 = 2(0) ✓' },
                { name: 'Additive inverse exists', passed: true, explanation: 'If (x, 2x) is in V, so is (-x, -2x)' },
                { name: 'Closure under scalar multiplication', passed: true, explanation: 'c(x, 2x) = (cx, 2cx), and 2cx = 2(cx) ✓' },
                { name: 'Distributive properties', passed: true, explanation: 'Inherited from ℝ²' },
                { name: 'Scalar multiplication identity', passed: true, explanation: 'Inherited from ℝ²' }
            ]
        },
        'line_not_origin': {
            isVectorSpace: false,
            axioms: [
                { name: 'Closure under addition', passed: false, explanation: '(0, 1) and (1, 2) are in V, but (0, 1) + (1, 2) = (1, 3), and 3 ≠ 1 + 1 = 2 ✗' },
                { name: 'Commutativity', passed: true, explanation: 'Inherited from ℝ² but irrelevant since closure fails' },
                { name: 'Associativity', passed: true, explanation: 'Inherited from ℝ²' },
                { name: 'Zero vector exists', passed: false, explanation: 'Zero vector (0, 0) does NOT satisfy y = x + 1 since 0 ≠ 0 + 1 ✗' },
                { name: 'Additive inverse exists', passed: false, explanation: 'Cannot exist if zero vector doesn\'t exist' },
                { name: 'Closure under scalar multiplication', passed: false, explanation: '(0, 1) is in V, but 2(0, 1) = (0, 2), and 2 ≠ 0 + 1 ✗' },
                { name: 'Distributive properties', passed: true, explanation: 'Inherited but irrelevant' },
                { name: 'Scalar multiplication identity', passed: true, explanation: 'Inherited but irrelevant' }
            ],
            failReason: 'This line does NOT pass through the origin. The zero vector (0,0) is not in this set, which immediately disqualifies it from being a vector space.'
        },
        'xy_plane': {
            isVectorSpace: true,
            axioms: [
                { name: 'Closure under addition', passed: true, explanation: 'If z₁ = 0 and z₂ = 0, then z₁ + z₂ = 0 ✓' },
                { name: 'Commutativity', passed: true, explanation: 'Inherited from ℝ³' },
                { name: 'Associativity', passed: true, explanation: 'Inherited from ℝ³' },
                { name: 'Zero vector exists', passed: true, explanation: '(0, 0, 0) has z = 0 ✓' },
                { name: 'Additive inverse exists', passed: true, explanation: 'If (x, y, 0) ∈ V, then (-x, -y, 0) ∈ V' },
                { name: 'Closure under scalar multiplication', passed: true, explanation: 'c(x, y, 0) = (cx, cy, 0), z is still 0 ✓' },
                { name: 'Distributive properties', passed: true, explanation: 'Inherited from ℝ³' },
                { name: 'Scalar multiplication identity', passed: true, explanation: 'Inherited from ℝ³' }
            ]
        },
        'first_quadrant': {
            isVectorSpace: false,
            axioms: [
                { name: 'Closure under addition', passed: true, explanation: 'Adding non-negative numbers gives non-negative result' },
                { name: 'Commutativity', passed: true, explanation: 'Inherited from ℝ²' },
                { name: 'Associativity', passed: true, explanation: 'Inherited from ℝ²' },
                { name: 'Zero vector exists', passed: true, explanation: '(0, 0) has x ≥ 0 and y ≥ 0 ✓' },
                { name: 'Additive inverse exists', passed: false, explanation: 'For (1, 1), the inverse would be (-1, -1), but -1 < 0 ✗' },
                { name: 'Closure under scalar multiplication', passed: false, explanation: '(1, 1) is in V, but -1·(1, 1) = (-1, -1) is NOT in V ✗' },
                { name: 'Distributive properties', passed: true, explanation: 'Inherited but irrelevant' },
                { name: 'Scalar multiplication identity', passed: true, explanation: 'Inherited but irrelevant' }
            ],
            failReason: 'The first quadrant fails because negative scalars take vectors outside the set. Specifically, there are no additive inverses, and scalar multiplication by negative numbers produces vectors with negative components.'
        },
        'positive_reals': {
            isVectorSpace: false,
            axioms: [
                { name: 'Closure under addition', passed: true, explanation: 'Sum of positive numbers is positive' },
                { name: 'Commutativity', passed: true, explanation: 'a + b = b + a' },
                { name: 'Associativity', passed: true, explanation: '(a + b) + c = a + (b + c)' },
                { name: 'Zero vector exists', passed: false, explanation: '0 is NOT a positive real number ✗' },
                { name: 'Additive inverse exists', passed: false, explanation: 'For x > 0, -x < 0 is not in the set ✗' },
                { name: 'Closure under scalar multiplication', passed: false, explanation: 'If c < 0 and x > 0, then cx < 0 is not in the set ✗' },
                { name: 'Distributive properties', passed: true, explanation: 'Holds for real numbers' },
                { name: 'Scalar multiplication identity', passed: true, explanation: '1·x = x' }
            ],
            failReason: 'Positive real numbers exclude zero and have no additive inverses. The zero element is essential for any vector space.'
        },
        'matrices_2x2': {
            isVectorSpace: true,
            axioms: [
                { name: 'Closure under addition', passed: true, explanation: 'Sum of two 2×2 matrices is a 2×2 matrix' },
                { name: 'Commutativity', passed: true, explanation: 'A + B = B + A for matrices' },
                { name: 'Associativity', passed: true, explanation: '(A + B) + C = A + (B + C)' },
                { name: 'Zero vector exists', passed: true, explanation: 'The zero matrix [[0,0],[0,0]] exists' },
                { name: 'Additive inverse exists', passed: true, explanation: 'For any matrix A, -A exists' },
                { name: 'Closure under scalar multiplication', passed: true, explanation: 'cA is a 2×2 matrix' },
                { name: 'Distributive properties', passed: true, explanation: 'c(A+B) = cA + cB and (c+d)A = cA + dA' },
                { name: 'Scalar multiplication identity', passed: true, explanation: '1·A = A' }
            ]
        },
        'polynomials': {
            isVectorSpace: true,
            axioms: [
                { name: 'Closure under addition', passed: true, explanation: 'Sum of two degree ≤2 polynomials has degree ≤2' },
                { name: 'Commutativity', passed: true, explanation: 'p(x) + q(x) = q(x) + p(x)' },
                { name: 'Associativity', passed: true, explanation: 'Polynomial addition is associative' },
                { name: 'Zero vector exists', passed: true, explanation: 'The zero polynomial 0 exists' },
                { name: 'Additive inverse exists', passed: true, explanation: 'For p(x), -p(x) exists' },
                { name: 'Closure under scalar multiplication', passed: true, explanation: 'c·p(x) has degree ≤2 if p(x) does' },
                { name: 'Distributive properties', passed: true, explanation: 'All distributive laws hold' },
                { name: 'Scalar multiplication identity', passed: true, explanation: '1·p(x) = p(x)' }
            ]
        },
        'integers': {
            isVectorSpace: false,
            axioms: [
                { name: 'Closure under addition', passed: true, explanation: 'Sum of integers is an integer' },
                { name: 'Commutativity', passed: true, explanation: 'Integer addition is commutative' },
                { name: 'Associativity', passed: true, explanation: 'Integer addition is associative' },
                { name: 'Zero vector exists', passed: true, explanation: '(0, 0) where 0 ∈ ℤ' },
                { name: 'Additive inverse exists', passed: true, explanation: 'For (a, b), (-a, -b) exists in ℤ²' },
                { name: 'Closure under scalar multiplication', passed: false, explanation: 'For (1, 1) and scalar 0.5, we get (0.5, 0.5) which is NOT in ℤ² ✗' },
                { name: 'Distributive properties', passed: true, explanation: 'Holds but irrelevant' },
                { name: 'Scalar multiplication identity', passed: true, explanation: '1·(a, b) = (a, b)' }
            ],
            failReason: 'Integer vectors fail closure under scalar multiplication. For example, multiplying by 1/2 or any non-integer scalar produces non-integer coordinates.'
        }
    };

    const result = testResults[selectedValue];

    // Build result HTML
    let html = '<div style="padding: 20px; border-radius: 10px; ';
    if (result.isVectorSpace) {
        html += 'background: rgba(52, 211, 153, 0.2); border: 2px solid var(--success-color);">';
        html += '<h3 style="color: var(--success-color); margin-top: 0;">✅ THIS IS A VECTOR SPACE!</h3>';
    } else {
        html += 'background: rgba(239, 68, 68, 0.2); border: 2px solid var(--error-color);">';
        html += '<h3 style="color: var(--error-color); margin-top: 0;">❌ NOT A VECTOR SPACE</h3>';
        if (result.failReason) {
            html += `<p style="font-size: 1.1rem; margin-bottom: 20px; padding: 15px; background: rgba(239, 68, 68, 0.1); border-radius: 8px;"><strong>Why it fails:</strong> ${result.failReason}</p>`;
        }
    }

    html += '<h4 style="margin-top: 20px; margin-bottom: 15px;">📋 Detailed Axiom Check:</h4>';

    result.axioms.forEach((axiom, index) => {
        const statusIcon = axiom.passed ? '✅' : '❌';
        const statusColor = axiom.passed ? 'var(--success-color)' : 'var(--error-color)';
        const bgColor = axiom.passed ? 'rgba(52, 211, 153, 0.1)' : 'rgba(239, 68, 68, 0.1)';

        html += `
            <div style="padding: 12px; margin: 10px 0; background: ${bgColor}; border-left: 4px solid ${statusColor}; border-radius: 5px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                    <strong style="font-size: 1.05rem;">${index + 1}. ${axiom.name}</strong>
                    <span style="font-size: 1.2rem;">${statusIcon}</span>
                </div>
                <p style="margin: 5px 0 0 0; font-size: 0.95rem; color: var(--text-secondary);">${axiom.explanation}</p>
            </div>
        `;
    });

    html += '</div>';

    // Show result with animation
    resultDiv.innerHTML = html;
    resultDiv.style.display = 'block';
    resultDiv.style.animation = 'fadeIn 0.5s ease-in';

    // Scroll to result
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Initialize on page load
window.addEventListener('load', () => {
    if (document.getElementById('vectorSpaceSelect')) {
        updateVectorSpaceDescription();
    }
});
