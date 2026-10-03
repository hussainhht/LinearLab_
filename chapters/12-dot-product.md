---
id: "12-dot-product"
title: "1.2 — The Dot Product, Norm, and Orthogonality"
course: "MATHS211"
type: "chapter-section"
order: 12
language: "en"
source_ids: ["18zwWwbklFWEFPQqbqY0m6oCcLfKwDS-_"]
source_page_count: 1
content_format: "complete_transcription"
source_coverage: "all pages of every listed source version"
transcribed_source_id: "18zwWwbklFWEFPQqbqY0m6oCcLfKwDS-_"
transcribed_source_parts: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
---

# 1.2 — The Dot Product, Norm, and Orthogonality

This document provides the complete, rigorous mathematical transcription of Section 1.2, covering the **dot product** (Euclidean inner product), algebraic properties, the **norm (length)** of a vector, the **Cauchy-Schwarz Inequality**, the **Triangle Inequality**, **unit vectors and normalization**, **Euclidean distance**, the **angle between vectors**, **orthogonality**, the **Pythagorean Theorem**, **orthogonal projections**, and worked exercises.

---

## 1. The Dot Product

### Definition
Let $u = (x_1, x_2, \dots, x_n)$ and $v = (y_1, y_2, \dots, y_n)$ be two vectors in $\mathbb{R}^n$.
The **dot product** (or Euclidean inner product) of $u$ and $v$, denoted $u \cdot v$, is defined as:

$$
\boxed{u \cdot v = x_1 y_1 + x_2 y_2 + \cdots + x_n y_n = \sum_{i=1}^n x_i y_i}
$$

### Example
Let $u = (1, 2, -3)$ and $v = (-3, 5, 2)$ in $\mathbb{R}^3$.
$$
u \cdot v = 1(-3) + 2(5) + (-3)(2) = -3 + 10 - 6 = 1.
$$

---

### Main Properties of the Dot Product

For all vectors $u, v, w \in \mathbb{R}^n$ and any scalar $\alpha \in \mathbb{R}$:

1. **Symmetry (Commutativity):**
   $$
   \boxed{u \cdot v = v \cdot u}
   $$
   *Proof:* $u \cdot v = \sum_{i=1}^n x_i y_i = \sum_{i=1}^n y_i x_i = v \cdot u$.

2. **Distributivity over Vector Addition:**
   $$
   \boxed{u \cdot (v + w) = u \cdot v + u \cdot w}
   $$
   *Proof:* With $w = (z_1, \dots, z_n)$:
   $$
   u \cdot (v + w) = \sum_{i=1}^n x_i (y_i + z_i) = \sum_{i=1}^n x_i y_i + \sum_{i=1}^n x_i z_i = u \cdot v + u \cdot w.
   $$

3. **Homogeneity with Scalar Multiplication:**
   $$
   \boxed{(\alpha u) \cdot v = \alpha (u \cdot v)}
   $$
   *Proof:* $(\alpha u) \cdot v = \sum_{i=1}^n (\alpha x_i) y_i = \alpha \sum_{i=1}^n x_i y_i = \alpha (u \cdot v)$.

4. **Positivity (Definiteness):**
   $$
   \boxed{u \cdot u \ge 0, \quad \text{and} \quad u \cdot u = 0 \iff u = 0}
   $$
   *Proof:* $u \cdot u = x_1^2 + x_2^2 + \cdots + x_n^2$. Since squares of real numbers are non-negative, $u \cdot u \ge 0$.
   If $u \cdot u = 0$, then $\sum_{i=1}^n x_i^2 = 0$. Since each $x_i^2 \ge 0$, the sum vanishes if and only if each $x_i = 0$, which means $u = (0, 0, \dots, 0) = 0$.

---

### Algebraic Expansion Example
Expand and evaluate $(2u + 3v) \cdot (-4u + v)$ where $u = (1, 2, 0)$ and $v = (-1, 0, 1)$.

**Solution:**
Using the distributive properties:
$$
\begin{aligned}
(2u + 3v) \cdot (-4u + v) &= 2u \cdot (-4u) + 2u \cdot v + 3v \cdot (-4u) + 3v \cdot v \\
&= -8(u \cdot u) + 2(u \cdot v) - 12(v \cdot u) + 3(v \cdot v) \\
&= -8(u \cdot u) - 10(u \cdot v) + 3(v \cdot v).
\end{aligned}
$$
Now compute the individual dot products:
$$
\begin{aligned}
u \cdot u &= 1^2 + 2^2 + 0^2 = 5, \\
u \cdot v &= 1(-1) + 2(0) + 0(1) = -1, \\
v \cdot v &= (-1)^2 + 0^2 + 1^2 = 2.
\end{aligned}
$$
Substituting these values:
$$
(2u + 3v) \cdot (-4u + v) = -8(5) - 10(-1) + 3(2) = -40 + 10 + 6 = -24.
$$

---

## 2. Length (Norm) of a Vector

### Definition
The **length** (or **Euclidean norm**) of a vector $u = (x_1, x_2, \dots, x_n) \in \mathbb{R}^n$ is denoted $\|u\|$ and defined by:

$$
\boxed{\|u\| = \sqrt{u \cdot u} = \sqrt{x_1^2 + x_2^2 + \cdots + x_n^2}}
$$

**Geometric Interpretation:**
- In $\mathbb{R}^2$, by the Pythagorean theorem, the distance from $(0,0)$ to $(x,y)$ is $\sqrt{x^2 + y^2}$.
- In $\mathbb{R}^3$, the projection onto the $xy$-plane has length $r = \sqrt{x^2 + y^2}$. The norm in 3D is $\|v\| = \sqrt{r^2 + z^2} = \sqrt{x^2 + y^2 + z^2}$.

### Example
Let $v = (1, 2, 3) \in \mathbb{R}^3$.
$$
\|v\| = \sqrt{1^2 + 2^2 + 3^2} = \sqrt{1 + 4 + 9} = \sqrt{14}.
$$

---

### Main Properties of the Norm

1. **Positivity:**
   $$
   \boxed{\|v\| \ge 0, \quad \text{and} \quad \|v\| = 0 \iff v = 0}
   $$

2. **Absolute Homogeneity:**
   $$
   \boxed{\|\alpha u\| = |\alpha| \, \|u\| \quad \text{for any scalar } \alpha \in \mathbb{R}}
   $$
   *Proof:*
   $$
   \|\alpha u\| = \sqrt{(\alpha u) \cdot (\alpha u)} = \sqrt{\alpha^2 (u \cdot u)} = \sqrt{\alpha^2} \sqrt{u \cdot u} = |\alpha| \, \|u\|.
   $$

---

### Example: Norm of a Linear Combination
Evaluate $\|2u + 3v\|$ for $u = (1, 2, -1)$ and $v = (3, 0, 1)$.

**Solution:**
$$
\begin{aligned}
\|2u + 3v\|^2 &= (2u + 3v) \cdot (2u + 3v) \\
&= 4(u \cdot u) + 12(u \cdot v) + 9(v \cdot v) \\
&= 4\|u\|^2 + 12(u \cdot v) + 9\|v\|^2.
\end{aligned}
$$
Compute:
- $\|u\|^2 = 1^2 + 2^2 + (-1)^2 = 6$.
- $u \cdot v = 1(3) + 2(0) + (-1)(1) = 2$.
- $\|v\|^2 = 3^2 + 0^2 + 1^2 = 10$.

Substituting:
$$
\|2u + 3v\|^2 = 4(6) + 12(2) + 9(10) = 24 + 24 + 90 = 138.
$$
Thus:
$$
\|2u + 3v\| = \sqrt{138}.
$$

---

### 3. The Cauchy-Schwarz Inequality

> **Theorem (Cauchy-Schwarz Inequality):**
> For all vectors $u, v \in \mathbb{R}^n$:
> $$
> \boxed{|u \cdot v| \le \|u\| \, \|v\|}
> $$

**Complete Proof:**
Let $t \in \mathbb{R}$. Consider the vector $tu + v$. By the positivity of the norm:
$$
\|tu + v\|^2 \ge 0 \quad \text{for all } t \in \mathbb{R}.
$$
Expanding the norm squared:
$$
\begin{aligned}
\|tu + v\|^2 &= (tu + v) \cdot (tu + v) \\
&= t^2 (u \cdot u) + 2t (u \cdot v) + (v \cdot v) \\
&= t^2 \|u\|^2 + 2t (u \cdot v) + \|v\|^2 \ge 0.
\end{aligned}
$$
This is a quadratic polynomial in $t$:
$$
a t^2 + b t + c \ge 0, \quad \text{where } a = \|u\|^2, \; b = 2(u \cdot v), \; c = \|v\|^2.
$$
For a quadratic $at^2 + bt + c$ with $a > 0$ to be non-negative for all real $t$, it cannot have two distinct real roots (otherwise it would be negative between the roots). Therefore, its discriminant $\Delta$ must satisfy:
$$
\Delta = b^2 - 4ac \le 0.
$$
Substituting $a, b, c$:
$$
\begin{aligned}
[2(u \cdot v)]^2 - 4 \|u\|^2 \|v\|^2 &\le 0 \\
4 (u \cdot v)^2 - 4 \|u\|^2 \|v\|^2 &\le 0 \\
(u \cdot v)^2 &\le \|u\|^2 \|v\|^2.
\end{aligned}
$$
Taking the square root on both sides:
$$
\sqrt{(u \cdot v)^2} \le \sqrt{\|u\|^2} \sqrt{\|v\|^2} \implies |u \cdot v| \le \|u\| \, \|v\|. \quad \blacksquare
$$

In $\mathbb{R}^3$, Cauchy-Schwarz expresses the algebraic inequality:
$$
|x_1 y_1 + x_2 y_2 + x_3 y_3| \le \sqrt{x_1^2 + x_2^2 + x_3^2} \sqrt{y_1^2 + y_2^2 + y_3^2}.
$$

---

### 4. The Triangle Inequality

> **Theorem (Triangle Inequality):**
> For all vectors $u, v \in \mathbb{R}^n$:
> $$
> \boxed{\|u + v\| \le \|u\| + \|v\|}
> $$

**Proof:**
Using the expansion of $\|u + v\|^2$ and the Cauchy-Schwarz inequality ($u \cdot v \le |u \cdot v| \le \|u\| \|v\|$):
$$
\begin{aligned}
\|u + v\|^2 &= \|u\|^2 + 2(u \cdot v) + \|v\|^2 \\
&\le \|u\|^2 + 2 |u \cdot v| + \|v\|^2 \\
&\le \|u\|^2 + 2 \|u\| \|v\| + \|v\|^2 \\
&= (\|u\| + \|v\|)^2.
\end{aligned}
$$
Taking the square root of both sides yields:
$$
\|u + v\| \le \|u\| + \|v\|. \quad \blacksquare
$$

---

### Unit Vectors and Normalization

- A vector $u \in \mathbb{R}^n$ is called a **unit vector** if $\|u\| = 1$.
- In $\mathbb{R}^3$, the standard basis vectors are unit vectors:
  $$
  e_1 = (1, 0, 0), \quad e_2 = (0, 1, 0), \quad e_3 = (0, 0, 1).
  $$
  Each satisfies $\|e_i\| = \sqrt{1^2 + 0^2 + 0^2} = 1$.

- **Normalization:**
  Given any non-zero vector $v \ne 0$, the vector:
  $$
  \boxed{u = \frac{1}{\|v\|} v}
  $$
  is a unit vector in the same direction as $v$.
  *Verification:* $\|u\| = \left\| \frac{1}{\|v\|} v \right\| = \frac{1}{\|v\|} \|v\| = 1$.

**Example:**
Normalize $v = (1, -1, 4)$.
$$
\|v\| = \sqrt{1^2 + (-1)^2 + 4^2} = \sqrt{1 + 1 + 16} = \sqrt{18} = 3\sqrt{2}.
$$
The normalized unit vector is:
$$
u = \frac{1}{3\sqrt{2}} (1, -1, 4) = \left( \frac{1}{3\sqrt{2}}, -\frac{1}{3\sqrt{2}}, \frac{4}{3\sqrt{2}} \right).
$$

---

## 3. Distance Between Two Vectors

### Definition
Let $u = (x_1, \dots, x_n)$ and $v = (y_1, \dots, y_n)$ in $\mathbb{R}^n$. The **Euclidean distance** between $u$ and $v$, denoted $d(u, v)$, is defined as:

$$
\boxed{d(u, v) = \|u - v\| = \sqrt{(x_1 - y_1)^2 + (x_2 - y_2)^2 + \cdots + (x_n - y_n)^2}}
$$

### Example
Let $u = (\sqrt{2}, 1, -1)$ and $v = (0, 2, -2)$ in $\mathbb{R}^3$.
$$
\begin{aligned}
d(u, v) &= \sqrt{(0 - \sqrt{2})^2 + (2 - 1)^2 + (-2 - (-1))^2} \\
&= \sqrt{(-\sqrt{2})^2 + 1^2 + (-1)^2} = \sqrt{2 + 1 + 1} = \sqrt{4} = 2.
\end{aligned}
$$

---

## 4. Angle Between Two Vectors

### Definition and Derivation
Consider non-zero vectors $u, v \in \mathbb{R}^n$. By applying the Law of Cosines to the triangle formed by $u$, $v$, and $u - v$:
$$
\|u - v\|^2 = \|u\|^2 + \|v\|^2 - 2 \|u\| \|v\| \cos\theta.
$$
Expanding the left-hand side using the dot product:
$$
\|u - v\|^2 = \|u\|^2 - 2(u \cdot v) + \|v\|^2.
$$
Equating the two expressions:
$$
-2(u \cdot v) = -2 \|u\| \|v\| \cos\theta \implies \boxed{u \cdot v = \|u\| \|v\| \cos\theta}
$$
Therefore, the angle $\theta \in [0, \pi]$ between $u$ and $v$ is given by:
$$
\boxed{\cos\theta = \frac{u \cdot v}{\|u\| \, \|v\|}}
$$

---

### Example 1: Angle Between Two Vectors in $\mathbb{R}^3$
Let $u = (2, 1, -2)$ and $v = (1, 1, 1)$.
1. $u \cdot v = 2(1) + 1(1) + (-2)(1) = 2 + 1 - 2 = 1$.
2. $\|u\| = \sqrt{2^2 + 1^2 + (-2)^2} = \sqrt{9} = 3$.
3. $\|v\| = \sqrt{1^2 + 1^2 + 1^2} = \sqrt{3}$.
4. $\cos\theta = \frac{1}{3\sqrt{3}} \implies \theta = \arccos\left(\frac{1}{3\sqrt{3}}\right) \approx 78.9^\circ$.

---

### Example 2: Angle Between Face Diagonals of a Cube
Find the angle between the face diagonals of two adjacent faces of a unit cube.

**Solution:**
Place the cube with one vertex at the origin $O(0,0,0)$ and edge length 1 along the positive axes.
- Diagonal on the $xz$-face: $u = (1, 0, 1)$.
- Diagonal on the $yz$-face: $v = (0, 1, 1)$.
Both diagonals emanate from the origin $O$.
$$
\begin{aligned}
u \cdot v &= 1(0) + 0(1) + 1(1) = 1, \\
\|u\| &= \sqrt{1^2 + 0^2 + 1^2} = \sqrt{2}, \\
\|v\| &= \sqrt{0^2 + 1^2 + 1^2} = \sqrt{2}, \\
\cos\theta &= \frac{u \cdot v}{\|u\| \|v\|} = \frac{1}{\sqrt{2} \sqrt{2}} = \frac{1}{2}.
\end{aligned}
$$
Since $\cos\theta = \frac{1}{2}$ and $0 \le \theta \le \pi$:
$$
\theta = 60^\circ = \frac{\pi}{3} \text{ radians}.
$$

---

## 5. Orthogonality

### Definition
Two vectors $u$ and $v$ in $\mathbb{R}^n$ are said to be **orthogonal** (denoted $u \perp v$) if:

$$
\boxed{u \cdot v = 0}
$$

For non-zero vectors $u \ne 0, v \ne 0$:
$$
u \perp v \iff \cos\theta = 0 \iff \theta = \frac{\pi}{2} \text{ rad } (90^\circ).
$$
*(The zero vector $0$ is orthogonal to every vector in $\mathbb{R}^n$ because $0 \cdot v = 0$).*

### Example
Let $u = (1, 1, -2)$ and $v = (3, 1, 2)$ in $\mathbb{R}^3$.
$$
u \cdot v = 1(3) + 1(1) + (-2)(2) = 3 + 1 - 4 = 0.
$$
Thus, $u \perp v$.

---

### The Pythagorean Theorem in $\mathbb{R}^n$

> **Theorem:** Two vectors $u, v \in \mathbb{R}^n$ are orthogonal if and only if:
> $$
> \boxed{\|u + v\|^2 = \|u\|^2 + \|v\|^2}
> $$

**Proof:**
$$
\begin{aligned}
\|u + v\|^2 &= \|u\|^2 + 2(u \cdot v) + \|v\|^2 \\
&= \|u\|^2 + \|v\|^2 \iff 2(u \cdot v) = 0 \iff u \cdot v = 0 \iff u \perp v. \quad \blacksquare
\end{aligned}
$$

---

### Worked Problem 1: Mutually Orthogonal Parameter System
Do there exist constants $k, L \in \mathbb{R}$ such that the vectors:
$$
u = (k, 3, 2), \quad v = (-3, 1, L), \quad w = (-5, 5, 1)
$$
are mutually orthogonal?

**Solution:**
For $u, v, w$ to be mutually orthogonal, all three pairwise dot products must equal zero:
1. $u \perp v \implies -3k + 3 + 2L = 0 \quad (1)$
2. $u \perp w \implies -5k + 15 + 2 = 0 \implies 5k = 17 \implies k = \frac{17}{5} \quad (2)$
3. $v \perp w \implies 15 + 5 + L = 0 \implies 20 + L = 0 \implies L = -20 \quad (3)$

Substitute $k = \frac{17}{5}$ and $L = -20$ into equation $(1)$:
$$
-3\left(\frac{17}{5}\right) + 3 + 2(-20) = -\frac{51}{5} + 3 - 40 = -10.2 + 3 - 40 = -47.2 \ne 0.
$$
Equation $(1)$ is not satisfied.
**Conclusion:** No such constants $k$ and $L$ exist.

---

### Worked Problem 2: Finding a Unit Vector Orthogonal to Two Given Vectors
Find a unit vector $u = (x, y, z) \in \mathbb{R}^3$ that is orthogonal to both $v = (1, 2, -1)$ and $w = (0, 2, 4)$.

**Solution:**
1. Orthogonality conditions:
   $$
   \begin{cases}
   u \cdot v = 0 \implies x + 2y - z = 0 & (1) \\
   u \cdot w = 0 \implies 2y + 4z = 0 & (2)
   \end{cases}
   $$
   From $(2)$: $2y = -4z \implies y = -2z$.
   Substitute into $(1)$: $x + 2(-2z) - z = 0 \implies x - 5z = 0 \implies x = 5z$.
   Letting $z = r$ ($r \in \mathbb{R}$):
   $$
   u = (5r, -2r, r).
   $$
2. Unit norm condition $\|u\| = 1 \iff x^2 + y^2 + z^2 = 1$:
   $$
   (5r)^2 + (-2r)^2 + r^2 = 1 \implies 25r^2 + 4r^2 + r^2 = 1 \implies 30r^2 = 1 \implies r = \pm \frac{1}{\sqrt{30}}.
   $$
3. Therefore, two unit vectors satisfy the conditions:
   $$
   u = \pm \left( \frac{5}{\sqrt{30}}, -\frac{2}{\sqrt{30}}, \frac{1}{\sqrt{30}} \right).
   $$

---

## 6. Orthogonal Projections

Let $u, v \in \mathbb{R}^n$ with $u \ne 0$.
The **orthogonal projection of $v$ onto $u$**, denoted $\operatorname{proj}_u(v)$, is given by:

$$
\boxed{\operatorname{proj}_u(v) = \frac{u \cdot v}{\|u\|^2} u}
$$

### Example
Let $u = (-1, 3)$ and $v = (2, 1)$ in $\mathbb{R}^2$.
$$
\begin{aligned}
u \cdot v &= (-1)(2) + 3(1) = 1, \\
\|u\|^2 &= (-1)^2 + 3^2 = 10, \\
\operatorname{proj}_u(v) &= \frac{1}{10} (-1, 3) = \left( -\frac{1}{10}, \frac{3}{10} \right).
\end{aligned}
$$

---

## 7. Textbook and Review Exercises

### Exercise 31: Right Triangle Verification
Let $A(1, 1, -1)$, $B(-3, 2, -2)$, and $C(2, 2, -4)$ be points in $\mathbb{R}^3$. Prove that $\triangle ABC$ is a right triangle.

**Solution:**
Form the vectors representing the sides:
$$
\begin{aligned}
\vec{AB} &= B - A = (-3 - 1, 2 - 1, -2 - (-1)) = (-4, 1, -1), \\
\vec{AC} &= C - A = (2 - 1, 2 - 1, -4 - (-1)) = (1, 1, -3).
\end{aligned}
$$
Compute their dot product:
$$
\vec{AB} \cdot \vec{AC} = (-4)(1) + 1(1) + (-1)(-3) = -4 + 1 + 3 = 0.
$$
Since $\vec{AB} \cdot \vec{AC} = 0$, the vectors $\vec{AB}$ and $\vec{AC}$ are orthogonal ($\vec{AB} \perp \vec{AC}$).
Thus, $\triangle ABC$ is a right-angled triangle with the right angle at vertex $A$. $\blacksquare$

---

### Exercise 35: Finding the Fourth Vertex of a Rectangle
The rectangle $ABCD$ has vertices $A(1, 2, 3)$, $B(3, 6, -2)$, and $C(0, 5, -4)$. Determine the coordinates of vertex $D(x, y, z)$.

**Solution:**
In a rectangle $ABCD$, the opposing sides are equal and parallel vectors:
$$
\vec{AB} = \vec{DC}.
$$
Compute $\vec{AB}$:
$$
\vec{AB} = B - A = (3 - 1, 6 - 2, -2 - 3) = (2, 4, -5).
$$
Express $\vec{DC} = C - D$:
$$
\vec{DC} = (0 - x, 5 - y, -4 - z).
$$
Equating corresponding components:
$$
\begin{cases}
-x = 2 \implies x = -2 \\
5 - y = 4 \implies y = 1 \\
-4 - z = -5 \implies z = 1
\end{cases}
$$
Thus, $D = (-2, 1, 1)$.

---

### Exercise 42: Orthogonal Projection Calculation
Find the projection of $v = (2, 2, -2)$ onto $u = (1/2, -1/4, -1/2)$.

**Solution:**
$$
\begin{aligned}
u \cdot v &= \frac{1}{2}(2) + \left(-\frac{1}{4}\right)(2) + \left(-\frac{1}{2}\right)(-2) = 1 - \frac{1}{2} + 1 = \frac{3}{2}, \\
\|u\|^2 &= \left(\frac{1}{2}\right)^2 + \left(-\frac{1}{4}\right)^2 + \left(-\frac{1}{2}\right)^2 = \frac{1}{4} + \frac{1}{16} + \frac{1}{4} = \frac{4 + 1 + 4}{16} = \frac{9}{16}, \\
\operatorname{proj}_u(v) &= \frac{u \cdot v}{\|u\|^2} u = \frac{3/2}{9/16} u = \left( \frac{3}{2} \cdot \frac{16}{9} \right) u = \frac{8}{3} \begin{bmatrix} 1/2 \\ -1/4 \\ -1/2 \end{bmatrix} = \begin{bmatrix} 4/3 \\ -2/3 \\ -4/3 \end{bmatrix}.
\end{aligned}
$$

---

### Exercise 46: Area of a Triangle Using Vector Trigonometry
Compute the area of $\triangle ABC$ with vertices $A(1, -1)$, $B(2, 2)$, and $C(4, 0)$.

**Formula:**
The area of a triangle spanned by vectors $u$ and $v$ with included angle $\theta$ is:
$$
\operatorname{Area} = \frac{1}{2} \|u\| \|v\| \sin\theta.
$$

**Solution:**
1. Side vectors:
   $$
   \vec{AB} = (2 - 1, 2 - (-1)) = (1, 3), \qquad \vec{AC} = (4 - 1, 0 - (-1)) = (3, 1).
   $$
2. Norms and dot product:
   $$
   \|\vec{AB}\| = \sqrt{1^2 + 3^2} = \sqrt{10}, \qquad \|\vec{AC}\| = \sqrt{3^2 + 1^2} = \sqrt{10}.
   $$
   $$
   \vec{AB} \cdot \vec{AC} = 1(3) + 3(1) = 6.
   $$
3. Angle $\theta$:
   $$
   \cos\theta = \frac{\vec{AB} \cdot \vec{AC}}{\|\vec{AB}\| \|\vec{AC}\|} = \frac{6}{\sqrt{10}\sqrt{10}} = \frac{6}{10} = \frac{3}{5}.
   $$
   $$
   \sin\theta = \sqrt{1 - \cos^2\theta} = \sqrt{1 - \frac{9}{25}} = \sqrt{\frac{16}{25}} = \frac{4}{5}.
   $$
4. Compute Area:
   $$
   \operatorname{Area} = \frac{1}{2} \sqrt{10} \cdot \sqrt{10} \cdot \frac{4}{5} = \frac{1}{2}(10)\left(\frac{4}{5}\right) = 4.
   $$

---

### Exercise 49: Parameter Value for Orthogonality
Find the value(s) of $k$ such that $u = (1, -1, 2)$ and $v = (k^2, k, -3)$ are orthogonal.

**Solution:**
$$
\begin{aligned}
u \perp v &\iff u \cdot v = 0 \\
&\iff 1(k^2) + (-1)(k) + 2(-3) = 0 \\
&\iff k^2 - k - 6 = 0 \\
&\iff (k + 2)(k - 3) = 0 \\
&\iff k = -2 \quad \text{or} \quad k = 3.
\end{aligned}
$$

---

### Exercise 64: Characterization of Orthogonality via Norms
Show that $\|u + v\| = \|u - v\|$ if and only if $u \perp v$.

**Proof:**
$$
\begin{aligned}
\|u + v\| = \|u - v\| &\iff \|u + v\|^2 = \|u - v\|^2 \\
&\iff \|u\|^2 + 2(u \cdot v) + \|v\|^2 = \|u\|^2 - 2(u \cdot v) + \|v\|^2 \\
&\iff 2(u \cdot v) = -2(u \cdot v) \\
&\iff 4(u \cdot v) = 0 \\
&\iff u \cdot v = 0 \\
&\iff u \perp v. \quad \blacksquare
\end{aligned}
$$

---

### Exercise 66: Norm Calculation Given Scalar Product Information
If $\|u\| = 2$, $\|v\| = \sqrt{3}$, and $u \cdot v = 1$, find $\|2u + 3v\|$.

**Solution:**
$$
\begin{aligned}
\|2u + 3v\|^2 &= 4 \|u\|^2 + 12 (u \cdot v) + 9 \|v\|^2 \\
&= 4(2)^2 + 12(1) + 9(\sqrt{3})^2 \\
&= 4(4) + 12 + 9(3) \\
&= 16 + 12 + 27 = 55.
\end{aligned}
$$
Therefore:
$$
\|2u + 3v\| = \sqrt{55}.
$$

---

### Exercise 67: Non-Existence by Cauchy-Schwarz Contradiction
Show that there do not exist vectors $u$ and $v$ such that $\|u\| = 1$, $\|v\| = 2$, and $u \cdot v = 3$.

**Proof (by Contradiction):**
Suppose there exist such vectors $u$ and $v$.
The angle $\theta$ between them satisfies:
$$
\cos\theta = \frac{u \cdot v}{\|u\| \|v\|} = \frac{3}{(1)(2)} = \frac{3}{2}.
$$
However, for any real angle $\theta$, the cosine function must satisfy $-1 \le \cos\theta \le 1$.
Since $\frac{3}{2} > 1$, this is a contradiction.
Therefore, no such vectors exist. $\blacksquare$

---

### Exercise 69: Orthogonality of the Projection Error
Let $u \ne 0$. Show that $u$ and $v - \operatorname{proj}_u(v)$ are orthogonal.

**Proof:**
By definition, $\operatorname{proj}_u(v) = \frac{u \cdot v}{\|u\|^2} u$.
Taking the dot product of $u$ with the difference:
$$
\begin{aligned}
u \cdot (v - \operatorname{proj}_u(v)) &= u \cdot v - u \cdot \operatorname{proj}_u(v) \\
&= u \cdot v - u \cdot \left( \frac{u \cdot v}{\|u\|^2} u \right) \\
&= u \cdot v - \frac{u \cdot v}{\|u\|^2} (u \cdot u).
\end{aligned}
$$
Since $u \cdot u = \|u\|^2$:
$$
u \cdot (v - \operatorname{proj}_u(v)) = u \cdot v - \frac{u \cdot v}{\|u\|^2} \|u\|^2 = u \cdot v - u \cdot v = 0.
$$
Therefore, $u \perp (v - \operatorname{proj}_u(v))$. $\blacksquare$

---

## 8. Source Verification Appendix

The complete scanned source material for this chapter is preserved in the local assets directory:
- **Scanned notes (11 parts):** `assets/12-dot-product-1/page-001-part-001.webp` through `page-001-part-011.webp`
