---
id: "13-orthogonality"
title: "Orthogonality in R^n — Orthogonal Sets, Bases, Matrices, and Complements"
course: "MATHS211"
type: "chapter-section"
order: 13
language: "en"
source_ids: ["1CPPZ50OXHtRaLVotnz7DiiLbO4nXb5au"]
source_page_count: 1
content_format: "complete_transcription"
source_coverage: "all pages of every listed source version"
transcribed_source_id: "1CPPZ50OXHtRaLVotnz7DiiLbO4nXb5au"
transcribed_source_parts: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
---

# Orthogonality in R^n — Orthogonal Sets, Bases, Matrices, and Complements

This document provides the complete, rigorous mathematical transcription of Chapter 13, covering **orthogonal sets**, proofs of linear independence, constructing **orthogonal and orthonormal bases**, **Fourier expansion**, **orthogonal matrices** ($A^{-1} = A^T$) and their characterization, and the **orthogonal complement** ($W^\perp$) along with the fundamental subspace theorem ($R(A)^\perp = N(A)$).

---

## 1. Orthogonal Sets

### Definition
Let $W$ be a subspace of $\mathbb{R}^n$. A set of vectors $S = \{v_1, v_2, \dots, v_k\}$ in $W$ is said to be an **orthogonal set** if every pair of distinct vectors is orthogonal:

$$
\boxed{v_i \cdot v_j = 0 \quad \text{for all } i \ne j}
$$

### Example
In $\mathbb{R}^3$, let:
$$
v_1 = (2, 1, -1), \qquad v_2 = (0, 1, 1), \qquad v_3 = (1, -1, 1).
$$
Verifying pairwise orthogonality:
$$
\begin{aligned}
v_1 \cdot v_2 &= 2(0) + 1(1) + (-1)(1) = 0 + 1 - 1 = 0, \\
v_2 \cdot v_3 &= 0(1) + 1(-1) + 1(1) = 0 - 1 + 1 = 0, \\
v_1 \cdot v_3 &= 2(1) + 1(-1) + (-1)(1) = 2 - 1 - 1 = 0.
\end{aligned}
$$
Thus, $\{v_1, v_2, v_3\}$ is an orthogonal set in $\mathbb{R}^3$.

---

### Proposition: Nonzero Orthogonal Vectors are Linearly Independent

> **Proposition:** If $S = \{v_1, v_2, \dots, v_k\}$ is an orthogonal set of **non-zero** vectors in $\mathbb{R}^n$, then $S$ is **linearly independent**.

**Proof:**
Suppose that a linear combination of the vectors equals the zero vector:
$$
a_1 v_1 + a_2 v_2 + \cdots + a_k v_k = 0.
$$
Take the dot product of both sides with an arbitrary vector $v_j$ from the set ($1 \le j \le k$):
$$
v_j \cdot (a_1 v_1 + a_2 v_2 + \cdots + a_k v_k) = v_j \cdot 0 = 0.
$$
By the distributive property of the dot product:
$$
a_1 (v_j \cdot v_1) + a_2 (v_j \cdot v_2) + \cdots + a_j (v_j \cdot v_j) + \cdots + a_k (v_j \cdot v_k) = 0.
$$
Since $S$ is an orthogonal set, $v_j \cdot v_i = 0$ for all $i \ne j$. Therefore, all terms except the $j$-th term vanish:
$$
a_j (v_j \cdot v_j) = 0 \implies a_j \|v_j\|^2 = 0.
$$
Since $v_j$ is a non-zero vector, $\|v_j\|^2 \ne 0$. Dividing by $\|v_j\|^2$ gives:
$$
a_j = 0.
$$
Since this holds for every $j \in \{1, 2, \dots, k\}$, all coefficients must be zero:
$$
a_1 = a_2 = \cdots = a_k = 0.
$$
Hence, $S$ is linearly independent. $\blacksquare$

---

### Corollary: Orthogonal Basis Criterion
> **Corollary:** If $S = \{v_1, v_2, \dots, v_n\}$ is an orthogonal set of non-zero vectors in a subspace $W$ with $\dim(W) = n$, then $S$ is an **orthogonal basis** of $W$.

In the preceding example, $\{v_1, v_2, v_3\}$ is an orthogonal set of 3 non-zero vectors in $\mathbb{R}^3$. Since $\dim(\mathbb{R}^3) = 3$, it automatically forms an orthogonal basis of $\mathbb{R}^3$.

---

### Example: Constructing an Orthogonal Basis for a Subspace
Let $W = \{ (x, y, z) \in \mathbb{R}^3 : x - y + 2z = 0 \}$.
1. Show that $W$ is a subspace of $\mathbb{R}^3$.
2. Find $\dim(W)$.
3. Find an orthogonal basis of $W$.

**Solution:**
**1. Subspace & Basis:**
Express $x$ in terms of the free variables $y, z$:
$$
x = y - 2z.
$$
$$
\begin{aligned}
W &= \{ (y - 2z, y, z) : y, z \in \mathbb{R} \} \\
&= \{ y(1, 1, 0) + z(-2, 0, 1) : y, z \in \mathbb{R} \} \\
&= \operatorname{span}\{u = (1, 1, 0), \; v = (-2, 0, 1)\}.
\end{aligned}
$$
Since $W$ is the span of two vectors, it is a subspace of $\mathbb{R}^3$.

**2. Dimension:**
Check linear independence of $u$ and $v$:
$u = \alpha v \implies (1, 1, 0) = (-2\alpha, 0, \alpha)$, which requires $1 = 0$, an impossibility.
Thus $\{u, v\}$ is linearly independent, so it is a basis of $W$, and $\dim(W) = 2$.

**3. Orthogonal Basis:**
Compute the dot product of $u$ and $v$:
$$
u \cdot v = 1(-2) + 1(0) + 0(1) = -2 \ne 0.
$$
Since $u$ and $v$ are not orthogonal, we find a new vector $w = (a, b, c) \in W$ such that $w \perp u$:
- $w \in W \implies a - b + 2c = 0 \quad (1)$
- $w \perp u \implies u \cdot w = 0 \implies 1(a) + 1(b) + 0(c) = 0 \implies a + b = 0 \quad (2)$

Adding $(1)$ and $(2)$:
$$
(a - b + 2c) + (a + b) = 0 \implies 2a + 2c = 0 \implies a = -c.
$$
From $(2)$: $b = -a = -(-c) = c$.
Choosing $c = 1 \implies a = -1, b = 1, c = 1$, giving:
$$
w = (-1, 1, 1).
$$
Check:
- $w \in W$: $-1 - 1 + 2(1) = 0$. $\checkmark$
- $w \cdot u = -1(1) + 1(1) + 1(0) = 0$. $\checkmark$

Since $u \ne 0$ and $w \ne 0$ are orthogonal vectors in $W$ and $\dim(W) = 2$:
$$
\text{Orthogonal Basis of } W = \{ u = (1, 1, 0), \; w = (-1, 1, 1) \}.
$$

---

## 2. Orthogonal and Orthonormal Bases

### Theorem: Coordinates Relative to an Orthogonal Basis (Fourier Expansion)
> **Theorem:** Let $\{v_1, v_2, \dots, v_n\}$ be an orthogonal basis of a subspace $W$.
> For any vector $u \in W$, the unique representation:
> $$
> u = a_1 v_1 + a_2 v_2 + \cdots + a_n v_n
> $$
> has coefficients given explicitly by:
> $$
> \boxed{a_j = \frac{u \cdot v_j}{\|v_j\|^2} \quad \text{for every } 1 \le j \le n}
> $$

**Proof:**
Taking the dot product of $u$ with $v_j$:
$$
\begin{aligned}
u \cdot v_j &= (a_1 v_1 + \dots + a_j v_j + \dots + a_n v_n) \cdot v_j \\
&= a_1(v_1 \cdot v_j) + \dots + a_j(v_j \cdot v_j) + \dots + a_n(v_n \cdot v_j).
\end{aligned}
$$
Because $v_i \cdot v_j = 0$ for all $i \ne j$:
$$
u \cdot v_j = a_j \|v_j\|^2 \implies a_j = \frac{u \cdot v_j}{\|v_j\|^2}. \quad \blacksquare
$$

---

### Example: Computing Coordinates Relative to an Orthogonal Basis
Let $B = \{v_1 = (-3, 1, 2), \; v_2 = (2, 4, 1), \; v_3 = (1, -1, 2)\}$ be an orthogonal basis of $\mathbb{R}^3$.
Find the coordinates of $u = (1, 2, 3)$ relative to $B$.

**Solution:**
Verify orthogonality:
$$
\begin{aligned}
v_1 \cdot v_2 &= -3(2) + 1(4) + 2(1) = -6 + 4 + 2 = 0, \\
v_2 \cdot v_3 &= 2(1) + 4(-1) + 1(2) = 2 - 4 + 2 = 0, \\
v_1 \cdot v_3 &= -3(1) + 1(-1) + 2(2) = -3 - 1 + 4 = 0.
\end{aligned}
$$
Compute coefficients $a_1, a_2, a_3$:
$$
\begin{aligned}
a_1 &= \frac{u \cdot v_1}{\|v_1\|^2} = \frac{1(-3) + 2(1) + 3(2)}{(-3)^2 + 1^2 + 2^2} = \frac{-3 + 2 + 6}{9 + 1 + 4} = \frac{5}{14}, \\
a_2 &= \frac{u \cdot v_2}{\|v_2\|^2} = \frac{1(2) + 2(4) + 3(1)}{2^2 + 4^2 + 1^2} = \frac{2 + 8 + 3}{4 + 16 + 1} = \frac{13}{21}, \\
a_3 &= \frac{u \cdot v_3}{\|v_3\|^2} = \frac{1(1) + 2(-1) + 3(2)}{1^2 + (-1)^2 + 2^2} = \frac{1 - 2 + 6}{1 + 1 + 4} = \frac{5}{6}.
\end{aligned}
$$
Thus:
$$
u = \frac{5}{14} v_1 + \frac{13}{21} v_2 + \frac{5}{6} v_3.
$$

---

### Orthonormal Bases

### Definition
An orthogonal basis $\{v_1, v_2, \dots, v_n\}$ is called an **orthonormal basis** if every vector has unit length ($\|v_i\| = 1$):

$$
\begin{aligned}
\text{(i) } & v_i \cdot v_j = 0 \quad \text{for } i \ne j, \\
\text{(ii) } & v_i \cdot v_i = \|v_i\|^2 = 1 \iff \|v_i\| = 1 \quad \text{for all } i.
\end{aligned}
$$

> Compact Kronecker delta notation: $v_i \cdot v_j = \delta_{ij} = \begin{cases} 1 & \text{if } i = j \\ 0 & \text{if } i \ne j \end{cases}$.

---

### Constructing an Orthonormal Basis via Normalization
Given an orthogonal basis $\{v_1, v_2, \dots, v_n\}$, replacing each vector with its normalized version:
$$
u_i = \frac{v_i}{\|v_i\|}
$$
yields an orthonormal basis $\{u_1, u_2, \dots, u_n\}$.

#### Example:
Let $B = \{v_1 = (4, 2, -5), \; v_2 = (-1, 2, 0), \; v_3 = (2, 1, 2)\}$ be an orthogonal basis of $\mathbb{R}^3$.
Compute the norms:
$$
\begin{aligned}
\|v_1\| &= \sqrt{4^2 + 2^2 + (-5)^2} = \sqrt{16 + 4 + 25} = \sqrt{45} = 3\sqrt{5}, \\
\|v_2\| &= \sqrt{(-1)^2 + 2^2 + 0^2} = \sqrt{1 + 4 + 0} = \sqrt{5}, \\
\|v_3\| &= \sqrt{2^2 + 1^2 + 2^2} = \sqrt{4 + 1 + 4} = \sqrt{9} = 3.
\end{aligned}
$$
The orthonormal basis is:
$$
u_1 = \left( \frac{4}{3\sqrt{5}}, \frac{2}{3\sqrt{5}}, -\frac{5}{3\sqrt{5}} \right), \quad u_2 = \left( -\frac{1}{\sqrt{5}}, \frac{2}{\sqrt{5}}, 0 \right), \quad u_3 = \left( \frac{2}{3}, \frac{1}{3}, \frac{2}{3} \right).
$$

---

### Corollary: Coordinate Expansion Relative to an Orthonormal Basis
> If $\{v_1, v_2, \dots, v_n\}$ is an **orthonormal basis** of $W$, then since $\|v_j\|^2 = 1$, any $u \in W$ satisfies:
> $$
> \boxed{u = (u \cdot v_1) v_1 + (u \cdot v_2) v_2 + \cdots + (u \cdot v_n) v_n}
> $$

#### Example:
Find the coordinates of $w = (1, 2, 3)$ relative to the orthonormal basis $\{u_1, u_2, u_3\}$ above:
$$
\begin{aligned}
a &= u_1 \cdot w = \frac{4(1) + 2(2) - 5(3)}{3\sqrt{5}} = \frac{4 + 4 - 15}{3\sqrt{5}} = -\frac{7}{3\sqrt{5}}, \\
b &= u_2 \cdot w = \frac{-1(1) + 2(2) + 0(3)}{\sqrt{5}} = \frac{-1 + 4}{\sqrt{5}} = \frac{3}{\sqrt{5}}, \\
c &= u_3 \cdot w = \frac{2(1) + 1(2) + 2(3)}{3} = \frac{2 + 2 + 6}{3} = \frac{10}{3}.
\end{aligned}
$$
Thus:
$$
w = -\frac{7}{3\sqrt{5}} u_1 + \frac{3}{\sqrt{5}} u_2 + \frac{10}{3} u_3.
$$

---

## 3. Orthogonal Matrices

### Definition
A square matrix $A$ of size $n \times n$ is called an **orthogonal matrix** if its transpose equals its inverse:

$$
\boxed{A^{-1} = A^T \iff A A^T = I_n \iff A^T A = I_n}
$$

### Examples
1. $A = \begin{bmatrix} 1 & 1 & 0 \\ 0 & 0 & 1 \\ 1 & 0 & 0 \end{bmatrix}$:
   Row reduction of $[A \mid I]$ yields $A^{-1} = \begin{bmatrix} 0 & 0 & 1 \\ 1 & 0 & -1 \\ 0 & 1 & 0 \end{bmatrix}$.
   Since $A^T = \begin{bmatrix} 1 & 0 & 1 \\ 1 & 0 & 0 \\ 0 & 1 & 0 \end{bmatrix} \ne A^{-1}$, $A$ is **not** an orthogonal matrix.

2. Rotation matrix $B = \begin{bmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{bmatrix}$:
   $$
   B^{-1} = \frac{1}{\cos^2\theta + \sin^2\theta} \begin{bmatrix} \cos\theta & \sin\theta \\ -\sin\theta & \cos\theta \end{bmatrix} = \begin{bmatrix} \cos\theta & \sin\theta \\ -\sin\theta & \cos\theta \end{bmatrix} = B^T.
   $$
   Therefore, $B$ is an orthogonal matrix.

---

### Fundamental Properties of Orthogonal Matrices

Let $A$ be an $n \times n$ orthogonal matrix.

1. **Determinant is $\pm 1$:**
   $$
   \boxed{\det(A) = \pm 1}
   $$
   *Proof:* $A^T A = I \implies \det(A^T A) = \det(I) = 1 \implies \det(A^T) \det(A) = 1 \implies (\det A)^2 = 1 \implies \det A = \pm 1$.

2. **Preservation of Dot Product (Isometry):**
   $$
   \boxed{Ax \cdot Ay = x \cdot y \quad \text{for all } x, y \in \mathbb{R}^n}
   $$
   *Proof:* Using matrix multiplication form $u \cdot v = u^T v$:
   $$
   Ax \cdot Ay = (Ax)^T (Ay) = x^T A^T A y = x^T I_n y = x^T y = x \cdot y. \quad \blacksquare
   $$

3. **Preservation of Norm (Length):**
   $$
   \boxed{\|Ax\| = \|x\| \quad \text{for all } x \in \mathbb{R}^n}
   $$
   *Proof:* $\|Ax\| = \sqrt{Ax \cdot Ax} = \sqrt{x \cdot x} = \|x\|$.

4. **Real Eigenvalues Must Be $\pm 1$:**
   If $\lambda$ is a real eigenvalue of $A$ with eigenvector $x \ne 0$:
   $$
   \|x\| = \|Ax\| = \|\lambda x\| = |\lambda| \, \|x\|.
   $$
   Since $x \ne 0 \implies \|x\| \ne 0$, dividing gives $|\lambda| = 1 \implies \boxed{\lambda = \pm 1}$.

5. **Transpose Invariance:**
   $$
   \boxed{A \text{ is orthogonal} \iff A^T \text{ is orthogonal}}
   $$
   *Proof:* $A$ orthogonal $\iff A A^T = I \iff (A A^T)^T = I^T \iff (A^T)^T A^T = I \iff A^T \text{ is orthogonal}$.

---

### Characterization Theorem: Orthonormal Columns and Rows

> **Theorem:** An $n \times n$ matrix $A$ is orthogonal if and only if its **column vectors form an orthonormal basis** of $\mathbb{R}^n$. Equivalently, if and only if its **row vectors form an orthonormal basis** of $\mathbb{R}^n$.

**Proof for Columns:**
Let $A = \begin{bmatrix} c_1 & c_2 & \cdots & c_n \end{bmatrix}$. The $(i, j)$-entry of $A^T A$ is:
$$
(A^T A)_{ij} = c_i^T c_j = c_i \cdot c_j.
$$
Therefore:
$$
A^T A = I_n \iff c_i \cdot c_j = \delta_{ij} = \begin{cases} 1 & \text{if } i = j \\ 0 & \text{if } i \ne j \end{cases}
$$
which means $\{c_1, c_2, \dots, c_n\}$ is an orthonormal set. Since there are $n$ such vectors in $\mathbb{R}^n$, they form an orthonormal basis. $\blacksquare$

#### Examples:
1. $A = \begin{bmatrix} \frac{\sqrt{3}}{3} & \frac{\sqrt{2}}{2} & \frac{1}{\sqrt{6}} \\ \frac{\sqrt{3}}{3} & -\frac{\sqrt{2}}{2} & \frac{1}{\sqrt{6}} \\ -\frac{\sqrt{3}}{3} & 0 & \frac{2}{\sqrt{6}} \end{bmatrix}$.
   Check columns:
   - $\|c_1\|^2 = \frac{3}{9} + \frac{3}{9} + \frac{3}{9} = 1$.
   - $\|c_2\|^2 = \frac{2}{4} + \frac{2}{4} + 0 = 1$.
   - $\|c_3\|^2 = \frac{1}{6} + \frac{1}{6} + \frac{4}{6} = 1$.
   - $c_1 \cdot c_2 = \frac{\sqrt{6}}{6} - \frac{\sqrt{6}}{6} + 0 = 0$.
   - $c_1 \cdot c_3 = \frac{\sqrt{3}}{3\sqrt{6}} + \frac{\sqrt{3}}{3\sqrt{6}} - \frac{2\sqrt{3}}{3\sqrt{6}} = 0$.
   - $c_2 \cdot c_3 = \frac{\sqrt{2}}{2\sqrt{6}} - \frac{\sqrt{2}}{2\sqrt{6}} + 0 = 0$.
   Since columns are orthonormal, $A$ is an orthogonal matrix.

2. Permutation matrix $B = \begin{bmatrix} 0 & 1 & 0 \\ 0 & 0 & 1 \\ 1 & 0 & 0 \end{bmatrix}$.
   Its columns are standard unit vectors $\{e_3, e_1, e_2\}$, which are orthonormal. Thus $B$ is orthogonal.

---

## 4. Orthogonal Complement

### Definition
Let $W$ be a subspace of $\mathbb{R}^n$. The **orthogonal complement** of $W$, denoted $W^\perp$ ("$W$ perp"), is defined as the set of all vectors in $\mathbb{R}^n$ that are orthogonal to every vector in $W$:

$$
\boxed{W^\perp = \{ u \in \mathbb{R}^n : u \cdot v = 0 \quad \text{for all } v \in W \}}
$$

```
           W^perp
             |
             |  u
        +----+----+
       /     |   /
      /      +--/--- v  in W
     /         /
    +---------+
         W
```

---

### Theorem: $W^\perp$ is a Subspace of $\mathbb{R}^n$

**Proof:**
1. $0 \cdot v = 0$ for all $v \in W \implies 0 \in W^\perp \implies W^\perp \ne \emptyset$.
2. Let $u, u' \in W^\perp$ and $v \in W$:
   $$
   (u + u') \cdot v = u \cdot v + u' \cdot v = 0 + 0 = 0 \implies u + u' \in W^\perp.
   $$
3. Let $u \in W^\perp$, $\alpha \in \mathbb{R}$, and $v \in W$:
   $$
   (\alpha u) \cdot v = \alpha (u \cdot v) = \alpha(0) = 0 \implies \alpha u \in W^\perp.
   $$
Thus, $W^\perp$ is a subspace of $\mathbb{R}^n$. $\blacksquare$

---

### Theorem: Orthogonality to a Spanning Set
> **Theorem:** If $W = \operatorname{span}\{v_1, v_2, \dots, v_r\}$, then:
> $$
> \boxed{W^\perp = \{ u \in \mathbb{R}^n : u \cdot v_i = 0 \quad \text{for all } 1 \le i \le r \}}
> $$

**Proof:**
- If $u \in W^\perp$, then $u \perp v$ for all $v \in W$, so in particular $u \cdot v_i = 0$ for each $i$.
- Conversely, suppose $u \cdot v_i = 0$ for all $1 \le i \le r$. Any $v \in W$ can be written as $v = a_1 v_1 + \dots + a_r v_r$. Then:
  $$
  u \cdot v = u \cdot (a_1 v_1 + \dots + a_r v_r) = a_1 (u \cdot v_1) + \dots + a_r (u \cdot v_r) = a_1(0) + \dots + a_r(0) = 0.
  $$
  Therefore $u \in W^\perp$. $\blacksquare$

---

### Example: Plane in $\mathbb{R}^3$
Find $W^\perp$ for $W = \{ (x, y, z) \in \mathbb{R}^3 : x + y + z = 0 \}$.

**Solution:**
Express $z = -x - y$:
$$
W = \{ (x, y, -x - y) : x, y \in \mathbb{R} \} = \operatorname{span}\{v_1 = (1, 0, -1), \; v_2 = (0, 1, -1)\}.
$$
Now $u = (x, y, z) \in W^\perp \iff u \cdot v_1 = 0$ and $u \cdot v_2 = 0$:
$$
\begin{cases} x - z = 0 \implies x = z \\ y - z = 0 \implies y = z \end{cases}
$$
Setting $z = r \in \mathbb{R}$:
$$
W^\perp = \{ (r, r, r) : r \in \mathbb{R} \} = \operatorname{span}\{(1, 1, 1)\}.
$$
The orthogonal complement of the plane $x + y + z = 0$ is the normal line spanned by $(1, 1, 1)$.

---

## 5. Fundamental Subspace Theorems: $R(A)^\perp = N(A)$

> **Theorem:** Let $A$ be an $n \times p$ matrix. Then:
> $$
> \boxed{R(A)^\perp = N(A)} \qquad \text{and} \qquad \boxed{C(A)^\perp = N(A^T)}
> $$

**Proof:**
Let $A = \begin{bmatrix} r_1 \\ r_2 \\ \vdots \\ r_n \end{bmatrix}$ where $r_i$ are the row vectors of $A$, and let $X = \begin{bmatrix} x_1 \\ x_2 \\ \vdots \\ x_p \end{bmatrix} \in \mathbb{R}^p$.
$$
\begin{aligned}
X \in R(A)^\perp &\iff X \cdot r_i = 0 \quad \text{for all } 1 \le i \le n \\
&\iff \begin{cases}
a_{11} x_1 + a_{12} x_2 + \cdots + a_{1p} x_p = 0 \\
a_{21} x_1 + a_{22} x_2 + \cdots + a_{2p} x_p = 0 \\
\quad \vdots \\
a_{n1} x_1 + a_{n2} x_2 + \cdots + a_{np} x_p = 0
\end{cases} \\
&\iff AX = 0 \\
&\iff X \in N(A).
\end{aligned}
$$
Therefore, $R(A)^\perp = N(A)$.
Replacing $A$ with $A^T$:
$$
R(A^T)^\perp = N(A^T) \implies C(A)^\perp = N(A^T). \quad \blacksquare
$$

---

### Worked Application 1: Basis of $W^\perp$ in $\mathbb{R}^3$
Find a basis of $W^\perp$, where $W = \operatorname{span}\{w_1 = (2, 1, -2), \; w_2 = (4, 0, 1)\}$.

**Solution:**
Form the matrix $A$ having $w_1, w_2$ as rows:
$$
A = \begin{bmatrix} 2 & 1 & -2 \\ 4 & 0 & 1 \end{bmatrix}.
$$
Then $W = R(A)$, and by the fundamental theorem, $W^\perp = R(A)^\perp = N(A)$.
Row reducing $A$:
$$
\begin{aligned}
A &\sim \begin{bmatrix} \mathbf{1} & 1/2 & -1 \\ 0 & -2 & 5 \end{bmatrix} \sim \begin{bmatrix} \mathbf{1} & 1/2 & -1 \\ 0 & \mathbf{1} & -5/2 \end{bmatrix} \\
&\sim \begin{bmatrix} \mathbf{1} & 0 & 1/4 \\ 0 & \mathbf{1} & -5/2 \end{bmatrix} = A'.
\end{aligned}
$$
Solve $A' X = 0$:
$$
\begin{cases} x + \frac{1}{4}z = 0 \implies x = -\frac{1}{4}z \\ y - \frac{5}{2}z = 0 \implies y = \frac{5}{2}z \end{cases}
$$
$z$ is free; set $z = r$:
$$
W^\perp = \left\{ \left(-\frac{1}{4}r, \frac{5}{2}r, r\right) : r \in \mathbb{R} \right\} = \operatorname{span}\{(-1/4, 5/2, 1)\} = \operatorname{span}\{(-1, 10, 4)\}.
$$
Since $(-1, 10, 4) \ne (0, 0, 0)$:
$$
\text{Basis of } W^\perp = \{(-1, 10, 4)\}, \qquad \dim(W^\perp) = 1.
$$

---

### Worked Application 2: Basis of $W^\perp$ in $\mathbb{R}^4$
Find a basis of $W^\perp$, where $W = \operatorname{span}\{w_1, w_2, w_3\} \subseteq \mathbb{R}^4$:
$$
w_1 = (2, -1, 6, 3), \qquad w_2 = (-1, 2, -3, -2), \qquad w_3 = (2, 5, 6, 1).
$$

**Solution:**
Set $W = R(A)$ where:
$$
A = \begin{bmatrix} 2 & -1 & 6 & 3 \\ -1 & 2 & -3 & -2 \\ 2 & 5 & 6 & 1 \end{bmatrix}.
$$
Then $W^\perp = N(A)$. Row reducing $A$:
$$
\begin{aligned}
A &\sim \begin{bmatrix} \mathbf{1} & -2 & 3 & 2 \\ 2 & -1 & 6 & 3 \\ 2 & 5 & 6 & 1 \end{bmatrix} \\
&\sim \begin{bmatrix} \mathbf{1} & -2 & 3 & 2 \\ 0 & 3 & 0 & -1 \\ 0 & 9 & 0 & -3 \end{bmatrix} \\
&\sim \begin{bmatrix} \mathbf{1} & -2 & 3 & 2 \\ 0 & 3 & 0 & -1 \\ 0 & 0 & 0 & 0 \end{bmatrix} \\
&\sim \begin{bmatrix} \mathbf{1} & -2 & 3 & 2 \\ 0 & \mathbf{1} & 0 & -1/3 \\ 0 & 0 & 0 & 0 \end{bmatrix} \\
&\sim \begin{bmatrix} \mathbf{1} & 0 & 3 & 4/3 \\ 0 & \mathbf{1} & 0 & -1/3 \\ 0 & 0 & 0 & 0 \end{bmatrix} = A'.
\end{aligned}
$$
Solving $A' X = 0$ for $X = (x, y, z, t)$:
$$
\begin{cases}
x + 3z + \frac{4}{3}t = 0 \implies x = -3z - \frac{4}{3}t \\
y - \frac{1}{3}t = 0 \implies y = \frac{1}{3}t
\end{cases}
$$
$z$ and $t$ are free variables. Let $z = r$ and $t = s$:
$$
\begin{aligned}
W^\perp &= \left\{ \left(-3r - \frac{4}{3}s, \; \frac{1}{3}s, \; r, \; s\right) : r, s \in \mathbb{R} \right\} \\
&= \left\{ r(-3, 0, 1, 0) + s\left(-\frac{4}{3}, \frac{1}{3}, 0, 1\right) : r, s \in \mathbb{R} \right\} \\
&= \operatorname{span}\left\{ (-3, 0, 1, 0), \; \left(-\frac{4}{3}, \frac{1}{3}, 0, 1\right) \right\} \\
&= \operatorname{span}\left\{ (-3, 0, 1, 0), \; (-4, 1, 0, 3) \right\}.
\end{aligned}
$$
Since $\dim(W^\perp) = 4 - \operatorname{rank}(A) = 4 - 2 = 2$:
$$
\text{Basis of } W^\perp = \{ (-3, 0, 1, 0), \; (-4, 1, 0, 3) \}.
$$

---

## 6. Source Verification Appendix

The complete scanned source material for this chapter is preserved in the local assets directory:
- **Scanned notes (14 parts):** `assets/13-orthogonality-1/page-001-part-001.webp` through `page-001-part-014.webp`
