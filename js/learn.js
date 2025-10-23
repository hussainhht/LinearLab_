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
