# LinearLab
# 🎓 LinearLab - Interactive Linear Algebra Learning Platform

> **Master linear algebra through interactive visualization, practice problems, and hands-on exploration**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Made with JavaScript](https://img.shields.io/badge/Made%20with-JavaScript-f7df1e.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Interactive](https://img.shields.io/badge/Type-Interactive-brightgreen.svg)](https://github.com)

An interactive linear algebra course and a set of step-by-step matrix tools. Every calculation uses exact fractions, every row operation comes with the reason for it, and every worked example in the course opens in the matching tool with one click.

## 🌟 What is LinearLab?

**LinearLab** is a comprehensive web-based educational platform designed to make learning linear algebra intuitive, visual, and engaging. Whether you're a student struggling with abstract concepts or an instructor looking for demonstration tools, LinearLab provides interactive tools that bring mathematics to life.

### ✨ Key Features

- **🔧 Matrix Operations Studio** - Perform RREF, calculate determinants, find inverses
- **📐 Vector Space Analyzer** - Explore subspaces, linear independence, and basis
- **📚 Interactive Learning** - Theory, examples, and visualizations in one place
- **🎯 Practice Problems** - 32+ curated problems across 5 topics with auto-grading
- **📊 Live Visualizations** - See 2D/3D plots of planes, lines, and vectors
- **💡 Instant Feedback** - Step-by-step solutions and explanations

---

## 🚀 Quick Start

### Option 1: Open Directly
1. Clone or download this repository
2. Open `temp/index.html` in your web browser
3. Start exploring!

### Option 2: Navigate From Index
```
index.html → Choose your tool:
├── 🔧 Practice Tools (Matrix operations)
├── 📚 Learn Linear Algebra (Theory + examples)
├── 🛠️ Practice Problems (32+ quiz questions)
└── 📐 Vector Spaces (Subspace analyzer)
```

### No Installation Required!
✅ Works in any modern browser (Chrome, Firefox, Edge, Safari)  
✅ No server setup needed  
✅ No dependencies to install  

---

## 📦 What's Inside?

### 🔧 1. Matrix Operations Studio (`index.html`)

Your complete toolkit for matrix computations:

**Features:**
- ✅ Gauss-Jordan Elimination (RREF)
- ✅ Determinant Calculator (with cofactor expansion)
- ✅ Matrix Inverse Finder
- ✅ Rank & Nullity Analysis
- ✅ Graph Visualization (incidence/adjacency matrices)
- ✅ Step-by-step solutions

**Use Cases:**
- Solve systems of linear equations
- Check if matrices are invertible
- Analyze graph connectivity
- Verify homework solutions

---

### 📐 2. Vector Space Analyzer (`vector_space.html`)

Three powerful modes for understanding vector spaces:

#### **Mode 1: Check by Equation** 📝
- Input: Linear equation (e.g., `x + y + z = 0`)
- Output: Subspace verification + 3D visualization
- Tests: Zero vector, closure under addition & scalar multiplication

#### **Mode 2: Check by Vectors** 🧮
- Input: Set of 2-4 vectors
- Output: Linear independence, rank, basis analysis
- Algorithm: RREF-based computation
- Visualization: Vectors as arrows in space

#### **Mode 3: Interactive Learning** 🧠
- Complete theory guide with 5 sections
- Worked examples (subspaces & non-subspaces)
- 5 practice problems with solutions
- Definitions, theorems, and geometric interpretations

**Perfect for:**
- Understanding abstract subspace concepts
- Verifying vector set properties
- Preparing for exams
- Building geometric intuition

---

### 📚 3. Learning Platform (`learn.html`)

Comprehensive educational content:

**Topics Covered:**
- Systems of Linear Equations
- Gauss-Jordan Elimination
- Matrix Operations
- Determinants
- Matrix Inverses
- Vector Spaces & Subspaces
- Linear Independence
- Basis & Dimension
- Rank & Nullity

**Features:**
- 📖 Theory explanations with mathematical notation
- 🎯 Step-by-step examples
- 🧪 Interactive demonstrations
- 🔗 Integrated with practice tools

---

### 🎯 4. Practice Problem Bank (`practice.html`)

Quiz yourself with **32 curated problems** across 5 topics:

| Topic                  | Problems | Type         |
|------------------------|----------|--------------|
| Systems of Equations   | 6        | MCQ + Numeric|
| Gauss-Jordan          | 6        | MCQ + Numeric|
| Determinants          | 7        | MCQ + Numeric|
| Matrix Inverses       | 6        | MCQ + Numeric|
| Rank & Nullity        | 7        | MCQ + Numeric|

**Features:**
- ✅ Auto-grading with instant feedback
- ✅ Randomized problem selection
- ✅ Detailed explanations for wrong answers
- ✅ Score persistence (localStorage)
- ✅ Topic-specific practice

**Study Modes:**
- 🐢 Slow & steady: Read explanations carefully
- ⚡ Speed test: Complete 5 problems in 3 minutes
- 🎯 Topic focus: Master one concept at a time

---

## 🎨 Technology Stack

### Frontend
- **HTML5** - Semantic structure
- **CSS3** - Modern styling with Grid & Flexbox
- **Vanilla JavaScript (ES6+)** - No framework dependencies

### Libraries
- **[Plotly.js](https://plotly.com/javascript/)** - Interactive 2D/3D visualizations
- **[MathJax 3](https://www.mathjax.org/)** - Beautiful mathematical notation rendering

### Algorithms Implemented
- ✅ Gaussian Elimination with partial pivoting
- ✅ RREF (Reduced Row Echelon Form)
- ✅ Determinant via cofactor expansion
- ✅ Matrix inversion using augmented matrices
- ✅ Rank computation
- ✅ Subspace verification with random testing
- ✅ Linear independence checking

---

## 📁 Project Structure

```
LinearLab/
│
├── temp/                          # Main HTML pages
│   ├── index.html                # Matrix operations studio
│   ├── learn.html                # Learning platform
│   ├── practice.html             # Quiz system
│   └── vector_space.html         # Vector space analyzer
│
├── js/                           # JavaScript modules
│   ├── app.js                    # Matrix operations logic
│   ├── learn.js                  # Learning platform handlers
│   ├── practice.js               # Quiz engine
│   └── vector.js                 # Vector space algorithms
│
├── style/                        # CSS stylesheets
│   ├── main.css                  # Global styles
│   ├── learn.css                 # Learning platform styles
│   ├── practice.css              # Quiz interface styles
│   └── vector.css                # Vector space tool styles
│
├── data/                         # JSON data files
│   └── practice-bank.json        # Problem bank (32 questions)
│
├── examples.json                 # Matrix operation examples
├── examples_vector.json          # Vector space examples
│
└── docs/                         # Documentation
    ├── README.md                 # This file
    ├── IMPLEMENTATION_SUMMARY.md # Technical overview
    ├── VECTOR_SPACE_FEATURE.md   # Vector tool docs
    ├── VECTOR_SPACE_QUICKSTART.md
    ├── PRACTICE_SETS_README.md
    └── PRACTICE_SETS_QUICKSTART.md
```

---

## 🎯 Who is LinearLab For?

### 👨‍🎓 Students
- Verify homework answers
- Visualize abstract concepts
- Practice with instant feedback
- Study for exams with confidence

### 👨‍🏫 Instructors
- Demonstrate concepts in class
- Assign practice problems
- Create visual examples
- Supplement textbook material

### 🔬 Self-Learners
- Build intuition through experimentation
- Follow structured learning paths
- Test understanding with quizzes
- Learn at your own pace

---

## 💡 Learning Paths

### Path 1: Complete Beginner
```
1. Learn Platform → Systems of Equations
2. Practice Tool → Solve simple systems
3. Learn Platform → Gauss-Jordan method
4. Practice Problems → Systems (6 problems)
5. Matrix Studio → Try RREF calculator
```

### Path 2: Vector Spaces Focus
```
1. Vector Analyzer → Learning Mode (all 5 sections)
2. Vector Analyzer → Try Mode 1 examples
3. Vector Analyzer → Try Mode 2 examples
4. Vector Analyzer → Practice problems (Section 5)
5. Create your own test cases!
```

### Path 3: Exam Preparation
```
1. Review Learn Platform → All topics
2. Practice Problems → All topics (32 problems)
3. Matrix Studio → Verify complex calculations
4. Vector Analyzer → Test subspace understanding
5. Repeat weak areas
```

---

## 🌟 Highlights & Special Features

### 🎨 Visual Learning
- **3D Plotly Graphs** - Rotate, zoom, and explore planes and vectors
- **2D Line Plots** - See lines through the origin vs. shifted lines
- **Color Coding** - Green = correct/subspace, Red = incorrect/non-subspace
- **Animated Transitions** - Smooth interface interactions

### 🧮 Smart Algorithms
- **RREF Implementation** - Full Gaussian elimination from scratch
- **Random Vector Testing** - Robustly verify closure properties
- **Numerical Precision** - Handles floating-point arithmetic carefully
- **Edge Case Handling** - Graceful error messages for invalid inputs

### 📱 Responsive Design
- **Desktop** - Side-by-side layouts with sticky controls
- **Tablet** - Stacked views with full-width graphs
- **Mobile** - Optimized touch targets and collapsible sections

### 💾 Smart Features
- **localStorage** - Saves your quiz scores
- **Quick Examples** - One-click test cases in every tool
- **Keyboard Shortcuts** - Tab navigation, Enter to submit
- **Print-Friendly** - Clean output for documentation

---

## 🚀 Usage Examples

### Example 1: Is This a Subspace?

**Question:** Is `W = {(x, y, z) | x + y + z = 0}` a subspace of ℝ³?

**Steps:**
1. Open `vector_space.html`
2. Select "📝 Check by Equation"
3. Choose dimension: ℝ³
4. Enter: a=1, b=1, c=1, d=0
5. Click "Check if Subspace"

**Result:**
```
✅ This IS a Subspace!

✅ Contains zero vector
✅ Closed under addition  
✅ Closed under scalar multiplication

[3D visualization shows plane through origin]
```

---

### Example 2: Solve a System

**System:**
```
x + 2y - z = 1
2x + 3y + z = 3
x + y + 2z = 2
```

**Steps:**
1. Open `index.html`
2. Select "Gauss-Jordan" tab
3. Enter coefficients in 3×4 matrix
4. Click "Calculate RREF"

**Result:** Step-by-step reduction + solution!

---

### Example 3: Test Your Knowledge

**Goal:** Master determinants

**Steps:**
1. Open `practice.html`
2. Select "Determinants" topic
3. Generate 5 problems
4. Answer and check
5. Review explanations for mistakes

**Outcome:** Instant score + feedback!

---

## 🎓 Key Concepts Covered

### Linear Systems
- ✅ Consistent vs inconsistent systems
- ✅ Unique, infinite, or no solutions
- ✅ Row operations and equivalence
- ✅ Augmented matrix notation

### Matrix Theory
- ✅ Matrix addition, multiplication, transpose
- ✅ Identity and zero matrices
- ✅ Determinants and properties
- ✅ Invertibility conditions
- ✅ Elementary matrices

### Vector Spaces
- ✅ 8 vector space axioms
- ✅ 3 subspace conditions
- ✅ Span of vector sets
- ✅ Linear independence
- ✅ Basis and dimension
- ✅ Rank-nullity theorem

### Geometric Interpretations
- ✅ Lines through origin (1D subspaces)
- ✅ Planes through origin (2D subspaces)
- ✅ Vectors as arrows in space
- ✅ Orthogonality and angles

---

## 🔧 Customization & Extension

### Add More Practice Problems

Edit `data/practice-bank.json`:

```json
{
  "systems": [
    {
      "id": "sys_7",
      "type": "mcq",
      "q": "Your question here?",
      "options": ["A", "B", "C", "D"],
      "answer": "B",
      "explain": "Explanation here"
    }
  ]
}
```

### Add Vector Examples

Edit `examples_vector.json`:

```json
{
  "equations": [
    {
      "title": "My Example",
      "dim": 3,
      "coef": [1, 2, 3],
      "constant": 0
    }
  ]
}
```

---

## 🐛 Troubleshooting

### Problem: Visualizations don't appear
**Solution:** Ensure Plotly.js CDN is accessible. Check browser console for errors.

### Problem: MathJax formulas not rendering
**Solution:** Wait a few seconds for MathJax to load. Refresh page if needed.

### Problem: Practice scores not saving
**Solution:** Check browser allows localStorage (disable private/incognito mode).

### Problem: Buttons not responding
**Solution:** Check browser console for JavaScript errors. Ensure all JS files are loaded.

---

## 📚 Documentation

Explore detailed guides:

- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - Technical overview
- **[VECTOR_SPACE_FEATURE.md](./VECTOR_SPACE_FEATURE.md)** - Vector analyzer deep dive
- **[VECTOR_SPACE_QUICKSTART.md](./VECTOR_SPACE_QUICKSTART.md)** - Vector tool guide
- **[PRACTICE_SETS_README.md](./PRACTICE_SETS_README.md)** - Quiz system details
- **[PRACTICE_SETS_QUICKSTART.md](./PRACTICE_SETS_QUICKSTART.md)** - Practice guide

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. **Report Bugs** - Open an issue with details
2. **Suggest Features** - Share your ideas
3. **Add Problems** - Contribute to practice bank
4. **Improve Docs** - Help clarify explanations
5. **Fix Code** - Submit pull requests

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- **Plotly.js** - Incredible visualization library
- **MathJax** - Beautiful math rendering
- **Linear Algebra Community** - Inspiration and feedback
- **Students & Educators** - The reason this exists

---

## 🎯 Project Status

**Version:** 1.0.0  
**Status:** ✅ Complete and Fully Functional  
**Last Updated:** October 2025

### What's Working:
✅ All 4 main tools operational  
✅ 32 practice problems with grading  
✅ 3D visualizations functional  
✅ Responsive design implemented  
✅ Documentation complete  

### Future Enhancements:
🔮 More practice problems  
🔮 Additional visualization modes  
🔮 Export/print functionality  
🔮 User accounts for progress tracking  
🔮 Mobile app version  

---

## 📞 Contact & Support

- **Repository:** [LinearLab on GitHub](https://github.com/hussainhht/LinearLab_)
- **Branch:** `linerarlap-learning`
- **Issues:** Use GitHub Issues for bug reports
- **Questions:** Open a discussion on GitHub

---

## ⭐ Star This Repo!

If LinearLab helps you understand linear algebra better, consider giving it a star ⭐ on GitHub!

---

## 🎉 Start Learning!

Ready to master linear algebra? 

**Choose your adventure:**

1. 🔰 **New to Linear Algebra?** → Start with `learn.html`
2. 🎯 **Need to solve problems?** → Go to `index.html`
3. 🧮 **Studying vector spaces?** → Open `vector_space.html`
4. 📝 **Want to practice?** → Try `practice.html`

**No matter where you start, you're on the path to mastery! 🚀✨**

---

<div align="center">

Made with ❤️ and ☕ for students everywhere

**Happy Learning! 🎓**

</div>
