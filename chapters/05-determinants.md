---
id: "05-determinants"
title: "2.1 — Determinants"
course: "MATHS211"
type: "chapter-section"
order: 5
language: "en"
source_ids: ["1_howvee-xm2zxP24DqQcQA1nZ8PqCKPg", "1n8MA2sIJjHe4U7uPpcxuJYxQ3Qzt4uY4"]
source_page_count: 2
content_format: "complete_transcription_with_archival_references"
source_coverage: "all pages of every listed source version"
editable_transcription: "complete transcription of all source versions, 2x2 and 3x3 determinants, cofactor expansions, Sarrus rule, determinant properties, row/column operations, and reconciled website content"
transcribed_source_ids: ["1_howvee-xm2zxP24DqQcQA1nZ8PqCKPg", "1n8MA2sIJjHe4U7uPpcxuJYxQ3Qzt4uY4"]
---

# 2.1 — Determinants

## 1. Determinant of a $2 \times 2$ Matrix

Let $A = \begin{bmatrix} a_{11} & a_{12} \\ a_{21} & a_{22} \end{bmatrix}$ be a $2 \times 2$ matrix. The **determinant** of $A$ (denoted $\det(A)$ or $|A|$) is defined by the difference of diagonal products:

$$
\det(A) = \begin{vmatrix} a_{11} & a_{12} \\ a_{21} & a_{22} \end{vmatrix} = a_{11}a_{22} - a_{21}a_{12}
$$

### Worked Examples:
**(a)**
$$
A = \begin{bmatrix} 1 & 2 \\ 3 & -4 \end{bmatrix} \quad \Longrightarrow \quad \det(A) = 1(-4) - 3(2) = -4 - 6 = -10
$$
*(Version 2 variant: $A = \begin{bmatrix} 1 & 2 \\ 4 & 5 \end{bmatrix} \implies \det(A) = 1(5) - 4(2) = 5 - 8 = -3$.)*

**(b) Parameter Equation:**
For which value of $a$ is $\det(A) = 11$, where $A = \begin{bmatrix} 2a & -1 \\ -1 & 3a \end{bmatrix}$?
$$
\det(A) = (2a)(3a) - (-1)(-1) = 6a^2 - 1
$$
$$
6a^2 - 1 = 11 \iff 6a^2 = 12 \iff a^2 = 2 \iff a = \pm\sqrt{2}
$$

**(c) Singular Matrix Condition:**
For which value of $a$ do we have $\det(A) = 0$ where $A = \begin{bmatrix} a - 2 & 1 \\ -5 & a + 4 \end{bmatrix}$?
$$
\det(A) = (a - 2)(a + 4) - (-5)(1) = a^2 + 4a - 2a - 8 + 5 = a^2 + 2a - 3
$$
Factoring:
$$
a^2 + 2a - 3 = (a - 1)(a + 3) = 0 \iff a \in \{1, -3\}
$$

---

## 2. Determinant of a $3 \times 3$ Matrix and General $n \times n$ Matrices

Let $A = \begin{bmatrix} a_{11} & a_{12} & a_{13} \\ a_{21} & a_{22} & a_{23} \\ a_{31} & a_{32} & a_{33} \end{bmatrix}$.

### 2.1 Cofactor Expansion Along a Row or Column
The determinant of $A$ can be computed by expanding along **any** row or column using the alternating sign pattern $(-1)^{i+j}$:

$$
\begin{bmatrix}
+ & - & + & \cdots \\
- & + & - & \cdots \\
+ & - & + & \cdots \\
\vdots & \vdots & \vdots & \ddots
\end{bmatrix}
$$

#### Expansion along Row 1 ($+ - +$):
$$
\det(A) = +a_{11} \begin{vmatrix} a_{22} & a_{23} \\ a_{32} & a_{33} \end{vmatrix} - a_{12} \begin{vmatrix} a_{21} & a_{23} \\ a_{31} & a_{33} \end{vmatrix} + a_{13} \begin{vmatrix} a_{21} & a_{22} \\ a_{31} & a_{32} \end{vmatrix}
$$
$$
= a_{11}(a_{22}a_{33} - a_{32}a_{23}) - a_{12}(a_{21}a_{33} - a_{31}a_{23}) + a_{13}(a_{21}a_{32} - a_{31}a_{22})
$$

#### Strategy Tip:
Always expand along the row or column containing the **greatest number of zeros** to minimize computation.

#### Example: Expansion along Row 2 (Signs: $- \, + \, -$)
Evaluate:
$$
\begin{vmatrix} 1 & 2 & 3 \\ -1 & 0 & 1 \\ 3 & 5 & 4 \end{vmatrix}
$$
Expand along Row 2:
$$
= -(-1) \begin{vmatrix} 2 & 3 \\ 5 & 4 \end{vmatrix} + 0 - (1) \begin{vmatrix} 1 & 2 \\ 3 & 5 \end{vmatrix}
$$
$$
= 1(2(4) - 5(3)) - 1(1(5) - 3(2)) = 1(8 - 15) - 1(5 - 6) = -7 - (-1) = -6
$$

---

### 2.2 Sarrus' Rule ($3 \times 3$ Matrices Only)

For a $3 \times 3$ matrix, copy the first two columns to the right:

<div align="center">

```xml
<svg viewBox="0 0 540 180" xmlns="http://www.w3.org/2000/svg" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; font-family: ui-sans-serif, system-ui, sans-serif;">
  <g transform="translate(40, 20)">
    <!-- Column headers / entries -->
    <text x="30" y="30" font-size="16" fill="#0f172a">a₁₁</text>
    <text x="90" y="30" font-size="16" fill="#0f172a">a₁₂</text>
    <text x="150" y="30" font-size="16" fill="#0f172a">a₁₃</text>
    <text x="210" y="30" font-size="16" fill="#64748b">a₁₁</text>
    <text x="270" y="30" font-size="16" fill="#64748b">a₁₂</text>

    <text x="30" y="75" font-size="16" fill="#0f172a">a₂₁</text>
    <text x="90" y="75" font-size="16" fill="#0f172a">a₂₂</text>
    <text x="150" y="75" font-size="16" fill="#0f172a">a₂₃</text>
    <text x="210" y="75" font-size="16" fill="#64748b">a₂₁</text>
    <text x="270" y="75" font-size="16" fill="#64748b">a₂₂</text>

    <text x="30" y="120" font-size="16" fill="#0f172a">a₃₁</text>
    <text x="90" y="120" font-size="16" fill="#0f172a">a₃₂</text>
    <text x="150" y="120" font-size="16" fill="#0f172a">a₃₃</text>
    <text x="210" y="120" font-size="16" fill="#64748b">a₃₁</text>
    <text x="270" y="120" font-size="16" fill="#64748b">a₃₂</text>

    <!-- Downward green arrows (add) -->
    <line x1="42" y1="35" x2="162" y2="125" stroke="#16a34a" stroke-width="2" />
    <line x1="102" y1="35" x2="222" y2="125" stroke="#16a34a" stroke-width="2" />
    <line x1="162" y1="35" x2="282" y2="125" stroke="#16a34a" stroke-width="2" />

    <!-- Upward red arrows (subtract) -->
    <line x1="42" y1="120" x2="162" y2="30" stroke="#dc2626" stroke-width="2" />
    <line x1="102" y1="120" x2="222" y2="30" stroke="#dc2626" stroke-width="2" />
    <line x1="162" y1="120" x2="282" y2="30" stroke="#dc2626" stroke-width="2" />

    <!-- Labels -->
    <text x="350" y="55" font-size="13" font-weight="bold" fill="#16a34a">+ Downward Products</text>
    <text x="350" y="95" font-size="13" font-weight="bold" fill="#dc2626">− Upward Products</text>
  </g>
</svg>
```

</div>

$$
\det(A) = (a_{11}a_{22}a_{33} + a_{12}a_{23}a_{31} + a_{13}a_{21}a_{32}) - (a_{31}a_{22}a_{13} + a_{32}a_{23}a_{11} + a_{33}a_{21}a_{12})
$$

#### Worked Examples:
**Example 1:**
Evaluate $\begin{vmatrix} a & b & 0 \\ 0 & a & b \\ a & 0 & b \end{vmatrix}$:
- Downward diagonals: $a(a)(b) + b(b)(a) + 0(0)(0) = a^2 b + ab^2$
- Upward diagonals: $a(a)(0) + 0(b)(a) + b(0)(b) = 0$
$$
\det = a^2 b + ab^2 = ab(a + b)
$$

**Example 2:**
Find all $a$ such that $\det(A) = 0$ where $A = \begin{bmatrix} a - 4 & 0 & 0 \\ 0 & a & 2 \\ 0 & 3 & a - 1 \end{bmatrix}$:
Expand along Row 1:
$$
\det(A) = (a - 4) \begin{vmatrix} a & 2 \\ 3 & a - 1 \end{vmatrix} = (a - 4)(a(a - 1) - 6) = (a - 4)(a^2 - a - 6)
$$
Factoring:
$$
(a - 4)(a - 3)(a + 2) = 0 \iff a \in \{4, 3, -2\}
$$

---

### 2.3 Determinant of a $4 \times 4$ Matrix
Evaluate:
$$
\begin{vmatrix}
1 & 2 & 3 & 4 \\
-1 & 0 & 0 & 1 \\
1 & 1 & 2 & 1 \\
-1 & 0 & 0 & 4
\end{vmatrix}
$$
Expand along Row 2 (which contains two zeros):
$$
= -(-1) \begin{vmatrix} 2 & 3 & 4 \\ 1 & 2 & 1 \\ 0 & 0 & 4 \end{vmatrix} + 0 - 0 + 1 \begin{vmatrix} 1 & 2 & 3 \\ 1 & 1 & 2 \\ -1 & 0 & 0 \end{vmatrix}
$$
- For the first $3 \times 3$ determinant, expand along Row 3:
  $$4 \begin{vmatrix} 2 & 3 \\ 1 & 2 \end{vmatrix} = 4(4 - 3) = 4(1) = 4$$
- For the second $3 \times 3$ determinant, expand along Row 3:
  $$-1 \begin{vmatrix} 2 & 3 \\ 1 & 2 \end{vmatrix} = -1(4 - 3) = -1(1) = -1$$
Sum:
$$
1(4) + 1(-1) = 4 - 1 = 3
$$

---

## 3. Algebraic Properties of Determinants

Let $A, B$ be $n \times n$ square matrices and $k \in \mathbb{R}$:

1. **Row Scaling Property:**
   Factoring a scalar $k$ from a **single** row or column multiplies the determinant by $k$:
   $$\begin{vmatrix} k a_{11} & a_{12} & \cdots \\ k a_{21} & a_{22} & \cdots \\ \vdots & \vdots & \ddots \end{vmatrix} = k \begin{vmatrix} a_{11} & a_{12} & \cdots \\ a_{21} & a_{22} & \cdots \\ \vdots & \vdots & \ddots \end{vmatrix}$$

2. **Scaling the Entire Matrix:**
   Since scaling the matrix $kA$ multiplies all $n$ rows by $k$:
   $$\det(kA) = k^n \det(A)$$

3. **Zero Row or Column:**
   If $A$ has an entire row or column of zeros, then $\det(A) = 0$.

4. **Transpose Property:**
   $$\det(A^T) = \det(A)$$

5. **Identical Rows or Columns:**
   If $A$ has two identical rows or two identical columns, then $\det(A) = 0$.
   *Example:*
   $$\begin{vmatrix} 1 & a & x & f \\ 2 & b & 2x & g \\ 3 & c & 3x & h \\ 4 & d & 4x & i \end{vmatrix} = x \begin{vmatrix} 1 & a & 1 & f \\ 2 & b & 2 & g \\ 3 & c & 3 & h \\ 4 & d & 4 & i \end{vmatrix} = x \cdot 0 = 0 \quad (\text{Cols 1 and 3 are identical})$$

6. **Multiplicative Property:**
   $$\det(AB) = \det(A) \det(B)$$
   Consequently, $\det(A^k) = (\det A)^k$ for any positive integer $k$.

7. **Invertibility and Inverse Determinant:**
   $$A \text{ is invertible } \iff \det(A) \ne 0$$
   When $A$ is invertible:
   $$\det(A^{-1}) = \frac{1}{\det(A)}$$
   *Proof:* $A A^{-1} = I \implies \det(A) \det(A^{-1}) = \det(I) = 1 \implies \det(A^{-1}) = \frac{1}{\det A}$.

8. **Linearity Across a Single Row:**
   $$\begin{vmatrix} a_{11} & a_{12} & a_{13} \\ a_{21} & a_{22} & a_{23} \\ a+b & a'+b' & a''+b'' \end{vmatrix} = \begin{vmatrix} a_{11} & a_{12} & a_{13} \\ a_{21} & a_{22} & a_{23} \\ a & a' & a'' \end{vmatrix} + \begin{vmatrix} a_{11} & a_{12} & a_{13} \\ a_{21} & a_{22} & a_{23} \\ b & b' & b'' \end{vmatrix}$$

9. **Row and Column Operations on Determinants:**
   - **Row Swap ($R_i \longleftrightarrow R_j$):** Multiplies determinant by $-1$.
   - **Row Scaling ($R_i \longrightarrow k R_i$):** Multiplies determinant by $k$.
   - **Row Addition ($R_i \longrightarrow R_i + k R_j$):** Leaves determinant **completely unchanged**!
     $$\begin{vmatrix} a_{11} + k a_{13} & a_{12} & a_{13} \\ a_{21} + k a_{23} & a_{22} & a_{23} \\ a_{31} + k a_{33} & a_{32} & a_{33} \end{vmatrix} = \det(A) + k(0) = \det(A)$$

---

## 4. Comprehensive Course Exercises

### Exercise 1: Factoring Powers of $k$
Evaluate:
$$
\begin{vmatrix}
k^2 & 2k & 3k^2 \\
k^3 & k & k^2 \\
k & 0 & k
\end{vmatrix}
$$
1. Factor $k$ from Row 1, $k$ from Row 2, and $k$ from Row 3 ($k^3$):
   $$= k^3 \begin{vmatrix} k & 2 & 3k \\ k^2 & 1 & k \\ 1 & 0 & 1 \end{vmatrix}$$
2. Factor $k$ from Column 1 ($k^4$):
   $$= k^4 \begin{vmatrix} 1 & 2 & 3 \\ k & 1 & 1 \\ 1 & 0 & 1 \end{vmatrix}$$
3. Compute the remaining determinant by Sarrus or Row 3 expansion:
   Expand along Row 3:
   $$1 \begin{vmatrix} 2 & 3 \\ 1 & 1 \end{vmatrix} - 0 + 1 \begin{vmatrix} 1 & 2 \\ k & 1 \end{vmatrix} = (2 - 3) + (1 - 2k) = -1 + 1 - 2k = -2k$$
4. Multiply by $k^4$:
   $$k^4(-2k) = -2k^5$$

---

### Exercise 2: Evaluating Determinants with Given Values
Let $A, B$ be $3 \times 3$ matrices with $\det(A) = 2$ and $\det(B) = \frac{1}{4}$.
Find $\det(2 A^T B^2 B^T)$:
$$
\det(2 A^T B^2 B^T) = 2^3 \cdot \det(A^T) \cdot (\det B)^2 \cdot \det(B^T)
$$
Using $\det(A^T) = \det(A)$ and $\det(B^T) = \det(B)$:
$$
= 8 \cdot \det(A) \cdot (\det B)^3 = 8(2) \left(\frac{1}{4}\right)^3 = 16 \cdot \frac{1}{64} = \frac{1}{4}
$$

---

### Exercise 3: General Size $n \times n$
Let $A, B, C$ be $n \times n$ matrices with $\det(A) = \frac{1}{12}, \, \det(B) = \frac{1}{3}, \, \det(C) = \frac{1}{6}$.
Find $\det(2 A^{-2} B C^T)$:
$$
\det(2 A^{-2} B C^T) = 2^n \cdot \frac{1}{(\det A)^2} \cdot \det(B) \cdot \det(C)
$$
$$
= 2^n \cdot (12)^2 \cdot \frac{1}{3} \cdot \frac{1}{6} = 2^n \cdot 144 \cdot \frac{1}{18} = 2^n \cdot 8 = 2^n \cdot 2^3 = 2^{n+3}
$$

---

### Exercise 4: Negative Determinants and Inverse Powers
Let $A$ be a $3 \times 3$ matrix such that $\det(A) = -7$:
1. $\det(A^{-1}) = \frac{1}{\det A} = -\frac{1}{7}$
2. $\det(2 A^{-1}) = 2^3 \det(A^{-1}) = 8\left(-\frac{1}{7}\right) = -\frac{8}{7}$
3. $\det((2A)^{-1}) = \frac{1}{\det(2A)} = \frac{1}{2^3 \det A} = \frac{1}{8(-7)} = -\frac{1}{56}$

---

### Exercise 5: Evaluating via Row Operations (Symmetric and Circulant Forms)

#### Problem (a):
$$
\begin{vmatrix}
a+b & b+c & c+a \\
c & a & b \\
1 & 1 & 1
\end{vmatrix}
$$
Add Row 2 to Row 1 ($R_1 \to R_1 + R_2$):
$$
\begin{vmatrix}
a+b+c & a+b+c & a+b+c \\
c & a & b \\
1 & 1 & 1
\end{vmatrix}
= (a+b+c) \begin{vmatrix}
1 & 1 & 1 \\
c & a & b \\
1 & 1 & 1
\end{vmatrix}
$$
Since Row 1 and Row 3 are identical, the determinant is **$0$**.

#### Problem (b): Circulant Determinant
$$
\begin{vmatrix}
a & b & c \\
b & c & a \\
c & a & b
\end{vmatrix}
$$
Add Rows 2 and 3 to Row 1 ($R_1 \to R_1 + R_2 + R_3$):
$$
= \begin{vmatrix}
a+b+c & a+b+c & a+b+c \\
b & c & a \\
c & a & b
\end{vmatrix}
= (a+b+c) \begin{vmatrix}
1 & 1 & 1 \\
b & c & a \\
c & a & b
\end{vmatrix}
$$
Perform $C_1 \to C_1 - C_3$ and $C_2 \to C_2 - C_3$:
$$
= (a+b+c) \begin{vmatrix}
0 & 0 & 1 \\
b-a & c-a & a \\
c-b & a-b & b
\end{vmatrix}
$$
Expand along Row 1:
$$
= (a+b+c) [(b-a)(a-b) - (c-a)(c-b)]
$$
$$
= (a+b+c) [-(a-b)^2 - (c^2 - cb - ac + ab)]
$$
$$
= (a+b+c)(ab + bc + ca - a^2 - b^2 - c^2) = 3abc - a^3 - b^3 - c^3
$$

---

### Exercise 6: $4 \times 4$ Zero-Diagonal Symmetric Determinant
Evaluate:
$$
D_4 = \begin{vmatrix}
0 & 1 & 1 & 1 \\
1 & 0 & 1 & 1 \\
1 & 1 & 0 & 1 \\
1 & 1 & 1 & 0
\end{vmatrix}
$$

**Method: Row sum and triangularization**
1. Add all rows to the first row ($R_1 \to R_1 + R_2 + R_3 + R_4$):
   $$
   \begin{vmatrix}
   3 & 3 & 3 & 3 \\
   1 & 0 & 1 & 1 \\
   1 & 1 & 0 & 1 \\
   1 & 1 & 1 & 0
   \end{vmatrix}
   = 3 \begin{vmatrix}
   1 & 1 & 1 & 1 \\
   1 & 0 & 1 & 1 \\
   1 & 1 & 0 & 1 \\
   1 & 1 & 1 & 0
   \end{vmatrix}
   $$

2. Subtract Row 1 from Rows 2, 3, and 4 ($R_2 \to R_2 - R_1, \, R_3 \to R_3 - R_1, \, R_4 \to R_4 - R_1$):
   $$
   = 3 \begin{vmatrix}
   1 & 1 & 1 & 1 \\
   0 & -1 & 0 & 0 \\
   0 & 0 & -1 & 0 \\
   0 & 0 & 0 & -1
   \end{vmatrix}
   $$

3. The matrix is now upper triangular. The determinant is the product of its diagonal entries:
   $$
   D_4 = 3 \cdot [1 \cdot (-1) \cdot (-1) \cdot (-1)] = 3 \cdot (-1) = -3
   $$

---

## 5. Supplementary Course Insights & Reconciled Content

*(Integrated from LinearLab interactive lesson modules: `determinants.mdx`, `determinant-properties.mdx`, `cramers-rule.mdx`)*

### Geometric Interpretation of the Determinant
- In $\mathbb{R}^2$, $|\det([u \mid v])|$ equals the **area of the parallelogram** spanned by the vectors $u$ and $v$.
- In $\mathbb{R}^3$, $|\det([u \mid v \mid w])|$ equals the **volume of the parallelepiped** spanned by $u, v, w$.
- A determinant of zero indicates that the vectors are coplanar (or collinear), collapsing the volume/area to zero and implying linear dependence.

### Cramer's Rule for Linear Systems
If $AX = B$ is an $n \times n$ system with $\det(A) \ne 0$, the unique solution is given by:
$$
x_i = \frac{\det(A_i)}{\det(A)}, \quad i = 1, 2, \dots, n
$$
where $A_i$ is the matrix formed by replacing the $i$-th column of $A$ with the constant vector $B$.

---

## 6. Archival Source Reference & Verification Ledger

The 24 source image assets for this chapter are mapped as follows:

| Source File | Source ID | Page | Part | Local Asset Path | Coverage Anchor |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `2.1 Determinants 3.pdf` (root) | `1_howvee-xm2zxP24DqQcQA1nZ8PqCKPg` | 1 | 1 | `../assets/05-determinants-1/page-001-part-001.webp` | [§ 1 2x2 Determinants & Examples](#1-determinant-of-a-2-times-2-matrix) |
| `2.1 Determinants 3.pdf` (root) | `1_howvee-xm2zxP24DqQcQA1nZ8PqCKPg` | 1 | 2 | `../assets/05-determinants-1/page-001-part-002.webp` | [§ 1 Example (c) & § 2 3x3 Definition](#2-determinant-of-a-3-times-3-matrix-and-general-n-times-n-matrices) |
| `2.1 Determinants 3.pdf` (root) | `1_howvee-xm2zxP24DqQcQA1nZ8PqCKPg` | 1 | 3 | `../assets/05-determinants-1/page-001-part-003.webp` | [§ 2.1 Cofactor Expansion & Sarrus Setup](#21-cofactor-expansion-along-a-row-or-column) |
| `2.1 Determinants 3.pdf` (root) | `1_howvee-xm2zxP24DqQcQA1nZ8PqCKPg` | 1 | 4 | `../assets/05-determinants-1/page-001-part-004.webp` | [§ 2.2 Sarrus Examples](#22-sarrus-rule-3-times-3-matrices-only) |
| `2.1 Determinants 3.pdf` (root) | `1_howvee-xm2zxP24DqQcQA1nZ8PqCKPg` | 1 | 5 | `../assets/05-determinants-1/page-001-part-005.webp` | [§ 2.3 4x4 Determinant & § 3 Scaling](#23-determinant-of-a-4-times-4-matrix) |
| `2.1 Determinants 3.pdf` (root) | `1_howvee-xm2zxP24DqQcQA1nZ8PqCKPg` | 1 | 6 | `../assets/05-determinants-1/page-001-part-006.webp` | [§ 3 Property (b) $k^n \det(A)$](#3-algebraic-properties-of-determinants) |
| `2.1 Determinants 3.pdf` (root) | `1_howvee-xm2zxP24DqQcQA1nZ8PqCKPg` | 1 | 7 | `../assets/05-determinants-1/page-001-part-007.webp` | [§ 3 Multiplicative Rules & Transpose](#3-algebraic-properties-of-determinants) |
| `2.1 Determinants 3.pdf` (root) | `1_howvee-xm2zxP24DqQcQA1nZ8PqCKPg` | 1 | 8 | `../assets/05-determinants-1/page-001-part-008.webp` | [§ 3 Invertibility & Parameter Problem](#3-algebraic-properties-of-determinants) |
| `2.1 Determinants 3.pdf` (root) | `1_howvee-xm2zxP24DqQcQA1nZ8PqCKPg` | 1 | 9 | `../assets/05-determinants-1/page-001-part-009.webp` | [§ 4 Exercises 3-4 & Row Linearity](#exercise-3-general-size-n-times-n) |
| `2.1 Determinants 3.pdf` (root) | `1_howvee-xm2zxP24DqQcQA1nZ8PqCKPg` | 1 | 10 | `../assets/05-determinants-1/page-001-part-010.webp` | [§ 3 Row Addition Property & Examples](#3-algebraic-properties-of-determinants) |
| `2.1 Determinants 3.pdf` (root) | `1_howvee-xm2zxP24DqQcQA1nZ8PqCKPg` | 1 | 11 | `../assets/05-determinants-1/page-001-part-011.webp` | [§ 4 Exercise 5 Circulant Determinant](#exercise-5-evaluating-via-row-operations-symmetric-and-circulant-forms) |
| `2.1 Determinants 3.pdf` (root) | `1_howvee-xm2zxP24DqQcQA1nZ8PqCKPg` | 1 | 12 | `../assets/05-determinants-1/page-001-part-012.webp` | [§ 4 Exercise 6 4x4 Zero-Diagonal](#exercise-6-4-times-4-zero-diagonal-symmetric-determinant) |
| `2.1 Determinant.pdf` (Test1) | `1n8MA2sIJjHe4U7uPpcxuJYxQ3Qzt4uY4` | 1 | 1 | `../assets/05-determinants-2/page-001-part-001.webp` | [§ 1 2x2 Determinant Definition](#1-determinant-of-a-2-times-2-matrix) |
| `2.1 Determinant.pdf` (Test1) | `1n8MA2sIJjHe4U7uPpcxuJYxQ3Qzt4uY4` | 1 | 2 | `../assets/05-determinants-2/page-001-part-002.webp` | [§ 1 Quadratic Parameter Example](#worked-examples) |
| `2.1 Determinant.pdf` (Test1) | `1n8MA2sIJjHe4U7uPpcxuJYxQ3Qzt4uY4` | 1 | 3 | `../assets/05-determinants-2/page-001-part-003.webp` | [§ 2.1 Row/Column Expansion](#21-cofactor-expansion-along-a-row-or-column) |
| `2.1 Determinant.pdf` (Test1) | `1n8MA2sIJjHe4U7uPpcxuJYxQ3Qzt4uY4` | 1 | 4 | `../assets/05-determinants-2/page-001-part-004.webp` | [§ 2.2 Sarrus Shortcut](#22-sarrus-rule-3-times-3-matrices-only) |
| `2.1 Determinant.pdf` (Test1) | `1n8MA2sIJjHe4U7uPpcxuJYxQ3Qzt4uY4` | 1 | 5 | `../assets/05-determinants-2/page-001-part-005.webp` | [§ 2.3 4x4 Expansion](#23-determinant-of-a-4-times-4-matrix) |
| `2.1 Determinant.pdf` (Test1) | `1n8MA2sIJjHe4U7uPpcxuJYxQ3Qzt4uY4` | 1 | 6 | `../assets/05-determinants-2/page-001-part-006.webp` | [§ 3 Scaling Laws](#3-algebraic-properties-of-determinants) |
| `2.1 Determinant.pdf` (Test1) | `1n8MA2sIJjHe4U7uPpcxuJYxQ3Qzt4uY4` | 1 | 7 | `../assets/05-determinants-2/page-001-part-007.webp` | [§ 3 Product & Transpose Rules](#3-algebraic-properties-of-determinants) |
| `2.1 Determinant.pdf` (Test1) | `1n8MA2sIJjHe4U7uPpcxuJYxQ3Qzt4uY4` | 1 | 8 | `../assets/05-determinants-2/page-001-part-008.webp` | [§ 3 Invertibility Equivalence](#3-algebraic-properties-of-determinants) |
| `2.1 Determinant.pdf` (Test1) | `1n8MA2sIJjHe4U7uPpcxuJYxQ3Qzt4uY4` | 1 | 9 | `../assets/05-determinants-2/page-001-part-009.webp` | [§ 4 Powers & Trace Comparisons](#exercise-3-general-size-n-times-n) |
| `2.1 Determinant.pdf` (Test1) | `1n8MA2sIJjHe4U7uPpcxuJYxQ3Qzt4uY4` | 1 | 10 | `../assets/05-determinants-2/page-001-part-010.webp` | [§ 3 Invariance under Row Operations](#3-algebraic-properties-of-determinants) |
| `2.1 Determinant.pdf` (Test1) | `1n8MA2sIJjHe4U7uPpcxuJYxQ3Qzt4uY4` | 1 | 11 | `../assets/05-determinants-2/page-001-part-011.webp` | [§ 4 Circulant Calculation](#problem-b-circulant-determinant) |
| `2.1 Determinant.pdf` (Test1) | `1n8MA2sIJjHe4U7uPpcxuJYxQ3Qzt4uY4` | 1 | 12 | `../assets/05-determinants-2/page-001-part-012.webp` | [§ 4 4x4 Zero-Diagonal Reduction](#exercise-6-4-times-4-zero-diagonal-symmetric-determinant) |
