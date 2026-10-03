---
id: "09-fundamental-spaces"
title: "4.7–4.8 — Fundamental Spaces of a Matrix"
course: "MATHS211"
type: "chapter-section"
order: 9
language: "en"
source_ids: ["1-LPRO1g_h9pzUTJNnQT9PKRQZtD1puVp", "1KO13UzvwxCak4j46p9siQj6QRmGENBP2"]
source_page_count: 2
content_format: "complete_transcription"
source_coverage: "all pages of every listed source version"
transcribed_source_id: "1-LPRO1g_h9pzUTJNnQT9PKRQZtD1puVp, 1KO13UzvwxCak4j46p9siQj6QRmGENBP2"
transcribed_source_parts: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
---

# 4.7–4.8 — Fundamental Spaces of a Matrix

This document provides the complete, rigorous mathematical transcription of Chapter 4.7–4.8, covering the fundamental vector spaces associated with a matrix: the **null space** (solution space), the **row space**, and the **column space**, along with the **Rank-Nullity Theorem**, basis finding methods, and parametric rank discussions.

---

## 1. Null Space (Kernel / Solution Space)

### Definition
Let $A$ be a matrix of size $n \times p$ with real entries. The **null space** (or **solution space**) of $A$, denoted by $N(A)$ (or $\ker(A)$), is defined as the set of all vectors $X \in \mathbb{R}^p$ such that $AX = 0$:

$$
N(A) = \left\{ X \in \mathbb{R}^p : AX = 0_{n \times 1} \right\}.
$$

Checking matrix product dimensions:
$$
A_{n \times p} \, X_{p \times 1} = 0_{n \times 1}.
$$

---

### Theorem: $N(A)$ is a Subspace of $\mathbb{R}^p$

**Proof:**
1. **Zero vector condition:**
   $$
   A 0_{p \times 1} = 0_{n \times 1} \implies 0 \in N(A) \implies N(A) \ne \emptyset.
   $$
2. **Closure under addition:**
   Let $X, X' \in N(A)$. Then $AX = 0$ and $AX' = 0$. By the distributive property of matrix multiplication:
   $$
   A(X + X') = AX + AX' = 0 + 0 = 0.
   $$
   Therefore, $X + X' \in N(A)$.
3. **Closure under scalar multiplication:**
   Let $X \in N(A)$ and $\alpha \in \mathbb{R}$. Then:
   $$
   A(\alpha X) = \alpha (AX) = \alpha 0 = 0.
   $$
   Therefore, $\alpha X \in N(A)$.

Thus, $N(A)$ is a subspace of $\mathbb{R}^p$. $\blacksquare$

---

### Example 1: Expressing the Null Space as a Solution Set
Find the null space of:
$$
A = \begin{bmatrix} 1 & 2 & -1 \\ 1 & 1 & 0 \end{bmatrix} \quad (\text{size } 2 \times 3).
$$

**Solution:**
$$
N(A) = \left\{ \begin{bmatrix} x \\ y \\ z \end{bmatrix} \in \mathbb{R}^3 : A \begin{bmatrix} x \\ y \\ z \end{bmatrix} = \begin{bmatrix} 0 \\ 0 \end{bmatrix} \right\} = \left\{ \begin{bmatrix} x \\ y \\ z \end{bmatrix} \in \mathbb{R}^3 : \begin{cases} x + 2y - z = 0 \\ x + y = 0 \end{cases} \right\}.
$$
Thus, $N(A)$ is the solution set of this homogeneous linear system.

---

### How to Determine a Basis of $N(A)$

**Key Property:**
Let $A'$ be a row-echelon form (REF) or reduced row-echelon form (RREF) of $A$. Because elementary row operations preserve the solution set of linear systems:
$$
X \in N(A) \iff AX = 0 \iff A'X = 0 \iff X \in N(A').
$$
Therefore:
$$
\boxed{N(A) = N(A')}
$$

---

### Example 2: Finding a Basis of $N(A)$
Find a basis of the null space of:
$$
A = \begin{bmatrix} 1 & -1 & 3 \\ 5 & -4 & -4 \\ 7 & -6 & 2 \end{bmatrix}.
$$

**Solution:**
Row reducing $A$ to reduced row-echelon form $A'$:
$$
A \sim A' = \begin{bmatrix} \mathbf{1} & 0 & -16 \\ 0 & \mathbf{1} & -19 \\ 0 & 0 & 0 \end{bmatrix}.
$$
Now solve $A' X = 0$:
$$
\begin{bmatrix} 1 & 0 & -16 \\ 0 & 1 & -19 \\ 0 & 0 & 0 \end{bmatrix} \begin{bmatrix} x \\ y \\ z \end{bmatrix} = \begin{bmatrix} 0 \\ 0 \\ 0 \end{bmatrix} \iff \begin{cases} x - 16z = 0 \implies x = 16z \\ y - 19z = 0 \implies y = 19z \end{cases}
$$
$z$ is a free variable. Set $z = r$ where $r \in \mathbb{R}$:
$$
N(A) = \left\{ (16r, 19r, r) : r \in \mathbb{R} \right\} = \left\{ r(16, 19, 1) : r \in \mathbb{R} \right\} = \operatorname{span}\{(16, 19, 1)\}.
$$
Since $(16, 19, 1) \ne (0,0,0)$, the set $\{(16, 19, 1)\}$ is linearly independent.
Hence, a basis of $N(A)$ is:
$$
\text{Basis} = \{(16, 19, 1)\}, \quad \text{and} \quad \dim(N(A)) = 1.
$$

---

### Definition: Nullity of a Matrix
The dimension of $N(A)$ is called the **nullity** of $A$, denoted:
$$
\operatorname{nullity}(A) = \dim(N(A)).
$$
> $\operatorname{nullity}(A)$ is precisely equal to the **number of free variables** in the homogeneous system $AX = 0$.

In Example 2, $\operatorname{nullity}(A) = 1$.

---

### Example 3: Basis and Nullity of a $3 \times 4$ Matrix
Find a basis of $N(A)$, where:
$$
A = \begin{bmatrix} 1 & 4 & 5 & 2 \\ 2 & 1 & 3 & 0 \\ -1 & 3 & 2 & 2 \end{bmatrix}.
$$

**Solution:**
Row reduce $A$ to RREF $A'$:
$$
A \sim A' = \begin{bmatrix} \mathbf{1} & 0 & 1 & -2/7 \\ 0 & \mathbf{1} & 1 & 4/7 \\ 0 & 0 & 0 & 0 \end{bmatrix}.
$$
Leading variables: $x, y$ (columns 1 and 2).
Free variables: $z, t$ (columns 3 and 4). Thus:
$$
\operatorname{nullity}(A) = 2.
$$
From $A' X = 0$:
$$
\begin{cases}
x + z - \frac{2}{7} t = 0 \implies x = -z + \frac{2}{7} t \\
y + z + \frac{4}{7} t = 0 \implies y = -z - \frac{4}{7} t
\end{cases}
$$
Setting $z = r$ and $t = s$ ($r, s \in \mathbb{R}$):
$$
\begin{aligned}
N(A) &= \left\{ \left( -r + \frac{2}{7}s, -r - \frac{4}{7}s, r, s \right) : r, s \in \mathbb{R} \right\} \\
&= \left\{ r(-1, -1, 1, 0) + s\left( \frac{2}{7}, -\frac{4}{7}, 0, 1 \right) : r, s \in \mathbb{R} \right\} \\
&= \operatorname{span}\left\{ (-1, -1, 1, 0), \left( \frac{2}{7}, -\frac{4}{7}, 0, 1 \right) \right\}.
\end{aligned}
$$
Let $S = \left\{ (-1, -1, 1, 0), \left( \frac{2}{7}, -\frac{4}{7}, 0, 1 \right) \right\}$. Since $\operatorname{card}(S) = 2 = \dim(N(A))$ and $S$ spans $N(A)$, $S$ is a basis of $N(A)$.

*(Equivalently, clearing denominators by scaling the second vector by 7 gives the basis $\{(-1, -1, 1, 0), (2, -4, 0, 7)\}$.)*

---

## 2. Row Space

### Definition
Let $A$ be an $n \times p$ matrix:
$$
A = \begin{bmatrix}
a_{11} & a_{12} & \cdots & a_{1p} \\
a_{21} & a_{22} & \cdots & a_{2p} \\
\vdots & \vdots & \ddots & \vdots \\
a_{n1} & a_{n2} & \cdots & a_{np}
\end{bmatrix} = \begin{bmatrix} r_1 \\ r_2 \\ \vdots \\ r_n \end{bmatrix},
$$
where each $r_i = (a_{i1}, a_{i2}, \dots, a_{ip}) \in \mathbb{R}^p$ is a row vector.
The **row space** of $A$, denoted $R(A)$, is the subspace of $\mathbb{R}^p$ spanned by the row vectors of $A$:
$$
R(A) = \operatorname{span}\{r_1, r_2, \dots, r_n\} \subseteq \mathbb{R}^p.
$$

---

### Example 1: Writing the Row Space
Find the row space of $A = \begin{bmatrix} 1 & 3 & 0 \\ 2 & -1 & 1 \end{bmatrix}$ ($2 \times 3$).

**Solution:**
$$
\begin{aligned}
R(A) &= \operatorname{span}\{(1, 3, 0), (2, -1, 1)\} \\
&= \{ x(1, 3, 0) + y(2, -1, 1) : x, y \in \mathbb{R} \} \\
&= \{ (x + 2y, 3x - y, y) : x, y \in \mathbb{R} \}.
\end{aligned}
$$
$R(A)$ is a subspace of $\mathbb{R}^3$.

---

### How to Find a Basis of $R(A)$

**Fundamental Invariance Property:**
Elementary row operations do not change the row space of a matrix. That is, if $A \sim A'$:
$$
\boxed{R(A) = R(A')}
$$

**Illustration:**
For $A = \begin{bmatrix} 1 & 3 \\ 2 & 6 \end{bmatrix} \sim A' = \begin{bmatrix} 1 & 3 \\ 0 & 0 \end{bmatrix}$:
- $R(A) = \operatorname{span}\{(1,3), (2,6)\}$. Since $(2,6) = 2(1,3)$, $R(A) = \operatorname{span}\{(1,3)\}$.
- $R(A') = \operatorname{span}\{(1,3), (0,0)\} = \operatorname{span}\{(1,3)\}$.
- Thus $R(A) = R(A')$.

---

### Theorem 1: Basis for the Row Space
> The non-zero row vectors of $A'$ (an echelon form of $A$), which are the rows containing the **leading 1s**, form a basis of $R(A') = R(A)$.

### Example: Finding a Basis of $R(A)$
Let $A = \begin{bmatrix} 1 & 2 & 3 & 4 \\ -1 & 1 & 0 & 1 \\ 1 & 2 & 1 & 0 \end{bmatrix}$.

**Row reduction:**
$$
\begin{aligned}
A &\sim \begin{bmatrix} \mathbf{1} & 2 & 3 & 4 \\ 0 & 3 & 3 & 5 \\ 0 & 0 & -2 & -4 \end{bmatrix} \begin{matrix} r_1 \\ r_2 \\ r_3 \end{matrix} \\
&\sim \begin{bmatrix} \mathbf{1} & 2 & 3 & 4 \\ 0 & \mathbf{1} & 1 & 5/3 \\ 0 & 0 & \mathbf{1} & 2 \end{bmatrix} \begin{matrix} r'_1 \\ r'_2 \\ r'_3 \end{matrix} = A'.
\end{aligned}
$$
The non-zero rows of $A'$ form a basis of $R(A)$:
$$
\text{Basis of } R(A) = \{ r'_1 = (1, 2, 3, 4), \; r'_2 = (0, 1, 1, 5/3), \; r'_3 = (0, 0, 1, 2) \}.
$$
Therefore, $\dim(R(A)) = 3$.

---

### Definition: Rank of a Matrix
The dimension of the row space $R(A)$ is called the **rank** of $A$, denoted:
$$
\operatorname{rank}(A) = \dim(R(A)).
$$
> $\operatorname{rank}(A)$ is the **number of leading 1s** in $A'$ (an echelon form of $A$). In other words, when solving $AX = 0$, $\operatorname{rank}(A)$ is exactly the **number of leading variables**.

In the previous example, $\operatorname{rank}(A) = 3$.

---

### Rule 1: The Rank-Nullity Theorem (Dimension Theorem)
For any matrix $A$ of size $n \times p$ ($n$ rows, $p$ columns):
$$
\boxed{\operatorname{rank}(A) + \operatorname{nullity}(A) = p}
$$
where $p$ is the **number of columns** of $A$.

**Proof:**
Consider the homogeneous system $AX = 0 \iff A'X = 0$:
$$
\begin{aligned}
\text{Number of leading variables} &= \operatorname{rank}(A) \\
\text{Number of free variables} &= \operatorname{nullity}(A)
\end{aligned}
$$
Adding them:
$$
\text{Total number of variables} = \operatorname{rank}(A) + \operatorname{nullity}(A) = p \quad (\text{number of columns of } A). \quad \blacksquare
$$

---

### Examples on Rank and Nullity

#### 1) Numerical Matrix ($4 \times 4$)
Find $\operatorname{rank}(A)$ and $\operatorname{nullity}(A)$ for:
$$
A = \begin{bmatrix} 1 & 2 & -1 & 4 \\ 0 & 1 & 1 & 1 \\ 2 & 1 & 3 & 2 \\ 1 & -1 & 1 & -1 \end{bmatrix}.
$$

**Row reduction:**
$$
\begin{aligned}
A &\sim \begin{bmatrix} \mathbf{1} & 2 & -1 & 4 \\ 0 & \mathbf{1} & 1 & 1 \\ 0 & -3 & 5 & -6 \\ 0 & -3 & 2 & -5 \end{bmatrix} \\
&\sim \begin{bmatrix} \mathbf{1} & 2 & -1 & 4 \\ 0 & \mathbf{1} & 1 & 1 \\ 0 & 0 & 8 & -3 \\ 0 & 0 & -3 & 1 \end{bmatrix} \\
&\sim \begin{bmatrix} \mathbf{1} & 2 & -1 & 4 \\ 0 & \mathbf{1} & 1 & 1 \\ 0 & 0 & \mathbf{1} & -3/8 \\ 0 & 0 & -3 & 1 \end{bmatrix} \\
&\sim \begin{bmatrix} \mathbf{1} & 2 & -1 & 4 \\ 0 & \mathbf{1} & 1 & 1 \\ 0 & 0 & \mathbf{1} & -3/8 \\ 0 & 0 & 0 & -1/8 \end{bmatrix} \\
&\sim \begin{bmatrix} \mathbf{1} & 2 & -1 & 4 \\ 0 & \mathbf{1} & 1 & 1 \\ 0 & 0 & \mathbf{1} & -3/8 \\ 0 & 0 & 0 & \mathbf{1} \end{bmatrix}.
\end{aligned}
$$
There are 4 leading 1s:
$$
\operatorname{rank}(A) = 4, \quad \operatorname{nullity}(A) = 4 - 4 = 0.
$$

---

#### 2) Parametric Matrix Discussion
Discuss the rank and nullity of $A$ according to the parameter $t$:
$$
A = \begin{bmatrix} 1 & 1 & t \\ 1 & t & 1 \\ t & 1 & 1 \end{bmatrix}.
$$

**Row operations:**
$$
\begin{aligned}
A &\sim \begin{bmatrix} \mathbf{1} & 1 & t \\ 0 & t - 1 & 1 - t \\ 0 & 1 - t & 1 - t^2 \end{bmatrix} \quad \begin{matrix} R_2 \to R_2 - R_1 \\ R_3 \to R_3 - t R_1 \end{matrix}
\end{aligned}
$$

- **Case 1: $t - 1 \ne 0 \iff t \ne 1$**
  Divide row 2 by $t - 1$:
  $$
  A \sim \begin{bmatrix} \mathbf{1} & 1 & t \\ 0 & \mathbf{1} & -1 \\ 0 & 1 - t & 1 - t^2 \end{bmatrix}
  $$
  Perform $R_3 \to R_3 - (1 - t) R_2$:
  $$
  (1 - t^2) - (1 - t)(-1) = 1 - t^2 + 1 - t = 2 - t - t^2 = -(t^2 + t - 2) = -(t + 2)(t - 1).
  $$
  Dividing the third row operation gives:
  $$
  A \sim \begin{bmatrix} \mathbf{1} & 1 & t \\ 0 & \mathbf{1} & -1 \\ 0 & 0 & 2 + t \end{bmatrix}.
  $$

  - **Subcase 1.1: $2 + t \ne 0 \iff t \ne -2$ (and $t \ne 1$):**
    $$
    A \sim \begin{bmatrix} \mathbf{1} & 1 & t \\ 0 & \mathbf{1} & -1 \\ 0 & 0 & \mathbf{1} \end{bmatrix} \implies \operatorname{rank}(A) = 3, \quad \operatorname{nullity}(A) = 3 - 3 = 0.
    $$
  - **Subcase 1.2: $t = -2$:**
    $$
    A \sim \begin{bmatrix} \mathbf{1} & 1 & -2 \\ 0 & \mathbf{1} & -1 \\ 0 & 0 & 0 \end{bmatrix} \implies \operatorname{rank}(A) = 2, \quad \operatorname{nullity}(A) = 3 - 2 = 1.
    $$

- **Case 2: $t = 1$**
  $$
  A = \begin{bmatrix} 1 & 1 & 1 \\ 1 & 1 & 1 \\ 1 & 1 & 1 \end{bmatrix} \sim \begin{bmatrix} \mathbf{1} & 1 & 1 \\ 0 & 0 & 0 \\ 0 & 0 & 0 \end{bmatrix} \implies \operatorname{rank}(A) = 1, \quad \operatorname{nullity}(A) = 3 - 1 = 2.
  $$

**Summary:**
- If $t \notin \{1, -2\}$: $\operatorname{rank}(A) = 3$, $\operatorname{nullity}(A) = 0$.
- If $t = -2$: $\operatorname{rank}(A) = 2$, $\operatorname{nullity}(A) = 1$.
- If $t = 1$: $\operatorname{rank}(A) = 1$, $\operatorname{nullity}(A) = 2$.

---

## 3. Column Space

### Definition
Let $A$ be an $n \times p$ matrix:
$$
A = \begin{bmatrix} c_1 & c_2 & \cdots & c_p \end{bmatrix} = \begin{bmatrix}
a_{11} & a_{12} & \cdots & a_{1p} \\
a_{21} & a_{22} & \cdots & a_{2p} \\
\vdots & \vdots & \ddots & \vdots \\
a_{n1} & a_{n2} & \cdots & a_{np}
\end{bmatrix},
$$
where each $c_j = \begin{bmatrix} a_{1j} \\ a_{2j} \\ \vdots \\ a_{nj} \end{bmatrix} \in \mathbb{R}^n$ is a column vector.
The **column space** of $A$, denoted $C(A)$, is the subspace of $\mathbb{R}^n$ spanned by the column vectors of $A$:
$$
C(A) = \operatorname{span}\{c_1, c_2, \dots, c_p\} \subseteq \mathbb{R}^n.
$$

---

### Example 1: Writing the Column Space
Find $C(A)$ for $A = \begin{bmatrix} 1 & 2 & 3 \\ 0 & 1 & -1 \end{bmatrix}$.

**Solution:**
$$
\begin{aligned}
C(A) &= \operatorname{span}\left\{ \begin{bmatrix} 1 \\ 0 \end{bmatrix}, \begin{bmatrix} 2 \\ 1 \end{bmatrix}, \begin{bmatrix} 3 \\ -1 \end{bmatrix} \right\} \\
&= \left\{ x(1, 0) + y(2, 1) + z(3, -1) : x, y, z \in \mathbb{R} \right\} \\
&= \left\{ (x + 2y + 3z, y - z) : x, y, z \in \mathbb{R} \right\} \subseteq \mathbb{R}^2.
\end{aligned}
$$

---

### Warning: $C(A) \ne C(A')$ in General!
Unlike the row space, **row operations change the column space**:
$$
\boxed{C(A) \ne C(A')}
$$

**Counterexample:**
Consider $A = \begin{bmatrix} 1 & 2 \\ 3 & 6 \end{bmatrix} \sim A' = \begin{bmatrix} 1 & 2 \\ 0 & 0 \end{bmatrix}$.
- Columns of $A$: $c_1 = \begin{bmatrix} 1 \\ 3 \end{bmatrix}, c_2 = \begin{bmatrix} 2 \\ 6 \end{bmatrix} = 2 c_1 \implies C(A) = \operatorname{span}\left\{ \begin{bmatrix} 1 \\ 3 \end{bmatrix} \right\}$.
- Columns of $A'$: $c'_1 = \begin{bmatrix} 1 \\ 0 \end{bmatrix}, c'_2 = \begin{bmatrix} 2 \\ 0 \end{bmatrix} = 2 c'_1 \implies C(A') = \operatorname{span}\left\{ \begin{bmatrix} 1 \\ 0 \end{bmatrix} \right\}$.
- Clearly, $\operatorname{span}\left\{ \begin{bmatrix} 1 \\ 3 \end{bmatrix} \right\} \ne \operatorname{span}\left\{ \begin{bmatrix} 1 \\ 0 \end{bmatrix} \right\}$, so $C(A) \ne C(A')$.

---

### Theorems for Finding a Basis of $C(A)$

> **Theorem 2:** The column vectors of $A'$ that contain the **leading 1s** form a basis of $C(A')$.

> **Theorem 3:** A set of column vectors of $A'$ forms a basis of $C(A')$ if and only if the **corresponding original column vectors of $A$** form a basis of $C(A)$.

**Procedure to find a basis of $C(A)$:**
1. Reduce $A$ to row-echelon form $A'$.
2. Identify the columns containing the leading 1s (the pivot columns).
3. Select the **original columns of $A$** that correspond to these pivot columns. These form a basis for $C(A)$.

---

### Example: Basis of $C(A)$ for a $3 \times 4$ Matrix
Find a basis of $C(A)$, where:
$$
A = \begin{bmatrix} 1 & 3 & 2 & -1 \\ 1 & 4 & 1 & 1 \\ 3 & 2 & -1 & 1 \end{bmatrix} = \begin{bmatrix} c_1 & c_2 & c_3 & c_4 \end{bmatrix}.
$$

**Row reduction:**
$$
\begin{aligned}
A &\sim \begin{bmatrix} \mathbf{1} & 3 & 2 & -1 \\ 0 & \mathbf{1} & -1 & 2 \\ 0 & -7 & -7 & 4 \end{bmatrix} \\
&\sim \begin{bmatrix} \mathbf{1} & 3 & 2 & -1 \\ 0 & \mathbf{1} & -1 & 2 \\ 0 & 0 & -14 & 18 \end{bmatrix} \\
&\sim \begin{bmatrix} \mathbf{1} & 3 & 2 & -1 \\ 0 & \mathbf{1} & -1 & 2 \\ 0 & 0 & \mathbf{1} & -9/7 \end{bmatrix} = A'.
\end{aligned}
$$
The leading 1s are in columns 1, 2, and 3 ($c'_1, c'_2, c'_3$).
Therefore, $\{c'_1, c'_2, c'_3\}$ is a basis of $C(A')$.
By Theorem 3, the basis of $C(A)$ consists of the original columns:
$$
\text{Basis of } C(A) = \{ c_1 = (1, 1, 3), \; c_2 = (3, 4, 2), \; c_3 = (2, 1, -1) \}.
$$

---

### Example: Basis of $C(A)$ for a $4 \times 6$ Matrix
Find a basis of $C(A)$, where:
$$
A = \begin{bmatrix}
1 & -3 & 4 & -2 & 5 & 4 \\
2 & -6 & 9 & -1 & 8 & 2 \\
2 & -6 & 9 & -1 & 9 & 7 \\
-1 & 3 & -4 & 2 & -5 & -4
\end{bmatrix} = \begin{bmatrix} c_1 & c_2 & c_3 & c_4 & c_5 & c_6 \end{bmatrix}.
$$

**Row reduction gives:**
$$
A \sim A' = \begin{bmatrix}
\mathbf{1} & 3 & 4 & -2 & 5 & 4 \\
0 & 0 & \mathbf{1} & 3 & -2 & -6 \\
0 & 0 & 0 & 0 & \mathbf{1} & 5 \\
0 & 0 & 0 & 0 & 0 & 0
\end{bmatrix}.
$$
The leading 1s are in columns 1, 3, and 5 ($c'_1, c'_3, c'_5$).
Thus, a basis of $C(A')$ is $\{c'_1, c'_3, c'_5\}$.
Consequently, a basis of $C(A)$ is:
$$
\text{Basis of } C(A) = \{ c_1 = (1, 2, 2, -1), \; c_3 = (4, 9, 9, -4), \; c_5 = (5, 8, 9, -5) \}.
$$

---

### Important Identity: Dimension of Column Space
$$
\boxed{\dim(C(A)) = \text{number of leading 1s} = \operatorname{rank}(A) = \dim(R(A))}
$$
The row space and column space of any matrix always have the exact same dimension, which is the rank of the matrix!

---

## 4. Fundamental Rank Theorems and Properties

### Rule 2: Rank Bound
Let $A$ be a matrix of size $n \times p$. Then:
$$
\boxed{\operatorname{rank}(A) \le \min(n, p)}
$$

**Examples:**
- If $A$ is of size $5 \times 3$: $\operatorname{rank}(A) \le \min(5,3) = 3$. If $\operatorname{rank}(A) = 3$, then $\operatorname{nullity}(A) = 3 - 3 = 0$.
- If $A$ is of size $3 \times 5$: $\operatorname{rank}(A) \le \min(3,5) = 3$. If $\operatorname{rank}(A) = 3$, then $\operatorname{nullity}(A) = 5 - 3 = 2$.
- If $A$ is of size $5 \times 5$: $\operatorname{rank}(A) \le 5$. If $\operatorname{rank}(A) = 5$, then $\operatorname{nullity}(A) = 5 - 5 = 0$.

---

### Rule 3: Rank of Transpose
$$
\boxed{\operatorname{rank}(A^T) = \operatorname{rank}(A)}
$$

**Proof:**
By definition:
$$
C(A^T) = R(A) \quad \text{and} \quad R(A^T) = C(A).
$$
Therefore:
$$
\operatorname{rank}(A^T) = \dim(C(A^T)) = \dim(R(A)) = \operatorname{rank}(A). \quad \blacksquare
$$

---

### Example: When is $\operatorname{nullity}(A^T) = \operatorname{nullity}(A)$?
Let $A$ be a matrix of size $n \times p$. When does $\operatorname{nullity}(A^T) = \operatorname{nullity}(A)$ hold?

**Solution:**
From the Rank-Nullity Theorem:
$$
\begin{aligned}
\operatorname{rank}(A) + \operatorname{nullity}(A) &= p \implies \operatorname{nullity}(A) = p - \operatorname{rank}(A) \\
\operatorname{rank}(A^T) + \operatorname{nullity}(A^T) &= n \implies \operatorname{nullity}(A^T) = n - \operatorname{rank}(A^T)
\end{aligned}
$$
Equating the two nullities:
$$
\operatorname{nullity}(A^T) = \operatorname{nullity}(A) \iff n - \operatorname{rank}(A^T) = p - \operatorname{rank}(A).
$$
Since $\operatorname{rank}(A^T) = \operatorname{rank}(A)$, we cancel the rank terms:
$$
n = p.
$$
**Conclusion:** $\operatorname{nullity}(A^T) = \operatorname{nullity}(A)$ if and only if $n = p$, which means **$A$ must be a square matrix**.

---

## 5. Applications

### Application 1: Extracting a Basis from a Spanning Set via Column Matrix
Let $V = \operatorname{span}\{v_1, v_2, v_3, v_4, v_5\} \subseteq \mathbb{R}^4$, where:
$$
\begin{aligned}
v_1 &= (1, -2, 0, 3), \\
v_2 &= (2, -5, -3, 6), \\
v_3 &= (0, 1, 3, 0), \\
v_4 &= (2, -1, 4, -7), \\
v_5 &= (5, -8, 1, 2).
\end{aligned}
$$
Find a basis of $V$.

**Solution:**
Form the matrix $A$ having $v_1, \dots, v_5$ as its columns:
$$
A = \begin{bmatrix}
1 & 2 & 0 & 2 & 5 \\
-2 & -5 & 1 & -1 & -8 \\
0 & -3 & 3 & 4 & 1 \\
3 & 6 & 0 & -7 & 2
\end{bmatrix}.
$$
Then $V = C(A)$. Row reduce $A$ to find pivot columns:
$$
A \sim A' = \begin{bmatrix}
\mathbf{1} & 0 & 2 & 0 & 1 \\
0 & \mathbf{1} & -1 & 0 & 1 \\
0 & 0 & 0 & \mathbf{1} & 1 \\
0 & 0 & 0 & 0 & 0
\end{bmatrix} = \begin{bmatrix} v'_1 & v'_2 & v'_3 & v'_4 & v'_5 \end{bmatrix}.
$$
The leading 1s are in columns 1, 2, and 4.
Therefore, a basis of $C(A') = \operatorname{span}\{v'_1, v'_2, v'_4\}$, so a basis of $V = C(A)$ is:
$$
\text{Basis of } V = \{v_1, v_2, v_4\}, \quad \text{and} \quad \dim(V) = 3.
$$

---

### Application 2: Finding the Dimension of a Spanned Space via Row Matrix
Let $V = \operatorname{span}\{w_1, w_2, w_3, w_4\}$, where:
$$
\begin{aligned}
w_1 &= (1, 0, 1, 1), \\
w_2 &= (-3, 3, 7, 1), \\
w_3 &= (-1, 3, 9, 3), \\
w_4 &= (-5, 3, 5, -1).
\end{aligned}
$$
Find $\dim(V)$.

**Solution:**
Set $V = R(A)$ by arranging the vectors as rows of a matrix $A$:
$$
A = \begin{bmatrix}
1 & 0 & 1 & 1 \\
-3 & 3 & 7 & 1 \\
-1 & 3 & 9 & 3 \\
-5 & 3 & 5 & -1
\end{bmatrix}.
$$
Row reducing:
$$
\begin{aligned}
A &\sim \begin{bmatrix}
\mathbf{1} & 0 & 1 & 1 \\
0 & 3 & 10 & 4 \\
0 & 3 & 10 & 4 \\
0 & 3 & 10 & 4
\end{bmatrix} \\
&\sim \begin{bmatrix}
\mathbf{1} & 0 & 1 & 1 \\
0 & 3 & 10 & 4 \\
0 & 0 & 0 & 0 \\
0 & 0 & 0 & 0
\end{bmatrix} \\
&\sim \begin{bmatrix}
\mathbf{1} & 0 & 1 & 1 \\
0 & \mathbf{1} & 10/3 & 4/3 \\
0 & 0 & 0 & 0 \\
0 & 0 & 0 & 0
\end{bmatrix}.
\end{aligned}
$$
Since there are 2 non-zero rows, $\dim(V) = \dim(R(A)) = \operatorname{rank}(A) = 2$.

---

### Application 3: Parametric Rank Discussion
Discuss the rank of $A$ according to the real parameter $t$:
$$
A = \begin{bmatrix} t & 3 & -1 \\ 3 & 6 & -2 \\ -1 & -3 & t \end{bmatrix}.
$$

**Solution:**
Interchange row 1 and row 3, multiplying row 1 by $-1$:
$$
A \sim \begin{bmatrix} \mathbf{1} & 3 & -t \\ 3 & 6 & -2 \\ t & 3 & -1 \end{bmatrix}.
$$
Perform row operations $R_2 \to R_2 - 3 R_1$ and $R_3 \to R_3 - t R_1$:
$$
A \sim \begin{bmatrix} \mathbf{1} & 3 & -t \\ 0 & -3 & -2 + 3t \\ 0 & 3 - 3t & t^2 - 1 \end{bmatrix}.
$$
Divide row 2 by $-3$:
$$
A \sim \begin{bmatrix} \mathbf{1} & 3 & -t \\ 0 & \mathbf{1} & \frac{2 - 3t}{3} \\ 0 & 3(1 - t) & t^2 - 1 \end{bmatrix}.
$$
Perform $R_3 \to R_3 - 3(1 - t) R_2$:
The $(3,3)$ entry becomes:
$$
\begin{aligned}
(t^2 - 1) - 3(1 - t) \left( \frac{2 - 3t}{3} \right) &= (t^2 - 1) - (1 - t)(2 - 3t) \\
&= t^2 - 1 - (2 - 5t + 3t^2) \\
&= t^2 - 1 - 2 + 5t - 3t^2 \\
&= -2t^2 + 5t - 3 \\
&= -(2t^2 - 5t + 3) \\
&= -(2t - 3)(t - 1).
\end{aligned}
$$
Thus the echelon form is:
$$
A \sim \begin{bmatrix}
\mathbf{1} & 3 & -t \\
0 & \mathbf{1} & \frac{2 - 3t}{3} \\
0 & 0 & -(2t - 3)(t - 1)
\end{bmatrix}.
$$

**Discussion:**
- **Case 1: $t \notin \{3/2, 1\}$:**
  $-(2t - 3)(t - 1) \ne 0$, so row 3 has a leading 1.
  $$
  A \sim \begin{bmatrix} \mathbf{1} & 3 & -t \\ 0 & \mathbf{1} & \frac{2 - 3t}{3} \\ 0 & 0 & \mathbf{1} \end{bmatrix} \implies \operatorname{rank}(A) = 3, \quad \operatorname{nullity}(A) = 0.
  $$
- **Case 2: $t = 3/2$:**
  $-(2t - 3)(t - 1) = 0$, while row 2 entry is $\frac{2 - 3(3/2)}{3} = \frac{2 - 9/2}{3} = -\frac{5}{6} \ne 0$.
  $$
  A \sim \begin{bmatrix} 1 & 3 & -3/2 \\ 0 & 1 & -5/6 \\ 0 & 0 & 0 \end{bmatrix} \implies \operatorname{rank}(A) = 2, \quad \operatorname{nullity}(A) = 1.
  $$
- **Case 3: $t = 1$:**
  $-(2t - 3)(t - 1) = 0$, while row 2 entry is $\frac{2 - 3(1)}{3} = -\frac{1}{3}$.
  $$
  A \sim \begin{bmatrix} 1 & 3 & -1 \\ 0 & 1 & -1/3 \\ 0 & 0 & 0 \end{bmatrix} \implies \operatorname{rank}(A) = 2, \quad \operatorname{nullity}(A) = 1.
  $$

---

## 6. Source Verification Appendix

The complete scanned source material for this chapter is preserved in the local assets directory:
- **Version 1 (Handout notes):** `assets/09-fundamental-spaces-1/page-001-part-001.webp` through `page-001-part-013.webp`
- **Version 2 (Completed solutions):** `assets/09-fundamental-spaces-2/page-001-part-001.webp` through `page-001-part-014.webp`
