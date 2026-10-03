---
id: "10-eigenvalues-diagonalization"
title: "5.1–5.2 — Eigenvalues and Diagonalization"
course: "MATHS211"
type: "chapter-section"
order: 10
language: "en"
source_ids: ["11y0deP9fUofIIYDw9GbobCZPv2ckjRxV", "15iHTaVGvWABf1r23uC7XQwIbdOuVjxt2"]
source_page_count: 2
content_format: "complete_transcription"
source_coverage: "all pages of every listed source version"
transcribed_source_id: "11y0deP9fUofIIYDw9GbobCZPv2ckjRxV, 15iHTaVGvWABf1r23uC7XQwIbdOuVjxt2"
transcribed_source_parts: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
---

# 5.1–5.2 — Eigenvalues and Diagonalization

This document provides the complete, rigorous mathematical transcription of Chapter 5.1–5.2, covering **eigenvalues**, **eigenvectors**, the **characteristic polynomial**, **eigenspaces**, conditions for **diagonalizability** ($P^{-1}AP = D$), and the application of diagonalization to compute powers of matrices $A^n$.

---

## 1. Eigenvalues and Eigenvectors

### Definition
Let $A$ be a square matrix of size $n \times n$, and let $\lambda \in \mathbb{R}$. We say that $\lambda$ is an **eigenvalue** of $A$ if there exists a **non-zero vector** $X \in \mathbb{R}^n$ ($X \ne 0$) such that:

$$
\boxed{AX = \lambda X}
$$

The non-zero vector $X$ is called an **eigenvector** corresponding to the eigenvalue $\lambda$.

---

### Example
Let $A = \begin{bmatrix} 3 & 0 \\ 8 & -1 \end{bmatrix}$, $\lambda = 3$, and $X = \begin{bmatrix} 1 \\ 2 \end{bmatrix}$.
Multiplying $A$ by $X$:
$$
AX = \begin{bmatrix} 3 & 0 \\ 8 & -1 \end{bmatrix} \begin{bmatrix} 1 \\ 2 \end{bmatrix} = \begin{bmatrix} 3(1) + 0(2) \\ 8(1) - 1(2) \end{bmatrix} = \begin{bmatrix} 3 \\ 6 \end{bmatrix} = 3 \begin{bmatrix} 1 \\ 2 \end{bmatrix} = 3X.
$$
Since $AX = 3X$ and $X \ne 0$, $\lambda = 3$ is an eigenvalue of $A$, and $X = \begin{bmatrix} 1 \\ 2 \end{bmatrix}$ is an eigenvector corresponding to $\lambda = 3$.

---

### How to Determine All Eigenvalues of a Matrix $A$

To find the eigenvalues $\lambda$, consider the defining equation:
$$
AX = \lambda X \iff \lambda X - AX = 0 \iff (\lambda I_n - A) X = 0.
$$
This is a homogeneous linear system in $X$. Recall the Invertible Matrix Theorem:
$$
\begin{matrix}
M \text{ invertible} & \iff & MX = 0 \text{ has only the trivial solution } X = 0 & \iff & \det(M) \ne 0 \\
M \text{ not invertible} & \iff & MX = 0 \text{ has non-trivial solutions } X \ne 0 & \iff & \det(M) = 0
\end{matrix}
$$
Therefore:
$$
\lambda \text{ is an eigenvalue of } A \iff \text{there exists } X \ne 0 \text{ such that } (\lambda I_n - A)X = 0 \iff \boxed{\det(\lambda I_n - A) = 0}
$$

---

### The Characteristic Polynomial
The determinant:
$$
P_A(\lambda) = \det(\lambda I_n - A)
$$
is a polynomial in $\lambda$ of degree $n$, called the **characteristic polynomial** of $A$.
- The equation $\det(\lambda I_n - A) = 0$ is the **characteristic equation** of $A$.
- The real roots of $P_A(\lambda) = 0$ are precisely the **eigenvalues** of $A$.
- Since $\deg(P_A) = n$, an $n \times n$ matrix has at most $n$ distinct eigenvalues.

---

### Eigenspaces
Let $\lambda$ be a fixed eigenvalue of $A$. The set of all eigenvectors corresponding to $\lambda$, together with the zero vector $0$, is called the **eigenspace** corresponding to $\lambda$, denoted $E_\lambda$:
$$
\boxed{E_\lambda = N(\lambda I_n - A) = \{ X \in \mathbb{R}^n : (\lambda I_n - A) X = 0 \}}
$$
Since $E_\lambda$ is the null space of the matrix $(\lambda I_n - A)$, **$E_\lambda$ is a subspace of $\mathbb{R}^n$**.

---

### Complete Worked Example 1 ($2 \times 2$)
Find the eigenvalues and a basis of each eigenspace for $A = \begin{bmatrix} 3 & 0 \\ 8 & -1 \end{bmatrix}$.

**1. Finding Eigenvalues:**
$$
\lambda I - A = \lambda \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix} - \begin{bmatrix} 3 & 0 \\ 8 & -1 \end{bmatrix} = \begin{bmatrix} \lambda - 3 & 0 \\ -8 & \lambda + 1 \end{bmatrix}.
$$
The characteristic polynomial is:
$$
P_A(\lambda) = \det(\lambda I - A) = \begin{vmatrix} \lambda - 3 & 0 \\ -8 & \lambda + 1 \end{vmatrix} = (\lambda - 3)(\lambda + 1).
$$
Setting $P_A(\lambda) = 0 \implies \lambda = 3$ or $\lambda = -1$.
The eigenvalues are $\lambda_1 = 3$ and $\lambda_2 = -1$.

**2. Finding Eigenspace $E_3$ (for $\lambda = 3$):**
$$
3I - A = \begin{bmatrix} 3 - 3 & 0 \\ -8 & 3 + 1 \end{bmatrix} = \begin{bmatrix} 0 & 0 \\ -8 & 4 \end{bmatrix} \sim \begin{bmatrix} \mathbf{1} & -1/2 \\ 0 & 0 \end{bmatrix}.
$$
Solving $(3I - A) X = 0$:
$$
\begin{bmatrix} 1 & -1/2 \\ 0 & 0 \end{bmatrix} \begin{bmatrix} x \\ y \end{bmatrix} = \begin{bmatrix} 0 \\ 0 \end{bmatrix} \implies x - \frac{1}{2}y = 0 \implies x = \frac{1}{2}y.
$$
$y$ is free; let $y = r \in \mathbb{R}$:
$$
E_3 = \left\{ \left( \frac{1}{2}r, r \right) : r \in \mathbb{R} \right\} = \operatorname{span}\left\{ \left( \frac{1}{2}, 1 \right) \right\} = \operatorname{span}\{(1, 2)\}.
$$
Basis of $E_3$: $\{(1, 2)\}$ (or $\{(1/2, 1)\}$), and $\dim(E_3) = 1$.

**3. Finding Eigenspace $E_{-1}$ (for $\lambda = -1$):**
$$
-I - A = \begin{bmatrix} -1 - 3 & 0 \\ -8 & -1 + 1 \end{bmatrix} = \begin{bmatrix} -4 & 0 \\ -8 & 0 \end{bmatrix} \sim \begin{bmatrix} \mathbf{1} & 0 \\ 0 & 0 \end{bmatrix}.
$$
Solving $(-I - A) X = 0$:
$$
x = 0, \quad y = s \text{ (free)}.
$$
$$
E_{-1} = \{ (0, s) : s \in \mathbb{R} \} = \operatorname{span}\{(0, 1)\}.
$$
Basis of $E_{-1}$: $\{(0, 1)\}$, and $\dim(E_{-1}) = 1$.

---

### Complete Worked Example 2 ($3 \times 3$)
Let $A = \begin{bmatrix} 0 & 0 & -2 \\ 1 & 2 & 1 \\ 1 & 0 & 3 \end{bmatrix}$.
1. Find the eigenvalues of $A$.
2. Find a basis for each eigenspace.

**1. Finding Eigenvalues:**
$$
\lambda I - A = \begin{bmatrix} \lambda & 0 & 2 \\ -1 & \lambda - 2 & -1 \\ -1 & 0 & \lambda - 3 \end{bmatrix}.
$$
Expanding along the second column (which contains two zeros):
$$
\begin{aligned}
P_A(\lambda) &= (\lambda - 2) \begin{vmatrix} \lambda & 2 \\ -1 & \lambda - 3 \end{vmatrix} \\
&= (\lambda - 2) \left[ \lambda(\lambda - 3) - (2)(-1) \right] \\
&= (\lambda - 2) (\lambda^2 - 3\lambda + 2) \\
&= (\lambda - 2) (\lambda - 1)(\lambda - 2) \\
&= (\lambda - 1)(\lambda - 2)^2.
\end{aligned}
$$
Setting $P_A(\lambda) = 0$ yields eigenvalues:
$$
\lambda_1 = 1 \quad (\text{algebraic multiplicity } 1), \qquad \lambda_2 = 2 \quad (\text{algebraic multiplicity } 2).
$$

**2. Eigenspace $E_1$ (for $\lambda = 1$):**
$$
I - A = \begin{bmatrix} 1 & 0 & 2 \\ -1 & -1 & -1 \\ -1 & 0 & -2 \end{bmatrix} \sim \begin{bmatrix} \mathbf{1} & 0 & 2 \\ 0 & -1 & 1 \\ 0 & 0 & 0 \end{bmatrix} \sim \begin{bmatrix} \mathbf{1} & 0 & 2 \\ 0 & \mathbf{1} & -1 \\ 0 & 0 & 0 \end{bmatrix}.
$$
Solving $(I - A)X = 0$:
$$
\begin{cases} x + 2z = 0 \implies x = -2z \\ y - z = 0 \implies y = z \end{cases}
$$
$z$ is free; let $z = r$:
$$
E_1 = \{ (-2r, r, r) : r \in \mathbb{R} \} = \operatorname{span}\{(-2, 1, 1)\}.
$$
Basis of $E_1$: $\{(-2, 1, 1)\}$, with $\dim(E_1) = 1$.

**3. Eigenspace $E_2$ (for $\lambda = 2$):**
$$
2I - A = \begin{bmatrix} 2 & 0 & 2 \\ -1 & 0 & -1 \\ -1 & 0 & -1 \end{bmatrix} \sim \begin{bmatrix} \mathbf{1} & 0 & 1 \\ 0 & 0 & 0 \\ 0 & 0 & 0 \end{bmatrix}.
$$
Solving $(2I - A)X = 0$:
$$
x + z = 0 \implies x = -z.
$$
$y$ and $z$ are both free variables! Let $y = s, z = t$ ($s, t \in \mathbb{R}$):
$$
E_2 = \{ (-t, s, t) : s, t \in \mathbb{R} \} = \{ s(0, 1, 0) + t(-1, 0, 1) : s, t \in \mathbb{R} \} = \operatorname{span}\{(0, 1, 0), (-1, 0, 1)\}.
$$
Since $(0, 1, 0)$ and $(-1, 0, 1)$ are linearly independent:
$$
\text{Basis of } E_2 = \{(0, 1, 0), (-1, 0, 1)\}, \quad \text{and} \quad \dim(E_2) = \operatorname{nullity}(2I - A) = 2.
$$

---

## 2. Important Properties and Observations

### 1) Eigenvalues of a Triangular Matrix
Let $A$ be a lower triangular (or upper triangular, or diagonal) matrix:
$$
A = \begin{bmatrix}
a_{11} & 0 & \cdots & 0 \\
a_{21} & a_{22} & \cdots & 0 \\
\vdots & \vdots & \ddots & \vdots \\
a_{n1} & a_{n2} & \cdots & a_{nn}
\end{bmatrix}.
$$
Then $\lambda I_n - A$ is also triangular, and its determinant is the product of its diagonal entries:
$$
P_A(\lambda) = (\lambda - a_{11})(\lambda - a_{22})\cdots(\lambda - a_{nn}).
$$
> **Theorem:** The eigenvalues of a triangular matrix are its **main diagonal entries**: $a_{11}, a_{22}, \dots, a_{nn}$.

**Example:**
$$
A = \begin{bmatrix} 1 & 0 & 0 \\ 2 & -2 & 0 \\ 3 & 1 & 4 \end{bmatrix} \implies \text{Eigenvalues are } \lambda = 1, -2, 4.
$$

---

### 2) Eigenvalues of Matrix Powers
Let $\lambda$ be an eigenvalue of $A$ with corresponding eigenvector $X \ne 0$:
$$
\begin{aligned}
A^2 X &= A(AX) = A(\lambda X) = \lambda(AX) = \lambda(\lambda X) = \lambda^2 X \implies \lambda^2 \text{ is an eigenvalue of } A^2. \\
A^3 X &= A(A^2 X) = A(\lambda^2 X) = \lambda^2(AX) = \lambda^3 X \implies \lambda^3 \text{ is an eigenvalue of } A^3.
\end{aligned}
$$
> **General Theorem:** If $\lambda$ is an eigenvalue of $A$, then $\lambda^k$ is an eigenvalue of $A^k$ for any integer $k \ge 1$ (with the same eigenvector $X$).

**Examples:**
- If $A = \begin{bmatrix} 3 & 0 \\ 8 & -1 \end{bmatrix}$ has eigenvalues $3, -1$, then $A^k$ has eigenvalues $3^k, (-1)^k$.
- If $A = \begin{bmatrix} 0 & 0 & -2 \\ 1 & 2 & 1 \\ 1 & 0 & 3 \end{bmatrix}$ has eigenvalues $1, 2$, then $A^k$ has eigenvalues $1^k = 1$ and $2^k$.

---

### 3) Determinant, Invertibility, and Eigenvalues
Let $P_A(\lambda) = \det(\lambda I_n - A) = \lambda^n + c_1 \lambda^{n-1} + \dots + c_{n-1}\lambda + c_n$.
Evaluating at $\lambda = 0$:
$$
P_A(0) = \det(-A) = (-1)^n \det(A) = c_n.
$$
Therefore:
$$
\boxed{\det(A) = (-1)^n c_n = (-1)^n P_A(0) = \prod_{i=1}^n \lambda_i}
$$
The determinant of $A$ is equal to the product of all its eigenvalues.

**Invertibility Criterion:**
$$
A \text{ is not invertible} \iff \det(A) = 0 \iff P_A(0) = 0 \iff 0 \text{ is an eigenvalue of } A.
$$
> **Theorem:** $\boxed{A \text{ is invertible} \iff 0 \text{ is not an eigenvalue of } A.}$

**Example:**
Suppose $A$ is a square matrix with characteristic polynomial:
$$
P_A(\lambda) = (\lambda - 2)^3 (\lambda + 2) (\lambda - 1)^2.
$$
1. **Size of $A$:** Degree of $P_A$ is $3 + 1 + 2 = 6$, so $A$ is of size $6 \times 6$.
2. **Eigenvalues:** $\lambda = 2$ (mult 3), $\lambda = -2$ (mult 1), $\lambda = 1$ (mult 2).
3. **Determinant of $A$:**
   $$
   \det(A) = (-1)^6 P_A(0) = 1 \cdot (0 - 2)^3 (0 + 2) (0 - 1)^2 = (-8)(2)(1) = -16.
   $$
4. **Invertibility:** Since $\det(A) = -16 \ne 0$ (and $0$ is not an eigenvalue), $A$ is invertible.

---

## 3. Diagonalization

### Definition
Let $A$ be a square matrix of size $n \times n$. We say that $A$ is **diagonalizable** if there exists an invertible matrix $P$ of size $n \times n$ and a diagonal matrix $D$ such that:

$$
\boxed{P^{-1} A P = D \iff A = P D P^{-1}}
$$

where $D = \operatorname{diag}(\lambda_1, \lambda_2, \dots, \lambda_n)$ contains the eigenvalues along its main diagonal, and the columns of $P = \begin{bmatrix} v_1 & v_2 & \cdots & v_n \end{bmatrix}$ are the corresponding linearly independent eigenvectors.

---

### Special Case: $n$ Distinct Eigenvalues
> **Theorem:** If an $n \times n$ matrix $A$ has **$n$ distinct real eigenvalues**, then $A$ is diagonalizable.

#### Example: Diagonalizing a $3 \times 3$ Matrix with Distinct Eigenvalues
Let $A = \begin{bmatrix} 1 & -1 & 0 \\ -1 & 1 & 2 \\ 1 & 1 & -1 \end{bmatrix}$.

**a) Find the eigenvalues:**
$$
\lambda I - A = \begin{bmatrix} \lambda - 1 & 1 & 0 \\ 1 & \lambda - 1 & -2 \\ -1 & -1 & \lambda + 1 \end{bmatrix}.
$$
Expanding along the first row:
$$
\begin{aligned}
P_A(\lambda) &= (\lambda - 1) \begin{vmatrix} \lambda - 1 & -2 \\ -1 & \lambda + 1 \end{vmatrix} - 1 \begin{vmatrix} 1 & -2 \\ -1 & \lambda + 1 \end{vmatrix} \\
&= (\lambda - 1) [(\lambda^2 - 1) - 2] - [(\lambda + 1) - 2] \\
&= (\lambda - 1)(\lambda^2 - 3) - (\lambda - 1) \\
&= (\lambda - 1) [(\lambda^2 - 3) - 1] = (\lambda - 1)(\lambda^2 - 4) \\
&= (\lambda - 1)(\lambda - 2)(\lambda + 2).
\end{aligned}
$$
Eigenvalues are $\lambda_1 = 1, \lambda_2 = 2, \lambda_3 = -2$.

**b) Is $A$ diagonalizable?**
$A$ is a $3 \times 3$ matrix with $3$ distinct real eigenvalues. Therefore, $A$ is diagonalizable.

**c) Find a basis of each eigenspace:**
- **For $\lambda = 1$:**
  $$
  I - A = \begin{bmatrix} 0 & 1 & 0 \\ 1 & 0 & -2 \\ -1 & -1 & 2 \end{bmatrix} \sim \begin{bmatrix} \mathbf{1} & 0 & -2 \\ 0 & \mathbf{1} & 0 \\ 0 & 0 & 0 \end{bmatrix} \implies \begin{cases} x = 2z \\ y = 0 \end{cases} \implies \text{Basis } = \{(2, 0, 1)\}.
  $$
- **For $\lambda = 2$:**
  $$
  2I - A = \begin{bmatrix} 1 & 1 & 0 \\ 1 & 1 & -2 \\ -1 & -1 & 3 \end{bmatrix} \sim \begin{bmatrix} \mathbf{1} & 1 & 0 \\ 0 & 0 & \mathbf{1} \\ 0 & 0 & 0 \end{bmatrix} \implies \begin{cases} x + y = 0 \implies x = -y \\ z = 0 \end{cases} \implies \text{Basis } = \{(-1, 1, 0)\}.
  $$
- **For $\lambda = -2$:**
  $$
  -2I - A = \begin{bmatrix} -3 & 1 & 0 \\ 1 & -3 & -2 \\ -1 & -1 & -1 \end{bmatrix} \sim \begin{bmatrix} \mathbf{1} & 0 & 1/4 \\ 0 & \mathbf{1} & 3/4 \\ 0 & 0 & 0 \end{bmatrix} \implies \begin{cases} x = -\frac{1}{4}z \\ y = -\frac{3}{4}z \end{cases}
  $$
  Taking $z = 4 \implies \text{Basis } = \{(-1, -3, 4)\}$ (or with $z = 1$, $\{(-1/4, 3/4, 1)\}$).

**d) Form $P$ and $D$:**
Arranging the eigenvectors as columns:
$$
P = \begin{bmatrix} 2 & -1 & -1/4 \\ 0 & 1 & 3/4 \\ 1 & 0 & 1 \end{bmatrix}, \qquad D = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 2 & 0 \\ 0 & 0 & -2 \end{bmatrix}.
$$
Then $P$ is invertible and $P^{-1}AP = D$.
*(Note: If the columns of $P$ are permuted, the diagonal entries of $D$ must be permuted in the exact same order).*

---

### General Case: Algebraic vs Geometric Multiplicity

For an eigenvalue $\lambda$:
1. The **algebraic multiplicity** of $\lambda$ is the multiplicity of $\lambda$ as a root of the characteristic polynomial $P_A(\lambda)$.
2. The **geometric multiplicity** of $\lambda$ is the dimension of its eigenspace, $\dim(E_\lambda) = \operatorname{nullity}(\lambda I_n - A)$.

> **Fundamental Inequality:**
> $$
> \boxed{1 \le \dim(E_\lambda) \le \text{algebraic multiplicity of } \lambda}
> $$

In particular, if an eigenvalue has algebraic multiplicity $1$, its geometric multiplicity is guaranteed to be $1$:
$$
\text{alg. mult} = 1 \implies \dim(E_\lambda) = 1.
$$

---

### The Fundamental Diagonalization Theorem
> **Theorem:** An $n \times n$ matrix $A$ is diagonalizable if and only if:
> 1. The characteristic polynomial $P_A(\lambda)$ factors completely into real linear factors (i.e. has $n$ eigenvalues counting algebraic multiplicity).
> 2. For every eigenvalue $\lambda$, its geometric multiplicity equals its algebraic multiplicity:
>    $$
>    \boxed{\dim(E_\lambda) = \text{algebraic multiplicity of } \lambda}
>    $$

---

### Complete Worked Example: Repeated Eigenvalues & Matrix Powers $A^n$
Let $A = \begin{bmatrix} 1 & 0 & 2 \\ 0 & -1 & 0 \\ 2 & 0 & 1 \end{bmatrix}$.

#### a) Find the Eigenvalues
$$
\lambda I - A = \begin{bmatrix} \lambda - 1 & 0 & -2 \\ 0 & \lambda + 1 & 0 \\ -2 & 0 & \lambda - 1 \end{bmatrix}.
$$
Expanding along the second row or column:
$$
\begin{aligned}
P_A(\lambda) &= (\lambda + 1) \begin{vmatrix} \lambda - 1 & -2 \\ -2 & \lambda - 1 \end{vmatrix} \\
&= (\lambda + 1) [(\lambda - 1)^2 - 4] \\
&= (\lambda + 1) (\lambda - 1 - 2)(\lambda - 1 + 2) \\
&= (\lambda + 1)(\lambda - 3)(\lambda + 1) \\
&= (\lambda + 1)^2 (\lambda - 3).
\end{aligned}
$$
Eigenvalues:
- $\lambda_1 = 3$ (algebraic multiplicity $1$).
- $\lambda_2 = -1$ (algebraic multiplicity $2$).

#### b) Find a Basis for Each Eigenspace
- **For $\lambda = 3$:**
  $$
  3I - A = \begin{bmatrix} 2 & 0 & -2 \\ 0 & 4 & 0 \\ -2 & 0 & 2 \end{bmatrix} \sim \begin{bmatrix} \mathbf{1} & 0 & -1 \\ 0 & \mathbf{1} & 0 \\ 0 & 0 & 0 \end{bmatrix} \implies \begin{cases} x = z \\ y = 0 \end{cases}
  $$
  $$
  E_3 = \{ (r, 0, r) : r \in \mathbb{R} \} = \operatorname{span}\{(1, 0, 1)\}. \quad \dim(E_3) = 1.
  $$

- **For $\lambda = -1$:**
  $$
  -I - A = \begin{bmatrix} -2 & 0 & -2 \\ 0 & 0 & 0 \\ -2 & 0 & -2 \end{bmatrix} \sim \begin{bmatrix} \mathbf{1} & 0 & 1 \\ 0 & 0 & 0 \\ 0 & 0 & 0 \end{bmatrix}.
  $$
  System: $x + z = 0 \implies x = -z$.
  Variables $y = s$ and $z = t$ are both free:
  $$
  E_{-1} = \{ (-t, s, t) : s, t \in \mathbb{R} \} = \operatorname{span}\{(0, 1, 0), (-1, 0, 1)\}.
  $$
  $$
  \dim(E_{-1}) = \operatorname{nullity}(-I - A) = 2.
  $$

#### c) Is $A$ Diagonalizable?
- $\lambda = 3$: $\dim(E_3) = 1 = \text{algebraic multiplicity}$.
- $\lambda = -1$: $\dim(E_{-1}) = 2 = \text{algebraic multiplicity}$.
- Total number of linearly independent eigenvectors $= 1 + 2 = 3 = n$.
Therefore, **$A$ is diagonalizable**.

#### d) Find $P$ that Diagonalizes $A$
Place the basis vectors as columns of $P$:
$$
P = \begin{bmatrix} 1 & 0 & -1 \\ 0 & 1 & 0 \\ 1 & 0 & 1 \end{bmatrix}, \qquad D = \begin{bmatrix} 3 & 0 & 0 \\ 0 & -1 & 0 \\ 0 & 0 & -1 \end{bmatrix}.
$$
$P$ is invertible and $P^{-1} A P = D$.

---

#### e) Application: Computing $A^n$
From $P^{-1} A P = D$, multiply by $P$ on the left and $P^{-1}$ on the right:
$$
A = P D P^{-1}.
$$
Taking powers:
$$
A^2 = (P D P^{-1})(P D P^{-1}) = P D (P^{-1} P) D P^{-1} = P D^2 P^{-1}.
$$
By induction, for any positive integer $n$:
$$
\boxed{A^n = P D^n P^{-1}}
$$

**1. Compute $D^n$:**
$$
D^n = \begin{bmatrix} 3^n & 0 & 0 \\ 0 & (-1)^n & 0 \\ 0 & 0 & (-1)^n \end{bmatrix}.
$$

**2. Invert $P$ using Gauss-Jordan elimination on $[P \mid I_3]$:**
$$
\left[\begin{array}{ccc|ccc}
1 & 0 & -1 & 1 & 0 & 0 \\
0 & 1 & 0 & 0 & 1 & 0 \\
1 & 0 & 1 & 0 & 0 & 1
\end{array}\right]
\sim
\left[\begin{array}{ccc|ccc}
1 & 0 & -1 & 1 & 0 & 0 \\
0 & 1 & 0 & 0 & 1 & 0 \\
0 & 0 & 2 & -1 & 0 & 1
\end{array}\right]
\sim
\left[\begin{array}{ccc|ccc}
1 & 0 & 0 & 1/2 & 0 & 1/2 \\
0 & 1 & 0 & 0 & 1 & 0 \\
0 & 0 & 1 & -1/2 & 0 & 1/2
\end{array}\right].
$$
Thus:
$$
P^{-1} = \begin{bmatrix}
1/2 & 0 & 1/2 \\
0 & 1 & 0 \\
-1/2 & 0 & 1/2
\end{bmatrix}.
$$

**3. Compute $P D^n$:**
$$
P D^n = \begin{bmatrix} 1 & 0 & -1 \\ 0 & 1 & 0 \\ 1 & 0 & 1 \end{bmatrix} \begin{bmatrix} 3^n & 0 & 0 \\ 0 & (-1)^n & 0 \\ 0 & 0 & (-1)^n \end{bmatrix} = \begin{bmatrix} 3^n & 0 & -(-1)^n \\ 0 & (-1)^n & 0 \\ 3^n & 0 & (-1)^n \end{bmatrix}.
$$

**4. Compute $A^n = (P D^n) P^{-1}$:**
$$
A^n = \begin{bmatrix}
3^n & 0 & -(-1)^n \\
0 & (-1)^n & 0 \\
3^n & 0 & (-1)^n
\end{bmatrix}
\begin{bmatrix}
1/2 & 0 & 1/2 \\
0 & 1 & 0 \\
-1/2 & 0 & 1/2
\end{bmatrix}
=
\begin{bmatrix}
\frac{3^n + (-1)^n}{2} & 0 & \frac{3^n - (-1)^n}{2} \\
0 & (-1)^n & 0 \\
\frac{3^n - (-1)^n}{2} & 0 & \frac{3^n + (-1)^n}{2}
\end{bmatrix}.
$$

**Verification for $n = 1$:**
$$
A^1 = \begin{bmatrix}
\frac{3 - 1}{2} & 0 & \frac{3 - (-1)}{2} \\
0 & -1 & 0 \\
\frac{3 - (-1)}{2} & 0 & \frac{3 - 1}{2}
\end{bmatrix}
=
\begin{bmatrix}
1 & 0 & 2 \\
0 & -1 & 0 \\
2 & 0 & 1
\end{bmatrix} = A. \quad \checkmark
$$

---

## 4. Source Verification Appendix

The complete scanned source material for this chapter is preserved in the local assets directory:
- **Version 1 (Instructor template):** `assets/10-eigenvalues-diagonalization-1/page-001-part-001.webp` through `page-001-part-007.webp`
- **Version 2 (Master handwritten solutions):** `assets/10-eigenvalues-diagonalization-2/page-001-part-001.webp` through `page-001-part-015.webp`
