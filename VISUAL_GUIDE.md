# 📊 Visual Guide - Vector Space & Subspace Analyzer

## 🗺️ Tool Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                  VECTOR SPACE ANALYZER                      │
│                    (vector_space.html)                      │
└─────────────────────────────────────────────────────────────┘
                           │
           ┌───────────────┼───────────────┐
           │               │               │
    ┌──────▼──────┐ ┌──────▼──────┐ ┌─────▼───────┐
    │   MODE 1    │ │   MODE 2    │ │   MODE 3    │
    │  Equation   │ │   Vectors   │ │  Learning   │
    └──────┬──────┘ └──────┬──────┘ └─────┬───────┘
           │               │               │
    ┌──────▼──────┐ ┌──────▼──────┐ ┌─────▼───────┐
    │  Subspace   │ │   Linear    │ │  Theory &   │
    │   Testing   │ │Independence │ │  Examples   │
    └──────┬──────┘ └──────┬──────┘ └─────┬───────┘
           │               │               │
    ┌──────▼──────┐ ┌──────▼──────┐ ┌─────▼───────┐
    │ 2D/3D Viz   │ │ Vector Viz  │ │  Practice   │
    │  (Plotly)   │ │  (Plotly)   │ │  Problems   │
    └─────────────┘ └─────────────┘ └─────────────┘
```

---

## 🎨 User Interface Layout

### **Mode 1: Check by Equation**
```
┌─────────────────────────────────────────────────────────────┐
│  📝 Check by Equation  │  🧮 Check by Vectors  │  🧠 Learn  │
├─────────────────────┬───────────────────────────────────────┤
│  CONTROL PANEL      │  RESULTS                              │
│  (Sticky Sidebar)   │                                       │
│                     │  ┌─────────────────────────────────┐  │
│  📊 Matrix Setup    │  │  ✅/❌ Main Result Box          │  │
│  ┌───────────────┐  │  └─────────────────────────────────┘  │
│  │ Dimension: ℝ³ │  │                                       │
│  │ a: [1]        │  │  ┌─────────────────────────────────┐  │
│  │ b: [1]        │  │  │  🔍 Detailed Verification       │  │
│  │ c: [1]        │  │  │  1. Zero vector ✅              │  │
│  │ d: [0]        │  │  │  2. Addition closure ✅         │  │
│  └───────────────┘  │  │  3. Scalar mult closure ✅      │  │
│                     │  └─────────────────────────────────┘  │
│  [Check Subspace]   │                                       │
│                     │  ┌─────────────────────────────────┐  │
│  📖 Quick Examples  │  │  📊 Visualization               │  │
│  [x+y+z=0 ✅]      │  │  [Interactive 3D Graph]         │  │
│  [x=2y ✅]         │  │  (Rotate, Zoom, Pan)            │  │
│  [x+y=1 ❌]        │  │                                 │  │
└─────────────────────┴───────────────────────────────────────┘
```

### **Mode 2: Check by Vectors**
```
┌─────────────────────────────────────────────────────────────┐
│  📝 Equation  │  🧮 Check by Vectors (ACTIVE)  │  🧠 Learn  │
├─────────────────────┬───────────────────────────────────────┤
│  CONTROL PANEL      │  ANALYSIS RESULTS                     │
│                     │                                       │
│  🧮 Vector Setup    │  ┌─────────────────────────────────┐  │
│  ┌───────────────┐  │  │  ✅ Linearly Independent!       │  │
│  │ Dimension: ℝ³ │  │  └─────────────────────────────────┘  │
│  │ Count: 3      │  │                                       │
│  └───────────────┘  │  ┌─────────────────────────────────┐  │
│                     │  │  📊 Properties:                  │  │
│  Vector v₁:         │  │  • Rank: 3                      │  │
│  [ 1, 0, 0 ]        │  │  • Forms Basis: ✅              │  │
│                     │  │  • Span Dimension: 3            │  │
│  Vector v₂:         │  └─────────────────────────────────┘  │
│  [ 0, 1, 0 ]        │                                       │
│                     │  ┌─────────────────────────────────┐  │
│  Vector v₃:         │  │  📊 Vector Visualization        │  │
│  [ 0, 0, 1 ]        │  │  [3D Arrows from Origin]        │  │
│                     │  │  (Different colors per vector)  │  │
│  [Analyze Vectors]  │  └─────────────────────────────────┘  │
└─────────────────────┴───────────────────────────────────────┘
```

### **Mode 3: Interactive Learning**
```
┌─────────────────────────────────────────────────────────────┐
│  📝 Equation  │  🧮 Vectors  │  🧠 Interactive Learning     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ▶ 1. What is a Vector Space?                              │
│  ├─ Definition & 8 Axioms                                   │
│  ├─ [Visual Axiom Cards Grid]                               │
│  └─ Examples of Vector Spaces                               │
│                                                             │
│  ▼ 2. What is a Subspace? (EXPANDED)                        │
│  ├─────────────────────────────────────────────────────┐   │
│  │ 📘 Definition                                        │   │
│  │ A subspace W of V is a subset that is itself a VS   │   │
│  │                                                      │   │
│  │ 🎯 The 3-Condition Test:                            │   │
│  │ ┌────────────────────────────────────────────────┐  │   │
│  │ │ 1️⃣ Contains Zero Vector: 0 ∈ W              │  │   │
│  │ │ 2️⃣ Closed Under Addition: u+v ∈ W           │  │   │
│  │ │ 3️⃣ Closed Under Scalar Mult: cu ∈ W         │  │   │
│  │ └────────────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ▶ 3. Examples: Subspaces vs Non-Subspaces                 │
│  ├─ [Split view: ✅ Subspaces | ❌ Non-Subspaces]         │
│  └─ Each with full verification                             │
│                                                             │
│  ▶ 4. Span, Linear Independence & Basis                    │
│  └─ [Definitions + Examples]                                │
│                                                             │
│  ▶ 5. Interactive Practice Problems                        │
│  ├─ Problem 1 [Show Answer ▼]                              │
│  ├─ Problem 2 [Show Answer ▼]                              │
│  └─ Problem 3 [Show Answer ▼]                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Mode Switching Flow

```
         User Opens vector_space.html
                    │
                    ▼
         ┌──────────────────────┐
         │  Default: MODE 1     │
         │  (Check by Equation) │
         └──────────────────────┘
                    │
         ┌──────────┼──────────┐
         │          │          │
    Click Tab  Click Tab  Click Tab
         │          │          │
         ▼          ▼          ▼
      MODE 1     MODE 2     MODE 3
    (Equation) (Vectors)  (Learning)
         │          │          │
    Show Mode1  Show Mode2  Show Mode3
     Content     Content     Content
         │          │          │
    Hide Others Hide Others Hide Others
```

---

## 📊 Data Flow

### **Mode 1: Equation → Subspace Check**
```
User Input (a, b, c, d)
         │
         ▼
Parse Coefficients
         │
         ▼
Validate Input (all zeros?)
         │
         ▼
┌────────┴─────────┐
│                  │
▼                  ▼
Check Zero Vec   Generate Random
(constant=0?)    Satisfying Vectors
│                  │
▼                  ▼
Test Addition    Test Scalar Mult
Closure          Closure
│                  │
└────────┬─────────┘
         │
         ▼
Combine Results
         │
         ▼
Generate Visualization
         │
         ▼
Display Results + Graph
```

### **Mode 2: Vectors → Independence Analysis**
```
User Input (vectors)
         │
         ▼
Parse Vector Components
         │
         ▼
Build Matrix (vectors as rows)
         │
         ▼
Compute RREF
┌────────┴────────┐
│  Pivot Finding  │
│  Row Scaling    │
│  Elimination    │
└────────┬────────┘
         │
         ▼
Count Non-Zero Rows (Rank)
         │
    ┌────┴────┐
    │         │
    ▼         ▼
Rank =     Rank <
VectorCount VectorCount
    │         │
    ▼         ▼
Independent Dependent
    │         │
    └────┬────┘
         │
         ▼
Check Basis (rank = dimension?)
         │
         ▼
Generate Visualization
         │
         ▼
Display Results + Graph
```

---

## 🎨 Color Coding System

```
┌──────────────────────────────────────────────────┐
│  COLOR          │  MEANING        │  USAGE       │
├──────────────────────────────────────────────────┤
│  🟢 Green       │  Success        │  Subspace    │
│  (#10b981)      │  Pass           │  Independent │
│                 │                 │  Valid       │
├──────────────────────────────────────────────────┤
│  🔴 Red         │  Failure        │  Not subsp.  │
│  (#ef4444)      │  Fail           │  Dependent   │
│                 │                 │  Invalid     │
├──────────────────────────────────────────────────┤
│  🔵 Blue        │  Information    │  Details     │
│  (#6366f1)      │  Neutral        │  Properties  │
│                 │                 │  Analysis    │
├──────────────────────────────────────────────────┤
│  🟡 Gold        │  Highlight      │  Origin      │
│  (#fbbf24)      │  Important      │  Pivot       │
│                 │                 │  Special     │
├──────────────────────────────────────────────────┤
│  🟣 Purple      │  Secondary      │  Theory      │
│  (#8b5cf6)      │  Accent         │  Definitions │
└──────────────────────────────────────────────────┘
```

---

## 🧮 Algorithm Complexity

### **RREF Algorithm**
```
Input: m×n matrix
Time Complexity: O(m × n × min(m,n)) ≈ O(n³) for square
Space Complexity: O(m × n)

Process:
1. For each pivot column (n iterations)
   ├─ Find pivot (m comparisons)
   ├─ Scale row (n operations)
   └─ Eliminate column (m × n operations)

Total: O(n × m × n) = O(mn²)
For square matrices: O(n³)
```

### **Subspace Testing**
```
Input: Coefficients + dimension
Time Complexity: O(n) where n = dimension
Space Complexity: O(n)

Process:
1. Zero vector test: O(1)
2. Random vector generation: O(n)
3. Addition test: O(n)
4. Scalar test: O(n)

Total: O(n)
```

---

## 📱 Responsive Breakpoints

```
┌─────────────────────────────────────────────┐
│  DEVICE         │  WIDTH    │  LAYOUT      │
├─────────────────────────────────────────────┤
│  Desktop        │  > 1200px │  2-column    │
│  (Primary)      │           │  Sidebar +   │
│                 │           │  Main        │
├─────────────────────────────────────────────┤
│  Tablet         │  768-1200 │  1-column    │
│  (Stacked)      │           │  Full width  │
│                 │           │  Stacked     │
├─────────────────────────────────────────────┤
│  Mobile         │  < 768px  │  Full width  │
│  (Compact)      │           │  Collapsible │
│                 │           │  sections    │
└─────────────────────────────────────────────┘
```

---

## 🎯 Decision Tree: Mode Selection

```
                 User's Question
                       │
        ┌──────────────┼──────────────┐
        │              │              │
  "Is this a    "Are these     "What is a
   subspace?"    independent?"  subspace?"
        │              │              │
        ▼              ▼              ▼
   Have equation? Have vectors?  Need theory?
        │              │              │
        ▼              ▼              ▼
    MODE 1         MODE 2         MODE 3
   (Equation)     (Vectors)      (Learning)
        │              │              │
        ▼              ▼              ▼
  Enter a,b,c,d   Enter vectors  Read sections
        │              │              │
        ▼              ▼              ▼
  Click Check    Click Analyze   Try problems
        │              │              │
        ▼              ▼              ▼
  See if passes  See rank/basis  Test knowledge
   3 conditions   & independence
```

---

## 🔄 Learning Path Diagram

```
┌────────────────────────────────────────────────────────┐
│                 RECOMMENDED LEARNING PATH              │
└────────────────────────────────────────────────────────┘

     START HERE
         │
         ▼
   MODE 3: Section 1
   (Vector Spaces)
         │
    Learn 8 axioms
         │
         ▼
   MODE 3: Section 2
   (Subspaces)
         │
   Learn 3 conditions
         │
         ▼
      MODE 1
   (Try Examples)
         │
   Test subspace equations
         │
         ▼
   MODE 3: Section 3
   (Examples)
         │
   See worked examples
         │
         ▼
      MODE 2
   (Try Examples)
         │
   Test vector independence
         │
         ▼
   MODE 3: Section 4
   (Advanced)
         │
   Learn span/basis
         │
         ▼
   MODE 3: Section 5
   (Practice)
         │
   Solve 5 problems
         │
         ▼
   CREATE OWN TESTS
   (Modes 1 & 2)
         │
         ▼
      MASTERY!
```

---

## 🎓 Concept Hierarchy

```
                    VECTOR SPACES
                         │
        ┌────────────────┼────────────────┐
        │                │                │
    SUBSPACES      LINEAR ALGEBRA    OPERATIONS
        │            CONCEPTS             │
        │                │                │
    ┌───┴───┐       ┌────┴────┐      ┌───┴───┐
    │       │       │         │      │       │
  Test   Verify  Span    Indep.  Add   Scalar
  (3)            │         │      │       Mult
                 │         │      │
             ┌───┴───┐     │      │
             │       │     │      │
           Basis  Dimension Rank  │
                             │    │
                         ┌───┴────┴───┐
                         │            │
                      RREF      Properties
```

---

## 📊 Feature Comparison Matrix

```
┌────────────────────────────────────────────────────────────┐
│ FEATURE           │ MODE 1 │ MODE 2 │ MODE 3 │           │
├────────────────────────────────────────────────────────────┤
│ Input Type        │ Equation│ Vectors│ None   │           │
│ Subspace Check    │   ✅    │   ❌   │   📖   │           │
│ Independence      │   ❌    │   ✅   │   📖   │           │
│ Rank Calculation  │   ❌    │   ✅   │   📖   │           │
│ Basis Check       │   ❌    │   ✅   │   📖   │           │
│ Visualization     │   ✅    │   ✅   │   ❌   │           │
│ Theory Content    │   ❌    │   ❌   │   ✅   │           │
│ Practice Problems │   ❌    │   ❌   │   ✅   │           │
│ Quick Examples    │   ✅    │   ✅   │   ❌   │           │
│ Step-by-Step      │   ✅    │   ✅   │   ✅   │           │
└────────────────────────────────────────────────────────────┘
```

---

## 🎨 Style Inheritance

```
main.css (Base Styles)
    │
    ├─ Colors (CSS Variables)
    ├─ Typography
    ├─ Buttons
    └─ Layout basics
         │
         ▼
vector.css (Specific Styles)
    │
    ├─ Mode layouts
    ├─ Control panels
    ├─ Result boxes
    ├─ Learning sections
    └─ Responsive overrides
```

---

## 🔌 External Dependencies

```
vector_space.html
    │
    ├─── Plotly.js (CDN)
    │    └─ 2D/3D interactive graphs
    │
    ├─── MathJax 3 (CDN)
    │    └─ LaTeX math rendering
    │
    ├─── main.css (Local)
    │    └─ Base theme
    │
    ├─── vector.css (Local)
    │    └─ Specific styles
    │
    └─── vector.js (Local)
         └─ All logic
```

---

**This visual guide provides a comprehensive overview of the tool's structure, flow, and relationships! 🎨📊**
