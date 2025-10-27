# Vector Space & Subspace Analyzer 📐

## Overview

The **Vector Space & Subspace Analyzer** is an interactive educational tool that helps students understand vector spaces, subspaces, linear independence, span, and basis concepts through three distinct modes of interaction.

---

## 🎯 Features

### **Mode 1: Check by Equation** 📝
- Enter linear equations in the form `ax + by (+ cz) = c`
- Automatically verifies all three subspace conditions:
  1. Contains the zero vector
  2. Closed under vector addition
  3. Closed under scalar multiplication
- **Visual Representation:**
  - 2D: Displays lines and checks if they pass through the origin
  - 3D: Renders planes in 3D space with Plotly
- Instant feedback with detailed explanations

**Example Use Cases:**
- ✅ `W = { (x, y, z) | x + y + z = 0 }` → Subspace (plane through origin)
- ❌ `W = { (x, y) | x + y = 1 }` → NOT a subspace (line not through origin)

---

### **Mode 2: Check by Vectors** 🧮
- Input a set of vectors (2-4 vectors in ℝ² or ℝ³)
- Analyzes the vector set to determine:
  - **Linear Independence**: Are they linearly independent?
  - **Rank**: What dimension do they span?
  - **Basis**: Do they form a basis for ℝⁿ?
  - **Span Dimension**: What is the dimension of their span?
- **Technical Implementation:**
  - Constructs matrix from vectors
  - Performs RREF (Reduced Row Echelon Form)
  - Counts pivots to determine rank
- **3D Visualization**: Displays vectors as arrows from the origin

**Example Use Cases:**
- Test if vectors form a basis
- Check linear dependence
- Visualize vector relationships in 2D/3D

---

### **Mode 3: Interactive Learning** 🧠
Comprehensive learning materials organized into collapsible sections:

#### **Section 1: What is a Vector Space?**
- Definition and the 8 vector space axioms
- Visual axiom cards with examples
- Common examples: ℝⁿ, matrices, polynomials, functions

#### **Section 2: What is a Subspace?**
- The 3-condition subspace test (in detail)
- Clear explanation of each condition
- Why these conditions are sufficient

#### **Section 3: Examples - Subspaces vs Non-Subspaces**
- **✅ Subspace Examples:**
  - Lines through origin
  - Planes through origin
  - Coordinate planes (xz-plane, xy-plane)
- **❌ Non-Subspace Examples:**
  - Shifted lines/planes (not through origin)
  - First quadrant (fails scalar multiplication)
  - Union of lines (fails closure)
- Each example includes full verification

#### **Section 4: Span, Linear Independence & Basis**
- Definitions with mathematical rigor
- Standard basis examples
- Relationship between concepts

#### **Section 5: Interactive Practice Problems**
- 5 curated problems with toggle-able solutions
- Mix of equation-based and vector-based questions
- Immediate feedback

---

## 🛠️ Technical Implementation

### **File Structure**
```
├── temp/
│   └── vector_space.html          # Main HTML interface
├── style/
│   └── vector.css                 # Styling for vector space tool
├── js/
│   └── vector.js                  # Core logic and algorithms
└── examples_vector.json           # Pre-defined examples (optional)
```

### **Key Algorithms**

#### **1. Subspace Testing (Mode 1)**
```javascript
function performSubspaceTest(coefficients, constant, dimension) {
    // Test 1: Zero vector (constant must be 0)
    // Test 2: Closure under addition (random vector testing)
    // Test 3: Closure under scalar multiplication
}
```

#### **2. RREF Algorithm (Mode 2)**
```javascript
function computeRREF(matrix) {
    // Gaussian elimination with full reduction
    // Returns reduced row echelon form
    // Used to determine rank and linear independence
}
```

#### **3. Vector Analysis**
```javascript
function analyzeVectorSet(vectors, dimension) {
    // Constructs matrix from vectors
    // Computes RREF to find rank
    // Determines: independence, basis status, span dimension
}
```

### **Visualization Libraries**
- **Plotly.js**: For 2D/3D interactive graphs
- **MathJax**: For rendering mathematical notation
- **Pure JavaScript**: No additional frameworks required

---

## 📊 Mathematical Foundation

### **Vector Space Axioms (8 Properties)**
1. **Closure under addition**: u + v ∈ V
2. **Commutativity**: u + v = v + u
3. **Associativity**: (u + v) + w = u + (v + w)
4. **Zero vector exists**: ∃ 0 : u + 0 = u
5. **Additive inverse exists**: ∃ -u : u + (-u) = 0
6. **Closure under scalar mult**: c·u ∈ V
7. **Distributivity**: c(u + v) = cu + cv
8. **Scalar identity**: 1·u = u

### **Subspace Test (3 Conditions)**
For W ⊆ V to be a subspace:
1. **0 ∈ W**
2. **If u, v ∈ W ⇒ u + v ∈ W**
3. **If u ∈ W, c ∈ ℝ ⇒ c·u ∈ W**

### **Linear Independence**
Vectors {v₁, v₂, ..., vₖ} are linearly independent if:
```
c₁v₁ + c₂v₂ + ... + cₖvₖ = 0  ⟹  c₁ = c₂ = ... = cₖ = 0
```

### **Basis**
A set of vectors is a **basis** for a subspace W if:
1. They **span** W (every vector in W is their linear combination)
2. They are **linearly independent**

The number of vectors in a basis = **dimension** of W

---

## 🎨 User Interface Features

### **Design Philosophy**
- **Dark theme** with high contrast for readability
- **Color-coded results**:
  - 🟢 Green: Success/Subspace/Independent
  - 🔴 Red: Failure/Not a subspace/Dependent
  - 🔵 Blue: Informational
- **Smooth animations** for mode switching and result display
- **Sticky control panel** for easy access

### **Responsive Design**
- Works on desktop and tablet devices
- Mobile-friendly with collapsible sections
- Adaptive grid layouts

### **Accessibility**
- Clear visual feedback
- Detailed explanations for every result
- Step-by-step verification display

---

## 🚀 Usage Examples

### **Example 1: Check if a set is a subspace**
```
Input: W = { (x, y, z) | x + y + z = 0 }
Mode: Check by Equation
Dimension: ℝ³
Coefficients: a=1, b=1, c=1, d=0

Result: ✅ This IS a subspace!
- Contains zero vector ✅
- Closed under addition ✅
- Closed under scalar multiplication ✅

Visualization: 3D plane through origin
```

### **Example 2: Test linear independence**
```
Input: v₁ = (1, 2, 3), v₂ = (2, 4, 6)
Mode: Check by Vectors
Dimension: ℝ³
Vector count: 2

Result: ❌ Linearly Dependent
- Rank: 1
- v₂ = 2·v₁ (one is a scalar multiple of the other)
- Span dimension: 1 (they span a line)
- Do NOT form a basis for ℝ³

Visualization: Two collinear vectors in 3D
```

### **Example 3: Verify a basis**
```
Input: v₁ = (1,0,0), v₂ = (0,1,0), v₃ = (0,0,1)
Mode: Check by Vectors
Dimension: ℝ³
Vector count: 3

Result: ✅ Linearly Independent!
- Rank: 3
- Forms a basis: YES ✅
- This is the standard basis for ℝ³
- Every vector in ℝ³ can be uniquely expressed using these three vectors

Visualization: Three orthogonal unit vectors
```

---

## 🧪 Testing & Validation

### **Built-in Examples**
The tool includes **quick example buttons** in each mode:

**Mode 1 (Equations):**
- ✅ `x + y + z = 0` (subspace)
- ✅ `x = 2y` (subspace in 2D)
- ❌ `x + y = 1` (NOT a subspace)

**Mode 2 (Vectors):**
- Independent vectors
- Dependent vectors
- Standard basis for ℝ³

### **Edge Cases Handled**
- All-zero coefficient detection
- Zero vectors in vector sets
- Numerical precision (tolerance: 1e-10)
- Division by zero prevention
- Out-of-range visualization clamping

---

## 📚 Educational Benefits

### **For Students**
1. **Visual Learning**: See abstract concepts rendered in 2D/3D
2. **Immediate Feedback**: Understand mistakes instantly
3. **Step-by-Step**: Each condition is verified individually
4. **Practice Problems**: Test understanding with guided examples
5. **Reference Material**: Built-in learning mode with comprehensive theory

### **For Instructors**
1. **Classroom Tool**: Project during lectures
2. **Homework Helper**: Students can verify their work
3. **Exam Prep**: Practice problems with solutions
4. **Concept Reinforcement**: Multiple representations of same concept

---

## 🔮 Future Enhancements (Optional)

### **Potential Advanced Features**
1. **3D Visualization for Mode 2**:
   - Use Three.js for better 3D rendering
   - Render span as translucent surfaces
   - Show linear combinations dynamically

2. **Symbolic Input**:
   - Use math.js parser for equations like "x + y - 2z = 0"
   - Support inequalities

3. **More Dimensions**:
   - Support ℝ⁴, ℝ⁵ (no visualization, just algebraic)
   - Abstract vector spaces (polynomials, matrices)

4. **Orthogonalization**:
   - Gram-Schmidt process visualization
   - Orthonormal basis generation

5. **Export/Save**:
   - Save work as PDF
   - Share results via URL parameters

---

## 📖 References & Resources

### **Mathematical Concepts**
- **Vector Spaces**: Chapter 4.1 from Linear Algebra course
- **Subspaces**: Chapter 4.2
- **Linear Independence**: Standard definition
- **Span & Basis**: Chapter 4.3-4.5

### **Libraries Used**
- [Plotly.js](https://plotly.com/javascript/) - Interactive graphing
- [MathJax](https://www.mathjax.org/) - Math rendering
- Pure JavaScript for algorithms

---

## 🎓 Credits

**Built by:** Hussain Ali  
**Institution:** University of Bahrain  
**Course:** Linear Algebra  
**Purpose:** Making math visual & fun ✨

---

## 📝 License

Educational use. Part of the LinearLab project.

---

## 🆘 Support & Feedback

For questions, bug reports, or feature suggestions:
- Check the practice problems in Learning Mode
- Review the example cases
- Experiment with the quick example buttons

---

**Happy Learning! 🚀✨**
