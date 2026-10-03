---
id: "04-matrix-inverses"
title: "1.4 — Inverses of matrices"
course: "MATHS211"
type: "chapter-section"
order: 4
language: "en"
source_ids: ["1shHnNllATjHF2PwBuQfxxA3ishTX7fUx", "1Qsu838mD66GnI6SnX7Oi_7sGg9TuWFeZ"]
source_page_count: 2
content_format: "complete_transcription_with_archival_references"
source_coverage: "all pages of every listed source version"
editable_transcription: "complete transcription of all source versions, 2x2 formula, Gauss-Jordan matrix inversion algorithm, matrix equations, consistency conditions, and Invertible Matrix Theorem"
transcribed_source_ids: ["1_howvee-xm2zxP24DqQcQA1nZ8PqCKPg", "1n8MA2sIJjHe4U7uPpcxuJYxQ3Qzt4uY4"]
---

# 1.4 — Inverses of Matrices

## 1. Definition of Invertibility

Let $A$ be a square matrix of size $n \times n$. The matrix $A$ is called **invertible** (or **non-singular**) if there exists a square matrix $B$ of size $n \times n$ such that:

$$
AB = BA = I_n
$$

where $I_n$ is the $n \times n$ identity matrix. The matrix $B$ is uniquely determined and is called the **inverse** of $A$, denoted:

$$
B = A^{-1}
$$

Thus, the defining identity is:

$$
A A^{-1} = A^{-1} A = I_n
$$

A matrix that possesses no inverse is called **non-invertible** or **singular**.

### Verification Example:
Consider:
$$
A = \begin{bmatrix} 1 & 1 \\ 3 & 4 \end{bmatrix}, \qquad B = \begin{bmatrix} 4 & -1 \\ -3 & 1 \end{bmatrix}
$$
1. $AB = \begin{bmatrix} 1(4)+1(-3) & 1(-1)+1(1) \\ 3(4)+4(-3) & 3(-1)+4(1) \end{bmatrix} = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix} = I_2$
2. $BA = \begin{bmatrix} 4(1)+(-1)(3) & 4(1)+(-1)(4) \\ -3(1)+1(3) & -3(1)+1(4) \end{bmatrix} = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix} = I_2$

Since $AB = BA = I_2$, $A$ is invertible with inverse $A^{-1} = \begin{bmatrix} 4 & -1 \\ -3 & 1 \end{bmatrix}$.

---

## 2. Inverting $2 \times 2$ Matrices

For a general $2 \times 2$ matrix:
$$
A = \begin{bmatrix} a & b \\ c & d \end{bmatrix}
$$
Define the determinant quantity:
$$
\Delta = ad - bc
$$

### Theorem:
1. $A$ is invertible **if and only if** $\Delta = ad - bc \ne 0$.
2. When $\Delta \ne 0$, the inverse formula is:
   $$
   A^{-1} = \frac{1}{\Delta} \begin{bmatrix} d & -b \\ -c & a \end{bmatrix} = \frac{1}{ad - bc} \begin{bmatrix} d & -b \\ -c & a \end{bmatrix}
   $$
   *(Swap the diagonal entries $a \leftrightarrow d$, and negate the off-diagonal entries $b \to -b, \, c \to -c$).*

---

### Worked Examples:

#### Example 1: Invertible Matrix
$$
A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}
$$
- $\Delta = 1(4) - 3(2) = 4 - 6 = -2 \ne 0 \implies A$ is invertible.
- $A^{-1} = \frac{1}{-2} \begin{bmatrix} 4 & -2 \\ -3 & 1 \end{bmatrix} = \begin{bmatrix} -2 & 1 \\ \frac{3}{2} & -\frac{1}{2} \end{bmatrix}$.

#### Example 2: Singular Matrix
$$
B = \begin{bmatrix} 2 & 4 \\ 3 & 6 \end{bmatrix}
$$
- $\Delta = 2(6) - 3(4) = 12 - 12 = 0$.
- **Conclusion:** $B$ is **not invertible** (singular).

#### Example 3: Invertibility Depending on Parameter $a$
Find all values of $a$ such that the matrix $A$ is invertible, and compute $A^{-1}$:
$$
A = \begin{bmatrix} 2a & -1 \\ 4a + 1 & 3 \end{bmatrix}
$$
- $\Delta = (2a)(3) - (-1)(4a + 1) = 6a + 4a + 1 = 10a + 1$.
- $A$ is invertible $\iff \Delta \ne 0 \iff 10a + 1 \ne 0 \iff a \ne -\frac{1}{10}$.
- For $a \ne -\frac{1}{10}$:
  $$
  A^{-1} = \frac{1}{10a + 1} \begin{bmatrix} 3 & 1 \\ -(4a + 1) & 2a \end{bmatrix} = \begin{bmatrix} \frac{3}{10a+1} & \frac{1}{10a+1} \\ \frac{-4a-1}{10a+1} & \frac{2a}{10a+1} \end{bmatrix}
  $$

---

## 3. Algebraic Properties of the Matrix Inverse

Let $A$ and $B$ be invertible $n \times n$ matrices, and $k \ne 0$ a scalar:

1. **Inverse of Identity:** $I^{-1} = I$
2. **Involution:** $(A^{-1})^{-1} = A$
3. **Scalar Multiple:** $(kA)^{-1} = \frac{1}{k} A^{-1}$
4. **Product Rule (Order Reversal):**
   $$(AB)^{-1} = B^{-1} A^{-1}$$
   *Proof:* $(AB)(B^{-1} A^{-1}) = A(B B^{-1}) A^{-1} = A I A^{-1} = A A^{-1} = I$.
5. **Transpose Rule:** $(A^T)^{-1} = (A^{-1})^T$
6. **Integer Powers:** $(A^n)^{-1} = (A^{-1})^n$ for any integer $n \ge 1$.

---

### Worked Algebraic Problems from Sources:

#### Problem 1: Reconstructing $A$ from $A^{-1}$
If $A^{-1} = \begin{bmatrix} 2 & -1 \\ 3 & 5 \end{bmatrix}$, find $A$:
$$
A = (A^{-1})^{-1} = \frac{1}{2(5) - 3(-1)} \begin{bmatrix} 5 & 1 \\ -3 & 2 \end{bmatrix} = \frac{1}{13} \begin{bmatrix} 5 & 1 \\ -3 & 2 \end{bmatrix} = \begin{bmatrix} \frac{5}{13} & \frac{1}{13} \\ -\frac{3}{13} & \frac{2}{13} \end{bmatrix}
$$

#### Problem 2: Solving for $A$ from Scaled Inverse
If $(7A)^{-1} = \begin{bmatrix} -3 & 7 \\ 1 & -2 \end{bmatrix}$, find $A$:
$$
7A = \left[(7A)^{-1}\right]^{-1} = \frac{1}{(-3)(-2) - 1(7)} \begin{bmatrix} -2 & -7 \\ -1 & -3 \end{bmatrix} = \frac{1}{-1} \begin{bmatrix} -2 & -7 \\ -1 & -3 \end{bmatrix} = \begin{bmatrix} 2 & 7 \\ 1 & 3 \end{bmatrix}
$$
$$
A = \frac{1}{7} \begin{bmatrix} 2 & 7 \\ 1 & 3 \end{bmatrix} = \begin{bmatrix} \frac{2}{7} & 1 \\ \frac{1}{7} & \frac{3}{7} \end{bmatrix}
$$

#### Problem 3: Solving for $A$ from Transpose Inverse
If $5(A^T)^{-1} = \begin{bmatrix} -3 & -1 \\ 5 & 2 \end{bmatrix}$, find $A$:
Invert both sides:
$$
\frac{1}{5} A^T = \frac{1}{(-3)(2) - 5(-1)} \begin{bmatrix} 2 & 1 \\ -5 & -3 \end{bmatrix} = \frac{1}{-1} \begin{bmatrix} 2 & 1 \\ -5 & -3 \end{bmatrix} = \begin{bmatrix} -2 & -1 \\ 5 & 3 \end{bmatrix}
$$
$$
A^T = 5 \begin{bmatrix} -2 & -1 \\ 5 & 3 \end{bmatrix} = \begin{bmatrix} -10 & -5 \\ 25 & 15 \end{bmatrix}
$$
$$
A = (A^T)^T = \begin{bmatrix} -10 & 25 \\ -5 & 15 \end{bmatrix}
$$

#### Problem 4: Solving a Linear Matrix Equation for $A$
If $(I + 2A^T)^{-1} = \begin{bmatrix} -1 & 2 \\ 4 & 5 \end{bmatrix}$, find $A$:
$$
I + 2A^T = \begin{bmatrix} -1 & 2 \\ 4 & 5 \end{bmatrix}^{-1} = \frac{1}{(-1)(5) - 4(2)} \begin{bmatrix} 5 & -2 \\ -4 & -1 \end{bmatrix} = -\frac{1}{13} \begin{bmatrix} 5 & -2 \\ -4 & -1 \end{bmatrix} = \begin{bmatrix} -\frac{5}{13} & \frac{2}{13} \\ \frac{4}{13} & \frac{1}{13} \end{bmatrix}
$$
$$
2A^T = \begin{bmatrix} -\frac{5}{13} & \frac{2}{13} \\ \frac{4}{13} & \frac{1}{13} \end{bmatrix} - \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix} = \begin{bmatrix} -\frac{18}{13} & \frac{2}{13} \\ \frac{4}{13} & -\frac{12}{13} \end{bmatrix}
$$
$$
A^T = \begin{bmatrix} -\frac{9}{13} & \frac{1}{13} \\ \frac{2}{13} & -\frac{6}{13} \end{bmatrix}
\quad \Longrightarrow \quad
A = (A^T)^T = \begin{bmatrix} -\frac{9}{13} & \frac{2}{13} \\ \frac{1}{13} & -\frac{6}{13} \end{bmatrix}
$$

---

### Matrix Polynomial Theorem:
Let $A$ be a square matrix satisfying:
$$
A^3 + 3A^2 - 2A + 5I = O
$$
Show that $A$ is invertible, and determine $A^{-1}$.

**Proof:**
Isolate the identity matrix:
$$
A^3 + 3A^2 - 2A = -5I
$$
Factor $A$ from the left:
$$
A(A^2 + 3A - 2I) = -5I \iff A\left( -\frac{1}{5}A^2 - \frac{3}{5}A + \frac{2}{5}I \right) = I
$$
By symmetry of polynomial powers:
$$
\left( -\frac{1}{5}A^2 - \frac{3}{5}A + \frac{2}{5}I \right) A = I
$$
Therefore, $A$ is invertible with:
$$
A^{-1} = -\frac{1}{5}A^2 - \frac{3}{5}A + \frac{2}{5}I
$$

---

### Theorem on Zero Divisors and Invertibility:
Let $A$ and $B$ be non-zero square matrices such that $AB = O$. Prove that $A$ is not invertible.

**Proof by contradiction:**
Suppose $A$ were invertible. Then $A^{-1}$ exists.
Multiply the relation $AB = O$ on the left by $A^{-1}$:
$$
A^{-1}(AB) = A^{-1} O \implies (A^{-1} A) B = O \implies I_n B = O \implies B = O
$$
This contradicts the given hypothesis that $B$ is a non-zero matrix ($B \ne O$).
Hence, $A$ cannot be invertible.

---

## 4. Gauss–Jordan Elimination Method for $n \ge 3$

To find the inverse of an $n \times n$ matrix $A$ for $n \ge 3$:
1. Form the augmented partitioned matrix of size $n \times 2n$:
   $$[A \mid I_n]$$
2. Apply elementary row operations to reduce the left-hand block $A$ to Reduced Row-Echelon Form:
   $$[A \mid I_n] \xrightarrow{\text{Elementary Row Operations}} [R \mid B]$$
3. **Outcome:**
   - If the left block reduces to the identity matrix $I_n$ ($R = I_n$), then $A$ is invertible and the right block is the inverse:
     $$[I_n \mid A^{-1}]$$
   - If a row of zeros appears in the left block during reduction, $A$ cannot be reduced to $I_n$, and **$A$ is not invertible**.

<div align="center">

```xml
<svg viewBox="0 0 600 130" xmlns="http://www.w3.org/2000/svg" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; font-family: ui-sans-serif, system-ui, sans-serif;">
  <g transform="translate(40, 20)">
    <rect x="0" y="0" width="200" height="80" fill="#f8fafc" stroke="#334155" stroke-width="2" rx="4" />
    <line x1="100" y1="0" x2="100" y2="80" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4,4" />
    <text x="50" y="47" font-size="20" font-weight="bold" fill="#0284c7" text-anchor="middle">A</text>
    <text x="150" y="47" font-size="20" font-weight="bold" fill="#16a34a" text-anchor="middle">Iₙ</text>
  </g>

  <!-- Arrow -->
  <g transform="translate(260, 50)">
    <text x="40" y="-12" font-size="12" font-weight="bold" fill="#64748b" text-anchor="middle">Row Operations</text>
    <line x1="0" y1="10" x2="80" y2="10" stroke="#dc2626" stroke-width="2.5" />
    <polygon points="80,5 90,10 80,15" fill="#dc2626" />
  </g>

  <g transform="translate(370, 20)">
    <rect x="0" y="0" width="200" height="80" fill="#f8fafc" stroke="#334155" stroke-width="2" rx="4" />
    <line x1="100" y1="0" x2="100" y2="80" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4,4" />
    <text x="50" y="47" font-size="20" font-weight="bold" fill="#16a34a" text-anchor="middle">Iₙ</text>
    <text x="150" y="47" font-size="20" font-weight="bold" fill="#dc2626" text-anchor="middle">A⁻¹</text>
  </g>
</svg>
```

</div>

---

### Worked Inversion Examples ($3 \times 3$ and $4 \times 4$):

#### Example 1: Full $3 \times 3$ Inversion
Find $A^{-1}$ where:
$$
A = \begin{bmatrix} 1 & 0 & 1 \\ 0 & 1 & 1 \\ 1 & 1 & 0 \end{bmatrix}
$$

Set up $[A \mid I_3]$:
$$
\left[\begin{array}{ccc|ccc}
\mathbf{1} & 0 & 1 & 1 & 0 & 0 \\
0 & \mathbf{1} & 1 & 0 & 1 & 0 \\
1 & 1 & 0 & 0 & 0 & 1
\end{array}\right]
\xrightarrow{R_3 \to R_3 - R_1}
\left[\begin{array}{ccc|ccc}
\mathbf{1} & 0 & 1 & 1 & 0 & 0 \\
0 & \mathbf{1} & 1 & 0 & 1 & 0 \\
0 & 1 & -1 & -1 & 0 & 1
\end{array}\right]
$$
$$
\xrightarrow{R_3 \to R_3 - R_2}
\left[\begin{array}{ccc|ccc}
\mathbf{1} & 0 & 1 & 1 & 0 & 0 \\
0 & \mathbf{1} & 1 & 0 & 1 & 0 \\
0 & 0 & -2 & -1 & -1 & 1
\end{array}\right]
\xrightarrow{R_3 \to -\frac{1}{2} R_3}
\left[\begin{array}{ccc|ccc}
\mathbf{1} & 0 & 1 & 1 & 0 & 0 \\
0 & \mathbf{1} & 1 & 0 & 1 & 0 \\
0 & 0 & \mathbf{1} & \frac{1}{2} & \frac{1}{2} & -\frac{1}{2}
\end{array}\right]
$$
Eliminate above Row 3 pivot ($R_1 \to R_1 - R_3, \, R_2 \to R_2 - R_3$):
$$
\left[\begin{array}{ccc|ccc}
\mathbf{1} & 0 & 0 & \frac{1}{2} & -\frac{1}{2} & \frac{1}{2} \\
0 & \mathbf{1} & 0 & -\frac{1}{2} & \frac{1}{2} & \frac{1}{2} \\
0 & 0 & \mathbf{1} & \frac{1}{2} & \frac{1}{2} & -\frac{1}{2}
\end{array}\right]
$$

**Result:**
$$
A^{-1} = \begin{bmatrix}
\frac{1}{2} & -\frac{1}{2} & \frac{1}{2} \\
-\frac{1}{2} & \frac{1}{2} & \frac{1}{2} \\
\frac{1}{2} & \frac{1}{2} & -\frac{1}{2}
\end{bmatrix}
$$

---

#### Example 2: Inverting Matrix $B$
Find $B^{-1}$ where:
$$
B = \begin{bmatrix} 3 & 4 & -1 \\ 1 & 0 & 3 \\ 2 & 5 & -4 \end{bmatrix}
$$

Set up $[B \mid I_3]$ and swap $R_1 \longleftrightarrow R_2$:
$$
\left[\begin{array}{ccc|ccc}
1 & 0 & 3 & 0 & 1 & 0 \\
3 & 4 & -1 & 1 & 0 & 0 \\
2 & 5 & -4 & 0 & 0 & 1
\end{array}\right]
\xrightarrow{R_2 \to R_2 - 3R_1, \, R_3 \to R_3 - 2R_1}
\left[\begin{array}{ccc|ccc}
1 & 0 & 3 & 0 & 1 & 0 \\
0 & 4 & -10 & 1 & -3 & 0 \\
0 & 5 & -10 & 0 & -2 & 1
\end{array}\right]
$$
Apply $R_3 \to R_3 - R_2$:
$$
\left[\begin{array}{ccc|ccc}
1 & 0 & 3 & 0 & 1 & 0 \\
0 & 4 & -10 & 1 & -3 & 0 \\
0 & 1 & 0 & -1 & 1 & 1
\end{array}\right]
\xrightarrow{R_2 \longleftrightarrow R_3}
\left[\begin{array}{ccc|ccc}
1 & 0 & 3 & 0 & 1 & 0 \\
0 & 1 & 0 & -1 & 1 & 1 \\
0 & 4 & -10 & 1 & -3 & 0
\end{array}\right]
$$
Apply $R_3 \to R_3 - 4R_2$:
$$
\left[\begin{array}{ccc|ccc}
1 & 0 & 3 & 0 & 1 & 0 \\
0 & 1 & 0 & -1 & 1 & 1 \\
0 & 0 & -10 & 5 & -7 & -4
\end{array}\right]
\xrightarrow{R_3 \to -\frac{1}{10} R_3}
\left[\begin{array}{ccc|ccc}
1 & 0 & 3 & 0 & 1 & 0 \\
0 & 1 & 0 & -1 & 1 & 1 \\
0 & 0 & 1 & -\frac{1}{2} & \frac{7}{10} & \frac{2}{5}
\end{array}\right]
$$
Clear row 1 ($R_1 \to R_1 - 3R_3$):
$$
0 - 3\left(-\frac{1}{2}\right) = \frac{3}{2}, \quad 1 - 3\left(\frac{7}{10}\right) = -\frac{11}{10}, \quad 0 - 3\left(\frac{2}{5}\right) = -\frac{6}{5}
$$
$$
\left[\begin{array}{ccc|ccc}
1 & 0 & 0 & \frac{3}{2} & -\frac{11}{10} & -\frac{6}{5} \\
0 & 1 & 0 & -1 & 1 & 1 \\
0 & 0 & 1 & -\frac{1}{2} & \frac{7}{10} & \frac{2}{5}
\end{array}\right]
$$

**Result:**
$$
B^{-1} = \begin{bmatrix}
\frac{3}{2} & -\frac{11}{10} & -\frac{6}{5} \\
-1 & 1 & 1 \\
-\frac{1}{2} & \frac{7}{10} & \frac{2}{5}
\end{bmatrix}
$$

---

#### Example 3: $4 \times 4$ Anti-Diagonal Matrix
Find $C^{-1}$ for:
$$
C = \begin{bmatrix} 0 & 0 & 0 & a \\ 0 & 0 & b & 0 \\ 0 & c & 0 & 0 \\ d & 0 & 0 & 0 \end{bmatrix}
$$
- If any of $a, b, c, d$ is zero, a zero row appears in $C \implies C$ is not invertible.
- If $a \ne 0, b \ne 0, c \ne 0, d \ne 0$:
  Interchange rows: $R_1 \longleftrightarrow R_4, \, R_2 \longleftrightarrow R_3$:
  $$
  \left[\begin{array}{cccc|cccc}
  d & 0 & 0 & 0 & 0 & 0 & 0 & 1 \\
  0 & c & 0 & 0 & 0 & 0 & 1 & 0 \\
  0 & 0 & b & 0 & 0 & 1 & 0 & 0 \\
  0 & 0 & 0 & a & 1 & 0 & 0 & 0
  \end{array}\right]
  $$
  Scale rows $R_1 \to \frac{1}{d}R_1, \, R_2 \to \frac{1}{c}R_2, \, R_3 \to \frac{1}{b}R_3, \, R_4 \to \frac{1}{a}R_4$:
  $$
  C^{-1} = \begin{bmatrix}
  0 & 0 & 0 & \frac{1}{d} \\
  0 & 0 & \frac{1}{c} & 0 \\
  0 & \frac{1}{b} & 0 & 0 \\
  \frac{1}{a} & 0 & 0 & 0
  \end{bmatrix}
  $$

---

## 5. Applications: Solving Linear Systems Using Inverses

Consider the system of $n$ linear equations in $n$ variables written in matrix form:
$$
AX = B
$$
If $A$ is invertible, multiply both sides by $A^{-1}$:
$$
A^{-1}(AX) = A^{-1} B \implies (A^{-1} A) X = A^{-1} B \implies I X = A^{-1} B
$$
$$
X = A^{-1} B \quad \text{\textbf{(Unique Solution)}}
$$

### Applicable Conditions:
1. Matrix $A$ must be **square** ($n$ equations in $n$ variables).
2. Matrix $A$ must be **invertible** ($\det(A) \ne 0$).

---

### Worked Examples:

#### Example 1: Solving a $3 \times 3$ System
Solve:
$$
\begin{cases}
x_1 + 2x_2 + 3x_3 = 5 \\
2x_1 + 5x_2 + 3x_3 = 3 \\
x_1 + 8x_3 = 17
\end{cases}
$$
Here $A = \begin{bmatrix} 1 & 2 & 3 \\ 2 & 5 & 3 \\ 1 & 0 & 8 \end{bmatrix}, \, X = \begin{bmatrix} x_1 \\ x_2 \\ x_3 \end{bmatrix}, \, B = \begin{bmatrix} 5 \\ 3 \\ 17 \end{bmatrix}$.

Given $A^{-1} = \begin{bmatrix} -40 & 16 & 9 \\ 13 & -5 & -3 \\ 5 & -2 & -1 \end{bmatrix}$:
$$
X = A^{-1} B = \begin{bmatrix} -40 & 16 & 9 \\ 13 & -5 & -3 \\ 5 & -2 & -1 \end{bmatrix} \begin{bmatrix} 5 \\ 3 \\ 17 \end{bmatrix}
$$
- $x_1 = -40(5) + 16(3) + 9(17) = -200 + 48 + 153 = 1$
- $x_2 = 13(5) - 5(3) - 3(17) = 65 - 15 - 51 = -1$
- $x_3 = 5(5) - 2(3) - 1(17) = 25 - 6 - 17 = 2$

**Solution set:** $S = \{(1, -1, 2)\}$ (Unique solution).

---

#### Example 2: General Parametric Right-Hand Side
Solve:
$$
\begin{cases}
2x - 3y = a \\
4x + 5y = b
\end{cases}
$$
$A = \begin{bmatrix} 2 & -3 \\ 4 & 5 \end{bmatrix} \implies \Delta = 2(5) - 4(-3) = 22 \ne 0$.
$$
A^{-1} = \frac{1}{22} \begin{bmatrix} 5 & 3 \\ -4 & 2 \end{bmatrix}
$$
$$
\begin{bmatrix} x \\ y \end{bmatrix} = A^{-1} \begin{bmatrix} a \\ b \end{bmatrix} = \frac{1}{22} \begin{bmatrix} 5 & 3 \\ -4 & 2 \end{bmatrix} \begin{bmatrix} a \\ b \end{bmatrix} = \begin{bmatrix} \frac{5a + 3b}{22} \\ \frac{-4a + 2b}{22} \end{bmatrix}
$$
**Solution set:** $S = \left\{\left( \frac{5a + 3b}{22}, \, \frac{-4a + 2b}{22} \right)\right\}$.

---

## 6. Systems with Singular Coefficient Matrices (Consistency Conditions)

When $\det(A) = 0$, $A^{-1}$ does not exist. We revert to **Gaussian or Gauss–Jordan elimination** on $[A \mid B]$ to determine conditions for consistency:

### Problem 1:
Under what condition on $a, b$ is the following system consistent?
$$
\begin{cases}
6x - 4y = a \\
3x - 2y = b
\end{cases}
$$
Coefficient matrix determinant: $\Delta = 6(-2) - 3(-4) = -12 + 12 = 0$ (singular).

Augmented matrix reduction:
$$
\left[\begin{array}{cc|c}
6 & -4 & a \\
3 & -2 & b
\end{array}\right]
\xrightarrow{R_1 \to \frac{1}{6} R_1}
\left[\begin{array}{cc|c}
1 & -\frac{2}{3} & \frac{a}{6} \\
3 & -2 & b
\end{array}\right]
\xrightarrow{R_2 \to R_2 - 3R_1}
\left[\begin{array}{cc|c}
1 & -\frac{2}{3} & \frac{a}{6} \\
0 & 0 & b - \frac{a}{2}
\end{array}\right]
$$
The system is consistent if and only if the zero row on the left matches zero on the right:
$$
b - \frac{a}{2} = 0 \iff a = 2b
$$

---

### Problem 2:
Find the condition on $a, b, c$ such that the following system is consistent:
$$
\begin{cases}
x_1 - 2x_2 + 5x_3 = a \\
4x_1 - 5x_2 + 8x_3 = b \\
-3x_1 + 3x_2 - 3x_3 = c
\end{cases}
$$

Augmented matrix reduction:
$$
\left[\begin{array}{rrr|c}
1 & -2 & 5 & a \\
4 & -5 & 8 & b \\
-3 & 3 & -3 & c
\end{array}\right]
\xrightarrow{R_2 \to R_2 - 4R_1, \, R_3 \to R_3 + 3R_1}
\left[\begin{array}{rrr|c}
1 & -2 & 5 & a \\
0 & 3 & -12 & b - 4a \\
0 & -3 & 12 & c + 3a
\end{array}\right]
$$
$$
\xrightarrow{R_3 \to R_3 + R_2, \, R_2 \to \frac{1}{3} R_2}
\left[\begin{array}{rrr|c}
1 & -2 & 5 & a \\
0 & 1 & -4 & \frac{b - 4a}{3} \\
0 & 0 & 0 & -a + b + c
\end{array}\right]
$$
The system is consistent if and only if:
$$
-a + b + c = 0 \iff a = b + c
$$

---

## 7. The Invertible Matrix Theorem (IMT)

For any square $n \times n$ matrix $A$, the following statements are logically equivalent (either all are true, or all are false):

1. $A$ is invertible ($A^{-1}$ exists).
2. The reduced row-echelon form of $A$ is the identity matrix: $\text{RREF}(A) = I_n$.
3. The homogeneous system $AX = 0$ has only the **trivial solution** ($X = 0$).
4. For every vector $B \in \mathbb{R}^n$, the system $AX = B$ has a **unique solution** ($X = A^{-1} B$).
5. The determinant of $A$ is non-zero: $\det(A) \ne 0$.
6. $A$ can be expressed as a product of elementary matrices.

---

## 8. Supplementary Course Insights & Reconciled Content

*(Integrated from LinearLab interactive lesson modules: `matrix-inverse.mdx`, `inverse-2x2.mdx`, `inverse-by-row-reduction.mdx`, `inverse-properties.mdx`, `invertibility-and-systems.mdx`)*

### Computational Complexity of Inversion vs. Elimination
While $X = A^{-1} B$ provides a clean theoretical closed-form solution, computing $A^{-1}$ explicitly requires approximately three times more arithmetic operations than solving $AX = B$ via Gaussian elimination with back-substitution. However, if $AX = B$ must be solved for many different vectors $B$ using the same matrix $A$, precomputing $A^{-1}$ is computationally advantageous.

---

## 9. Archival Source Reference & Verification Ledger

The 23 source image assets for this chapter are mapped as follows:

| Source File | Source ID | Page | Part | Local Asset Path | Coverage Anchor |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `1.4 Inverse of a matrix.pdf` (root) | `1_howvee-xm2zxP24DqQcQA1nZ8PqCKPg` | 1 | 1 | `../assets/04-matrix-inverses-1/page-001-part-001.webp` | [§ 1 Definition & Verification](#1-definition-of-invertibility) |
| `1.4 Inverse of a matrix.pdf` (root) | `1_howvee-xm2zxP24DqQcQA1nZ8PqCKPg` | 1 | 2 | `../assets/04-matrix-inverses-1/page-001-part-002.webp` | [§ 2 2x2 Inverses & Parameter Example](#2-inverting-2-times-2-matrices) |
| `1.4 Inverse of a matrix.pdf` (root) | `1_howvee-xm2zxP24DqQcQA1nZ8PqCKPg` | 1 | 3 | `../assets/04-matrix-inverses-1/page-001-part-003.webp` | [§ 3 Algebraic Rules & Problems 1-3](#3-algebraic-properties-of-the-matrix-inverse) |
| `1.4 Inverse of a matrix.pdf` (root) | `1_howvee-xm2zxP24DqQcQA1nZ8PqCKPg` | 1 | 4 | `../assets/04-matrix-inverses-1/page-001-part-004.webp` | [§ 3 Problem 4 & § 4 Algorithm](#problem-4-solving-a-linear-matrix-equation-for-a) |
| `1.4 Inverse of a matrix.pdf` (root) | `1_howvee-xm2zxP24DqQcQA1nZ8PqCKPg` | 1 | 5 | `../assets/04-matrix-inverses-1/page-001-part-005.webp` | [§ 4 3x3 Setup](#example-1-full-3-times-3-inversion) |
| `1.4 Inverse of a matrix.pdf` (root) | `1_howvee-xm2zxP24DqQcQA1nZ8PqCKPg` | 1 | 6 | `../assets/04-matrix-inverses-1/page-001-part-006.webp` | [§ 4 Example 2 Setup](#example-2-inverting-matrix-b) |
| `1.4 Inverse of a matrix.pdf` (root) | `1_howvee-xm2zxP24DqQcQA1nZ8PqCKPg` | 1 | 7 | `../assets/04-matrix-inverses-1/page-001-part-007.webp` | [§ 4 Example 3 Setup](#example-3-4-times-4-anti-diagonal-matrix) |
| `1.4 Inverse of a matrix.pdf` (root) | `1_howvee-xm2zxP24DqQcQA1nZ8PqCKPg` | 1 | 8 | `../assets/04-matrix-inverses-1/page-001-part-008.webp` | [§ 5 Application Example 1](#example-1-solving-a-3-times-3-system) |
| `1.4 Inverse of a matrix.pdf` (root) | `1_howvee-xm2zxP24DqQcQA1nZ8PqCKPg` | 1 | 9 | `../assets/04-matrix-inverses-1/page-001-part-009.webp` | [§ 5 Application Example 2](#example-2-general-parametric-right-hand-side) |
| `1.4 Inverse of a matrix.pdf` (root) | `1_howvee-xm2zxP24DqQcQA1nZ8PqCKPg` | 1 | 10 | `../assets/04-matrix-inverses-1/page-001-part-010.webp` | [§ 6 Singular Systems](#6-systems-with-singular-coefficient-matrices-consistency-conditions) |
| `1.4 Inverse of a matrix.pdf` (root) | `1_howvee-xm2zxP24DqQcQA1nZ8PqCKPg` | 1 | 11 | `../assets/04-matrix-inverses-1/page-001-part-011.webp` | [§ 7 Invertible Matrix Theorem](#7-the-invertible-matrix-theorem-imt) |
| `1.4 Inverses.pdf` (Test1) | `1n8MA2sIJjHe4U7uPpcxuJYxQ3Qzt4uY4` | 1 | 1 | `../assets/04-matrix-inverses-2/page-001-part-001.webp` | [§ 1 Definitions & Invertibility](#1-definition-of-invertibility) |
| `1.4 Inverses.pdf` (Test1) | `1n8MA2sIJjHe4U7uPpcxuJYxQ3Qzt4uY4` | 1 | 2 | `../assets/04-matrix-inverses-2/page-001-part-002.webp` | [§ 2 2x2 Formulas](#2-inverting-2-times-2-matrices) |
| `1.4 Inverses.pdf` (Test1) | `1n8MA2sIJjHe4U7uPpcxuJYxQ3Qzt4uY4` | 1 | 3 | `../assets/04-matrix-inverses-2/page-001-part-003.webp` | [§ 3 Rules & Calculations](#3-algebraic-properties-of-the-matrix-inverse) |
| `1.4 Inverses.pdf` (Test1) | `1n8MA2sIJjHe4U7uPpcxuJYxQ3Qzt4uY4` | 1 | 4 | `../assets/04-matrix-inverses-2/page-001-part-004.webp` | [§ 3 Problem 4 & Polynomial Setup](#matrix-polynomial-theorem) |
| `1.4 Inverses.pdf` (Test1) | `1n8MA2sIJjHe4U7uPpcxuJYxQ3Qzt4uY4` | 1 | 5 | `../assets/04-matrix-inverses-2/page-001-part-005.webp` | [§ 3 Polynomial & Zero Divisors Theorem](#theorem-on-zero-divisors-and-invertibility) |
| `1.4 Inverses.pdf` (Test1) | `1n8MA2sIJjHe4U7uPpcxuJYxQ3Qzt4uY4` | 1 | 6 | `../assets/04-matrix-inverses-2/page-001-part-006.webp` | [§ 4 Example 1 Full Inversion Steps](#example-1-full-3-times-3-inversion) |
| `1.4 Inverses.pdf` (Test1) | `1n8MA2sIJjHe4U7uPpcxuJYxQ3Qzt4uY4` | 1 | 7 | `../assets/04-matrix-inverses-2/page-001-part-007.webp` | [§ 4 Example 2 Full Inversion Steps](#example-2-inverting-matrix-b) |
| `1.4 Inverses.pdf` (Test1) | `1n8MA2sIJjHe4U7uPpcxuJYxQ3Qzt4uY4` | 1 | 8 | `../assets/04-matrix-inverses-2/page-001-part-008.webp` | [§ 4 Example 3 Anti-Diagonal Solution](#example-3-4-times-4-anti-diagonal-matrix) |
| `1.4 Inverses.pdf` (Test1) | `1n8MA2sIJjHe4U7uPpcxuJYxQ3Qzt4uY4` | 1 | 9 | `../assets/04-matrix-inverses-2/page-001-part-009.webp` | [§ 5 Application Example 1](#example-1-solving-a-3-times-3-system) |
| `1.4 Inverses.pdf` (Test1) | `1n8MA2sIJjHe4U7uPpcxuJYxQ3Qzt4uY4` | 1 | 10 | `../assets/04-matrix-inverses-2/page-001-part-010.webp` | [§ 5 Application Example 2](#example-2-general-parametric-right-hand-side) |
| `1.4 Inverses.pdf` (Test1) | `1n8MA2sIJjHe4U7uPpcxuJYxQ3Qzt4uY4` | 1 | 11 | `../assets/04-matrix-inverses-2/page-001-part-011.webp` | [§ 6 Problem 1 & Problem 2 Setup](#problem-1) |
| `1.4 Inverses.pdf` (Test1) | `1n8MA2sIJjHe4U7uPpcxuJYxQ3Qzt4uY4` | 1 | 12 | `../assets/04-matrix-inverses-2/page-001-part-012.webp` | [§ 6 Problem 2 End & § 7 IMT](#problem-2) |
