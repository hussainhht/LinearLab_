---
id: "07-linear-independence"
title: "4.3 — Linear independence"
course: "MATHS211"
type: "chapter-section"
order: 7
language: "en"
source_ids: ["1pYCTbRysEozpakF1Hbc71M_3tHhvsQCS", "165LU7sy49MckKr7Nthcj7by9p8rVqX6D"]
source_page_count: 2
content_format: "complete_transcription_with_archival_references"
source_coverage: "all pages of every listed source version"
editable_transcription: "complete transcription of all source versions, definitions, determinant criteria, Wronskian in function spaces, theoretical proofs, and exercises"
transcribed_source_ids: ["1pYCTbRysEozpakF1Hbc71M_3tHhvsQCS", "165LU7sy49MckKr7Nthcj7by9p8rVqX6D"]
---

# 4.3 — Linear Independence

## 1. Mathematical Definition

Let $V$ be a vector space over $\mathbb{R}$, and let $S = \{v_1, v_2, \dots, v_r\}$ be a finite set of vectors in $V$.

### 1.1 Linearly Independent Sets
The set $\{v_1, v_2, \dots, v_r\}$ is called **linearly independent** if the only linear combination of these vectors that equals the zero vector $0_V$ is the trivial combination:

$$
a_1 v_1 + a_2 v_2 + \cdots + a_r v_r = 0_V \quad \Longrightarrow \quad a_1 = a_2 = \cdots = a_r = 0
$$

### 1.2 Linearly Dependent Sets
The set $\{v_1, v_2, \dots, v_r\}$ is called **linearly dependent** if there exist scalars $a_1, a_2, \dots, a_r \in \mathbb{R}$, **not all zero**, such that:

$$
a_1 v_1 + a_2 v_2 + \cdots + a_r v_r = 0_V
$$

Such an equation with non-zero coefficients is called a **linear dependency relation** (or non-trivial dependency relation).

---

## 2. Standard Vector Space Testing via Linear Systems

### Example 1: Linearly Independent Set in $\mathbb{R}^3$
Is $\{v_1 = (1, 2, 3), \, v_2 = (2, -1, 0), \, v_3 = (1, 0, 0)\}$ linearly independent?

Set up the vector equation:
$$
a v_1 + b v_2 + c v_3 = (0, 0, 0)
$$
$$
a(1, 2, 3) + b(2, -1, 0) + c(1, 0, 0) = (0, 0, 0)
$$
Componentwise linear system:
$$
\begin{cases}
a + 2b + c = 0 \\
2a - b = 0 \\
3a = 0
\end{cases}
$$
1. From equation (3): $3a = 0 \implies a = 0$.
2. From equation (2): $2(0) - b = 0 \implies b = 0$.
3. From equation (1): $0 + 2(0) + c = 0 \implies c = 0$.

Since the only solution is $a = b = c = 0$, the set $\{v_1, v_2, v_3\}$ is **linearly independent**.

---

### Example 2: Linearly Dependent Set in $\mathbb{R}^3$ & Dependency Relation
Is $\{w_1 = (1, -2, 3), \, w_2 = (5, 6, -1), \, w_3 = (3, 2, 1)\}$ linearly independent?

Set up $a w_1 + b w_2 + c w_3 = (0, 0, 0)$:
$$
\begin{cases}
a + 5b + 3c = 0 \\
-2a + 6b + 2c = 0 \\
3a - b + c = 0
\end{cases}
$$
Row reduce the augmented matrix:
$$
\left[\begin{array}{ccc|c}
\mathbf{1} & 5 & 3 & 0 \\
-2 & 6 & 2 & 0 \\
3 & -1 & 1 & 0
\end{array}\right]
\xrightarrow{R_2 \to R_2 + 2R_1, \, R_3 \to R_3 - 3R_1}
\left[\begin{array}{ccc|c}
\mathbf{1} & 5 & 3 & 0 \\
0 & 16 & 8 & 0 \\
0 & -16 & -8 & 0
\end{array}\right]
$$
$$
\xrightarrow{R_2 \to \frac{1}{16} R_2, \, R_3 \to R_3 + R_2}
\left[\begin{array}{ccc|c}
\mathbf{1} & 5 & 3 & 0 \\
0 & \mathbf{1} & \frac{1}{2} & 0 \\
0 & 0 & 0 & 0
\end{array}\right]
\xrightarrow{R_1 \to R_1 - 5R_2}
\left[\begin{array}{ccc|c}
\mathbf{1} & 0 & \frac{1}{2} & 0 \\
0 & \mathbf{1} & \frac{1}{2} & 0 \\
0 & 0 & 0 & 0
\end{array}\right]
$$

- Free variable: $c = r \in \mathbb{R}$.
- Leading variables: $a = -\frac{1}{2} r, \quad b = -\frac{1}{2} r$.
Since there are non-trivial solutions ($\infty$ solutions), $\{w_1, w_2, w_3\}$ is **linearly dependent**.

#### Finding the Dependency Relation:
Choose $r = 2$ to clear fractions:
$$a = -1, \quad b = -1, \quad c = 2$$
$$
-w_1 - w_2 + 2w_3 = (0, 0, 0) \quad \iff \quad w_1 + w_2 - 2w_3 = (0, 0, 0)
$$
Equivalently:
$$
w_3 = \frac{1}{2} w_1 + \frac{1}{2} w_2
$$

---

## 3. The Determinant Criterion for Linear Independence

When the number of vectors matches the dimension of the space ($n$ vectors in $\mathbb{R}^n$, $n+1$ polynomials in $P_n$, $n^2$ matrices in $M_{nn}$):

### Theorem:
Let $A$ be the square matrix whose columns are the vectors $\{v_1, v_2, \dots, v_n\}$. Then:
$$
\{v_1, v_2, \dots, v_n\} \text{ is linearly independent} \iff \det(A) \ne 0
$$
*(If $\det(A) = 0$, the set is linearly dependent).*

---

### Worked Examples:

#### Example 1: In $\mathbb{R}^3$
Test $\{v_1 = (-3, 0, 4), \, v_2 = (5, -1, 2), \, v_3 = (1, 1, 3)\}$:
Form the column matrix $A$:
$$
A = \begin{bmatrix} -3 & 5 & 1 \\ 0 & -1 & 1 \\ 4 & 2 & 3 \end{bmatrix}
$$
Evaluate $\det(A)$ by Sarrus' Rule:
$$
\det(A) = [(-3)(-1)(3) + 5(1)(4) + 1(0)(2)] - [4(-1)(1) + 2(1)(-3) + 3(0)(5)]
$$
$$
= [9 + 20 + 0] - [-4 - 6 + 0] = 29 - (-10) = 39 \ne 0
$$
**Conclusion:** Since $\det(A) = 39 \ne 0$, $\{v_1, v_2, v_3\}$ is **linearly independent**.

---

#### Example 2: In $P_2$
Test $\{p_1 = 2 - x + 4x^2, \, p_2 = 3 + 6x + 2x^2, \, p_3 = 2 + 10x - 4x^2\}$:
Represent each polynomial as a column vector with respect to basis $\{1, x, x^2\}$:
$$
A = \begin{bmatrix} 2 & 3 & 2 \\ -1 & 6 & 10 \\ 4 & 2 & -4 \end{bmatrix}
$$
Evaluate $\det(A)$:
$$
\det(A) = [2(6)(-4) + 3(10)(4) + 2(-1)(2)] - [4(6)(2) + 2(10)(2) + (-4)(-1)(3)]
$$
$$
= [-48 + 120 - 4] - [48 + 40 + 12] = 68 - 100 = -32 \ne 0
$$
**Conclusion:** $\{p_1, p_2, p_3\}$ is **linearly independent**.

---

#### Example 3: In $M_{22}$
Test $\{A, B, C, D\}$ where:
$$
A = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}, \quad
B = \begin{bmatrix} 2 & 1 \\ 0 & 0 \end{bmatrix}, \quad
C = \begin{bmatrix} 1 & -1 \\ 0 & 1 \end{bmatrix}, \quad
D = \begin{bmatrix} 0 & 1 \\ 1 & 1 \end{bmatrix}
$$
Set $\alpha A + \beta B + \gamma C + \delta D = \begin{bmatrix} 0 & 0 \\ 0 & 0 \end{bmatrix}$:
$$
\begin{cases}
\alpha + 2\beta + \gamma = 0 \\
\beta - \gamma + \delta = 0 \\
\delta = 0 \\
\alpha + \gamma + \delta = 0
\end{cases}
$$
Form the $4 \times 4$ coefficient matrix:
$$
M = \begin{bmatrix}
1 & 2 & 1 & 0 \\
0 & 1 & -1 & 1 \\
0 & 0 & 0 & 1 \\
1 & 0 & 1 & 1
\end{bmatrix}
$$
Expand along Row 3 (which has three zeros):
$$
\det(M) = -1 \begin{vmatrix} 1 & 2 & 1 \\ 0 & 1 & -1 \\ 1 & 0 & 1 \end{vmatrix}
$$
In the $3 \times 3$ determinant, apply $R_3 \to R_3 - R_1$:
$$
\begin{vmatrix} 1 & 2 & 1 \\ 0 & 1 & -1 \\ 0 & -2 & 0 \end{vmatrix} = 1 \begin{vmatrix} 1 & -1 \\ -2 & 0 \end{vmatrix} = 0 - 2 = -2
$$
$$
\det(M) = -1(-2) = 2 \ne 0
$$
**Conclusion:** $\{A, B, C, D\}$ is **linearly independent**.

---

#### Example 4: Parameter-Dependent Linear Independence
Find all real values of $k$ such that $\{u = (1, 2, 3), \, v = (2, k, -1), \, w = (1, 1, -1)\}$ is linearly independent in $\mathbb{R}^3$:

Set up the determinant:
$$
\Delta = \begin{vmatrix} 1 & 2 & 1 \\ 2 & k & 1 \\ 3 & -1 & -1 \end{vmatrix}
$$
Perform column operations to create zeros in column 3 ($C_1 \to C_1 + C_3$ and $C_2 \to C_2 - C_3$):
$$
\Delta = \begin{vmatrix} 1 & 2 & 1 \\ 1 & k - 2 & 0 \\ 4 & 1 & 0 \end{vmatrix}
$$
Expand along Column 3:
$$
= +1 \begin{vmatrix} 1 & k - 2 \\ 4 & 1 \end{vmatrix} = 1(1) - 4(k - 2) = 1 - 4k + 8 = -4k + 9
$$
The set is linearly independent if and only if $\Delta \ne 0$:
$$
-4k + 9 \ne 0 \iff k \ne \frac{9}{4}
$$

---

## 4. Testing Independence in Function Spaces: The Wronskian

Let $f_1, f_2, \dots, f_n$ be functions in $F(I)$ that are at least $(n-1)$-times differentiable on the interval $I$.

### 4.1 The Wronskian Determinant
The **Wronskian** of $f_1, \dots, f_n$ is defined by:
$$
W(x) = \begin{vmatrix}
f_1(x) & f_2(x) & \cdots & f_n(x) \\
f_1'(x) & f_2'(x) & \cdots & f_n'(x) \\
\vdots & \vdots & \ddots & \vdots \\
f_1^{(n-1)}(x) & f_2^{(n-1)}(x) & \cdots & f_n^{(n-1)}(x)
\end{vmatrix}
$$

### 4.2 Theorem:
If there exists at least one point $x_0 \in I$ such that $W(x_0) \ne 0$ (i.e., $W(x) \not\equiv 0$ is not identically the zero function), then:
$$
\{f_1, f_2, \dots, f_n\} \text{ is \textbf{linearly independent} on } I.
$$

---

### Worked Wronskian Examples:

#### Example 1: Exponential Functions
Is $\{1, e^x, e^{2x}\}$ linearly independent on $\mathbb{R}$?
Compute derivatives:
- $f_1 = 1, \quad f_1' = 0, \quad f_1'' = 0$
- $f_2 = e^x, \quad f_2' = e^x, \quad f_2'' = e^x$
- $f_3 = e^{2x}, \quad f_3' = 2e^{2x}, \quad f_3'' = 4e^{2x}$

Set up $W(x)$:
$$
W(x) = \begin{vmatrix} 1 & e^x & e^{2x} \\ 0 & e^x & 2e^{2x} \\ 0 & e^x & 4e^{2x} \end{vmatrix}
$$
Factor $e^x$ from column 2 and $e^{2x}$ from column 3:
$$
W(x) = e^x \cdot e^{2x} \begin{vmatrix} 1 & 1 & 1 \\ 0 & 1 & 2 \\ 0 & 1 & 4 \end{vmatrix} = e^{3x} \cdot 1 \cdot \begin{vmatrix} 1 & 2 \\ 1 & 4 \end{vmatrix} = e^{3x}(4 - 2) = 2e^{3x}
$$
Since $e^{3x} > 0$ for all $x \in \mathbb{R}$, $W(x) = 2e^{3x} \ne 0$ everywhere.
**Conclusion:** $\{1, e^x, e^{2x}\}$ is **linearly independent**.

---

#### Example 2: Trigonometric Functions
Is $\{\sin x, \cos x, x\sin x\}$ linearly independent on $\mathbb{R}$?
Derivatives of $x\sin x$:
- $(x\sin x)' = \sin x + x\cos x$
- $(x\sin x)'' = \cos x + \cos x - x\sin x = 2\cos x - x\sin x$

Set up $W(x)$:
$$
W(x) = \begin{vmatrix}
\sin x & \cos x & x\sin x \\
\cos x & -\sin x & \sin x + x\cos x \\
-\sin x & -\cos x & 2\cos x - x\sin x
\end{vmatrix}
$$
Add Row 1 to Row 3 ($R_3 \to R_3 + R_1$):
$$
W(x) = \begin{vmatrix}
\sin x & \cos x & x\sin x \\
\cos x & -\sin x & \sin x + x\cos x \\
0 & 0 & 2\cos x
\end{vmatrix}
$$
Expand along Row 3:
$$
W(x) = 2\cos x \begin{vmatrix} \sin x & \cos x \\ \cos x & -\sin x \end{vmatrix} = 2\cos x (-\sin^2 x - \cos^2 x) = 2\cos x (-1) = -2\cos x
$$
Since $-2\cos x$ is not identically zero (e.g., at $x = 0$, $W(0) = -2 \ne 0$),
**Conclusion:** $\{\sin x, \cos x, x\sin x\}$ is **linearly independent**.

---

## 5. Fundamental Theorems & Analytical Proofs

### Theorem 1: Single Vector Sets
Let $v \in V$.
- If $v \ne 0_V$, then $\{v\}$ is **linearly independent**.
  *Proof:* $a v = 0_V$. If $a \ne 0$, multiply by $\frac{1}{a} \implies v = 0_V$, contradicting $v \ne 0_V$. Hence $a = 0$. $\blacksquare$
- If $v = 0_V$, then $\{0_V\}$ is **linearly dependent** (since $1 \cdot 0_V = 0_V$).

### Theorem 2: Sets Containing the Zero Vector
Any set containing the zero vector $S = \{0_V, v_2, \dots, v_r\}$ is **linearly dependent**.
*Proof:*
$$1 \cdot 0_V + 0 \cdot v_2 + \cdots + 0 \cdot v_r = 0_V$$
This constitutes a non-trivial dependency relation with non-zero scalar $a_1 = 1$. $\blacksquare$

### Theorem 3: Hereditary Properties (Subsets and Supersets)
1. **Supersets of Dependent Sets:** If $\{v_1, \dots, v_h\}$ is linearly dependent, then any larger set $\{v_1, \dots, v_h, v_{h+1}, \dots, v_r\}$ is **linearly dependent**.
   *Proof:* There exist $a_1, \dots, a_h$ not all zero such that $\sum_{i=1}^h a_i v_i = 0_V$. Then:
   $$a_1 v_1 + \cdots + a_h v_h + 0 v_{h+1} + \cdots + 0 v_r = 0_V$$
   is a non-trivial dependency relation for the larger set. $\blacksquare$

2. **Subsets of Independent Sets:** If $\{v_1, \dots, v_r\}$ is linearly independent, then any subset $\{v_1, \dots, v_h\}$ ($h \le r$) is **linearly independent**.
   *Proof:* If $\sum_{i=1}^h a_i v_i = 0_V$, append zero coefficients: $\sum_{i=1}^h a_i v_i + \sum_{j=h+1}^r 0 v_j = 0_V$. By independence of the whole set, $a_1 = \cdots = a_h = 0$. $\blacksquare$

### Theorem 4: Characterization of Linear Dependence
A set $\{v_1, \dots, v_r\}$ with $r \ge 2$ is **linearly dependent if and only if** at least one of the vectors can be expressed as a linear combination of the remaining vectors.
*Proof:*
- $(\Rightarrow)$ Suppose $\sum_{i=1}^r a_i v_i = 0_V$ with $a_1 \ne 0$. Then:
  $$v_1 = -\frac{a_2}{a_1} v_2 - \cdots - \frac{a_r}{a_1} v_r$$
- $(\Leftarrow)$ If $v_r = \alpha_1 v_1 + \cdots + \alpha_{r-1} v_{r-1}$, then:
  $$\alpha_1 v_1 + \cdots + \alpha_{r-1} v_{r-1} + (-1) v_r = 0_V$$
  The coefficient of $v_r$ is $-1 \ne 0$, proving linear dependence. $\blacksquare$

### Theorem 5: Special Case of Two Vectors
A set of two vectors $\{u, v\}$ is **linearly dependent if and only if** one vector is a scalar multiple of the other ($u = \alpha v$ or $v = \alpha u$):
- In $\mathbb{R}^3$: $u = (1, -1, 4), v = (-2, 2, -8) \implies v = -2u \implies$ **Linearly dependent**.
- In $\mathbb{R}^4$: $u = (1, -1, 2, 0), v = (3, -3, 6, 4)$. To satisfy $v = \alpha u$, we need $\alpha(0) = 4$, which is impossible $\implies$ **Linearly independent**.
- In $M_{22}$: $A = \begin{bmatrix} 3 & 2 \\ -1 & 4 \end{bmatrix}, B = \begin{bmatrix} -9 & -6 \\ 3 & -12 \end{bmatrix} \implies B = -3A \implies$ **Linearly dependent**.

---

## 6. Theoretical Proof Exercises from Course Notes

### Exercise 1: Symmetric Differences
Let $\{u, v, w\}$ be any vectors in a vector space $V$. Prove that the set:
$$
S = \{u - v, \, v - w, \, w - u\}
$$
is **linearly dependent**.

**Proof:**
Form a linear combination with scalar coefficients $a = 1, b = 1, c = 1$:
$$
1(u - v) + 1(v - w) + 1(w - u) = u - v + v - w + w - u = 0_V
$$
Since the scalars $(1, 1, 1)$ are not all zero, this provides a non-trivial linear dependency relation.
Therefore, $\{u - v, v - w, w - u\}$ is linearly dependent. $\blacksquare$

---

### Exercise 2: Vector Outside the Span
Let $\{v_1, v_2, v_3\}$ be vectors in $V$ such that:
1. $\{v_1, v_2\}$ is linearly independent.
2. $v_3 \notin \text{span}(v_1, v_2)$.

Prove that $\{v_1, v_2, v_3\}$ is **linearly independent**.

**Proof:**
Suppose $a v_1 + b v_2 + c v_3 = 0_V$. We must show that $a = b = c = 0$.
- Assume for contradiction that $c \ne 0$.
  Then we can divide by $c$ to isolate $v_3$:
  $$c v_3 = -a v_1 - b v_2 \implies v_3 = \left(-\frac{a}{c}\right) v_1 + \left(-\frac{b}{c}\right) v_2$$
  This implies that $v_3 \in \text{span}(v_1, v_2)$, which directly contradicts hypothesis (2).
- Therefore, we must have $c = 0$.
- Substituting $c = 0$ into the original equation yields:
  $$a v_1 + b v_2 + 0 v_3 = 0_V \implies a v_1 + b v_2 = 0_V$$
- Since $\{v_1, v_2\}$ is given to be linearly independent (hypothesis 1), the only solution is:
  $$a = 0 \quad \text{and} \quad b = 0$$
- Thus $a = b = c = 0$.

**Conclusion:** $\{v_1, v_2, v_3\}$ is linearly independent. $\blacksquare$

---

## 7. Archival Source Reference & Verification Ledger

The 21 source image assets for this chapter are mapped as follows:

| Source File | Source ID | Page | Part | Local Asset Path | Coverage Anchor |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `4.3 Linear independence.pdf` (root) | `1pYCTbRysEozpakF1Hbc71M_3tHhvsQCS` | 1 | 1 | `../assets/07-linear-independence-1/page-001-part-001.webp` | [§ 1 Definitions & § 2 Example 1](#1-mathematical-definition) |
| `4.3 Linear independence.pdf` (root) | `1pYCTbRysEozpakF1Hbc71M_3tHhvsQCS` | 1 | 2 | `../assets/07-linear-independence-1/page-001-part-002.webp` | [§ 2 Example 2 & Dependency Relation](#example-2-linearly-dependent-set-in-r3--dependency-relation) |
| `4.3 Linear independence.pdf` (root) | `1pYCTbRysEozpakF1Hbc71M_3tHhvsQCS` | 1 | 3 | `../assets/07-linear-independence-1/page-001-part-003.webp` | [§ 3 Determinant Method & Example 1](#3-the-determinant-criterion-for-linear-independence) |
| `4.3 Linear independence.pdf` (root) | `1pYCTbRysEozpakF1Hbc71M_3tHhvsQCS` | 1 | 4 | `../assets/07-linear-independence-1/page-001-part-004.webp` | [§ 3 Example 2 P_2 & Example 3 M_22](#example-2-in-p_2) |
| `4.3 Linear independence.pdf` (root) | `1pYCTbRysEozpakF1Hbc71M_3tHhvsQCS` | 1 | 5 | `../assets/07-linear-independence-1/page-001-part-005.webp` | [§ 3 Example 4 Parameter k](#example-4-parameter-dependent-linear-independence) |
| `4.3 Linear independence.pdf` (root) | `1pYCTbRysEozpakF1Hbc71M_3tHhvsQCS` | 1 | 6 | `../assets/07-linear-independence-1/page-001-part-006.webp` | [§ 4 Wronskian Definition & Exp Example](#4-testing-independence-in-function-spaces-the-wronskian) |
| `4.3 Linear independence.pdf` (root) | `1pYCTbRysEozpakF1Hbc71M_3tHhvsQCS` | 1 | 7 | `../assets/07-linear-independence-1/page-001-part-007.webp` | [§ 4 Trig Example & § 5 Theorems 1-3](#5-fundamental-theorems--analytical-proofs) |
| `4.3 Linear independence.pdf` (root) | `1pYCTbRysEozpakF1Hbc71M_3tHhvsQCS` | 1 | 8 | `../assets/07-linear-independence-1/page-001-part-008.webp` | [§ 5 Theorem 4 Characterization](#theorem-4-characterization-of-linear-dependence) |
| `4.3 Linear independence.pdf` (root) | `1pYCTbRysEozpakF1Hbc71M_3tHhvsQCS` | 1 | 9 | `../assets/07-linear-independence-1/page-001-part-009.webp` | [§ 5 Theorem 5 Pairs & § 6 Exercises 1-2](#6-theoretical-proof-exercises-from-course-notes) |
| `4.3 Linear independence2.pdf` (Test2) | `165LU7sy49MckKr7Nthcj7by9p8rVqX6D` | 1 | 1 | `../assets/07-linear-independence-2/page-001-part-001.webp` | [§ 1 Definitions](#1-mathematical-definition) |
| `4.3 Linear independence2.pdf` (Test2) | `165LU7sy49MckKr7Nthcj7by9p8rVqX6D` | 1 | 2 | `../assets/07-linear-independence-2/page-001-part-002.webp` | [§ 2 Example 1 R^3](#example-1-linearly-independent-set-in-r3) |
| `4.3 Linear independence2.pdf` (Test2) | `165LU7sy49MckKr7Nthcj7by9p8rVqX6D` | 1 | 3 | `../assets/07-linear-independence-2/page-001-part-003.webp` | [§ 2 Example 2 R^3](#example-2-linearly-dependent-set-in-r3--dependency-relation) |
| `4.3 Linear independence2.pdf` (Test2) | `165LU7sy49MckKr7Nthcj7by9p8rVqX6D` | 1 | 4 | `../assets/07-linear-independence-2/page-001-part-004.webp` | [§ 3 Determinant Method](#3-the-determinant-criterion-for-linear-independence) |
| `4.3 Linear independence2.pdf` (Test2) | `165LU7sy49MckKr7Nthcj7by9p8rVqX6D` | 1 | 5 | `../assets/07-linear-independence-2/page-001-part-005.webp` | [§ 3 Example 2 P_2](#example-2-in-p_2) |
| `4.3 Linear independence2.pdf` (Test2) | `165LU7sy49MckKr7Nthcj7by9p8rVqX6D` | 1 | 6 | `../assets/07-linear-independence-2/page-001-part-006.webp` | [§ 3 Example 3 M_22](#example-3-in-m_22) |
| `4.3 Linear independence2.pdf` (Test2) | `165LU7sy49MckKr7Nthcj7by9p8rVqX6D` | 1 | 7 | `../assets/07-linear-independence-2/page-001-part-007.webp` | [§ 3 Example 4 Parameter k](#example-4-parameter-dependent-linear-independence) |
| `4.3 Linear independence2.pdf` (Test2) | `165LU7sy49MckKr7Nthcj7by9p8rVqX6D` | 1 | 8 | `../assets/07-linear-independence-2/page-001-part-008.webp` | [§ 4 Wronskian Definition](#4-testing-independence-in-function-spaces-the-wronskian) |
| `4.3 Linear independence2.pdf` (Test2) | `165LU7sy49MckKr7Nthcj7by9p8rVqX6D` | 1 | 9 | `../assets/07-linear-independence-2/page-001-part-009.webp` | [§ 4 Wronskian Trig Example](#example-2-trigonometric-functions) |
| `4.3 Linear independence2.pdf` (Test2) | `165LU7sy49MckKr7Nthcj7by9p8rVqX6D` | 1 | 10 | `../assets/07-linear-independence-2/page-001-part-010.webp` | [§ 5 Theorems 1-4 Proofs](#5-fundamental-theorems--analytical-proofs) |
| `4.3 Linear independence2.pdf` (Test2) | `165LU7sy49MckKr7Nthcj7by9p8rVqX6D` | 1 | 11 | `../assets/07-linear-independence-2/page-001-part-011.webp` | [§ 5 Theorem 5 Pairs Proof & Examples](#theorem-5-special-case-of-two-vectors) |
| `4.3 Linear independence2.pdf` (Test2) | `165LU7sy49MckKr7Nthcj7by9p8rVqX6D` | 1 | 12 | `../assets/07-linear-independence-2/page-001-part-012.webp` | [§ 6 Proof Exercises 1-2](#6-theoretical-proof-exercises-from-course-notes) |
