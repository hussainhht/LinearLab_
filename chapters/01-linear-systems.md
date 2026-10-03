---
id: "01-linear-systems"
title: "1.1 — Systems of linear equations"
course: "MATHS211"
type: "chapter-section"
order: 1
language: "en"
source_ids: ["1xi5fsvPZIIe-pLeElSEwtkIQ6hPUGrJR", "1W6ccs1k1L1R3RWBqF3FkcNbNq1ay0cD6"]
source_page_count: 2
content_format: "complete_transcription_with_archival_references"
source_coverage: "all pages of every listed source version"
editable_transcription: "complete transcription of all source versions, diagrams, and reconciled website content"
transcribed_source_ids: ["1xi5fsvPZIIe-pLeElSEwtkIQ6hPUGrJR", "1W6ccs1k1L1R3RWBqF3FkcNbNq1ay0cD6"]
---

# 1.1 — Systems of Linear Equations

## 1. Mathematical Definitions and General Form

A system of $n$ linear equations in $p$ variables (or unknowns) $x_1, x_2, \ldots, x_p$ is a collection of equations of the form:

$$
(*) \quad \begin{cases}
a_{11}x_1 + a_{12}x_2 + \cdots + a_{1p}x_p = b_1 \\
a_{21}x_1 + a_{22}x_2 + \cdots + a_{2p}x_p = b_2 \\
\quad \vdots \\
a_{n1}x_1 + a_{n2}x_2 + \cdots + a_{np}x_p = b_n
\end{cases}
$$

where:
- $a_{ij} \in \mathbb{R}$ are the **coefficients** of the system ($1 \le i \le n$, $1 \le j \le p$).
- $b_1, b_2, \ldots, b_n \in \mathbb{R}$ are the **constant terms** (right-hand side).
- $x_1, x_2, \ldots, x_p$ are the **unknowns** (variables).

Each equation is linear because every variable appears only to the first power, is multiplied solely by a constant scalar, and no variables are multiplied together or nested inside nonlinear functions (such as trigonometric, exponential, or root functions).

---

## 2. Complete Source Transcription — Version 1

*Source file:* `1.1_Introduction_to_system_of_linear_equations[1].pdf` (Parts 1–6)

### 2.1 Examples of Linear Systems (Part 1)

**(a) Two equations in three variables ($n=2, p=3$):**

$$
\begin{cases}
x - 3y + z = 1 \\
2x + 4y + 5z = 2
\end{cases}
$$

**(b) One equation in four variables ($n=1, p=4$):**

$$
x + y - z + t = 0
$$

**(c) Two equations in four variables ($n=2, p=4$):**

$$
\begin{cases}
x_1 + 2x_2 + 3x_3 + 4x_4 = 1 \\
x_1 - 2x_3 = -1
\end{cases}
$$

*Source annotation:* In the second equation, missing variables have coefficient zero, i.e., $x_1 + 0x_2 - 2x_3 + 0x_4 = -1$.

### 2.2 Nonlinear Systems (Part 2)

The following systems are **not** linear:

**(a′)**
$$
\begin{cases}
x_1 - 2x_2^{-3} + x_3 = 0 \\
x_1 + x_2 + x_3 = 1
\end{cases}
$$
*Reason:* The term $x_2^{-3} = \dfrac{1}{x_2^3}$ involves a negative power, which is nonlinear.

**(b′)**
$$
\begin{cases}
x - \cos y + 3z = 0 \\
2x + y - z = -1
\end{cases}
$$
*Reason:* The presence of the trigonometric function $\cos y$ violates linearity.

**(c′)**
$$
x_1 + x_2 + 3x_1 x_2 = 0
$$
*Reason:* The product term $x_1 x_2$ is nonlinear (degree 2).

### 2.3 Consistency and Classification of Solutions (Parts 2 & 3)

- **Definition:** A system of linear equations is called **consistent** if it has *at least one* solution.
- **Definition:** A system is called **inconsistent** if it has *no solution*.

For any linear system over $\mathbb{R}$, exactly one of three mutually exclusive cases must occur:

| Case | Number of Solutions | Classification |
| :--- | :--- | :--- |
| **Case 1** | A unique solution ($1$ single solution) | **Consistent** |
| **Case 2** | Infinitely many solutions ($\infty$ solutions) | **Consistent** |
| **Case 3** | No solution ($\emptyset$) | **Inconsistent** |

> **Crucial Linear Algebra Property:** A linear system can never have a finite number of solutions other than 0 or 1 (e.g., it can never have exactly 2, 3, or 5 solutions).

### 2.4 Homogeneous Systems (Part 4)

If $b_1 = b_2 = \cdots = b_n = 0$ in system $(*)$, the system is called **homogeneous**:

$$
\begin{cases}
a_{11}x_1 + a_{12}x_2 + \cdots + a_{1p}x_p = 0 \\
a_{21}x_1 + a_{22}x_2 + \cdots + a_{2p}x_p = 0 \\
\quad \vdots \\
a_{n1}x_1 + a_{n2}x_2 + \cdots + a_{np}x_p = 0
\end{cases}
$$

#### Examples:
**(i)**
$$
\begin{cases}
2x - 3y + 4z = 0 \\
x - y - z = 0
\end{cases}
$$

**(ii)**
$$
\begin{cases}
x_1 + x_2 - x_3 = 0 \\
x_1 - 2x_2 = 0 \\
x_1 - x_3 = 0
\end{cases}
$$

*Fundamental Property:* Every homogeneous system is **always consistent**, because setting all unknowns to zero:

$$
(x_1, x_2, \ldots, x_p) = (0, 0, \ldots, 0)
$$

always satisfies the system. This solution is called the **trivial solution**.

### 2.5 Associated Matrices (Parts 4, 5, 6)

To any linear system $(*)$, we associate two matrices:

1. **The Coefficient Matrix (Matrix of the system):**
An $n \times p$ matrix containing only the coefficients:

$$
A = \begin{bmatrix}
a_{11} & a_{12} & \cdots & a_{1p} \\
a_{21} & a_{22} & \cdots & a_{2p} \\
\vdots & \vdots & \ddots & \vdots \\
a_{n1} & a_{n2} & \cdots & a_{np}
\end{bmatrix}
$$

2. **The Augmented Matrix:**
An $n \times (p + 1)$ matrix that appends the constant column vector $b = \begin{bmatrix} b_1 \\ \vdots \\ b_n \end{bmatrix}$ to the coefficient matrix:

$$
[A \mid b] = \left[\begin{array}{cccc|c}
a_{11} & a_{12} & \cdots & a_{1p} & b_1 \\
a_{21} & a_{22} & \cdots & a_{2p} & b_2 \\
\vdots & \vdots & \ddots & \vdots & \vdots \\
a_{n1} & a_{n2} & \cdots & a_{np} & b_n
\end{array}\right]
$$

#### Worked Examples:

**Example 1: Converting a system to an augmented matrix**
Given the system:
$$
\begin{cases}
2x - 3y + 4z = 1 \\
x - y = 2 \quad (\text{missing } z \implies 0z) \\
-2y + z = 3 \quad (\text{missing } x \implies 0x)
\end{cases}
$$

The augmented matrix is:
$$
\left[\begin{array}{rrr|r}
2 & -3 & 4 & 1 \\
1 & -1 & 0 & 2 \\
0 & -2 & 1 & 3
\end{array}\right]
$$

**Example 2: Four variables**
Given:
$$
\begin{cases}
x_1 + x_2 - x_3 + 5x_4 = 1 \\
3x_1 + x_3 - 2x_4 = 0 \quad (\text{missing } x_2 \implies 0x_2)
\end{cases}
$$

The augmented matrix is:
$$
\left[\begin{array}{rrrr|r}
1 & 1 & -1 & 5 & 1 \\
3 & 0 & 1 & -2 & 0
\end{array}\right]
$$

**Example 3: Reconstructing a system from an augmented matrix**
Given:
$$
\left[\begin{array}{rrrr|r}
1 & 2 & 0 & 3 & 5 \\
1 & 1 & 0 & 2 & 1 \\
3 & 1 & -1 & 5 & 6
\end{array}\right]
$$

The corresponding linear system in variables $x_1, x_2, x_3, x_4$ is:
$$
\begin{cases}
x_1 + 2x_2 + 3x_4 = 5 \\
x_1 + x_2 + 2x_4 = 1 \\
3x_1 + x_2 - x_3 + 5x_4 = 6
\end{cases}
$$

**Example 4: Reconstructing a 2-variable system**
Given:
$$
\left[\begin{array}{rr|r}
1 & 1 & 2 \\
2 & -1 & 0 \\
5 & 4 & 1
\end{array}\right]
$$

The corresponding linear system in variables $x_1, x_2$ is:
$$
\begin{cases}
x_1 + x_2 = 2 \\
2x_1 - x_2 = 0 \\
5x_1 + 4x_2 = 1
\end{cases}
$$

---

## 3. Complete Source Transcription — Version 2

*Source file:* `1.1 Introduction to system of linear equations..pdf` (Parts 1–7)

### 3.1 Linear System Examples (Version 2, Part 1)

**(a) Two equations in three variables:**
$$
\begin{cases}
2x + 3y - z = 1 \\
x - y + 4z = 0
\end{cases}
$$

**(b) Three equations in three variables:**
$$
\begin{cases}
x_1 + 2x_2 - 3x_3 = 2 \\
x_1 + x_3 = 1 \\
x_1 - x_2 = -1
\end{cases}
$$

**(c) One equation in four variables:**
$$
x - y + 2z - 3t = 4
$$

### 3.2 Nonlinear Examples (Version 2, Part 2)

**(a′)**
$$
\begin{cases}
x_1 - x_2 + 3(x_1 x_2) = 0 \\
x_1 + x_2 = 1
\end{cases}
\quad \text{(nonlinear due to the product } x_1 x_2 \text{)}
$$

**(b′)**
$$
\begin{cases}
x - 2e^y + 3z = 0 \\
x + y - z = 1
\end{cases}
\quad \text{(nonlinear due to the exponential term } e^y \text{)}
$$

**(c′)**
$$
\begin{cases}
x + y - \cos z = -1 \\
2x + 4y = 0
\end{cases}
\quad \text{(nonlinear due to } \cos z \text{)}
$$

**(d′)**
$$
\begin{cases}
x_1 - x_2 + 3x_3^{-2} + x_4 = 0 \\
x_1 - x_4 = 1 \\
x_1 + x_2 = -1
\end{cases}
\quad \text{(nonlinear due to } x_3^{-2} = \dfrac{1}{x_3^2} \text{)}
$$

### 3.3 Homogeneous Systems (Version 2, Part 4)

**(a)**
$$
\begin{cases}
2x + 3y - z = 0 \\
x + 2z = 0
\end{cases}
$$

**(b)**
$$
\begin{cases}
x_1 - x_2 + x_3 - x_4 = 0 \\
2x_1 + x_3 = 0 \\
x_2 - 5x_4 = 0
\end{cases}
$$
Both have the guaranteed trivial solution $(0, \ldots, 0)$.

### 3.4 Matrix Representations (Version 2, Parts 5–7)

**Example (1): System to Augmented Matrix**
$$
\begin{cases}
2x - y + 3z = 4 \\
y + 5z = -1 \\
x + y + 5z = 0
\end{cases}
\quad \Longrightarrow \quad
\left[\begin{array}{rrr|r}
2 & -1 & 3 & 4 \\
0 & 1 & 5 & -1 \\
1 & 1 & 5 & 0
\end{array}\right]
$$

**Example (2): Four unknowns, three equations**
$$
\begin{cases}
x_1 + x_2 - 3x_3 = 1 \\
x_1 + 4x_3 - 5x_4 = 0 \\
x_1 + 3x_2 - 6x_4 = 0
\end{cases}
\quad \Longrightarrow \quad
\left[\begin{array}{rrrr|r}
1 & 1 & -3 & 0 & 1 \\
1 & 0 & 4 & -5 & 0 \\
1 & 3 & 0 & -6 & 0
\end{array}\right]
$$

**Example (3): Inversely (Matrix to System in $x, y, z, t$)**
$$
\left[\begin{array}{rrrr|r}
1 & 2 & 0 & -1 & 4 \\
0 & 1 & 0 & 1 & 5 \\
1 & 1 & -1 & 0 & 1
\end{array}\right]
\quad \Longrightarrow \quad
\begin{cases}
x + 2y - t = 4 \\
y + t = 5 \\
x + y - z = 1
\end{cases}
$$

**Example (4): Inversely (Matrix to System in $x, y$)**
$$
\left[\begin{array}{rr|r}
2 & -1 & 1 \\
0 & 1 & 2 \\
3 & 1 & 4
\end{array}\right]
\quad \Longrightarrow \quad
\begin{cases}
2x - y = 1 \\
y = 2 \\
3x + y = 4
\end{cases}
$$

---

## 4. Geometric Interpretation of Linear Systems in Two Variables

Consider a system of two linear equations in two unknowns:

$$
\begin{cases}
L: & ax + by = c \\
L': & a'x + b'y = c'
\end{cases}
$$

Each equation represents a straight line in the Euclidean plane $\mathbb{R}^2$. The solution set $S$ corresponds to the geometric intersection $L \cap L'$.

### Visual Representation of the Three Cases

<div align="center">

```xml
<svg viewBox="0 0 780 260" xmlns="http://www.w3.org/2000/svg" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; font-family: ui-sans-serif, system-ui, sans-serif;">
  <!-- CASE 1 -->
  <g transform="translate(10, 10)">
    <text x="120" y="22" font-size="14" font-weight="bold" fill="#0f172a" text-anchor="middle">Case 1: Unique Solution</text>
    <text x="120" y="38" font-size="12" fill="#64748b" text-anchor="middle">L ∩ L' = {M} (Consistent)</text>
    <!-- Axes -->
    <line x1="20" y1="140" x2="220" y2="140" stroke="#94a3b8" stroke-width="1.5" />
    <line x1="120" y1="50" x2="120" y2="230" stroke="#94a3b8" stroke-width="1.5" />
    <!-- Line L -->
    <line x1="40" y1="200" x2="200" y2="90" stroke="#0284c7" stroke-width="2.5" />
    <text x="205" y="95" font-size="13" font-weight="bold" fill="#0284c7">L</text>
    <!-- Line L' -->
    <line x1="80" y1="220" x2="180" y2="60" stroke="#16a34a" stroke-width="2.5" />
    <text x="185" y="65" font-size="13" font-weight="bold" fill="#16a34a">L'</text>
    <!-- Intersection point M -->
    <circle cx="147" cy="126" r="4.5" fill="#dc2626" />
    <line x1="147" y1="126" x2="147" y2="140" stroke="#dc2626" stroke-dasharray="3,3" />
    <line x1="147" y1="126" x2="120" y2="126" stroke="#dc2626" stroke-dasharray="3,3" />
    <text x="150" y="120" font-size="12" font-weight="bold" fill="#dc2626">M(x₀,y₀)</text>
    <text x="120" y="250" font-size="12" fill="#334155" text-anchor="middle">S = {(x₀, y₀)}</text>
  </g>

  <!-- CASE 2 -->
  <g transform="translate(270, 10)">
    <text x="120" y="22" font-size="14" font-weight="bold" fill="#0f172a" text-anchor="middle">Case 2: No Solution</text>
    <text x="120" y="38" font-size="12" fill="#64748b" text-anchor="middle">L ∥ L' (Inconsistent)</text>
    <!-- Axes -->
    <line x1="20" y1="140" x2="220" y2="140" stroke="#94a3b8" stroke-width="1.5" />
    <line x1="120" y1="50" x2="120" y2="230" stroke="#94a3b8" stroke-width="1.5" />
    <!-- Line L -->
    <line x1="50" y1="220" x2="210" y2="100" stroke="#0284c7" stroke-width="2.5" />
    <text x="215" y="105" font-size="13" font-weight="bold" fill="#0284c7">L</text>
    <!-- Line L' (parallel) -->
    <line x1="30" y1="170" x2="190" y2="50" stroke="#16a34a" stroke-width="2.5" />
    <text x="195" y="55" font-size="13" font-weight="bold" fill="#16a34a">L'</text>
    <text x="120" y="250" font-size="12" fill="#334155" text-anchor="middle">S = ∅</text>
  </g>

  <!-- CASE 3 -->
  <g transform="translate(530, 10)">
    <text x="120" y="22" font-size="14" font-weight="bold" fill="#0f172a" text-anchor="middle">Case 3: Infinite Solutions</text>
    <text x="120" y="38" font-size="12" fill="#64748b" text-anchor="middle">L = L' (Consistent)</text>
    <!-- Axes -->
    <line x1="20" y1="140" x2="220" y2="140" stroke="#94a3b8" stroke-width="1.5" />
    <line x1="120" y1="50" x2="120" y2="230" stroke="#94a3b8" stroke-width="1.5" />
    <!-- Coincident Lines -->
    <line x1="40" y1="200" x2="200" y2="80" stroke="#0284c7" stroke-width="4" />
    <line x1="40" y1="200" x2="200" y2="80" stroke="#16a34a" stroke-width="2" stroke-dasharray="6,4" />
    <text x="205" y="85" font-size="13" font-weight="bold" fill="#0f172a">L = L'</text>
    <circle cx="100" cy="155" r="3" fill="#dc2626" />
    <circle cx="140" cy="125" r="3" fill="#dc2626" />
    <circle cx="180" cy="95" r="3" fill="#dc2626" />
    <text x="120" y="250" font-size="12" fill="#334155" text-anchor="middle">S = {all points on line}</text>
  </g>
</svg>
```

</div>

### Detailed Geometric Breakdown:

1. **Intersection at a single point ($L \cap L' = \{M\}$):**
   - Slopes are distinct: $m \ne m'$.
   - The lines cross at exactly one coordinate pair $M = (x_0, y_0)$.
   - The system is consistent with a **unique solution** $S = \{(x_0, y_0)\}$.

2. **Parallel distinct lines ($L \parallel L'$):**
   - Equal slopes but distinct intercepts: $m = m'$ and $b_{\text{int}} \ne b'_{\text{int}}$.
   - The lines never intersect.
   - The system is inconsistent with **no solution** $S = \emptyset$.

3. **Coincident lines ($L = L'$):**
   - Identical slope and identical intercepts (one equation is a non-zero scalar multiple of the other).
   - Every point lying on line $L$ also lies on line $L'$.
   - The system is consistent with **infinitely many solutions**.

---

## 5. Supplementary Course Insights & Reconciled Content

*(Integrated from LinearLab interactive lesson modules and examples)*

### Why can a linear system never have exactly two solutions?
Suppose a linear system $AX = B$ has two distinct solutions $X_1 \ne X_2$. Then:
$$
A(X_1 - X_2) = AX_1 - AX_2 = B - B = 0
$$
Let $V = X_1 - X_2 \ne 0$. For any real scalar $k \in \mathbb{R}$, consider $X_k = X_1 + k V$:
$$
A(X_k) = A(X_1 + k V) = AX_1 + k(AV) = B + k(0) = B
$$
Since there are infinitely many choices of $k \in \mathbb{R}$, each yielding a distinct vector $X_k$, the existence of two solutions guarantees the existence of uncountably many solutions.

### Theorem: Homogeneous Systems with $p > n$
If a homogeneous system has strictly more variables ($p$) than equations ($n$), then:
- The system must have at least one **free variable**.
- Consequently, it always has **infinitely many non-trivial solutions** in addition to the trivial solution.

---

## 6. Archival Source Reference & Verification Ledger

The original handwritten document images are archived in the workspace assets directory for verification:

| Source File | Source ID | Page | Part | Local Asset Path | Coverage Anchor |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `1.1_Introduction_to_system_of_linear_equations[1].pdf` | `1xi5fsvPZIIe-pLeElSEwtkIQ6hPUGrJR` | 1 | 1 | `../assets/01-linear-systems-1/page-001-part-001.webp` | [§ 2.1](#21-examples-of-linear-systems-part-1) |
| `1.1_Introduction_to_system_of_linear_equations[1].pdf` | `1xi5fsvPZIIe-pLeElSEwtkIQ6hPUGrJR` | 1 | 2 | `../assets/01-linear-systems-1/page-001-part-002.webp` | [§ 2.2](#22-nonlinear-systems-part-2) |
| `1.1_Introduction_to_system_of_linear_equations[1].pdf` | `1xi5fsvPZIIe-pLeElSEwtkIQ6hPUGrJR` | 1 | 3 | `../assets/01-linear-systems-1/page-001-part-003.webp` | [§ 2.3 & § 4](#4-geometric-interpretation-of-linear-systems-in-two-variables) |
| `1.1_Introduction_to_system_of_linear_equations[1].pdf` | `1xi5fsvPZIIe-pLeElSEwtkIQ6hPUGrJR` | 1 | 4 | `../assets/01-linear-systems-1/page-001-part-004.webp` | [§ 2.4 & § 2.5](#24-homogeneous-systems-part-4) |
| `1.1_Introduction_to_system_of_linear_equations[1].pdf` | `1xi5fsvPZIIe-pLeElSEwtkIQ6hPUGrJR` | 1 | 5 | `../assets/01-linear-systems-1/page-001-part-005.webp` | [§ 2.5 Examples 1–2](#worked-examples) |
| `1.1_Introduction_to_system_of_linear_equations[1].pdf` | `1xi5fsvPZIIe-pLeElSEwtkIQ6hPUGrJR` | 1 | 6 | `../assets/01-linear-systems-1/page-001-part-006.webp` | [§ 2.5 Examples 3–4](#worked-examples) |
| `1.1 Introduction to system of linear equations..pdf` | `1W6ccs1k1L1R3RWBqF3FkcNbNq1ay0cD6` | 1 | 1 | `../assets/01-linear-systems-2/page-001-part-001.webp` | [§ 3.1](#31-linear-system-examples-version-2-part-1) |
| `1.1 Introduction to system of linear equations..pdf` | `1W6ccs1k1L1R3RWBqF3FkcNbNq1ay0cD6` | 1 | 2 | `../assets/01-linear-systems-2/page-001-part-002.webp` | [§ 3.2](#32-nonlinear-examples-version-2-part-2) |
| `1.1 Introduction to system of linear equations..pdf` | `1W6ccs1k1L1R3RWBqF3FkcNbNq1ay0cD6` | 1 | 3 | `../assets/01-linear-systems-2/page-001-part-003.webp` | [§ 3.2 & § 4](#4-geometric-interpretation-of-linear-systems-in-two-variables) |
| `1.1 Introduction to system of linear equations..pdf` | `1W6ccs1k1L1R3RWBqF3FkcNbNq1ay0cD6` | 1 | 4 | `../assets/01-linear-systems-2/page-001-part-004.webp` | [§ 3.3](#33-homogeneous-systems-version-2-part-4) |
| `1.1 Introduction to system of linear equations..pdf` | `1W6ccs1k1L1R3RWBqF3FkcNbNq1ay0cD6` | 1 | 5 | `../assets/01-linear-systems-2/page-001-part-005.webp` | [§ 3.4 Example 1](#34-matrix-representations-version-2-parts-57) |
| `1.1 Introduction to system of linear equations..pdf` | `1W6ccs1k1L1R3RWBqF3FkcNbNq1ay0cD6` | 1 | 6 | `../assets/01-linear-systems-2/page-001-part-006.webp` | [§ 3.4 Examples 2–3](#34-matrix-representations-version-2-parts-57) |
| `1.1 Introduction to system of linear equations..pdf` | `1W6ccs1k1L1R3RWBqF3FkcNbNq1ay0cD6` | 1 | 7 | `../assets/01-linear-systems-2/page-001-part-007.webp` | [§ 3.4 Example 4](#34-matrix-representations-version-2-parts-57) |
