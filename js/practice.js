/**
 * Practice Sets - Linear Algebra Studio
 * Auto-generates and grades practice problems
 */

let bank = {};
let current = [];

// Initialize on page load
(async function init() {
    try {
        const res = await fetch('../data/practice-bank.json');
        bank = await res.json();

        // Display last score if available
        displayLastScore();

        // Event listeners
        document.getElementById('btn-generate').addEventListener('click', generate);
        document.getElementById('btn-check').addEventListener('click', check);
        document.getElementById('btn-reset').addEventListener('click', generate);

        // Keyboard shortcut: Enter to check answers
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && current.length > 0 && !e.target.matches('button')) {
                e.preventDefault();
                check();
            }
        });

        console.log('✅ Practice Sets initialized successfully');
    } catch (error) {
        console.error('❌ Failed to load practice bank:', error);
        document.getElementById('problems').innerHTML = `
            <div class="empty-state">
                <p style="color: var(--danger-color);">
                    ⚠️ Failed to load problems. Please check the console for details.
                </p>
            </div>`;
    }
})();

/**
 * Display last saved score from localStorage
 */
function displayLastScore() {
    const lastScore = localStorage.getItem('practice_last_score');
    const display = document.getElementById('last-score-display');

    if (lastScore) {
        display.innerHTML = `
            <strong>📊 Last Score:</strong> ${lastScore}
        `;
    }
}

/**
 * Pick k random unique items from array
 */
function pickRandom(arr, k = 5) {
    if (!arr || arr.length === 0) return [];

    const available = arr.slice();
    const selected = [];
    const count = Math.min(k, available.length);

    while (selected.length < count) {
        const idx = Math.floor(Math.random() * available.length);
        selected.push(available.splice(idx, 1)[0]);
    }

    return selected;
}

/**
 * Generate new problem set for selected topic
 */
function generate() {
    const topic = document.getElementById('topic').value;
    const topicProblems = bank[topic] || [];

    if (topicProblems.length === 0) {
        alert(`No problems available for topic: ${topic}`);
        console.warn(`⚠️ No problems found for topic: ${topic}`);
        return;
    }

    if (topicProblems.length < 5) {
        console.warn(`⚠️ Topic "${topic}" has only ${topicProblems.length} problems (less than 5)`);
    }

    current = pickRandom(topicProblems, 5);
    render(current);

    // Clear score and show action buttons
    document.getElementById('score').textContent = '';
    document.querySelector('.practice-actions').style.display = 'flex';

    // Scroll to problems
    document.getElementById('problems').scrollIntoView({ behavior: 'smooth' });
}

/**
 * Render problem cards
 */
function render(list) {
    const wrap = document.getElementById('problems');
    wrap.innerHTML = '';

    if (list.length === 0) {
        wrap.innerHTML = `
            <div class="empty-state">
                <p>🎯 Click "Generate 5 Problems" to start practicing!</p>
            </div>`;
        return;
    }

    list.forEach((p, i) => {
        const card = document.createElement('div');
        card.className = 'problem-card';

        // Generate input based on question type
        let inputHTML = '';
        if (p.type === 'mcq') {
            inputHTML = p.choices.map((c, idx) => `
                <label class="choice">
                    <input type="radio" name="q${i}" value="${idx}">
                    <span>${escapeHtml(c)}</span>
                </label>
            `).join('');
        } else {
            inputHTML = `<input class="answer" type="text" data-i="${i}" placeholder="Enter your answer (e.g., none, 3, infinite)">`;
        }

        // Add example link if available
        let exampleLink = '';
        if (p.exampleId) {
            exampleLink = `<a href="index.html?example=${p.exampleId}" class="example-link" target="_blank">
                <span>🔧</span>
                <span>Try in Solver</span>
            </a>`;
        }

        card.innerHTML = `
            <h3><span>📌</span> Question ${i + 1}</h3>
            <p>${escapeHtml(p.q)}</p>
            <div class="input">${inputHTML}</div>
            <div class="feedback" id="fb_${i}"></div>
            ${exampleLink}
        `;

        wrap.appendChild(card);
    });
}

/**
 * Normalize answer string for comparison
 */
function norm(s) {
    return String(s).trim().toLowerCase().replace(/\s+/g, ' ');
}

/**
 * Check all answers and display feedback
 */
function check() {
    if (current.length === 0) {
        alert('Please generate problems first!');
        return;
    }

    let correct = 0;

    current.forEach((p, i) => {
        const fb = document.getElementById(`fb_${i}`);
        let isCorrect = false;

        if (p.type === 'mcq') {
            const selected = document.querySelector(`input[name="q${i}"]:checked`);
            if (!selected) {
                fb.className = 'feedback incorrect';
                fb.innerHTML = `<strong>❌ No answer selected</strong><br>Correct answer: ${escapeHtml(p.choices[p.answerIndex])}<br>${escapeHtml(p.explain)}`;
                return;
            }
            isCorrect = Number(selected.value) === p.answerIndex;
        } else {
            const input = document.querySelector(`input.answer[data-i="${i}"]`);
            if (!input || !input.value.trim()) {
                fb.className = 'feedback incorrect';
                fb.innerHTML = `<strong>❌ No answer provided</strong><br>Correct answer: <code>${escapeHtml(p.answer)}</code><br>${escapeHtml(p.explain)}`;
                return;
            }
            isCorrect = norm(input.value) === norm(p.answer);
        }

        if (isCorrect) {
            correct++;
            fb.className = 'feedback correct';
            fb.innerHTML = '✅ <strong>Correct!</strong>';
        } else {
            fb.className = 'feedback incorrect';
            if (p.type === 'mcq') {
                fb.innerHTML = `<strong>❌ Incorrect</strong><br>Correct answer: ${escapeHtml(p.choices[p.answerIndex])}<br>${escapeHtml(p.explain)}`;
            } else {
                fb.innerHTML = `<strong>❌ Incorrect</strong><br>Correct answer: <code>${escapeHtml(p.answer)}</code><br>${escapeHtml(p.explain)}`;
            }
        }
    });

    const score = `${correct} / ${current.length}`;
    const scoreDisplay = document.getElementById('score');
    scoreDisplay.textContent = `Score: ${score}`;

    // Save to localStorage
    localStorage.setItem('practice_last_score', score);
    displayLastScore();

    // Scroll to score
    scoreDisplay.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
