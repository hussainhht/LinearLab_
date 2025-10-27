# Practice Sets Module - Documentation

## Overview

The **Practice Sets** module is an interactive quiz system for Linear Algebra Studio that auto-generates problems across 5 key topics, collects user answers, provides instant grading, and displays detailed explanations.

## Features

✅ **5 Linear Algebra Topics:**
- Systems of Equations
- Gauss-Jordan Elimination
- Determinants
- Matrix Inverse
- Rank & Nullity

✅ **Question Types:**
- **Multiple Choice (MCQ)** - Select from 4 options
- **Numeric/Text** - Type short answers (case-insensitive comparison)

✅ **Auto-Grading System:**
- Instant feedback with ✅/❌ indicators
- Detailed explanations for incorrect answers
- Score persistence in localStorage

✅ **32 Total Problems** (6-7 per topic minimum)

---

## File Structure

```
LinearLab/
├── temp/
│   └── practice.html          # Main practice page
├── js/
│   └── practice.js            # Quiz logic
├── data/
│   └── practice-bank.json     # Problem bank
└── style/
    └── practice.css           # Practice-specific styles
```

---

## Usage

### For Students

1. **Navigate:** Click "Practice Sets" from any page
2. **Select Topic:** Choose from dropdown (default: Systems)
3. **Generate:** Click "Generate 5 Problems"
4. **Answer:** Select MCQ options or type text answers
5. **Check:** Click "Check Answers" or press Enter
6. **Review:** See score and read explanations
7. **Retry:** Click "New Set" for different problems

### Keyboard Shortcuts

- **Enter** - Check answers (when problems are active)
- **Tab** - Navigate between inputs

---

## Technical Details

### Problem Bank Schema

```json
{
  "topic_name": [
    {
      "id": "unique_id",
      "type": "mcq" | "numeric",
      "q": "Question text",
      
      // For MCQ:
      "choices": ["Option A", "Option B", "Option C", "Option D"],
      "answerIndex": 0,  // Zero-based index
      
      // For Numeric:
      "answer": "expected_answer",
      
      "explain": "Explanation shown after wrong answer",
      "exampleId": "optional_solver_link"  // Future feature
    }
  ]
}
```

### Answer Comparison Logic

**MCQ:**
- Exact index match: `selected === answerIndex`

**Numeric:**
- Case-insensitive
- Whitespace normalized
- Example: "No Solution" === "no solution" === "NO SOLUTION"

```javascript
norm(userAnswer) === norm(correctAnswer)
// where norm(s) = s.trim().toLowerCase().replace(/\s+/g, ' ')
```

---

## localStorage Persistence

**Key:** `practice_last_score`  
**Value:** `"X / 5"` (e.g., "4 / 5")  
**Usage:** Displayed at top of page on load

---

## Adding New Problems

### Step 1: Edit `data/practice-bank.json`

Add to appropriate topic array:

```json
{
  "id": "det_8",
  "type": "numeric",
  "q": "What is det(I₃)?",
  "answer": "1",
  "explain": "Identity matrix always has determinant 1."
}
```

### Step 2: Test

1. Open practice.html
2. Select the topic
3. Generate problems multiple times to ensure new question appears
4. Verify grading works correctly

### Best Practices

- **IDs:** Use format `topic_#` (e.g., `sys_7`, `gj_8`)
- **Questions:** Clear, concise, unambiguous
- **MCQ Choices:** 4 options, only one correct
- **Numeric Answers:** Use common short forms (e.g., "none", "infinite", "1")
- **Explanations:** One sentence, explain WHY

---

## Current Problem Distribution

| Topic           | Count | Types     |
|-----------------|-------|-----------|
| Systems         | 6     | 4N, 2M    |
| Gauss-Jordan    | 6     | 2N, 4M    |
| Determinants    | 7     | 3N, 4M    |
| Inverse         | 6     | 1N, 5M    |
| Rank            | 7     | 2N, 5M    |
| **TOTAL**       | **32**| **12N, 20M** |

*N = Numeric, M = MCQ*

---

## Integration with Other Modules

### Navigation Links

All pages now include "Practice Sets" in their navigation:

- **index.html** - Matrix Tools → Practice Sets
- **vector_space.html** - Vector Spaces → Practice Sets
- **learn.html** - Learning Platform → Practice Sets

### Future: Solver Integration

Questions can include `exampleId` field to link to pre-filled examples in the RREF/Matrix solver:

```json
{
  "q": "Reduce this matrix to RREF...",
  "exampleId": "sys_3x3_unique",
  ...
}
```

Renders button: **🔧 Try in Solver** → `index.html?example=sys_3x3_unique`

---

## Styling & Theme

Inherits from **main.css** dark theme:

- **Primary:** `#6366f1` (indigo)
- **Success:** `#10b981` (green) 
- **Danger:** `#ef4444` (red)
- **Surface:** `#1e293b` (dark slate)

**practice.css** adds:
- Animated feedback (slideIn, scaleIn)
- Hover effects on choices
- Responsive breakpoints

---

## Accessibility

✅ Keyboard navigation (Tab, Enter)  
✅ Labels associated with inputs  
✅ High contrast colors  
✅ Focus indicators on all interactive elements  
✅ Screen reader friendly structure

---

## Performance

- **Load Time:** <100ms (32 questions, ~15KB JSON)
- **Memory:** Cached in-memory after first fetch
- **No External Dependencies:** Pure vanilla JS

---

## Browser Compatibility

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## Known Limitations

1. **Answer Matching:** Simple string comparison
   - "0.2" ≠ "1/5" (numeric eval not implemented)
   - "No solution" ≠ "0 solutions" (requires synonym list)

2. **Topics <5 Questions:** Generates all available, warns in console

3. **No Backend:** Cannot track progress across devices

---

## Future Enhancements

### Phase 2
- [ ] Timer mode (optional countdown)
- [ ] Difficulty levels (Easy/Medium/Hard)
- [ ] Hints system (show hint before explanation)
- [ ] Progress tracking (topics completed, accuracy stats)

### Phase 3
- [ ] LaTeX math rendering (MathJax integration)
- [ ] Image-based questions (matrix diagrams)
- [ ] Multi-step problems with sub-questions
- [ ] Adaptive difficulty (harder questions after correct streaks)

---

## Testing Checklist

✅ Page loads without console errors  
✅ JSON fetches successfully  
✅ All 5 topics generate problems  
✅ MCQ radio buttons work correctly  
✅ Numeric inputs accept text  
✅ Grading logic accurate for both types  
✅ Score displays and persists  
✅ Explanations show on incorrect answers  
✅ Responsive layout on mobile (≥375px)  
✅ Navigation links work on all pages  
✅ Enter key triggers check  
✅ New Set button regenerates problems  

---

## Credits

**Module:** Practice Sets  
**Developer:** Hussain Ali  
**Institution:** University of Bahrain  
**Framework:** Linear Algebra Studio  
**Version:** 1.0.0  
**Date:** October 2025  

---

## Support

For issues or suggestions:
1. Check browser console for errors
2. Verify `practice-bank.json` syntax (use JSON validator)
3. Test in incognito mode (clears localStorage)
4. Review this documentation

---

**Enjoy practicing! 🎯✨**
