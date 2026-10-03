---
id: "11-linear-transformations"
title: "8.1–8.2 — Linear Transformations"
course: "MATHS211"
type: "chapter-section"
order: 11
language: "en"
source_ids: ["1fHVXskT6eesE9cth20V4-sAPaP4Vng13", "1Hs1TnvELOJ7uCoUICn2pbLqEi5sYgOYq"]
source_page_count: 2
content_format: "complete_transcription"
source_coverage: "all pages of every listed source version"
transcribed_source_id: "1fHVXskT6eesE9cth20V4-sAPaP4Vng13, 1Hs1TnvELOJ7uCoUICn2pbLqEi5sYgOYq"
transcribed_source_parts: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
---

# 8.1–8.2 — Linear Transformations

This document provides the complete, rigorous mathematical transcription of Chapter 8.1–8.2, covering the formal definition of **linear transformations**, proofs of linearity, **properties of linear mappings**, determining transformations from their action on bases, the **kernel** ($\ker(T)$) and **nullity**, the **range** ($R(T)$) and **rank**, and the **Rank-Nullity Theorem** (Dimension Theorem for linear transformations).

---

## 1. Definition of a Linear Transformation

Let $V$ and $W$ be two real vector spaces. A function:
$$
T: V \longrightarrow W
$$
is called a **linear transformation** (or linear mapping / operator) if it satisfies the following two fundamental axioms for all vectors $u, v \in V$ and all scalars $\alpha \in \mathbb{R}$:

1. **Additivity (Closure under Addition):**
   $$
   \boxed{T(u + v) = T(u) + T(v)}
   $$
2. **Homogeneity (Closure under Scalar Multiplication):**
   $$
   \boxed{T(\alpha u) = \alpha T(u)}
   $$

---

### Examples of Verifying Linear Transformations

#### Example 1: Mapping from $\mathbb{R}^2$ to $\mathbb{R}$
Let $a, b \in \mathbb{R}$ be fixed constants. Define:
$$
T: \mathbb{R}^2 \longrightarrow \mathbb{R}, \qquad T(x, y) = ax + by.
$$
*(In Version 2, specific coefficients $T(x,y) = 2x + 3y$ are used).*

**Proof of Linearity:**
Let $u = (x, y), v = (x', y') \in \mathbb{R}^2$, and $\alpha \in \mathbb{R}$.
1. **Additivity:**
   $$
   \begin{aligned}
   T(u + v) &= T(x + x', y + y') \\
   &= a(x + x') + b(y + y') \\
   &= ax + ax' + by + by' \\
   &= (ax + by) + (ax' + by') \\
   &= T(u) + T(v).
   \end{aligned}
   $$
2. **Homogeneity:**
   $$
   \begin{aligned}
   T(\alpha u) &= T(\alpha x, \alpha y) \\
   &= a(\alpha x) + b(\alpha y) \\
   &= \alpha(ax + by) \\
   &= \alpha T(u).
   \end{aligned}
   $$
Thus, $T$ is a linear transformation. $\blacksquare$

---

#### Example 2: Mapping from $\mathbb{R}^3$ to $M_{22}$
Define $T: \mathbb{R}^3 \longrightarrow M_{22}$ by:
$$
T(x, y, z) = \begin{bmatrix} x + y & 2y \\ x + z & 2z \end{bmatrix}.
$$
*(Version 2 has $(2,2)$-entry $3z$).*

**Proof of Linearity:**
Let $u = (x, y, z), v = (x', y', z') \in \mathbb{R}^3$, and $\alpha \in \mathbb{R}$.
1. **Additivity:**
   $$
   \begin{aligned}
   T(u + v) &= T(x + x', y + y', z + z') \\
   &= \begin{bmatrix} (x + x') + (y + y') & 2(y + y') \\ (x + x') + (z + z') & 2(z + z') \end{bmatrix} \\
   &= \begin{bmatrix} (x + y) + (x' + y') & 2y + 2y' \\ (x + z) + (x' + z') & 2z + 2z' \end{bmatrix} \\
   &= \begin{bmatrix} x + y & 2y \\ x + z & 2z \end{bmatrix} + \begin{bmatrix} x' + y' & 2y' \\ x' + z' & 2z' \end{bmatrix} \\
   &= T(u) + T(v).
   \end{aligned}
   $$
2. **Homogeneity:**
   $$
   \begin{aligned}
   T(\alpha u) &= T(\alpha x, \alpha y, \alpha z) \\
   &= \begin{bmatrix} \alpha x + \alpha y & 2(\alpha y) \\ \alpha x + \alpha z & 2(\alpha z) \end{bmatrix} \\
   &= \begin{bmatrix} \alpha(x + y) & \alpha(2y) \\ \alpha(x + z) & \alpha(2z) \end{bmatrix} \\
   &= \alpha \begin{bmatrix} x + y & 2y \\ x + z & 2z \end{bmatrix} = \alpha T(u).
   \end{aligned}
   $$
Thus, $T$ is a linear transformation. $\blacksquare$

---

#### Example 3: Mapping from $\mathbb{R}^2$ to Polynomial Space $P_2$
Define $T: \mathbb{R}^2 \longrightarrow P_2$ by:
$$
T(a, b) = 2a + (a + b)x + (a - b)x^2.
$$

**Proof of Linearity:**
Let $u = (a, b), v = (a', b') \in \mathbb{R}^2$, and $\alpha \in \mathbb{R}$.
1. **Additivity:**
   $$
   \begin{aligned}
   T(u + v) &= T(a + a', b + b') \\
   &= 2(a + a') + [(a + a') + (b + b')]x + [(a + a') - (b + b')]x^2 \\
   &= 2a + 2a' + (a + b)x + (a' + b')x + (a - b)x^2 + (a' - b')x^2 \\
   &= [2a + (a + b)x + (a - b)x^2] + [2a' + (a' + b')x + (a' - b')x^2] \\
   &= T(u) + T(v).
   \end{aligned}
   $$
2. **Homogeneity:**
   $$
   \begin{aligned}
   T(\alpha u) &= T(\alpha a, \alpha b) \\
   &= 2(\alpha a) + (\alpha a + \alpha b)x + (\alpha a - \alpha b)x^2 \\
   &= \alpha [2a + (a + b)x + (a - b)x^2] \\
   &= \alpha T(u).
   \end{aligned}
   $$
Thus, $T$ is a linear transformation. $\blacksquare$

---

#### Example 4: Mapping on the Function Space $F(\mathbb{R})$
Let $T: F(\mathbb{R}) \longrightarrow F(\mathbb{R})$ be defined by:
$$
T(f) = f' + \int f(x) \, dx.
$$
*(Version 2 uses $T(f) = f' + 2 \int f$).*

**Proof of Linearity:**
Let $f, g \in F(\mathbb{R})$ (differentiable and integrable functions), and $\alpha \in \mathbb{R}$.
1. **Additivity:**
   $$
   \begin{aligned}
   T(f + g) &= (f + g)' + \int (f(x) + g(x)) \, dx \\
   &= (f' + g') + \left( \int f(x) \, dx + \int g(x) \, dx \right) \\
   &= \left( f' + \int f(x) \, dx \right) + \left( g' + \int g(x) \, dx \right) \\
   &= T(f) + T(g).
   \end{aligned}
   $$
2. **Homogeneity:**
   $$
   \begin{aligned}
   T(\alpha f) &= (\alpha f)' + \int (\alpha f)(x) \, dx \\
   &= \alpha f' + \alpha \int f(x) \, dx \\
   &= \alpha \left( f' + \int f(x) \, dx \right) \\
   &= \alpha T(f).
   \end{aligned}
   $$
Thus, $T$ is a linear transformation. $\blacksquare$

---

#### Example 5: Mapping from $M_{22}$ to $P_3$
Define $T: M_{22} \longrightarrow P_3$ by:
$$
T\left( \begin{bmatrix} a & b \\ c & d \end{bmatrix} \right) = 3a + 4bx + (2c - d)x^2 + (a + b)x^3.
$$

**Proof:**
Let $A = \begin{bmatrix} a & b \\ c & d \end{bmatrix}, B = \begin{bmatrix} a' & b' \\ c' & d' \end{bmatrix} \in M_{22}$, and $\alpha \in \mathbb{R}$.
1. $T(A + B) = 3(a + a') + 4(b + b')x + [2(c + c') - (d + d')]x^2 + [(a + a') + (b + b')]x^3 = T(A) + T(B)$.
2. $T(\alpha A) = 3(\alpha a) + 4(\alpha b)x + (2\alpha c - \alpha d)x^2 + (\alpha a + \alpha b)x^3 = \alpha T(A)$.
Thus, $T$ is a linear transformation. $\blacksquare$

---

## 2. Fundamental Properties of Linear Transformations

Let $T: V \longrightarrow W$ be a linear transformation.

### Property 1: Preservation of the Zero Vector
$$
\boxed{T(0_V) = 0_W}
$$

**Proof:**
Since $0_V + 0_V = 0_V$:
$$
T(0_V) = T(0_V + 0_V) = T(0_V) + T(0_V).
$$
Adding $-T(0_V)$ (the additive inverse in $W$) to both sides:
$$
T(0_V) - T(0_V) = T(0_V) + T(0_V) - T(0_V) \implies 0_W = T(0_V). \quad \blacksquare
$$

```
    V                W
+--------+       +--------+
|        |   T   |        |
|   0_V  |------>|   0_W  |
|        |       |        |
+--------+       +--------+
```

> **Crucial Diagnostic Test:**
> If a function $T: V \to W$ satisfies $T(0_V) \ne 0_W$, then **$T$ is NOT a linear transformation**.

**Example:**
Let $T: \mathbb{R}^3 \longrightarrow \mathbb{R}^2$ be defined by $T(x, y, z) = (x + y + 1, x - 2y)$.
Evaluating at the zero vector:
$$
T(0, 0, 0) = (0 + 0 + 1, 0 - 0) = (1, 0) \ne (0, 0).
$$
Therefore, $T$ is **not** a linear transformation.

> **Cautionary Warning:**
> $T(0_V) = 0_W$ is a **necessary condition**, but **NOT sufficient**!
> **Counterexample:** $T: \mathbb{R}^2 \to \mathbb{R}^2$ given by $T(x, y) = (2x, xy)$.
> Here $T(0, 0) = (0, 0)$, but taking $\alpha = 2$ and $u = (2, 5)$:
> $$
> T(\alpha u) = T(4, 10) = (8, 40), \qquad \alpha T(u) = 2 T(2, 5) = 2(4, 10) = (8, 20).
> $$
> Since $(8, 40) \ne (8, 20)$, $T$ fails scalar multiplication and is not linear.

---

### Property 2: Preservation of Additive Inverses
$$
\boxed{T(-u) = -T(u)}
$$

**Proof:**
$$
T(-u) = T((-1)u) = (-1) T(u) = -T(u).
$$
Alternatively:
$$
T(u + (-u)) = T(0_V) = 0_W \implies T(u) + T(-u) = 0_W \implies T(-u) = -T(u). \quad \blacksquare
$$

---

### Property 3: Preservation of Linear Combinations
For any vectors $u_1, u_2, \dots, u_n \in V$ and scalars $a_1, a_2, \dots, a_n \in \mathbb{R}$:
$$
\boxed{T(a_1 u_1 + a_2 u_2 + \cdots + a_n u_n) = a_1 T(u_1) + a_2 T(u_2) + \cdots + a_n T(u_n)}
$$

---

### Determining a Linear Transformation from Its Values on a Basis

If $\{v_1, v_2, \dots, v_n\}$ is a basis of $V$, then **$T$ is completely and uniquely determined** by its values on the basis vectors $T(v_1), T(v_2), \dots, T(v_n)$.

#### Example A: Standard Basis
Let $T: \mathbb{R}^2 \longrightarrow \mathbb{R}^3$ be a linear transformation such that:
$$
T(1, 0) = (1, 1, 2), \qquad T(0, 1) = (-1, 1, 0).
$$
*(In Version 2: $T(1,0) = (1,1,-1)$ and $T(0,1) = (2,1,0)$).*

**Solution:**
Any $(x, y) \in \mathbb{R}^2$ can be expanded in the standard basis:
$$
(x, y) = x(1, 0) + y(0, 1).
$$
Applying linearity:
$$
\begin{aligned}
T(x, y) &= x T(1, 0) + y T(0, 1) \\
&= x(1, 1, 2) + y(-1, 1, 0) \\
&= (x - y, x + y, 2x).
\end{aligned}
$$
*(For Version 2: $T(x,y) = x(1,1,-1) + y(2,1,0) = (x + 2y, x + y, -x)$).*

---

#### Example B: Non-Standard Basis
Let $T: \mathbb{R}^3 \longrightarrow P_2$ be a linear transformation such that:
$$
T(1, 1, 1) = 1 + x, \qquad T(2, 2, 0) = x - x^2, \qquad T(3, 0, 0) = 1 + x + x^2.
$$
*(Version 2: $T(2,2,0) = 1 - x^2$, $T(3,0,0) = 2x^2$).*

Find the general formula $T(a, b, c)$ for any $(a, b, c) \in \mathbb{R}^3$.

**Solution:**
Express $(a, b, c)$ as a linear combination of the basis vectors:
$$
(a, b, c) = \alpha (1, 1, 1) + \beta (2, 2, 0) + \gamma (3, 0, 0).
$$
Equating components:
$$
\begin{cases}
\alpha + 2\beta + 3\gamma = a & (1) \\
\alpha + 2\beta = b & (2) \\
\alpha = c & (3)
\end{cases}
$$
From $(3)$: $\alpha = c$.
From $(2)$: $c + 2\beta = b \implies \beta = \frac{b - c}{2}$.
From $(1)$: $b + 3\gamma = a \implies \gamma = \frac{a - b}{3}$.

Applying $T$:
$$
\begin{aligned}
T(a, b, c) &= \alpha T(1, 1, 1) + \beta T(2, 2, 0) + \gamma T(3, 0, 0) \\
&= c(1 + x) + \left( \frac{b - c}{2} \right)(x - x^2) + \left( \frac{a - b}{3} \right)(1 + x + x^2) \\
&= \left( c + \frac{a - b}{3} \right) + \left( c + \frac{b - c}{2} + \frac{a - b}{3} \right)x + \left( -\frac{b - c}{2} + \frac{a - b}{3} \right)x^2 \\
&= \left( \frac{a - b + 3c}{3} \right) + \left( \frac{2a + b + 3c}{6} \right)x + \left( \frac{2a - 5b + 3c}{6} \right)x^2.
\end{aligned}
$$

---

#### Example C: Basis of $\mathbb{R}^2$ Mapped to $M_{22}$
Let $B = \{(1, 2), (2, -1)\}$ be a basis of $\mathbb{R}^2$.
Let $T: \mathbb{R}^2 \longrightarrow M_{22}$ be defined by:
$$
T(1, 2) = \begin{bmatrix} 1 & 0 \\ 0 & 2 \end{bmatrix}, \qquad T(2, -1) = \begin{bmatrix} -1 & 1 \\ 0 & 0 \end{bmatrix}.
$$
1. Find $T(x, y)$ for all $(x, y) \in \mathbb{R}^2$.
2. Compute $T(2, 21)$.

**Solution:**
Write $(x, y) = a(1, 2) + b(2, -1)$:
$$
\begin{cases} a + 2b = x \\ 2a - b = y \end{cases} \implies \begin{cases} a = \frac{x + 2y}{5} \\ b = \frac{2x - y}{5} \end{cases}
$$
Then:
$$
\begin{aligned}
T(x, y) &= a T(1, 2) + b T(2, -1) \\
&= a \begin{bmatrix} 1 & 0 \\ 0 & 2 \end{bmatrix} + b \begin{bmatrix} -1 & 1 \\ 0 & 0 \end{bmatrix} \\
&= \begin{bmatrix} a - b & b \\ 0 & 2a \end{bmatrix} \\
&= \begin{bmatrix} \frac{(x + 2y) - (2x - y)}{5} & \frac{2x - y}{5} \\ 0 & \frac{2(x + 2y)}{5} \end{bmatrix} \\
&= \begin{bmatrix} \frac{-x + 3y}{5} & \frac{2x - y}{5} \\ 0 & \frac{2x + 4y}{5} \end{bmatrix}.
\end{aligned}
$$
For $(x, y) = (2, 21)$:
$$
T(2, 21) = \begin{bmatrix} \frac{-2 + 3(21)}{5} & \frac{2(2) - 21}{5} \\ 0 & \frac{2(2) + 4(21)}{5} \end{bmatrix} = \begin{bmatrix} \frac{61}{5} & -\frac{17}{5} \\ 0 & \frac{88}{5} \end{bmatrix}.
$$
*(Note: In the handwritten note on part 8, evaluating $(2, 2)$ gives $T(2,2) = \begin{bmatrix} 4/5 & 2/5 \\ 0 & 12/5 \end{bmatrix}$)*.

---

## 3. Kernel (Null Space) of a Linear Transformation

### Definition
Let $T: V \longrightarrow W$ be a linear transformation. The **kernel** (or null space) of $T$, denoted $\ker(T)$, is the set of all vectors in $V$ that map to the zero vector in $W$:

$$
\boxed{\ker(T) = \{ u \in V : T(u) = 0_W \}}
$$

```
       V                     W
+---------------+       +---------+
|     \       / |   T   |         |
|      Ker(T)   |------>|   0_W   |
|     /  0_V  \ |       |         |
+---------------+       +---------+
```

---

### Theorem: $\ker(T)$ is a Subspace of $V$

**Proof:**
1. **Contains Zero Vector:**
   $T(0_V) = 0_W \implies 0_V \in \ker(T) \implies \ker(T) \ne \emptyset$.
2. **Closure under Addition:**
   Let $u, v \in \ker(T)$. Then $T(u) = 0_W$ and $T(v) = 0_W$.
   $$
   T(u + v) = T(u) + T(v) = 0_W + 0_W = 0_W \implies u + v \in \ker(T).
   $$
3. **Closure under Scalar Multiplication:**
   Let $u \in \ker(T)$ and $\alpha \in \mathbb{R}$.
   $$
   T(\alpha u) = \alpha T(u) = \alpha 0_W = 0_W \implies \alpha u \in \ker(T).
   $$
Therefore, $\ker(T)$ is a subspace of $V$. $\blacksquare$

---

### Definition: Nullity of a Linear Transformation
The dimension of $\ker(T)$ is called the **nullity** of $T$:
$$
\operatorname{nullity}(T) = \dim(\ker(T)).
$$

---

### Example: Finding the Kernel and Nullity
Let $T: \mathbb{R}^3 \longrightarrow \mathbb{R}^2$ be defined by $T(x, y, z) = (x - y, y - z)$.

1. **Is $(2, 2, 1) \in \ker(T)$?**
   $$
   T(2, 2, 1) = (2 - 2, 2 - 1) = (0, 1) \ne (0, 0).
   $$
   Therefore, $(2, 2, 1) \notin \ker(T)$.

2. **Find a basis of $\ker(T)$ and its nullity:**
   $$
   \ker(T) = \left\{ (x, y, z) \in \mathbb{R}^3 : T(x, y, z) = (0, 0) \right\} = \left\{ (x, y, z) : \begin{cases} x - y = 0 \\ y - z = 0 \end{cases} \right\}.
   $$
   Row reducing the system matrix:
   $$
   \begin{bmatrix} 1 & -1 & 0 \\ 0 & 1 & -1 \end{bmatrix} \sim \begin{bmatrix} \mathbf{1} & 0 & -1 \\ 0 & \mathbf{1} & -1 \end{bmatrix} \implies \begin{cases} x = z \\ y = z \end{cases}
   $$
   $z$ is free; let $z = r$:
   $$
   \ker(T) = \{ (r, r, r) : r \in \mathbb{R} \} = \operatorname{span}\{(1, 1, 1)\}.
   $$
   Since $(1, 1, 1) \ne (0, 0, 0)$, a basis of $\ker(T)$ is:
   $$
   \text{Basis of } \ker(T) = \{(1, 1, 1)\}, \qquad \operatorname{nullity}(T) = 1.
   $$

---

## 4. Range (Image) of a Linear Transformation

### Definition
Let $T: V \longrightarrow W$ be a linear transformation. The **range** (or image) of $T$, denoted $R(T)$ or $\operatorname{Im}(T)$, is the set of all image vectors in $W$:

$$
\boxed{R(T) = \{ T(u) : u \in V \} \subseteq W}
$$

```
      V                      W
+-----------+       +-----------------+
|           |   T   |     +-----+     |
|     u     |------>|     | R(T)|     |
|    0_V    |------>|     | 0_W |     |
|           |       |     +-----+     |
+-----------+       +-----------------+
```

---

### Theorem: $R(T)$ is a Subspace of $W$

**Proof:**
1. **Contains Zero Vector:**
   $0_W = T(0_V) \implies 0_W \in R(T) \implies R(T) \ne \emptyset$.
2. **Closure under Addition:**
   Let $u', v' \in R(T)$. By definition, there exist $u, v \in V$ such that $u' = T(u)$ and $v' = T(v)$.
   $$
   u' + v' = T(u) + T(v) = T(u + v).
   $$
   Since $u + v \in V$, $u' + v' \in R(T)$.
3. **Closure under Scalar Multiplication:**
   Let $u' \in R(T)$ and $\alpha \in \mathbb{R}$. There exists $u \in V$ such that $u' = T(u)$.
   $$
   \alpha u' = \alpha T(u) = T(\alpha u).
   $$
   Since $\alpha u \in V$, $\alpha u' \in R(T)$.
Therefore, $R(T)$ is a subspace of $W$. $\blacksquare$

---

### Definition: Rank of a Linear Transformation
The dimension of $R(T)$ is called the **rank** of $T$:
$$
\operatorname{rank}(T) = \dim(R(T)).
$$

---

## 5. The Dimension Theorem (Rank-Nullity Theorem)

> **Theorem (Rank-Nullity for Linear Transformations):**
> Let $T: V \longrightarrow W$ be a linear transformation, where $V$ is a finite-dimensional vector space ($\dim(V) < \infty$). Then:
> $$
> \boxed{\operatorname{rank}(T) + \operatorname{nullity}(T) = \dim(V)}
> $$
> That is:
> $$
> \dim(R(T)) + \dim(\ker(T)) = \dim(V).
> $$

---

### Comprehensive Worked Application 1
Consider $T: \mathbb{R}^3 \longrightarrow \mathbb{R}^2$ given by $T(x, y, z) = (x - y, y - z)$.

1. **Is $(5, 1) \in R(T)$?**
   We check whether there exists $(x, y, z) \in \mathbb{R}^3$ such that:
   $$
   T(x, y, z) = (5, 1) \iff \begin{cases} x - y = 5 \\ y - z = 1 \end{cases}
   $$
   Augmented matrix:
   $$
   \left[\begin{array}{ccc|c} 1 & -1 & 0 & 5 \\ 0 & 1 & -1 & 1 \end{array}\right]
   \sim
   \left[\begin{array}{ccc|c} \mathbf{1} & 0 & -1 & 6 \\ 0 & \mathbf{1} & -1 & 1 \end{array}\right].
   $$
   The system is consistent (infinite solutions parameterized by $z = r$: $x = r + 6, y = r + 1, z = r$).
   Hence, $(5, 1) \in R(T)$.

2. **Find a basis of $R(T)$ and its rank:**
   $$
   \begin{aligned}
   R(T) &= \{ (x - y, y - z) : x, y, z \in \mathbb{R} \} \\
   &= \{ x(1, 0) + y(-1, 1) + z(0, -1) : x, y, z \in \mathbb{R} \} \\
   &= \operatorname{span}\{(1, 0), (-1, 1), (0, -1)\}.
   \end{aligned}
   $$
   Notice that $(-1, 1) = -1(1, 0) - 1(0, -1)$.
   Thus:
   $$
   R(T) = \operatorname{span}\{(1, 0), (0, -1)\} = \operatorname{span}\{(1, 0), (0, 1)\} = \mathbb{R}^2.
   $$
   Since $\{(1, 0), (0, -1)\}$ are linearly independent:
   $$
   \text{Basis of } R(T) = \{(1, 0), (0, -1)\}, \qquad \operatorname{rank}(T) = \dim(R(T)) = 2.
   $$

3. **Check the Rank-Nullity Theorem:**
   $$
   \operatorname{rank}(T) + \operatorname{nullity}(T) = 2 + 1 = 3 = \dim(\mathbb{R}^3). \quad \checkmark
   $$

---

### Comprehensive Worked Application 2
Let $T: \mathbb{R}^2 \longrightarrow \mathbb{R}^2$ be defined by:
$$
T(x, y) = (2x - y, -8x + 4y).
$$

**a) Is $(5, 10) \in \ker(T)$?**
$$
T(5, 10) = (2(5) - 10, -8(5) + 4(10)) = (10 - 10, -40 + 40) = (0, 0).
$$
Yes, $(5, 10) \in \ker(T)$.

**b) Is $(5, 0) \in R(T)$?**
Set $(2x - y, -8x + 4y) = (5, 0)$:
$$
\begin{cases} 2x - y = 5 \\ -8x + 4y = 0 \end{cases}
$$
Multiply the first equation by $4$: $8x - 4y = 20$.
Adding to the second equation gives $0 = 20$, which is impossible.
Hence, the system has no solution, so $(5, 0) \notin R(T)$.

**c) Find a basis of $\ker(T)$:**
$$
\ker(T) = \{ (x, y) \in \mathbb{R}^2 : 2x - y = 0 \text{ and } -8x + 4y = 0 \}.
$$
$$
\begin{bmatrix} 2 & -1 & 0 \\ -8 & 4 & 0 \end{bmatrix} \sim \begin{bmatrix} \mathbf{1} & -1/2 & 0 \\ 0 & 0 & 0 \end{bmatrix} \implies x - \frac{1}{2}y = 0 \implies x = \frac{1}{2}y.
$$
$y$ is free; let $y = r \in \mathbb{R}$:
$$
\ker(T) = \left\{ \left( \frac{1}{2}r, r \right) : r \in \mathbb{R} \right\} = \operatorname{span}\left\{ \left( \frac{1}{2}, 1 \right) \right\} = \operatorname{span}\{(1, 2)\}.
$$
Basis of $\ker(T)$: $\{(1/2, 1)\}$ (or $\{(1, 2)\}$), and $\operatorname{nullity}(T) = 1$.

**d) Find $\operatorname{rank}(T)$:**
Using the Rank-Nullity Theorem:
$$
\operatorname{rank}(T) = \dim(\mathbb{R}^2) - \operatorname{nullity}(T) = 2 - 1 = 1.
$$

**e) Find a basis of $R(T)$:**
$$
\begin{aligned}
R(T) &= \{ (2x - y, -8x + 4y) : x, y \in \mathbb{R} \} \\
&= \operatorname{span}\{(2, -8), (-1, 4)\}.
\end{aligned}
$$
Since $(2, -8) = -2(-1, 4)$:
$$
R(T) = \operatorname{span}\{(-1, 4)\}.
$$
Since $(-1, 4) \ne (0, 0)$, it forms a basis:
$$
\text{Basis of } R(T) = \{(-1, 4)\}, \qquad \dim(R(T)) = 1.
$$

---

## 6. Source Verification Appendix

The complete scanned source material for this chapter is preserved in the local assets directory:
- **Version 1 (Instructor notes):** `assets/11-linear-transformations-1/page-001-part-001.webp` through `page-001-part-015.webp`
- **Version 2 (Master handwritten solutions):** `assets/11-linear-transformations-2/page-001-part-001.webp` through `page-001-part-015.webp`
