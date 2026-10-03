---
id: "08-bases-dimensions"
title: "4.4–4.5 — Bases and dimensions"
course: "MATHS211"
type: "chapter-section"
order: 8
language: "en"
source_ids: ["18UZtSfmANYcKwvjUePFLd2OmbxQKhJN2", "1D00iQqVOJOxil9QGQ4KqLsus35FF166q"]
source_page_count: 2
content_format: "complete_transcription_with_archival_references"
source_coverage: "all pages of every listed source version"
editable_transcription: "complete transcription of all source versions, basis definitions, standard bases, dimension theorems, coordinates, Minus Theorem, and infinite-dimensional spaces"
transcribed_source_ids: ["18UZtSfmANYcKwvjUePFLd2OmbxQKhJN2", "1D00iQqVOJOxil9QGQ4KqLsus35FF166q"]
---

# 4.4–4.5 — Bases and Dimensions

## 1. Definition of a Basis

Let $V$ be a vector space over $\mathbb{R}$. A set of vectors $B = \{v_1, v_2, \dots, v_n\}$ in $V$ is called a **basis** of $V$ if it satisfies two conditions:

1. **$B$ is Linearly Independent:**
   $$a_1 v_1 + a_2 v_2 + \cdots + a_n v_n = 0_V \implies a_1 = a_2 = \cdots = a_n = 0$$

2. **$B$ Spans $V$ ($\text{span}(B) = V$):**
   Every vector $v \in V$ can be expressed as a linear combination of the vectors in $B$:
   $$v = a_1 v_1 + a_2 v_2 + \cdots + a_n v_n \quad \text{for some scalars } a_1, \dots, a_n \in \mathbb{R}$$

---

### Introductory Verification Example: Polynomial Basis in $P_2$
Let $V = P_2$ and $B = \{p_1 = 1 + x, \, p_2 = 1 + x^2, \, p_3 = x + x^2\}$.
Is $B$ a basis of $P_2$?

#### Step 1: Testing Linear Independence
Set $a p_1 + b p_2 + c p_3 = 0$:
$$
a(1 + x) + b(1 + x^2) + c(x + x^2) = 0
$$
Equating coefficients of $x^0, x^1, x^2$:
$$
\begin{cases}
a + b = 0 \\
a + c = 0 \\
b + c = 0
\end{cases}
$$
Evaluate the determinant of the coefficient matrix:
$$
\det = \begin{vmatrix} 1 & 1 & 0 \\ 1 & 0 & 1 \\ 0 & 1 & 1 \end{vmatrix} = 1(0 - 1) - 1(1 - 0) + 0 = -1 - 1 = -2 \ne 0
$$
Since $\det \ne 0$, the system has only the trivial solution $a = b = c = 0$. Thus, $B$ is **linearly independent**.

#### Step 2: Testing the Spanning Property
Let $p(x) = a + bx + cx^2 \in P_2$ be an arbitrary polynomial.
We must show that there exist scalars $\alpha, \beta, \gamma$ such that:
$$
p(x) = \alpha(1 + x) + \beta(1 + x^2) + \gamma(x + x^2)
$$
Equating coefficients:
$$
\begin{cases}
\alpha + \beta = a \\
\alpha + \gamma = b \\
\beta + \gamma = c
\end{cases}
$$
Row reducing the augmented matrix:
$$
\left[\begin{array}{ccc|c}
1 & 1 & 0 & a \\
1 & 0 & 1 & b \\
0 & 1 & 1 & c
\end{array}\right]
\xrightarrow{\text{Row Operations}}
\left[\begin{array}{ccc|c}
1 & 0 & 0 & \frac{a + b - c}{2} \\
0 & 1 & 0 & \frac{a - b + c}{2} \\
0 & 0 & 1 & \frac{-a + b + c}{2}
\end{array}\right]
$$
This gives the explicit unique scalars:
$$
\alpha = \frac{a + b - c}{2}, \quad \beta = \frac{a - b + c}{2}, \quad \gamma = \frac{-a + b + c}{2}
$$
Every polynomial can be uniquely represented:
$$
p(x) = \left(\frac{a + b - c}{2}\right) p_1 + \left(\frac{a - b + c}{2}\right) p_2 + \left(\frac{-a + b + c}{2}\right) p_3
$$
**Conclusion:** $B$ spans $P_2$. Since $B$ is both linearly independent and spans $P_2$, $B$ is a **basis of $P_2$**.

---

## 2. Standard Bases of Classical Vector Spaces

### 2.1 Standard Basis of $\mathbb{R}^n$
The standard basis of $\mathbb{R}^n$ is $E = \{e_1, e_2, \dots, e_n\}$, where:
$$
e_1 = (1, 0, \dots, 0), \quad e_2 = (0, 1, \dots, 0), \quad \dots, \quad e_n = (0, 0, \dots, 1)
$$
Every vector $v = (x_1, \dots, x_n) \in \mathbb{R}^n$ can be written uniquely as:
$$
v = x_1 e_1 + x_2 e_2 + \cdots + x_n e_n
$$

### 2.2 Standard Basis of $P_n$
The standard basis of $P_n$ is the set of standard power monomials:
$$
B = \{1, x, x^2, \dots, x^n\}
$$
Every polynomial $p(x) = a_0 + a_1 x + \cdots + a_n x^n$ is naturally a linear combination of these basis elements.

### 2.3 Standard Basis of $M_{np}$
The standard basis of $M_{np}$ is the collection of matrices:
$$
B = \{ A_{ij} : 1 \le i \le n, \, 1 \le j \le p \}
$$
where each $A_{ij}$ has $1$ in row $i$, column $j$ and $0$ in all other entries.
For example, in $M_{22}$:
$$
A_{11} = \begin{bmatrix} 1 & 0 \\ 0 & 0 \end{bmatrix}, \quad
A_{12} = \begin{bmatrix} 0 & 1 \\ 0 & 0 \end{bmatrix}, \quad
A_{21} = \begin{bmatrix} 0 & 0 \\ 1 & 0 \end{bmatrix}, \quad
A_{22} = \begin{bmatrix} 0 & 0 \\ 0 & 1 \end{bmatrix}
$$

---

## 3. Dimension of a Vector Space

### 3.1 Definition of Dimension
**Theorem:** If a vector space $V$ has a basis consisting of $n$ elements, then **every** other basis of $V$ also consists of exactly $n$ elements.
This invariant integer $n$ is called the **dimension** of $V$, denoted:
$$
\dim(V) = n
$$
The zero vector space $\{0_V\}$ is defined to have dimension $0$.

### 3.2 Dimensions of Standard Spaces:
1. $\dim(\mathbb{R}^n) = n$
2. $\dim(P_n) = n + 1$ *(Note: contains $1, x, \dots, x^n$, which is $n+1$ elements)*
3. $\dim(M_{np}) = n \cdot p$

---

### 3.3 Finding the Dimension of Subspaces (Worked Examples)

#### Example 1: In $\mathbb{R}^3$
Find a basis and the dimension of $W = \{ (x, y, z) \in \mathbb{R}^3 : x + 3y - z = 0 \}$:
- Express dependent variable: $x = -3y + z$.
- Substitute:
  $$(x, y, z) = (-3y + z, y, z) = y(-3, 1, 0) + z(1, 0, 1)$$
- Spanning set: $W = \text{span}((-3, 1, 0), \, (1, 0, 1))$.
- Independence: $(-3, 1, 0)$ is not a scalar multiple of $(1, 0, 1)$.
- **Basis:** $\{(-3, 1, 0), \, (1, 0, 1)\}$.
- **Dimension:** $\dim(W) = 2$ (a 2D plane through the origin).

#### Example 2: In $M_{22}$
Find a basis and dimension of $W = \left\{ \begin{bmatrix} x & x + y \\ z & z + y \end{bmatrix} : x, y, z \in \mathbb{R} \right\}$:
- Decompose by free parameters:
  $$\begin{bmatrix} x & x + y \\ z & z + y \end{bmatrix} = x \begin{bmatrix} 1 & 1 \\ 0 & 0 \end{bmatrix} + y \begin{bmatrix} 0 & 1 \\ 0 & 1 \end{bmatrix} + z \begin{bmatrix} 0 & 0 \\ 1 & 1 \end{bmatrix}$$
- Spanning set: $W = \text{span}\left( \begin{bmatrix} 1 & 1 \\ 0 & 0 \end{bmatrix}, \, \begin{bmatrix} 0 & 1 \\ 0 & 1 \end{bmatrix}, \, \begin{bmatrix} 0 & 0 \\ 1 & 1 \end{bmatrix} \right)$.
- Linear independence:
  $$a \begin{bmatrix} 1 & 1 \\ 0 & 0 \end{bmatrix} + b \begin{bmatrix} 0 & 1 \\ 0 & 1 \end{bmatrix} + c \begin{bmatrix} 0 & 0 \\ 1 & 1 \end{bmatrix} = \begin{bmatrix} 0 & 0 \\ 0 & 0 \end{bmatrix} \implies a = 0, \, c = 0, \, a+b=0 \implies b=0$$
- **Basis:** $\left\{ \begin{bmatrix} 1 & 1 \\ 0 & 0 \end{bmatrix}, \, \begin{bmatrix} 0 & 1 \\ 0 & 1 \end{bmatrix}, \, \begin{bmatrix} 0 & 0 \\ 1 & 1 \end{bmatrix} \right\}$.
- **Dimension:** $\dim(W) = 3$.

#### Example 3: In $P_2$
Find a basis and dimension of $W = \{ p \in P_2 : p(1) + p'(1) = 0 \}$:
- For $p(x) = a + bx + cx^2$:
  $$p(1) = a + b + c, \quad p'(1) = b + 2c$$
  $$p(1) + p'(1) = a + 2b + 3c = 0 \implies a = -2b - 3c$$
- Substitute:
  $$p(x) = (-2b - 3c) + bx + cx^2 = b(-2 + x) + c(-3 + x^2)$$
- Spanning set: $W = \text{span}(-2 + x, \, -3 + x^2)$.
- Independence: If $-2 + x = \alpha(-3 + x^2)$, equating $x$-terms gives $1 = 0$, absurd.
- **Basis:** $\{-2 + x, \, -3 + x^2\}$.
- **Dimension:** $\dim(W) = 2$.

---

## 4. Fundamental Basis and Dimension Theorems

Let $V$ be a vector space with $\dim(V) = n$, and let $S = \{v_1, v_2, \dots, v_r\}$ be a set of $r$ vectors in $V$:

<div align="center">

```xml
<svg viewBox="0 0 650 200" xmlns="http://www.w3.org/2000/svg" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; font-family: ui-sans-serif, system-ui, sans-serif;">
  <g transform="translate(30, 20)">
    <!-- Central Dimension Line -->
    <line x1="50" y1="100" x2="550" y2="100" stroke="#0284c7" stroke-width="4" />
    <circle cx="300" cy="100" r="7" fill="#0284c7" />
    <text x="300" y="80" font-size="14" font-weight="bold" fill="#0284c7" text-anchor="middle">r = n (Exact Dimension)</text>
    <text x="300" y="125" font-size="12" fill="#0f172a" text-anchor="middle">Independent ⇔ Basis ⇔ Spanning</text>

    <!-- Region r > n -->
    <text x="460" y="50" font-size="14" font-weight="bold" fill="#dc2626" text-anchor="middle">r &gt; n</text>
    <text x="460" y="70" font-size="12" fill="#dc2626" text-anchor="middle">Always Linearly Dependent</text>
    <line x1="390" y1="100" x2="530" y2="100" stroke="#dc2626" stroke-width="5" />

    <!-- Region r < n -->
    <text x="140" y="50" font-size="14" font-weight="bold" fill="#d97706" text-anchor="middle">r &lt; n</text>
    <text x="140" y="70" font-size="12" fill="#d97706" text-anchor="middle">Never Spans V</text>
    <line x1="70" y1="100" x2="210" y2="100" stroke="#d97706" stroke-width="5" />
  </g>
</svg>
```

</div>

1. **Too Many Vectors ($r > n$):**
   If $r > n$, the set $S$ is **always linearly dependent** (cannot be linearly independent).
   *Example:* Any 4 vectors in $\mathbb{R}^3$ are linearly dependent.

2. **Too Few Vectors ($r < n$):**
   If $r < n$, the set $S$ **cannot span $V$** ($\text{span}(S) \ne V$).
   *Example:* Any 2 polynomials in $P_2$ cannot span $P_2$.

3. **Exact Count ($r = n$):**
   If the number of vectors equals the dimension ($r = n$):
   - If $S$ is linearly independent $\Longrightarrow$ $S$ is **automatically a basis** of $V$ (no need to check spanning).
   - If $S$ spans $V$ $\Longrightarrow$ $S$ is **automatically a basis** of $V$ (no need to check independence).

---

### Worked Basis Applications:

#### Problem 1: In $\mathbb{R}^3$
Is $S = \{u = (1, 2, 1), \, v = (2, 9, 0), \, w = (3, 3, 4)\}$ a basis of $\mathbb{R}^3$?
- Here $|S| = 3 = \dim(\mathbb{R}^3)$. By the theorem, we only need to test linear independence via determinant:
  $$\det = \begin{vmatrix} 1 & 2 & 3 \\ 2 & 9 & 3 \\ 1 & 0 & 4 \end{vmatrix}$$
  By Sarrus: $(36 + 6 + 0) - (27 + 0 + 16) = 42 - 43 = -1 \ne 0$.
- Since $\det \ne 0$, $S$ is linearly independent.
- **Conclusion:** Because $|S| = \dim(\mathbb{R}^3) = 3$ and $S$ is linearly independent, $S$ is a **basis of $\mathbb{R}^3$**.

#### Problem 2: In $P_2$
Is $S = \{p_1 = 3 + 2x - x^2, \, p_2 = x + 5x^2, \, p_3 = 2 - 4x + x^2\}$ a basis of $P_2$?
- $|S| = 3 = \dim(P_2)$. Test independence via determinant:
  $$\det = \begin{vmatrix} 3 & 0 & 2 \\ 2 & 1 & -4 \\ -1 & 5 & 1 \end{vmatrix} = [3(1)(1) + 0 + 2(2)(5)] - [(-1)(1)(2) + 5(-4)(3) + 0] = [3 + 20] - [-2 - 60] = 23 - (-62) = 85 \ne 0$$
- **Conclusion:** $S$ is a **basis of $P_2$**.

#### Problem 3: Parametric Basis in $P_2$
For which value of $a$ is $S = \{1 + 2x + x^2, \, 1 + x^2, \, 1 + x + ax^2\}$ a basis of $P_2$?
- $|S| = 3 = \dim(P_2)$. Set up the determinant:
  $$\det = \begin{vmatrix} 1 & 1 & 1 \\ 2 & 0 & 1 \\ 1 & 1 & a \end{vmatrix}$$
  Perform $R_3 \to R_3 - R_1$:
  $$\begin{vmatrix} 1 & 1 & 1 \\ 2 & 0 & 1 \\ 0 & 0 & a - 1 \end{vmatrix} = (a - 1) \begin{vmatrix} 1 & 1 \\ 2 & 0 \end{vmatrix} = (a - 1)(0 - 2) = -2(a - 1)$$
- $S$ is a basis $\iff \det \ne 0 \iff -2(a - 1) \ne 0 \iff a \ne 1$.

---

## 5. Coordinate Vectors Relative to a Basis

### 5.1 Uniqueness of Representation Theorem
Let $B = \{v_1, v_2, \dots, v_n\}$ be a basis of $V$.
**Every** vector $v \in V$ can be expressed in **one and only one way** as a linear combination of $B$:
$$
v = c_1 v_1 + c_2 v_2 + \cdots + c_n v_n
$$

#### Proof:
Since $B$ spans $V$, at least one such representation exists. Suppose there is a second representation:
$$v = d_1 v_1 + d_2 v_2 + \cdots + d_n v_n$$
Subtracting the two equations gives:
$$(c_1 - d_1)v_1 + (c_2 - d_2)v_2 + \cdots + (c_n - d_n)v_n = 0_V$$
Since $B$ is linearly independent, all coefficients must be zero:
$$c_1 - d_1 = 0, \quad \dots, \quad c_n - d_n = 0 \implies c_1 = d_1, \quad \dots, \quad c_n = d_n \quad \blacksquare$$

### 5.2 Definition of Coordinates
The unique ordered scalars $(c_1, c_2, \dots, c_n)$ are called the **coordinates of $v$ relative to basis $B$**, denoted:
$$
(v)_B = (c_1, c_2, \dots, c_n) \quad \text{or in column form} \quad [v]_B = \begin{bmatrix} c_1 \\ c_2 \\ \vdots \\ c_n \end{bmatrix}
$$

---

### Worked Coordinate Problems:

#### Problem 1: Reconstructing Vector from Coordinates
Let $B = \{p_1 = 1+x, \, p_2 = 1+x^2, \, p_3 = x+x^2\}$ be a basis of $P_2$.
If $(p)_B = (1, -1, 3)$, find $p(x)$:
$$
p(x) = 1 \cdot p_1 + (-1) \cdot p_2 + 3 \cdot p_3 = (1 + x) - (1 + x^2) + 3(x + x^2)
$$
$$
= 1 + x - 1 - x^2 + 3x + 3x^2 = 4x + 2x^2
$$

#### Problem 2: Coordinates in $\mathbb{R}^2$
Find the coordinates of $v = (3, 2)$ relative to the basis $S = \{v_1 = (1, -1), \, v_2 = (1, 1)\}$:
$$
(3, 2) = a(1, -1) + b(1, 1) \implies
\begin{cases}
a + b = 3 \\
-a + b = 2
\end{cases}
$$
Adding gives $2b = 5 \implies b = \frac{5}{2}$, and $a = 3 - \frac{5}{2} = \frac{1}{2}$.
**Result:** $(v)_S = \left(\frac{1}{2}, \, \frac{5}{2}\right)$.

#### Problem 3: Coordinates in $P_2$
Find the coordinates of $p(x) = 1 - 2x + x^2$ relative to basis $B = \{1+x, \, 2-3x^2, \, x+4x^2\}$:
$$
a(1 + x) + b(2 - 3x^2) + c(x + 4x^2) = 1 - 2x + x^2
$$
$$
\begin{cases}
a + 2b = 1 \\
a + c = -2 \\
-3b + 4c = 1
\end{cases}
$$
Row reduction of the augmented matrix:
$$
\left[\begin{array}{ccc|c}
1 & 2 & 0 & 1 \\
1 & 0 & 1 & -2 \\
0 & -3 & 4 & 1
\end{array}\right]
\xrightarrow{\text{RREF}}
\left[\begin{array}{ccc|c}
1 & 0 & 0 & -\frac{21}{5} \\
0 & 1 & 0 & \frac{13}{5} \\
0 & 0 & 1 & \frac{11}{5}
\end{array}\right]
$$
**Result:** $(p)_B = \left(-\frac{21}{5}, \, \frac{13}{5}, \, \frac{11}{5}\right)$.

#### Problem 4: Coordinates in $M_{22}$
Find the coordinates of $A = \begin{bmatrix} 3 & -2 \\ 0 & 1 \end{bmatrix}$ relative to basis:
$$
B = \left\{ \begin{bmatrix} 1 & -1 \\ 0 & 0 \end{bmatrix}, \, \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}, \, \begin{bmatrix} 1 & 0 \\ 0 & 0 \end{bmatrix}, \, \begin{bmatrix} 0 & 1 \\ 0 & 1 \end{bmatrix} \right\}
$$
$$
a \begin{bmatrix} 1 & -1 \\ 0 & 0 \end{bmatrix} + b \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix} + c \begin{bmatrix} 1 & 0 \\ 0 & 0 \end{bmatrix} + d \begin{bmatrix} 0 & 1 \\ 0 & 1 \end{bmatrix} = \begin{bmatrix} 3 & -2 \\ 0 & 1 \end{bmatrix}
$$
Equating entries:
$$
\begin{cases}
a + c = 3 & (1) \\
-a + b + d = -2 & (2) \\
b = 0 & (3) \\
d = 1 & (4)
\end{cases}
$$
- From $(3)$: $b = 0$.
- From $(4)$: $d = 1$.
- From $(2)$: $-a + 0 + 1 = -2 \implies -a = -3 \implies a = 3$.
- From $(1)$: $3 + c = 3 \implies c = 0$.

**Result:** $(A)_B = (3, 0, 0, 1)$.

---

## 6. The Minus Theorem & Infinite-Dimensional Spaces

### 6.1 The Minus Theorem (Spanning Reduction)
**Theorem:** If $V = \text{span}(v_1, v_2, \dots, v_r)$ and one of the vectors is a linear combination of the others, say:
$$
v_r = a_1 v_1 + a_2 v_2 + \cdots + a_{r-1} v_{r-1}
$$
then removing $v_r$ does not change the span:
$$
V = \text{span}(v_1, v_2, \dots, v_{r-1})
$$

#### Worked Example:
Let $V = \text{span}(f_1 = \cos^2 x, \, f_2 = \sin^2 x, \, f_3 = 1)$. Find $\dim(V)$:
- Notice the trigonometric identity:
  $$1 = 1 \cdot \cos^2 x + 1 \cdot \sin^2 x \iff f_3 = f_1 + f_2$$
- By the Minus Theorem:
  $$V = \text{span}(\cos^2 x, \, \sin^2 x)$$
- Check linear independence of $\{\cos^2 x, \sin^2 x\}$ via Wronskian:
  $$W(x) = \begin{vmatrix} \cos^2 x & \sin^2 x \\ -2\cos x \sin x & 2\sin x \cos x \end{vmatrix} = 2\cos x \sin x \begin{vmatrix} \cos^2 x & \sin^2 x \\ -1 & 1 \end{vmatrix} = \sin(2x)(\cos^2 x + \sin^2 x) = \sin(2x) \not\equiv 0$$
- Since $\{\cos^2 x, \sin^2 x\}$ is linearly independent, it forms a basis of $V$.
**Conclusion:** $\dim(V) = 2$.

---

### 6.2 Infinite-Dimensional Function Space Theorem
**Theorem:** The function space $F(I)$ has infinite dimension:
$$
\dim(F(I)) = \infty
$$

#### Analytical Proof by Contradiction:
1. Suppose for contradiction that $\dim(F(I)) = n < \infty$ is finite.
2. Consider the set of polynomial functions:
   $$S = \{1, x, x^2, \dots, x^n\}$$
3. $S$ contains $n + 1$ elements and is linearly independent on $I$ (standard basis of $P_n$).
4. By the Fundamental Dimension Theorem, in any vector space of dimension $n$, any set with more than $n$ elements **must be linearly dependent**.
5. But $|S| = n + 1 > n = \dim(F(I))$, which forces $S$ to be linearly dependent.
6. This contradicts the established fact that $S$ is linearly independent.
Therefore, the initial assumption was false, and $\dim(F(I)) = \infty$. $\blacksquare$

---

## 7. Archival Source Reference & Verification Ledger

The 23 source image assets for this chapter are mapped as follows:

| Source File | Source ID | Page | Part | Local Asset Path | Coverage Anchor |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `4.44.5 Bases and dimensions.pdf` (root) | `18UZtSfmANYcKwvjUePFLd2OmbxQKhJN2` | 1 | 1 | `../assets/08-bases-dimensions-1/page-001-part-001.webp` | [§ 1 Basis Definition & P_2 Independence](#1-definition-of-a-basis) |
| `4.44.5 Bases and dimensions.pdf` (root) | `18UZtSfmANYcKwvjUePFLd2OmbxQKhJN2` | 1 | 2 | `../assets/08-bases-dimensions-1/page-001-part-002.webp` | [§ 1 P_2 Spanning & Basis Conclusion](#step-2-testing-the-spanning-property) |
| `4.44.5 Bases and dimensions.pdf` (root) | `18UZtSfmANYcKwvjUePFLd2OmbxQKhJN2` | 1 | 3 | `../assets/08-bases-dimensions-1/page-001-part-003.webp` | [§ 2 Standard Bases R^n & P_2](#2-standard-bases-of-classical-vector-spaces) |
| `4.44.5 Bases and dimensions.pdf` (root) | `18UZtSfmANYcKwvjUePFLd2OmbxQKhJN2` | 1 | 4 | `../assets/08-bases-dimensions-1/page-001-part-004.webp` | [§ 2.3 P_n & M_22 Standard Bases](#23-standard-basis-of-m_np) |
| `4.44.5 Bases and dimensions.pdf` (root) | `18UZtSfmANYcKwvjUePFLd2OmbxQKhJN2` | 1 | 5 | `../assets/08-bases-dimensions-1/page-001-part-005.webp` | [§ 3 Dimension Definition & Subspace R^3](#3-dimension-of-a-vector-space) |
| `4.44.5 Bases and dimensions.pdf` (root) | `18UZtSfmANYcKwvjUePFLd2OmbxQKhJN2` | 1 | 6 | `../assets/08-bases-dimensions-1/page-001-part-006.webp` | [§ 3.3 M_22 & P_2 Subspace Dimensions](#example-2-in-m_22) |
| `4.44.5 Bases and dimensions.pdf` (root) | `18UZtSfmANYcKwvjUePFLd2OmbxQKhJN2` | 1 | 7 | `../assets/08-bases-dimensions-1/page-001-part-007.webp` | [§ 4 Dimension Theorems (r vs n)](#4-fundamental-basis-and-dimension-theorems) |
| `4.44.5 Bases and dimensions.pdf` (root) | `18UZtSfmANYcKwvjUePFLd2OmbxQKhJN2` | 1 | 8 | `../assets/08-bases-dimensions-1/page-001-part-008.webp` | [§ 4 Problems 1-2 (R^3 & P_2 Bases)](#worked-basis-applications) |
| `4.44.5 Bases and dimensions.pdf` (root) | `18UZtSfmANYcKwvjUePFLd2OmbxQKhJN2` | 1 | 9 | `../assets/08-bases-dimensions-1/page-001-part-009.webp` | [§ 5 Uniqueness Proof & Coordinates](#5-coordinate-vectors-relative-to-a-basis) |
| `4.44.5 Bases and dimensions.pdf` (root) | `18UZtSfmANYcKwvjUePFLd2OmbxQKhJN2` | 1 | 10 | `../assets/08-bases-dimensions-1/page-001-part-010.webp` | [§ 5 Coordinate Problems 1-3](#worked-coordinate-problems) |
| `4.44.5 Bases and dimensions.pdf` (root) | `18UZtSfmANYcKwvjUePFLd2OmbxQKhJN2` | 1 | 11 | `../assets/08-bases-dimensions-1/page-001-part-011.webp` | [§ 5 Problem 4 & § 6 Minus Theorem](#problem-4-coordinates-in-m_22) |
| `4.44.5 Bases and dimensions.pdf` (root) | `18UZtSfmANYcKwvjUePFLd2OmbxQKhJN2` | 1 | 12 | `../assets/08-bases-dimensions-1/page-001-part-012.webp` | [§ 6 Infinite Dimension & Parametric Problem](#62-infinite-dimensional-function-space-theorem) |
| `4.44.5 Bases and Dimensions2.pdf` (Test2) | `1D00iQqVOJOxil9QGQ4KqLsus35FF166q` | 1 | 1 | `../assets/08-bases-dimensions-2/page-001-part-001.webp` | [§ 1 Basis Definition](#1-definition-of-a-basis) |
| `4.44.5 Bases and Dimensions2.pdf` (Test2) | `1D00iQqVOJOxil9QGQ4KqLsus35FF166q` | 1 | 2 | `../assets/08-bases-dimensions-2/page-001-part-002.webp` | [§ 1 P_2 Basis Full Derivation](#step-2-testing-the-spanning-property) |
| `4.44.5 Bases and Dimensions2.pdf` (Test2) | `1D00iQqVOJOxil9QGQ4KqLsus35FF166q` | 1 | 3 | `../assets/08-bases-dimensions-2/page-001-part-003.webp` | [§ 2 Standard Bases R^n & P_n](#2-standard-bases-of-classical-vector-spaces) |
| `4.44.5 Bases and Dimensions2.pdf` (Test2) | `1D00iQqVOJOxil9QGQ4KqLsus35FF166q` | 1 | 4 | `../assets/08-bases-dimensions-2/page-001-part-004.webp` | [§ 2.3 M_np Standard Bases](#23-standard-basis-of-m_np) |
| `4.44.5 Bases and Dimensions2.pdf` (Test2) | `1D00iQqVOJOxil9QGQ4KqLsus35FF166q` | 1 | 5 | `../assets/08-bases-dimensions-2/page-001-part-005.webp` | [§ 3 Dimension & Subspace Planes](#3-dimension-of-a-vector-space) |
| `4.44.5 Bases and Dimensions2.pdf` (Test2) | `1D00iQqVOJOxil9QGQ4KqLsus35FF166q` | 1 | 6 | `../assets/08-bases-dimensions-2/page-001-part-006.webp` | [§ 3.3 Subspace Bases (M_22 & P_2)](#33-finding-the-dimension-of-subspaces-worked-examples) |
| `4.44.5 Bases and Dimensions2.pdf` (Test2) | `1D00iQqVOJOxil9QGQ4KqLsus35FF166q` | 1 | 7 | `../assets/08-bases-dimensions-2/page-001-part-007.webp` | [§ 4 Fundamental Dimension Theorem](#4-fundamental-basis-and-dimension-theorems) |
| `4.44.5 Bases and Dimensions2.pdf` (Test2) | `1D00iQqVOJOxil9QGQ4KqLsus35FF166q` | 1 | 8 | `../assets/08-bases-dimensions-2/page-001-part-008.webp` | [§ 4 Basis Testing Drill](#worked-basis-applications) |
| `4.44.5 Bases and Dimensions2.pdf` (Test2) | `1D00iQqVOJOxil9QGQ4KqLsus35FF166q` | 1 | 9 | `../assets/08-bases-dimensions-2/page-001-part-009.webp` | [§ 5 Uniqueness Proof & Coordinates](#5-coordinate-vectors-relative-to-a-basis) |
| `4.44.5 Bases and Dimensions2.pdf` (Test2) | `1D00iQqVOJOxil9QGQ4KqLsus35FF166q` | 1 | 10 | `../assets/08-bases-dimensions-2/page-001-part-010.webp` | [§ 5 Coordinate Solutions & Minus Theorem](#worked-coordinate-problems) |
| `4.44.5 Bases and Dimensions2.pdf` (Test2) | `1D00iQqVOJOxil9QGQ4KqLsus35FF166q` | 1 | 11 | `../assets/08-bases-dimensions-2/page-001-part-011.webp` | [§ 6 Infinite Dimension Proof](#62-infinite-dimensional-function-space-theorem) |
