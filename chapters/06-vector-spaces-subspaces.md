---
id: "06-vector-spaces-subspaces"
title: "4.1–4.2 — Vector spaces and subspaces"
course: "MATHS211"
type: "chapter-section"
order: 6
language: "en"
source_ids: ["1C6sG-CkBA3kYB9X8049X6LffG3L57OJ2", "1pnloIjPZk76YtD_jYazYb_FJlEI1-9H4", "1_Ujt_fOlqXvQsFiZn1S4A14ZTeNh_Yve"]
source_page_count: 3
content_format: "complete_transcription_with_archival_references"
source_coverage: "all pages of every listed source version"
editable_transcription: "complete transcription of all three source versions, vector space axioms, subspace tests and proofs, linear combinations, spanning sets, and reconciled website content"
transcribed_source_ids: ["1C6sG-CkBA3kYB9X8049X6LffG3L57OJ2", "1pnloIjPZk76YtD_jYazYb_FJlEI1-9H4", "1_Ujt_fOlqXvQsFiZn1S4A14ZTeNh_Yve"]
---

# 4.1–4.2 — Vector Spaces and Subspaces

## 1. Axiomatic Definition of a Real Vector Space

Let $V$ be a non-empty set equipped with two algebraic operations:
1. **Vector Addition:** $+ : V \times V \longrightarrow V, \quad (u, v) \longmapsto u + v$
2. **Scalar Multiplication:** $\cdot : \mathbb{R} \times V \longrightarrow V, \quad (\alpha, u) \longmapsto \alpha u$

We say that $V$ is a **vector space over $\mathbb{R}$** if the following 10 axioms are satisfied for all $u, v, w \in V$ and all scalars $\alpha, \beta \in \mathbb{R}$:

### Part I: Vector Addition Axioms
1. **Closure under Addition:** $u + v \in V$.
2. **Commutativity:** $u + v = v + u$.
3. **Associativity:** $(u + v) + w = u + (v + w)$.
4. **Additive Identity (Zero Vector):** There exists an element $0_V \in V$ such that:
   $$0_V + u = u + 0_V = u$$
5. **Additive Inverse (Opposite Vector):** For every $u \in V$, there exists an element $-u \in V$ such that:
   $$u + (-u) = (-u) + u = 0_V$$

### Part II: Scalar Multiplication Axioms
6. **Closure under Scalar Multiplication:** $\alpha u \in V$.
7. **Distributivity over Vector Addition:** $\alpha(u + v) = \alpha u + \alpha v$.
8. **Distributivity over Scalar Addition:** $(\alpha + \beta)u = \alpha u + \beta u$.
9. **Associativity of Scalar Multiplication:** $\alpha(\beta u) = (\alpha\beta)u$.
10. **Multiplicative Identity Scalar:** $1 \cdot u = u$.

*Terminology:* Elements of $V$ are called **vectors**; elements of the field $\mathbb{R}$ are called **scalars**.

---

## 2. Standard Examples of Real Vector Spaces

### 2.1 The Matrix Space $M_{np}$
The set $V = M_{np}$ of all $n \times p$ matrices with real entries under standard matrix addition and scalar multiplication is a vector space:
- **Zero Vector:** The $n \times p$ zero matrix $O$.
- **Opposite:** $-A = [-a_{ij}]$.

### 2.2 The Euclidean Space $\mathbb{R}^n$
The set $\mathbb{R}^n = \{ (x_1, x_2, \dots, x_n) : x_i \in \mathbb{R} \}$ with componentwise operations:
- $(x_1, \dots, x_n) + (y_1, \dots, y_n) = (x_1 + y_1, \dots, x_n + y_n)$
- $\alpha(x_1, \dots, x_n) = (\alpha x_1, \dots, \alpha x_n)$
- **Zero Vector:** $0_{\mathbb{R}^n} = (0, 0, \dots, 0)$.
- **Opposite:** $-u = (-x_1, -x_2, \dots, -x_n)$.

Special cases: $\mathbb{R}^1 = \mathbb{R}$ (the real line), $\mathbb{R}^2$ (the Cartesian plane), $\mathbb{R}^3$ (3D space).

### 2.3 The Polynomial Space $P_n$
The set $P_n$ of all real polynomials of degree $\le n$:
$$
P_n = \{ p(x) = a_0 + a_1 x + a_2 x^2 + \cdots + a_n x^n : a_i \in \mathbb{R} \}
$$
- $P_1 = \{ a + bx : a, b \in \mathbb{R} \}$
- $P_2 = \{ a + bx + cx^2 : a, b, c \in \mathbb{R} \}$
- $P_3 = \{ a + bx + cx^2 + dx^3 : a, b, c, d \in \mathbb{R} \}$
- **Zero Vector:** The zero polynomial $0(x) \equiv 0$.
- **Opposite:** $-p(x) = -a_0 - a_1 x - \cdots - a_n x^n$.

### 2.4 The Function Space $F(I)$
The set $F(I)$ of all real-valued functions $f: I \longrightarrow \mathbb{R}$ defined on an interval $I$:
- $(f + g)(x) = f(x) + g(x)$
- $(\alpha f)(x) = \alpha f(x)$
- **Zero Vector:** The constant zero function $f_0(x) = 0$ for all $x \in I$.
- **Opposite:** $(-f)(x) = -f(x)$.

---

## 3. Subspaces of a Vector Space

### 3.1 Subspace Definition & Two-Step Subspace Test
Let $V$ be a vector space, and let $W$ be a **non-empty subset** of $V$ ($W \subseteq V, \, W \ne \emptyset$).
$W$ is a **subspace** of $V$ (written $W \le V$) if and only if $W$ is closed under the operations inherited from $V$:

1. **Closed under Addition:**
   $$\forall u, v \in W \implies u + v \in W$$
2. **Closed under Scalar Multiplication:**
   $$\forall \alpha \in \mathbb{R}, \, \forall u \in W \implies \alpha u \in W$$

### 3.2 The Zero Vector Criterion
**Theorem:** If $W$ is a subspace of $V$, then the zero vector of $V$ must belong to $W$:
$$
0_V \in W
$$

<div align="center">

```xml
<svg viewBox="0 0 450 180" xmlns="http://www.w3.org/2000/svg" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; font-family: ui-sans-serif, system-ui, sans-serif;">
  <!-- Outer vector space V -->
  <ellipse cx="225" cy="90" rx="190" ry="70" fill="#f8fafc" stroke="#64748b" stroke-width="2" />
  <text x="380" y="50" font-size="16" font-weight="bold" fill="#475569">V</text>

  <!-- Subspace W -->
  <ellipse cx="180" cy="95" rx="100" ry="45" fill="#e0f2fe" stroke="#0284c7" stroke-width="2" />
  <text x="240" y="80" font-size="15" font-weight="bold" fill="#0369a1">W</text>

  <!-- Zero Vector 0_V -->
  <circle cx="150" cy="105" r="4.5" fill="#dc2626" />
  <text x="145" y="125" font-size="13" font-weight="bold" fill="#dc2626">0ᵥ ∈ W</text>
</svg>
```

</div>

*Proof:*
Since $W \ne \emptyset$, choose any vector $u \in W$.
By closure under scalar multiplication with $\alpha = -1$, $(-1)u = -u \in W$.
By closure under addition, $u + (-u) = 0_V \in W$. $\blacksquare$

> **Quick Non-Subspace Test:** If $0_V \notin W$, then $W$ is immediately **not** a subspace.

---

### 3.3 Worked Subspace Examples & Non-Subspace Counterexamples

#### Example 1: Line Through the Origin in $\mathbb{R}^2$
Let $W = \{ (x, 2x) : x \in \mathbb{R} \} \subset \mathbb{R}^2$.
1. $W \ne \emptyset$ since $(0, 2(0)) = (0, 0) \in W$.
2. Let $u = (x, 2x), v = (x', 2x') \in W$:
   $$u + v = (x + x', 2x + 2x') = (x + x', 2(x + x')) \in W$$
3. Let $\alpha \in \mathbb{R}$:
   $$\alpha u = (\alpha x, \alpha(2x)) = (\alpha x, 2(\alpha x)) \in W$$
**Conclusion:** $W$ is a subspace of $\mathbb{R}^2$.

#### Example 2: Non-Subspace (Missing Origin)
Let $W = \{ (x, x + 1) : x \in \mathbb{R} \} \subset \mathbb{R}^2$.
Check $0_{\mathbb{R}^2} = (0, 0)$:
$$(x, x + 1) = (0, 0) \implies x = 0 \text{ and } 0 + 1 = 0 \text{ (False)}$$
Since $(0, 0) \notin W$, $W$ is **not a subspace** of $\mathbb{R}^2$.

Similarly, $W = \{ (x, x+y, x+z, 2x - 1) : x, y, z \in \mathbb{R} \} \subset \mathbb{R}^4$ is **not a subspace** because setting $x = 0$ yields the fourth component $-1 \ne 0 \implies (0, 0, 0, 0) \notin W$.

#### Example 3: Plane Through Origin in $\mathbb{R}^3$
Let $W = \{ (x, x + y, y) : x, y \in \mathbb{R} \} \subset \mathbb{R}^3$.
1. $(0, 0+0, 0) = (0, 0, 0) \in W \implies W \ne \emptyset$.
2. For $u = (x, x+y, y)$ and $v = (x', x'+y', y')$:
   $$u + v = (x + x', (x + x') + (y + y'), y + y') \in W$$
3. $\alpha u = (\alpha x, \alpha x + \alpha y, \alpha y) \in W$.
**Conclusion:** $W$ is a subspace of $\mathbb{R}^3$.

#### Example 4: Matrix Subspace in $M_{22}$
Let $W = \left\{ \begin{bmatrix} a & 2a \\ a + b & a - b \end{bmatrix} : a, b \in \mathbb{R} \right\} \subset M_{22}$.
1. Choosing $a = b = 0$ gives $\begin{bmatrix} 0 & 0 \\ 0 & 0 \end{bmatrix} \in W$.
2. Addition:
   $$\begin{bmatrix} a & 2a \\ a+b & a-b \end{bmatrix} + \begin{bmatrix} a' & 2a' \\ a'+b' & a'-b' \end{bmatrix} = \begin{bmatrix} (a+a') & 2(a+a') \\ (a+a')+(b+b') & (a+a')-(b+b') \end{bmatrix} \in W$$
3. Scalar multiplication:
   $$\alpha \begin{bmatrix} a & 2a \\ a+b & a-b \end{bmatrix} = \begin{bmatrix} (\alpha a) & 2(\alpha a) \\ (\alpha a)+(\alpha b) & (\alpha a)-(\alpha b) \end{bmatrix} \in W$$
**Conclusion:** $W$ is a subspace of $M_{22}$.

#### Example 5: Differential Polynomial Subspace in $P_2$
Let $W = \{ p \in P_2 : p(x) + p'(x) = 0 \}$.
1. For zero polynomial $0(x) \equiv 0$: $0 + 0' = 0 \implies 0 \in W$.
2. Addition: $(p + q) + (p + q)' = (p + p') + (q + q') = 0 + 0 = 0 \implies p + q \in W$.
3. Scalar multiplication: $(\alpha p) + (\alpha p)' = \alpha(p + p') = \alpha(0) = 0 \implies \alpha p \in W$.
**Conclusion:** $W$ is a subspace of $P_2$.

#### Example 6: Function Subspace with Boundary Condition
Let $V = F([0, 1])$ and $W = \{ f \in F([0, 1]) : f(0) = 2f(1) \}$.

<div align="center">

```xml
<svg viewBox="0 0 450 180" xmlns="http://www.w3.org/2000/svg" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; font-family: ui-sans-serif, system-ui, sans-serif;">
  <!-- Coordinate Axes -->
  <line x1="40" y1="140" x2="380" y2="140" stroke="#94a3b8" stroke-width="1.5" />
  <line x1="160" y1="20" x2="160" y2="160" stroke="#94a3b8" stroke-width="1.5" />
  <text x="385" y="145" font-size="12" fill="#64748b">x</text>
  <text x="165" y="25" font-size="12" fill="#64748b">y</text>

  <!-- Curve f(x) -->
  <path d="M 160 50 Q 200 70, 240 95 T 320 120" stroke="#16a34a" stroke-width="2.5" fill="none" />
  <!-- Boundary points -->
  <circle cx="160" cy="50" r="4.5" fill="#0284c7" />
  <text x="115" y="55" font-size="12" font-weight="bold" fill="#0284c7">f(0) = 2k</text>

  <circle cx="240" cy="95" r="4.5" fill="#0284c7" />
  <line x1="240" y1="95" x2="240" y2="140" stroke="#0284c7" stroke-dasharray="3,3" />
  <text x="235" y="155" font-size="12" fill="#64748b">x = 1</text>
  <text x="250" y="95" font-size="12" font-weight="bold" fill="#0284c7">f(1) = k</text>
</svg>
```

</div>

- Zero function $f_0(x) \equiv 0$: $f_0(0) = 0$ and $2f_0(1) = 2(0) = 0 \implies f_0 \in W$.
- Sum: $(f + g)(0) = f(0) + g(0) = 2f(1) + 2g(1) = 2(f(1) + g(1)) = 2(f + g)(1) \implies f + g \in W$.
- Scalar: $(\alpha f)(0) = \alpha f(0) = \alpha(2f(1)) = 2(\alpha f(1)) = 2(\alpha f)(1) \implies \alpha f \in W$.
**Conclusion:** $W$ is a subspace of $F([0, 1])$.

---

## 4. Linear Combinations and Spanning Sets

### 4.1 Linear Combination Definition
Let $V$ be a vector space, and $v_1, v_2, \dots, v_r \in V$. A vector $u \in V$ is called a **linear combination** of $v_1, \dots, v_r$ if there exist real scalars $a_1, a_2, \dots, a_r \in \mathbb{R}$ such that:
$$
u = a_1 v_1 + a_2 v_2 + \cdots + a_r v_r
$$

---

### 4.2 Linear Combination Testing Problems

#### Problem 1: In $\mathbb{R}^3$
Is $u = (9, 2, 7)$ a linear combination of $v_1 = (1, 2, -1)$ and $v_2 = (6, 4, 2)$?
Set up $u = a v_1 + b v_2$:
$$
(9, 2, 7) = a(1, 2, -1) + b(6, 4, 2) \implies
\begin{cases}
a + 6b = 9 & (1) \\
2a + 4b = 2 & (2) \\
-a + 2b = 7 & (3)
\end{cases}
$$
- Adding $(1) + (3)$: $8b = 16 \implies b = 2$.
- From $(1)$: $a + 6(2) = 9 \implies a = -3$.
- Check $(2)$: $2(-3) + 4(2) = -6 + 8 = 2$ (Holds!).
**Conclusion:** Yes, $u$ is a linear combination:
$$
u = -3v_1 + 2v_2
$$

#### Problem 2: In $P_2$
Is $p(x) = -9 - 7x - 15x^2$ a linear combination of $p_1 = 2 + x + 4x^2, \, p_2 = 1 - x + 3x^2, \, p_3 = 3 + 2x + 5x^2$?
Set up $p = a p_1 + b p_2 + c p_3$:
$$
-9 - 7x - 15x^2 = a(2 + x + 4x^2) + b(1 - x + 3x^2) + c(3 + 2x + 5x^2)
$$
Equating powers of $x$:
$$
\begin{cases}
2a + b + 3c = -9 & (\text{constant term } x^0) \\
a - b + 2c = -7 & (\text{linear term } x^1) \\
4a + 3b + 5c = -15 & (\text{quadratic term } x^2)
\end{cases}
$$
Augmented matrix reduction:
$$
\left[\begin{array}{ccc|c}
2 & 1 & 3 & -9 \\
1 & -1 & 2 & -7 \\
4 & 3 & 5 & -15
\end{array}\right]
\xrightarrow{R_1 \longleftrightarrow R_2}
\left[\begin{array}{ccc|c}
1 & -1 & 2 & -7 \\
2 & 1 & 3 & -9 \\
4 & 3 & 5 & -15
\end{array}\right]
\xrightarrow{R_2 \to R_2 - 2R_1, \, R_3 \to R_3 - 4R_1}
\left[\begin{array}{ccc|c}
1 & -1 & 2 & -7 \\
0 & 3 & -1 & 5 \\
0 & 7 & -3 & 13
\end{array}\right]
$$
$$
\xrightarrow{R_3 \to R_3 - 2R_2}
\left[\begin{array}{ccc|c}
1 & -1 & 2 & -7 \\
0 & 3 & -1 & 5 \\
0 & 1 & -1 & 3
\end{array}\right]
\xrightarrow{R_2 \longleftrightarrow R_3}
\left[\begin{array}{ccc|c}
1 & -1 & 2 & -7 \\
0 & 1 & -1 & 3 \\
0 & 3 & -1 & 5
\end{array}\right]
\xrightarrow{R_3 \to R_3 - 3R_2}
\left[\begin{array}{ccc|c}
1 & -1 & 2 & -7 \\
0 & 1 & -1 & 3 \\
0 & 0 & 2 & -4
\end{array}\right]
$$
- $2c = -4 \implies c = -2$.
- $b - (-2) = 3 \implies b = 1$.
- $a - 1 + 2(-2) = -7 \implies a - 5 = -7 \implies a = -2$.
**Conclusion:** Yes, $p$ is a linear combination:
$$
p = -2p_1 + p_2 - 2p_3
$$

#### Problem 3: In $M_{22}$
Is $\begin{bmatrix} 1 & 2 \\ -1 & 3 \end{bmatrix}$ a linear combination of $A = \begin{bmatrix} 1 & -1 \\ 0 & 0 \end{bmatrix}, B = \begin{bmatrix} 2 & -1 \\ 2 & 0 \end{bmatrix}, C = \begin{bmatrix} 0 & 1 \\ 2 & 1 \end{bmatrix}$?
Set up $\begin{bmatrix} 1 & 2 \\ -1 & 3 \end{bmatrix} = a A + b B + c C$:
$$
\begin{cases}
a + 2b = 1 & (1) \\
-a - b + c = 2 & (2) \\
2b + 2c = -1 & (3) \\
c = 3 & (4)
\end{cases}
$$
- From $(4)$: $c = 3$.
- From $(3)$: $2b + 2(3) = -1 \implies 2b = -7 \implies b = -\frac{7}{2}$.
- From $(1)$: $a + 2\left(-\frac{7}{2}\right) = 1 \implies a - 7 = 1 \implies a = 8$.
- Test $(2)$: $-a - b + c = -8 - \left(-\frac{7}{2}\right) + 3 = -5 + \frac{7}{2} = -\frac{3}{2} \ne 2$ (Inconsistent!).
**Conclusion:** $\begin{bmatrix} 1 & 2 \\ -1 & 3 \end{bmatrix}$ is **not** a linear combination of $A, B, C$.

---

### 4.3 Spanning Subspace Theorem
Let $V$ be a vector space and $S = \{v_1, v_2, \dots, v_r\} \subseteq V$. The set of all linear combinations of $S$:
$$
\text{span}(v_1, v_2, \dots, v_r) = \{ a_1 v_1 + a_2 v_2 + \cdots + a_r v_r : a_i \in \mathbb{R} \}
$$
is a **subspace of $V$**, known as the **subspace spanned by $S$**.

#### Proof:
1. $0_V = 0v_1 + 0v_2 + \cdots + 0v_r \in \text{span}(S)$, so $\text{span}(S) \ne \emptyset$.
2. If $u = \sum a_i v_i$ and $w = \sum b_i v_i$, then $u + w = \sum (a_i + b_i) v_i \in \text{span}(S)$.
3. For scalar $\alpha \in \mathbb{R}$, $\alpha u = \sum (\alpha a_i) v_i \in \text{span}(S)$. $\blacksquare$

---

### 4.4 Using Spanning Sets to Prove Subspaces

Instead of verifying the two closure axioms directly, we can express a given set $W$ as the span of explicit vectors:

#### Example 1: In $\mathbb{R}^3$
Show that $W = \{ (x, x + 2y, -y) : x, y \in \mathbb{R} \}$ is a subspace of $\mathbb{R}^3$:
$$
(x, x + 2y, -y) = (x, x, 0) + (0, 2y, -y) = x(1, 1, 0) + y(0, 2, -1)
$$
$$
W = \text{span}((1, 1, 0), \, (0, 2, -1))
$$
Since $W$ is the span of two vectors in $\mathbb{R}^3$, $W$ is automatically a subspace of $\mathbb{R}^3$.

#### Example 2: In $M_{22}$
Show that $W = \left\{ \begin{bmatrix} a & a + 2b \\ 3c & a + b + c \end{bmatrix} : a, b, c \in \mathbb{R} \right\}$ is a subspace of $M_{22}$:
Decompose by parameters:
$$
\begin{bmatrix} a & a + 2b \\ 3c & a + b + c \end{bmatrix} = a \begin{bmatrix} 1 & 1 \\ 0 & 1 \end{bmatrix} + b \begin{bmatrix} 0 & 2 \\ 0 & 1 \end{bmatrix} + c \begin{bmatrix} 0 & 0 \\ 3 & 1 \end{bmatrix}
$$
$$
W = \text{span}\left( \begin{bmatrix} 1 & 1 \\ 0 & 1 \end{bmatrix}, \, \begin{bmatrix} 0 & 2 \\ 0 & 1 \end{bmatrix}, \, \begin{bmatrix} 0 & 0 \\ 3 & 1 \end{bmatrix} \right)
$$
Thus $W$ is a subspace of $M_{22}$.

#### Example 3: In $P_2$
Find a spanning set for $W = \{ p \in P_2 : p(2) = -p(1) \}$:
For $p(x) = a + bx + cx^2$:
- $p(2) = a + 2b + 4c$
- $p(1) = a + b + c$
- $p(2) = -p(1) \implies a + 2b + 4c = -(a + b + c) \implies 2a + 3b + 5c = 0 \implies c = -\frac{2}{5}a - \frac{3}{5}b$.
Substitute $c$:
$$
p(x) = a + bx + \left(-\frac{2}{5}a - \frac{3}{5}b\right)x^2 = a\left(1 - \frac{2}{5}x^2\right) + b\left(x - \frac{3}{5}x^2\right)
$$
$$
W = \text{span}\left( 1 - \frac{2}{5}x^2, \, x - \frac{3}{5}x^2 \right)
$$

---

### 4.5 Testing Whether a Set Spans the Entire Space $V$

We say that $S = \{v_1, \dots, v_r\}$ **spans $V$** if $\text{span}(S) = V$, meaning **every** vector $v \in V$ can be written as a linear combination of $S$.

#### Example 1: Spanning $\mathbb{R}^3$
Does $\{v_1 = (2, 2, 2), \, v_2 = (0, 0, 3), \, v_3 = (0, 1, 1)\}$ span $\mathbb{R}^3$?
Let $v = (x, y, z) \in \mathbb{R}^3$ be an arbitrary vector.
Solve $a v_1 + b v_2 + c v_3 = (x, y, z)$:
$$
\begin{cases}
2a = x & (1) \\
2a + c = y & (2) \\
2a + 3b + c = z & (3)
\end{cases}
$$
1. From $(1)$: $a = \frac{x}{2}$.
2. From $(2)$: $x + c = y \implies c = y - x$.
3. From $(3)$: $x + 3b + (y - x) = z \implies 3b + y = z \implies b = \frac{z - y}{3}$.

For **any** $(x, y, z) \in \mathbb{R}^3$, the unique scalars are:
$$
(x, y, z) = \left(\frac{x}{2}\right) v_1 + \left(\frac{z - y}{3}\right) v_2 + (y - x) v_3
$$
**Conclusion:** $\{v_1, v_2, v_3\}$ **spans $\mathbb{R}^3$** ($\text{span}(v_1, v_2, v_3) = \mathbb{R}^3$).

#### Example 2: Non-Spanning Set in $P_2$
Does $\{p_1 = 3 + x + 4x^2, \, p_2 = 2 - 3x + 5x^2, \, p_3 = 5 - 2x + 9x^2, \, p_4 = 1 + 4x - x^2\}$ span $P_2$?
Let $p(x) = \alpha + \beta x + \gamma x^2 \in P_2$ be arbitrary.
Set up $a p_1 + b p_2 + c p_3 + d p_4 = p$:
$$
\begin{cases}
3a + 2b + 5c + d = \alpha \\
a - 3b - 2c + 4d = \beta \\
4a + 5b + 9c - d = \gamma
\end{cases}
$$
Augmented matrix reduction:
$$
\left[\begin{array}{rrrr|c}
3 & 2 & 5 & 1 & \alpha \\
1 & -3 & -2 & 4 & \beta \\
4 & 5 & 9 & -1 & \gamma
\end{array}\right]
\xrightarrow{\text{Row Operations}}
\left[\begin{array}{rrrr|c}
1 & -3 & -2 & 4 & \beta \\
0 & 1 & 1 & -1 & \frac{\alpha - 3\beta}{11} \\
0 & 0 & 0 & 0 & \frac{\gamma - 4\beta}{17} - \frac{\alpha - 3\beta}{11}
\end{array}\right]
$$
The third row has zeros for all coefficients. The system is consistent only when:
$$
\frac{\gamma - 4\beta}{17} - \frac{\alpha - 3\beta}{11} = 0
$$
Since this constraint does not hold for arbitrary polynomials (e.g., polynomials whose coefficients violate this equation cannot be formed), **$\{p_1, p_2, p_3, p_4\}$ does not span $P_2$**.

---

## 5. Archival Source Reference & Verification Ledger

The 43 source image assets for this chapter across all three versions are mapped as follows:

| Source File | Source ID | Page | Part | Local Asset Path | Coverage Anchor |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `4.1  4.2 Vector spaces and Subspaces 2.pdf` (root) | `1C6sG-CkBA3kYB9X8049X6LffG3L57OJ2` | 1 | 1 | `../assets/06-vector-spaces-subspaces-1/page-001-part-001.webp` | [§ 1 Axioms Definition](#1-axiomatic-definition-of-a-real-vector-space) |
| `4.1  4.2 Vector spaces and Subspaces 2.pdf` (root) | `1C6sG-CkBA3kYB9X8049X6LffG3L57OJ2` | 1 | 2 | `../assets/06-vector-spaces-subspaces-1/page-001-part-002.webp` | [§ 2.1 M_np & § 2.2 R^n](#2-standard-examples-of-real-vector-spaces) |
| `4.1  4.2 Vector spaces and Subspaces 2.pdf` (root) | `1C6sG-CkBA3kYB9X8049X6LffG3L57OJ2` | 1 | 3 | `../assets/06-vector-spaces-subspaces-1/page-001-part-003.webp` | [§ 2.3 Polynomials P_n](#23-the-polynomial-space-p_n) |
| `4.1  4.2 Vector spaces and Subspaces 2.pdf` (root) | `1C6sG-CkBA3kYB9X8049X6LffG3L57OJ2` | 1 | 4 | `../assets/06-vector-spaces-subspaces-1/page-001-part-004.webp` | [§ 2.4 F(I) & § 3 Subspaces](#24-the-function-space-fi) |
| `4.1  4.2 Vector spaces and Subspaces 2.pdf` (root) | `1C6sG-CkBA3kYB9X8049X6LffG3L57OJ2` | 1 | 5 | `../assets/06-vector-spaces-subspaces-1/page-001-part-005.webp` | [§ 3.2 Zero Vector Test & Examples 1-2](#32-the-zero-vector-criterion) |
| `4.1  4.2 Vector spaces and Subspaces 2.pdf` (root) | `1C6sG-CkBA3kYB9X8049X6LffG3L57OJ2` | 1 | 6 | `../assets/06-vector-spaces-subspaces-1/page-001-part-006.webp` | [§ 3.3 Examples 3-4 (M_22 & P_2)](#example-4-matrix-subspace-in-m_22) |
| `4.1  4.2 Vector spaces and Subspaces 2.pdf` (root) | `1C6sG-CkBA3kYB9X8049X6LffG3L57OJ2` | 1 | 7 | `../assets/06-vector-spaces-subspaces-1/page-001-part-007.webp` | [§ 3.3 Example 6 & § 4.1 Lin Comb](#example-6-function-subspace-with-boundary-condition) |
| `4.1  4.2 Vector spaces and Subspaces 2.pdf` (root) | `1C6sG-CkBA3kYB9X8049X6LffG3L57OJ2` | 1 | 8 | `../assets/06-vector-spaces-subspaces-1/page-001-part-008.webp` | [§ 4.2 Linear Combination Setup](#42-linear-combination-testing-problems) |
| `4.1  4.2 Vector spaces and Subspaces 2.pdf` (root) | `1C6sG-CkBA3kYB9X8049X6LffG3L57OJ2` | 1 | 9 | `../assets/06-vector-spaces-subspaces-1/page-001-part-009.webp` | [§ 4.2 Problem 2 Polynomials](#problem-2-in-p_2) |
| `4.1  4.2 Vector spaces and Subspaces 2.pdf` (root) | `1C6sG-CkBA3kYB9X8049X6LffG3L57OJ2` | 1 | 10 | `../assets/06-vector-spaces-subspaces-1/page-001-part-010.webp` | [§ 4.2 Problem 3 M_22](#problem-3-in-m_22) |
| `4.1  4.2 Vector spaces and Subspaces 2.pdf` (root) | `1C6sG-CkBA3kYB9X8049X6LffG3L57OJ2` | 1 | 11 | `../assets/06-vector-spaces-subspaces-1/page-001-part-011.webp` | [§ 4.3 Spanning Subspace Theorem](#43-spanning-subspace-theorem) |
| `4.1  4.2 Vector spaces and Subspaces 2.pdf` (root) | `1C6sG-CkBA3kYB9X8049X6LffG3L57OJ2` | 1 | 12 | `../assets/06-vector-spaces-subspaces-1/page-001-part-012.webp` | [§ 4.4 Examples 1-2 Spanning Tests](#44-using-spanning-sets-to-prove-subspaces) |
| `4.1  4.2 Vector spaces and Subspaces 2.pdf` (root) | `1C6sG-CkBA3kYB9X8049X6LffG3L57OJ2` | 1 | 13 | `../assets/06-vector-spaces-subspaces-1/page-001-part-013.webp` | [§ 4.5 Spanning Full Space Tests](#45-testing-whether-a-set-spans-the-entire-space-v) |
| `4.14.2 Vector spaces and Subspaces 3.pdf` (Test1) | `1pnloIjPZk76YtD_jYazYb_FJlEI1-9H4` | 1 | 1 | `../assets/06-vector-spaces-subspaces-2/page-001-part-001.webp` | [§ 1 Axioms Definition](#1-axiomatic-definition-of-a-real-vector-space) |
| `4.14.2 Vector spaces and Subspaces 3.pdf` (Test1) | `1pnloIjPZk76YtD_jYazYb_FJlEI1-9H4` | 1 | 2 | `../assets/06-vector-spaces-subspaces-2/page-001-part-002.webp` | [§ 2 Standard Spaces](#2-standard-examples-of-real-vector-spaces) |
| `4.14.2 Vector spaces and Subspaces 3.pdf` (Test1) | `1pnloIjPZk76YtD_jYazYb_FJlEI1-9H4` | 1 | 3 | `../assets/06-vector-spaces-subspaces-2/page-001-part-003.webp` | [§ 2.3 P_n Space](#23-the-polynomial-space-p_n) |
| `4.14.2 Vector spaces and Subspaces 3.pdf` (Test1) | `1pnloIjPZk76YtD_jYazYb_FJlEI1-9H4` | 1 | 4 | `../assets/06-vector-spaces-subspaces-2/page-001-part-004.webp` | [§ 2.4 F(I) Space](#24-the-function-space-fi) |
| `4.14.2 Vector spaces and Subspaces 3.pdf` (Test1) | `1pnloIjPZk76YtD_jYazYb_FJlEI1-9H4` | 1 | 5 | `../assets/06-vector-spaces-subspaces-2/page-001-part-005.webp` | [§ 3 Subspace Two-Step Test](#3-subspaces-of-a-vector-space) |
| `4.14.2 Vector spaces and Subspaces 3.pdf` (Test1) | `1pnloIjPZk76YtD_jYazYb_FJlEI1-9H4` | 1 | 6 | `../assets/06-vector-spaces-subspaces-2/page-001-part-006.webp` | [§ 3.2 Zero Vector Test](#32-the-zero-vector-criterion) |
| `4.14.2 Vector spaces and Subspaces 3.pdf` (Test1) | `1pnloIjPZk76YtD_jYazYb_FJlEI1-9H4` | 1 | 7 | `../assets/06-vector-spaces-subspaces-2/page-001-part-007.webp` | [§ 3.3 Example 1 R^2](#example-1-line-through-the-origin-in-r2) |
| `4.14.2 Vector spaces and Subspaces 3.pdf` (Test1) | `1pnloIjPZk76YtD_jYazYb_FJlEI1-9H4` | 1 | 8 | `../assets/06-vector-spaces-subspaces-2/page-001-part-008.webp` | [§ 3.3 Example 2 R^2 & R^3](#example-2-non-subspace-missing-origin) |
| `4.14.2 Vector spaces and Subspaces 3.pdf` (Test1) | `1pnloIjPZk76YtD_jYazYb_FJlEI1-9H4` | 1 | 9 | `../assets/06-vector-spaces-subspaces-2/page-001-part-009.webp` | [§ 3.3 Example 4 M_22](#example-4-matrix-subspace-in-m_22) |
| `4.14.2 Vector spaces and Subspaces 3.pdf` (Test1) | `1pnloIjPZk76YtD_jYazYb_FJlEI1-9H4` | 1 | 10 | `../assets/06-vector-spaces-subspaces-2/page-001-part-010.webp` | [§ 3.3 Example 5 P_2](#example-5-differential-polynomial-subspace-in-p_2) |
| `4.14.2 Vector spaces and Subspaces 3.pdf` (Test1) | `1pnloIjPZk76YtD_jYazYb_FJlEI1-9H4` | 1 | 11 | `../assets/06-vector-spaces-subspaces-2/page-001-part-011.webp` | [§ 4.1 Linear Combination](#41-linear-combination-definition) |
| `4.14.2 Vector spaces and Subspaces 3.pdf` (Test1) | `1pnloIjPZk76YtD_jYazYb_FJlEI1-9H4` | 1 | 12 | `../assets/06-vector-spaces-subspaces-2/page-001-part-012.webp` | [§ 4.2 Problem 1 R^3](#problem-1-in-r3) |
| `4.14.2 Vector spaces and Subspaces 3.pdf` (Test1) | `1pnloIjPZk76YtD_jYazYb_FJlEI1-9H4` | 1 | 13 | `../assets/06-vector-spaces-subspaces-2/page-001-part-013.webp` | [§ 4.3 Spanning Subspace Theorem](#43-spanning-subspace-theorem) |
| `4.14.2 Vector spaces and Subspaces 3.pdf` (Test1) | `1pnloIjPZk76YtD_jYazYb_FJlEI1-9H4` | 1 | 14 | `../assets/06-vector-spaces-subspaces-2/page-001-part-014.webp` | [§ 4.5 Spanning Full Space Tests](#45-testing-whether-a-set-spans-the-entire-space-v) |
| `4.14.2_Vector_spaces_and_Subspaces_4[1].pdf` (Test2) | `1_Ujt_fOlqXvQsFiZn1S4A14ZTeNh_Yve` | 1 | 1 | `../assets/06-vector-spaces-subspaces-3/page-001-part-001.webp` | [§ 1 Axioms Definition](#1-axiomatic-definition-of-a-real-vector-space) |
| `4.14.2_Vector_spaces_and_Subspaces_4[1].pdf` (Test2) | `1_Ujt_fOlqXvQsFiZn1S4A14ZTeNh_Yve` | 1 | 2 | `../assets/06-vector-spaces-subspaces-3/page-001-part-002.webp` | [§ 2 Standard Spaces](#2-standard-examples-of-real-vector-spaces) |
| `4.14.2_Vector_spaces_and_Subspaces_4[1].pdf` (Test2) | `1_Ujt_fOlqXvQsFiZn1S4A14ZTeNh_Yve` | 1 | 3 | `../assets/06-vector-spaces-subspaces-3/page-001-part-003.webp` | [§ 2.3 P_n Space](#23-the-polynomial-space-p_n) |
| `4.14.2_Vector_spaces_and_Subspaces_4[1].pdf` (Test2) | `1_Ujt_fOlqXvQsFiZn1S4A14ZTeNh_Yve` | 1 | 4 | `../assets/06-vector-spaces-subspaces-3/page-001-part-004.webp` | [§ 2.4 F(I) Space](#24-the-function-space-fi) |
| `4.14.2_Vector_spaces_and_Subspaces_4[1].pdf` (Test2) | `1_Ujt_fOlqXvQsFiZn1S4A14ZTeNh_Yve` | 1 | 5 | `../assets/06-vector-spaces-subspaces-3/page-001-part-005.webp` | [§ 3 Subspace Two-Step Test](#3-subspaces-of-a-vector-space) |
| `4.14.2_Vector_spaces_and_Subspaces_4[1].pdf` (Test2) | `1_Ujt_fOlqXvQsFiZn1S4A14ZTeNh_Yve` | 1 | 6 | `../assets/06-vector-spaces-subspaces-3/page-001-part-006.webp` | [§ 3.2 Zero Vector Test](#32-the-zero-vector-criterion) |
| `4.14.2_Vector_spaces_and_Subspaces_4[1].pdf` (Test2) | `1_Ujt_fOlqXvQsFiZn1S4A14ZTeNh_Yve` | 1 | 7 | `../assets/06-vector-spaces-subspaces-3/page-001-part-007.webp` | [§ 3.3 Example 1 R^2](#example-1-line-through-the-origin-in-r2) |
| `4.14.2_Vector_spaces_and_Subspaces_4[1].pdf` (Test2) | `1_Ujt_fOlqXvQsFiZn1S4A14ZTeNh_Yve` | 1 | 8 | `../assets/06-vector-spaces-subspaces-3/page-001-part-008.webp` | [§ 3.3 Example 4 M_22](#example-4-matrix-subspace-in-m_22) |
| `4.14.2_Vector_spaces_and_Subspaces_4[1].pdf` (Test2) | `1_Ujt_fOlqXvQsFiZn1S4A14ZTeNh_Yve` | 1 | 9 | `../assets/06-vector-spaces-subspaces-3/page-001-part-009.webp` | [§ 3.3 Example 6 F([0,1])](#example-6-function-subspace-with-boundary-condition) |
| `4.14.2_Vector_spaces_and_Subspaces_4[1].pdf` (Test2) | `1_Ujt_fOlqXvQsFiZn1S4A14ZTeNh_Yve` | 1 | 10 | `../assets/06-vector-spaces-subspaces-3/page-001-part-010.webp` | [§ 4.2 Problem 1 R^3 Solution](#problem-1-in-r3) |
| `4.14.2_Vector_spaces_and_Subspaces_4[1].pdf` (Test2) | `1_Ujt_fOlqXvQsFiZn1S4A14ZTeNh_Yve` | 1 | 11 | `../assets/06-vector-spaces-subspaces-3/page-001-part-011.webp` | [§ 4.2 Problem 2 P_2 Solution](#problem-2-in-p_2) |
| `4.14.2_Vector_spaces_and_Subspaces_4[1].pdf` (Test2) | `1_Ujt_fOlqXvQsFiZn1S4A14ZTeNh_Yve` | 1 | 12 | `../assets/06-vector-spaces-subspaces-3/page-001-part-012.webp` | [§ 4.2 Problem 3 M_22 Solution & § 4.3 Theorem](#problem-3-in-m_22) |
| `4.14.2_Vector_spaces_and_Subspaces_4[1].pdf` (Test2) | `1_Ujt_fOlqXvQsFiZn1S4A14ZTeNh_Yve` | 1 | 13 | `../assets/06-vector-spaces-subspaces-3/page-001-part-013.webp` | [§ 4.4 Spanning Sets as Subspaces](#44-using-spanning-sets-to-prove-subspaces) |
| `4.14.2_Vector_spaces_and_Subspaces_4[1].pdf` (Test2) | `1_Ujt_fOlqXvQsFiZn1S4A14ZTeNh_Yve` | 1 | 14 | `../assets/06-vector-spaces-subspaces-3/page-001-part-014.webp` | [§ 4.4 Example 3 P_2 Spanning Subspace](#example-3-in-p_2) |
| `4.14.2_Vector_spaces_and_Subspaces_4[1].pdf` (Test2) | `1_Ujt_fOlqXvQsFiZn1S4A14ZTeNh_Yve` | 1 | 15 | `../assets/06-vector-spaces-subspaces-3/page-001-part-015.webp` | [§ 4.5 Example 1 Spanning R^3](#example-1-spanning-r3) |
| `4.14.2_Vector_spaces_and_Subspaces_4[1].pdf` (Test2) | `1_Ujt_fOlqXvQsFiZn1S4A14ZTeNh_Yve` | 1 | 16 | `../assets/06-vector-spaces-subspaces-3/page-001-part-016.webp` | [§ 4.5 Example 2 Non-Spanning P_2](#example-2-non-spanning-set-in-p_2) |
