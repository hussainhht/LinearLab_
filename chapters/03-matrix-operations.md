---
id: "03-matrix-operations"
title: "1.3 — Matrix operations"
course: "MATHS211"
type: "chapter-section"
order: 3
language: "en"
source_ids: ["1shHnNllATjHF2PwBuQfxxA3ishTX7fUx", "1Qsu838mD66GnI6SnX7Oi_7sGg9TuWFeZ"]
source_page_count: 2
content_format: "complete_transcription_with_archival_references"
source_coverage: "all pages of every listed source version"
editable_transcription: "complete transcription of all source versions, matrix types, algebraic rules, worked exercises, diagrams, and reconciled website content"
transcribed_source_ids: ["1shHnNllATjHF2PwBuQfxxA3ishTX7fUx", "1Qsu838mD66GnI6SnX7Oi_7sGg9TuWFeZ"]
---

# 1.3 — Matrix Operations

## 1. Matrix Definitions and Special Types

A matrix $A$ of size $n \times p$ is a rectangular array having $n$ rows and $p$ columns, containing $n \cdot p$ elements called **entries**:

$$
A = \begin{bmatrix}
a_{11} & a_{12} & \cdots & a_{1p} \\
a_{21} & a_{22} & \cdots & a_{2p} \\
\vdots & \vdots & \ddots & \vdots \\
a_{n1} & a_{n2} & \cdots & a_{np}
\end{bmatrix}
\quad \text{or briefly} \quad
A = [a_{ij}]_{\substack{1 \le i \le n \\ 1 \le j \le p}}
$$

where $a_{ij}$ denotes the entry in row $i$ and column $j$.

### Examples:
- $A = \begin{bmatrix} 1 & 2 & 3 & 4 \\ -1 & 1 & 0 & 1 \end{bmatrix}$ has size $2 \times 4$.
- $B = \begin{bmatrix} 2 & 0 & 1 \\ 1 & 1 & 1 \\ 1 & 3 & -1 \end{bmatrix}$ has size $3 \times 3$.
- $C = \begin{bmatrix} 1 & 1 \\ -1 & 0 \\ 2 & 0 \end{bmatrix}$ has size $3 \times 2$.

---

### Classification of Special Matrix Types

1. **Rectangular Matrix ($n \ne p$):** The number of rows does not equal the number of columns.
   - **Row Matrix (Row Vector):** Size $1 \times p$ ($p \ne 1$):
     $$\begin{bmatrix} a_{11} & a_{12} & \cdots & a_{1p} \end{bmatrix}$$
   - **Column Matrix (Column Vector):** Size $n \times 1$ ($n \ne 1$):
     $$\begin{bmatrix} a_{11} \\ a_{21} \\ \vdots \\ a_{n1} \end{bmatrix}$$

2. **Square Matrix ($n = p$):** The number of rows equals the number of columns.
   - **The Identity Matrix ($I_n$):** A square matrix with $1$ on the main diagonal and $0$ elsewhere:
     $$I_1 = [1], \quad I_2 = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}, \quad I_3 = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix}, \quad \dots$$
   - **Diagonal Matrix ($D$):** All entries off the main diagonal are zero ($a_{ij} = 0$ for all $i \ne j$):
     $$D = \begin{bmatrix} a_{11} & 0 & \cdots & 0 \\ 0 & a_{22} & \cdots & 0 \\ \vdots & \vdots & \ddots & \vdots \\ 0 & 0 & \cdots & a_{nn} \end{bmatrix}$$
     *Note:* The identity matrix is a special case of a diagonal matrix.
   - **Upper Triangular Matrix:** All entries below the main diagonal are zero ($a_{ij} = 0$ for $i > j$):
     $$A = \begin{bmatrix} a_{11} & a_{12} & \cdots & a_{1n} \\ 0 & a_{22} & \cdots & a_{2n} \\ \vdots & \vdots & \ddots & \vdots \\ 0 & 0 & \cdots & a_{nn} \end{bmatrix}$$
   - **Lower Triangular Matrix:** All entries above the main diagonal are zero ($a_{ij} = 0$ for $i < j$):
     $$A = \begin{bmatrix} a_{11} & 0 & \cdots & 0 \\ a_{21} & a_{22} & \cdots & 0 \\ \vdots & \vdots & \ddots & \vdots \\ a_{n1} & a_{n2} & \cdots & a_{nn} \end{bmatrix}$$

3. **Zero Matrix ($O_{n \times p}$):** A matrix of any size in which every single entry is zero.
   $$O_{1 \times 2} = \begin{bmatrix} 0 & 0 \end{bmatrix}, \quad O_{3 \times 2} = \begin{bmatrix} 0 & 0 \\ 0 & 0 \\ 0 & 0 \end{bmatrix}, \quad O_{3 \times 3} = \begin{bmatrix} 0 & 0 & 0 \\ 0 & 0 & 0 \\ 0 & 0 & 0 \end{bmatrix}$$

---

### Classification Drill from Lecture Notes:

| Matrix | Dimensions | Classification |
| :--- | :--- | :--- |
| $A = [2]$ | $1 \times 1$ | Square, Diagonal, Upper/Lower Triangular, Symmetric |
| $B = \begin{bmatrix} 1 & 2 \\ 0 & 3 \end{bmatrix}$ | $2 \times 2$ | Square, Upper Triangular |
| $C = \begin{bmatrix} 1 & 2 & 3 \\ 0 & 1 & 0 \end{bmatrix}$ | $2 \times 3$ | Rectangular |
| $D = \begin{bmatrix} 1 \\ 2 \\ 0 \end{bmatrix}$ | $3 \times 1$ | Rectangular, Column Matrix |
| $E = \begin{bmatrix} 1 & 2 & 3 & 4 \\ 0 & 0 & 0 & 0 \\ 0 & 0 & 0 & 0 \end{bmatrix}$ | $3 \times 4$ | Rectangular |
| $F = \begin{bmatrix} -1 & 2 & 0 \end{bmatrix}$ | $1 \times 3$ | Rectangular, Row Matrix |
| $G = \begin{bmatrix} 1 & 0 & 0 \\ 2 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix}$ | $3 \times 3$ | Square, Lower Triangular |
| $H = \begin{bmatrix} 1 & 0 \\ 0 & 0 \end{bmatrix}$ | $2 \times 2$ | Square, Diagonal, Upper/Lower Triangular |
| $I = [1]$ | $1 \times 1$ | Identity ($I_1$), Diagonal, Symmetric |
| $J = \begin{bmatrix} 1 & 1 \\ 0 & 0 \end{bmatrix}$ | $2 \times 2$ | Square, Upper Triangular |

---

## 2. Fundamental Matrix Operations

### 2.1 Equality of Matrices
Two matrices $A = [a_{ij}]$ and $B = [b_{ij}]$ are equal ($A = B$) if and only if:
1. They have the **same size** ($n \times p$).
2. All corresponding entries match: $a_{ij} = b_{ij}$ for all $1 \le i \le n, 1 \le j \le p$.

#### Worked Example:
Find $a, b, c, d$ such that $A = B$ where:
$$
A = \begin{bmatrix} a - b & b + c \\ 3d + c & 2a - 4d \end{bmatrix}, \quad B = \begin{bmatrix} 8 & 1 \\ 7 & 6 \end{bmatrix}
$$
Equating corresponding entries yields the linear system:
$$
\begin{cases}
a - b = 8 \\
b + c = 1 \\
c + 3d = 7 \\
2a - 4d = 6
\end{cases}
$$
Form the augmented matrix and reduce:
$$
\left[\begin{array}{rrrr|r}
\mathbf{1} & -1 & 0 & 0 & 8 \\
0 & \mathbf{1} & 1 & 0 & 1 \\
0 & 0 & \mathbf{1} & 3 & 7 \\
2 & 0 & 0 & -4 & 6
\end{array}\right]
\xrightarrow{R_4 \to R_4 - 2R_1}
\left[\begin{array}{rrrr|r}
\mathbf{1} & -1 & 0 & 0 & 8 \\
0 & \mathbf{1} & 1 & 0 & 1 \\
0 & 0 & \mathbf{1} & 3 & 7 \\
0 & 2 & 0 & -4 & -10
\end{array}\right]
$$
$$
\xrightarrow{R_4 \to R_4 - 2R_2}
\left[\begin{array}{rrrr|r}
\mathbf{1} & -1 & 0 & 0 & 8 \\
0 & \mathbf{1} & 1 & 0 & 1 \\
0 & 0 & \mathbf{1} & 3 & 7 \\
0 & 0 & -2 & -4 & -12
\end{array}\right]
\xrightarrow{R_4 \to R_4 + 2R_3}
\left[\begin{array}{rrrr|r}
\mathbf{1} & -1 & 0 & 0 & 8 \\
0 & \mathbf{1} & 1 & 0 & 1 \\
0 & 0 & \mathbf{1} & 3 & 7 \\
0 & 0 & 0 & 2 & 2
\end{array}\right]
$$
$$
\xrightarrow{R_4 \to \frac{1}{2} R_4}
\left[\begin{array}{rrrr|r}
\mathbf{1} & -1 & 0 & 0 & 8 \\
0 & \mathbf{1} & 1 & 0 & 1 \\
0 & 0 & \mathbf{1} & 3 & 7 \\
0 & 0 & 0 & \mathbf{1} & 1
\end{array}\right]
$$
By back-substitution:
- $d = 1$
- $c + 3(1) = 7 \implies c = 4$
- $b + 4 = 1 \implies b = -3$
- $a - (-3) = 8 \implies a = 5$

**Result:** $a = 5, \, b = -3, \, c = 4, \, d = 1$.

---

### 2.2 Matrix Addition and Subtraction
If $A = [a_{ij}]$ and $B = [b_{ij}]$ are matrices of the **exact same size** $n \times p$:
$$
A \pm B = [a_{ij} \pm b_{ij}]
$$
*(Addition of matrices with different sizes is undefined).*

#### Worked Example:
$$
A = \begin{bmatrix} 1 & 2 & 3 & 4 \\ -1 & 4 & -1 & 4 \end{bmatrix}, \quad B = \begin{bmatrix} 2 & 3 & 0 & 1 \\ 1 & 1 & 0 & 0 \end{bmatrix}
$$
$$
A + B = \begin{bmatrix} 1+2 & 2+3 & 3+0 & 4+1 \\ -1+1 & 4+1 & -1+0 & 4+0 \end{bmatrix} = \begin{bmatrix} 3 & 5 & 3 & 5 \\ 0 & 5 & -1 & 4 \end{bmatrix}
$$
$$
A - B = \begin{bmatrix} 1-2 & 2-3 & 3-0 & 4-1 \\ -1-1 & 4-1 & -1-0 & 4-0 \end{bmatrix} = \begin{bmatrix} -1 & -1 & 3 & 3 \\ -2 & 3 & -1 & 4 \end{bmatrix}
$$

---

### 2.3 Scalar Multiplication
For any scalar $k \in \mathbb{R}$ and matrix $A = [a_{ij}]$:
$$
k A = [k \cdot a_{ij}]
$$

#### Worked Example:
$$
A = \begin{bmatrix} 4 & 6 & 2 & 8 \\ -4 & 2 & 0 & 1 \\ 1 & 0 & 1 & 0 \end{bmatrix}
$$
$$
2A = \begin{bmatrix} 8 & 12 & 4 & 16 \\ -8 & 4 & 0 & 2 \\ 2 & 0 & 2 & 0 \end{bmatrix}, \quad
-3A = \begin{bmatrix} -12 & -18 & -6 & -24 \\ 12 & -6 & 0 & -3 \\ -3 & 0 & -3 & 0 \end{bmatrix}, \quad
\frac{1}{2} A = \begin{bmatrix} 2 & 3 & 1 & 4 \\ -2 & 1 & 0 & \frac{1}{2} \\ \frac{1}{2} & 0 & \frac{1}{2} & 0 \end{bmatrix}
$$

---

### 2.4 Matrix Multiplication

#### Compatibility Condition:
The product $AB$ is defined **if and only if** the number of columns in $A$ equals the number of rows in $B$:
$$
\underbrace{A}_{n \times r} \cdot \underbrace{B}_{r \times p} = \underbrace{C}_{n \times p}
$$
The $(i, j)$-entry of $C = AB$ is the dot product of the $i$-th row of $A$ and the $j$-th column of $B$:
$$
c_{ij} = a_{i1}b_{1j} + a_{i2}b_{2j} + \cdots + a_{ir}b_{rj} = \sum_{k=1}^r a_{ik} b_{kj}
$$

#### Visual Scheme of Matrix Multiplication:

<div align="center">

```xml
<svg viewBox="0 0 650 300" xmlns="http://www.w3.org/2000/svg" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; font-family: ui-sans-serif, system-ui, sans-serif;">
  <!-- Matrix B on top right -->
  <g transform="translate(300, 30)">
    <rect x="0" y="0" width="220" height="90" fill="#f8fafc" stroke="#16a34a" stroke-width="2" rx="4" />
    <text x="110" y="-10" font-size="14" font-weight="bold" fill="#16a34a" text-anchor="middle">Matrix B (r × p)</text>
    <!-- Column j highlighted -->
    <rect x="80" y="0" width="40" height="90" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5" />
    <text x="100" y="25" font-size="12" fill="#15803d" text-anchor="middle">b₁ⱼ</text>
    <text x="100" y="50" font-size="12" fill="#15803d" text-anchor="middle">b₂ⱼ</text>
    <text x="100" y="75" font-size="12" fill="#15803d" text-anchor="middle">bᵣⱼ</text>
    <text x="100" y="105" font-size="12" font-weight="bold" fill="#15803d" text-anchor="middle">col j</text>
  </g>

  <!-- Matrix A on bottom left -->
  <g transform="translate(60, 140)">
    <rect x="0" y="0" width="200" height="120" fill="#f8fafc" stroke="#0284c7" stroke-width="2" rx="4" />
    <text x="100" y="-10" font-size="14" font-weight="bold" fill="#0284c7" text-anchor="middle">Matrix A (n × r)</text>
    <!-- Row i highlighted -->
    <rect x="0" y="40" width="200" height="35" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.5" />
    <text x="25" y="62" font-size="12" fill="#0369a1">aᵢ₁</text>
    <text x="75" y="62" font-size="12" fill="#0369a1">aᵢ₂</text>
    <text x="120" y="62" font-size="12" fill="#0369a1">···</text>
    <text x="175" y="62" font-size="12" fill="#0369a1">aᵢᵣ</text>
    <text x="-25" y="62" font-size="12" font-weight="bold" fill="#0369a1">row i →</text>
  </g>

  <!-- Matrix AB on bottom right -->
  <g transform="translate(300, 140)">
    <rect x="0" y="0" width="220" height="120" fill="#ffffff" stroke="#dc2626" stroke-width="2" rx="4" />
    <text x="110" y="-10" font-size="14" font-weight="bold" fill="#dc2626" text-anchor="middle">Product AB (n × p)</text>
    <!-- Intersection entry c_ij -->
    <rect x="80" y="40" width="40" height="35" fill="#fee2e2" stroke="#dc2626" stroke-width="2" />
    <text x="100" y="63" font-size="13" font-weight="bold" fill="#b91c1c" text-anchor="middle">cᵢⱼ</text>
  </g>

  <!-- Connective Arrows -->
  <path d="M 260 197 L 380 197" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="4,4" fill="none" marker-end="url(#arrow)" />
  <path d="M 400 120 L 400 180" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="4,4" fill="none" />
</svg>
```

</div>

#### Worked Example (Non-Commutativity Demonstration):
Given:
$$
A = \begin{bmatrix} 1 & 2 \\ 3 & 0 \\ -1 & 4 \end{bmatrix} \quad (3 \times 2), \qquad
B = \begin{bmatrix} 2 & 3 & 1 \\ 0 & -1 & 0 \end{bmatrix} \quad (2 \times 3)
$$

**1. Calculate $AB$:**
$A$ is $3 \times 2$ and $B$ is $2 \times 3$. Inner dimensions match ($2 = 2$). Size is $3 \times 3$:
$$
AB = \begin{bmatrix}
1(2)+2(0) & 1(3)+2(-1) & 1(1)+2(0) \\
3(2)+0(0) & 3(3)+0(-1) & 3(1)+0(0) \\
-1(2)+4(0) & -1(3)+4(-1) & -1(1)+4(0)
\end{bmatrix}
= \begin{bmatrix}
2 & 1 & 1 \\
6 & 9 & 3 \\
-2 & -7 & -1
\end{bmatrix}
$$

**2. Calculate $BA$:**
$B$ is $2 \times 3$ and $A$ is $3 \times 2$. Inner dimensions match ($3 = 3$). Size is $2 \times 2$:
$$
BA = \begin{bmatrix}
2(1)+3(3)+1(-1) & 2(2)+3(0)+1(4) \\
0(1)+(-1)(3)+0(-1) & 0(2)+(-1)(0)+0(4)
\end{bmatrix}
= \begin{bmatrix}
10 & 8 \\
-3 & 0
\end{bmatrix}
$$

**Core Conclusion:** In general, $AB \ne BA$. Matrix multiplication is **non-commutative**. Here, $AB$ is $3 \times 3$ while $BA$ is $2 \times 2$. Even when both matrices are square of the same size, $AB$ and $BA$ are generally not equal.

---

### 2.5 Transpose of a Matrix
If $A = [a_{ij}]$ is $n \times p$, its **transpose** $A^T = [a_{ji}]$ is the $p \times n$ matrix obtained by interchanging rows and columns:
- Row $i$ of $A$ becomes column $i$ of $A^T$.

#### Examples:
$$
A = \begin{bmatrix} 1 & 2 & 3 & 4 \\ -1 & 0 & 1 & 0 \\ 2 & 5 & 7 & 3 \end{bmatrix} \quad (3 \times 4)
\quad \Longrightarrow \quad
A^T = \begin{bmatrix} 1 & -1 & 2 \\ 2 & 0 & 5 \\ 3 & 1 & 7 \\ 4 & 0 & 3 \end{bmatrix} \quad (4 \times 3)
$$
$$
B = \begin{bmatrix} 1 & 2 & 3 \\ 1 & 1 & 2 \\ 0 & 0 & 1 \end{bmatrix}
\quad \Longrightarrow \quad
B^T = \begin{bmatrix} 1 & 1 & 0 \\ 2 & 1 & 0 \\ 3 & 2 & 1 \end{bmatrix}
$$

---

### 2.6 Trace of a Square Matrix
Let $A = [a_{ij}]$ be a **square** $n \times n$ matrix. The **trace** of $A$, denoted $\text{tr}(A)$, is the sum of all elements along the main diagonal:
$$
\text{tr}(A) = a_{11} + a_{22} + \cdots + a_{nn} = \sum_{i=1}^n a_{ii}
$$

#### Example:
$$
A = \begin{bmatrix}
\mathbf{1} & 4 & 5 & 0 \\
-1 & \mathbf{3} & 2 & 5 \\
6 & 1 & \mathbf{6} & 1 \\
1 & 1 & 7 & -\mathbf{4}
\end{bmatrix}
\quad \Longrightarrow \quad
\text{tr}(A) = 1 + 3 + 6 + (-4) = 6
$$

---

## 3. Algebraic Properties of Matrix Operations

### 3.1 Addition and Scalar Properties
1. $A + B = B + A$ (Commutative)
2. $(A + B) + C = A + (B + C)$ (Associative)
3. $A + O = A$ (Additive identity)
4. $A + (-A) = O$ (Additive inverse)
5. $k(A \pm B) = kA \pm kB$
6. $(k + m)A = kA + mA$

### 3.2 Multiplication Properties
1. $(AB)C = A(BC)$ (Associative)
2. $(A \pm B)C = AC \pm BC$ (Right distributive)
3. $C(A \pm B) = CA \pm CB$ (Left distributive)
4. $A I_p = A$ and $I_n A = A$ (Multiplicative identity)
5. $A O = O$ and $O A = O$
6. **In general, $AB \ne BA$!**
   *Same-size counterexample:*
   $$A = \begin{bmatrix} 1 & 1 \\ 0 & 0 \end{bmatrix}, \quad B = \begin{bmatrix} 1 & 0 \\ 1 & 0 \end{bmatrix}$$
   $$AB = \begin{bmatrix} 2 & 0 \\ 0 & 0 \end{bmatrix} \quad \ne \quad BA = \begin{bmatrix} 1 & 1 \\ 1 & 1 \end{bmatrix}$$

### 3.3 Transpose Properties
1. $(A^T)^T = A$
2. $(A \pm B)^T = A^T \pm B^T$
3. $(kA)^T = k A^T$
4. **$(AB)^T = B^T A^T$** *(Reversal Rule: order reverses upon transposition)*
5. $I^T = I$, \quad $O_{n \times p}^T = O_{p \times n}$

### 3.4 Trace Properties
1. $\text{tr}(I_n) = n$
2. $\text{tr}(O) = 0$
3. $\text{tr}(A \pm B) = \text{tr}(A) \pm \text{tr}(B)$
4. $\text{tr}(kA) = k \text{tr}(A)$
5. $\text{tr}(A^T) = \text{tr}(A)$
6. **$\text{tr}(AB) = \text{tr}(BA)$** *(Cyclic property of trace)*

---

## 4. Comprehensive Course Exercises & Problem Solutions

### Exercise 1: Size Compatibility Drill
Let the sizes of matrices be:
$$A: 4 \times 5, \quad B: 4 \times 5, \quad C: 5 \times 2, \quad D: 4 \times 2, \quad E: 5 \times 4$$

Determine whether each expression is defined. If defined, find its resulting size:

| Expression | Inner Check | Compatibility Status | Resulting Dimensions |
| :--- | :--- | :--- | :--- |
| **(a) $BA$** | $B(4 \times 5) \cdot A(4 \times 5) \implies 5 \ne 4$ | **Not defined** | — |
| **(b) $AC + D$** | $AC(4 \times 2) + D(4 \times 2)$ | **Defined** | $4 \times 2$ |
| **(c) $AE + D$** | $AE(4 \times 4) + D(4 \times 2) \implies \text{different sizes}$ | **Not defined** | — |
| **(d) $(A^T + E)D$** | $(A^T(5 \times 4) + E(5 \times 4)) \cdot D(4 \times 2) = (5 \times 4) \cdot (4 \times 2)$ | **Defined** | $5 \times 2$ |

---

### Exercise 2: Dimensional Algebraic Reasoning
$A, B, C$ are matrices, and $B$ has size $4 \times 5$. If $[(AB)^T + C]A$ is defined, find the size of the resulting matrix.

**Solution:**
1. Let $A$ have size $n \times p$.
2. For $AB$ to be defined, the number of columns in $A$ must equal the rows of $B$:
   $$p = 4 \implies A \text{ has size } n \times 4$$
3. The product $AB$ has size $n \times 5$.
4. Its transpose $(AB)^T$ has size $5 \times n$.
5. For the sum $(AB)^T + C$ to be defined, $C$ must match the dimensions $5 \times n$. The sum has size $5 \times n$.
6. For the product $[(AB)^T + C]A$ to be defined, $(5 \times n) \cdot (n \times 4) = 5 \times 4$.

**Result:** The matrix $[(AB)^T + C]A$ is defined and has **size $5 \times 4$**.

---

### Exercise 3: Operations and Linear Combinations
Given matrices:
$$
A = \begin{bmatrix} 3 & 0 \\ -1 & 2 \\ 1 & 1 \end{bmatrix}, \quad
B = \begin{bmatrix} 4 & -1 \\ 0 & 2 \end{bmatrix}, \quad
C = \begin{bmatrix} 1 & 4 & 2 \\ 3 & 1 & 5 \end{bmatrix}, \quad
D = \begin{bmatrix} 1 & 5 & 2 \\ 5 & 0 & 1 \\ 3 & 2 & 4 \end{bmatrix}, \quad
E = \begin{bmatrix} 6 & 1 & 3 \\ -1 & 1 & 2 \\ 4 & 1 & 3 \end{bmatrix}
$$

**(a) $2B - C$:**
$2B$ has size $2 \times 2$; $C$ has size $2 \times 3$. Because sizes differ, $2B - C$ is **not defined**.

**(b) $-3(D + 2E)$:**
$$
D + 2E = \begin{bmatrix} 1 & 5 & 2 \\ 5 & 0 & 1 \\ 3 & 2 & 4 \end{bmatrix} + \begin{bmatrix} 12 & 2 & 6 \\ -2 & 2 & 4 \\ 8 & 2 & 6 \end{bmatrix} = \begin{bmatrix} 13 & 7 & 8 \\ 3 & 2 & 5 \\ 11 & 4 & 10 \end{bmatrix}
$$
$$
-3(D + 2E) = \begin{bmatrix} -39 & -21 & -24 \\ -9 & -6 & -15 \\ -33 & -12 & -30 \end{bmatrix}
$$

**(c) Simplify $(2E^T - 3D^T)^T$:**
$$
(2E^T - 3D^T)^T = 2(E^T)^T - 3(D^T)^T = 2E - 3D
$$
$$
2E - 3D = \begin{bmatrix} 12 & 2 & 6 \\ -2 & 2 & 4 \\ 8 & 2 & 6 \end{bmatrix} - \begin{bmatrix} 3 & 15 & 6 \\ 15 & 0 & 3 \\ 9 & 6 & 12 \end{bmatrix} = \begin{bmatrix} 9 & -13 & 0 \\ -17 & 2 & 1 \\ -1 & -4 & -6 \end{bmatrix}
$$

**(d) Evaluate $\text{tr}(4E^T - D)$:**
Using trace linearity:
$$
\text{tr}(4E^T - D) = 4\text{tr}(E^T) - \text{tr}(D) = 4\text{tr}(E) - \text{tr}(D)
$$
- $\text{tr}(E) = 6 + 1 + 3 = 10$
- $\text{tr}(D) = 1 + 0 + 4 = 5$
$$
\text{tr}(4E^T - D) = 4(10) - 5 = 40 - 5 = 35
$$

---

### Exercise 4: Solving for Scalar $k$ in a Bilinear Form
Find the real value $k$ such that:
$$
\begin{bmatrix} k & 1 & 1 \end{bmatrix}
\begin{bmatrix} 1 & 1 & 0 \\ 1 & 0 & 2 \\ 0 & 2 & -3 \end{bmatrix}
\begin{bmatrix} k \\ 1 \\ 1 \end{bmatrix} = [0]
$$

**Solution:**
Multiply the middle matrix by the column vector on the right:
$$
\begin{bmatrix} 1 & 1 & 0 \\ 1 & 0 & 2 \\ 0 & 2 & -3 \end{bmatrix} \begin{bmatrix} k \\ 1 \\ 1 \end{bmatrix}
= \begin{bmatrix} 1(k) + 1(1) + 0(1) \\ 1(k) + 0(1) + 2(1) \\ 0(k) + 2(1) - 3(1) \end{bmatrix}
= \begin{bmatrix} k + 1 \\ k + 2 \\ -1 \end{bmatrix}
$$
Now multiply by the row vector on the left:
$$
\begin{bmatrix} k & 1 & 1 \end{bmatrix} \begin{bmatrix} k + 1 \\ k + 2 \\ -1 \end{bmatrix}
= [k(k + 1) + 1(k + 2) + 1(-1)] = [k^2 + k + k + 2 - 1] = [k^2 + 2k + 1]
$$
Equating to $[0]$:
$$
k^2 + 2k + 1 = 0 \iff (k + 1)^2 = 0 \iff k + 1 = 0 \implies k = -1
$$

---

### Exercise 5: Solving a Quadratic Matrix Equation
Find all $2 \times 2$ diagonal matrices $X$ satisfying the matrix equation:
$$
A X^2 + B X + C = O
$$
where:
$$
A = \begin{bmatrix} 0 & 1 \\ -1 & 0 \end{bmatrix}, \quad
B = \begin{bmatrix} 0 & -1 \\ 2 & 0 \end{bmatrix}, \quad
C = \begin{bmatrix} 0 & -2 \\ -1 & 0 \end{bmatrix}
$$

**Solution:**
Since $X$ is diagonal, let $X = \begin{bmatrix} x & 0 \\ 0 & y \end{bmatrix}$.

1. Compute $X^2$:
   $$X^2 = \begin{bmatrix} x & 0 \\ 0 & y \end{bmatrix} \begin{bmatrix} x & 0 \\ 0 & y \end{bmatrix} = \begin{bmatrix} x^2 & 0 \\ 0 & y^2 \end{bmatrix}$$

2. Compute $AX^2$:
   $$AX^2 = \begin{bmatrix} 0 & 1 \\ -1 & 0 \end{bmatrix} \begin{bmatrix} x^2 & 0 \\ 0 & y^2 \end{bmatrix} = \begin{bmatrix} 0 & y^2 \\ -x^2 & 0 \end{bmatrix}$$

3. Compute $BX$:
   $$BX = \begin{bmatrix} 0 & -1 \\ 2 & 0 \end{bmatrix} \begin{bmatrix} x & 0 \\ 0 & y \end{bmatrix} = \begin{bmatrix} 0 & -y \\ 2x & 0 \end{bmatrix}$$

4. Add the matrices:
   $$
   AX^2 + BX + C = \begin{bmatrix} 0 & y^2 \\ -x^2 & 0 \end{bmatrix} + \begin{bmatrix} 0 & -y \\ 2x & 0 \end{bmatrix} + \begin{bmatrix} 0 & -2 \\ -1 & 0 \end{bmatrix}
   = \begin{bmatrix} 0 & y^2 - y - 2 \\ -x^2 + 2x - 1 & 0 \end{bmatrix}
   $$

5. Equate to the zero matrix $O = \begin{bmatrix} 0 & 0 \\ 0 & 0 \end{bmatrix}$:
   - **Entry $(1,2)$:**
     $$y^2 - y - 2 = 0 \implies (y + 1)(y - 2) = 0 \implies y = -1 \quad \text{or} \quad y = 2$$
   - **Entry $(2,1)$:**
     $$-x^2 + 2x - 1 = 0 \implies x^2 - 2x + 1 = 0 \implies (x - 1)^2 = 0 \implies x = 1$$

**Conclusion:** There are two distinct solutions for the diagonal matrix $X$:
$$
X = \begin{bmatrix} 1 & 0 \\ 0 & -1 \end{bmatrix} \quad \text{or} \quad X = \begin{bmatrix} 1 & 0 \\ 0 & 2 \end{bmatrix}
$$

---

## 5. Supplementary Course Insights & Reconciled Content

*(Integrated from LinearLab interactive lesson modules: `matrix-basics.mdx`, `addition-and-scalar-multiplication.mdx`, `matrix-multiplication.mdx`, `multiplication-properties.mdx`, `transpose-and-special-matrices.mdx`)*

### Matrix Multiplication as a Linear Combination of Columns
For any matrix $A$ and column vector $X$:
$$
AX = x_1 \mathbf{a}_1 + x_2 \mathbf{a}_2 + \cdots + x_p \mathbf{a}_p
$$
The product $AX$ is precisely a linear combination of the column vectors of $A$ weighted by the scalar components of $X$.

### Failure of Common Scalar Algebraic Rules in Matrix Algebra
In real number arithmetic, $ab = 0 \implies a = 0$ or $b = 0$. In matrix algebra:
1. **Zero Divisors Exist:** Two non-zero matrices can multiply to the zero matrix:
   $$\begin{bmatrix} 1 & 1 \\ 0 & 0 \end{bmatrix} \begin{bmatrix} 1 & 0 \\ -1 & 0 \end{bmatrix} = \begin{bmatrix} 0 & 0 \\ 0 & 0 \end{bmatrix}$$
2. **Cancellation Law Fails:** $AB = AC$ does **not** imply $B = C$ in general unless $A$ is invertible.

---

## 6. Archival Source Reference & Verification Ledger

The 33 source image assets for this chapter are mapped as follows:

| Source File | Source ID | Page | Part | Local Asset Path | Coverage Anchor |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `1.3 Matrix Operations.pdf` (root) | `1shHnNllATjHF2PwBuQfxxA3ishTX7fUx` | 1 | 1 | `../assets/03-matrix-operations-1/page-001-part-001.webp` | [§ 1 Matrix Definitions](#1-matrix-definitions-and-special-types) |
| `1.3 Matrix Operations.pdf` (root) | `1shHnNllATjHF2PwBuQfxxA3ishTX7fUx` | 1 | 2 | `../assets/03-matrix-operations-1/page-001-part-002.webp` | [§ 1 Special Matrix Types](#classification-of-special-matrix-types) |
| `1.3 Matrix Operations.pdf` (root) | `1shHnNllATjHF2PwBuQfxxA3ishTX7fUx` | 1 | 3 | `../assets/03-matrix-operations-1/page-001-part-003.webp` | [§ 1 Triangular and Zero Matrices](#classification-of-special-matrix-types) |
| `1.3 Matrix Operations.pdf` (root) | `1shHnNllATjHF2PwBuQfxxA3ishTX7fUx` | 1 | 4 | `../assets/03-matrix-operations-1/page-001-part-004.webp` | [§ 1 Classification Drill & § 2.1 Equality](#classification-drill-from-lecture-notes) |
| `1.3 Matrix Operations.pdf` (root) | `1shHnNllATjHF2PwBuQfxxA3ishTX7fUx` | 1 | 5 | `../assets/03-matrix-operations-1/page-001-part-005.webp` | [§ 2.1 Equality Worked Example](#worked-example) |
| `1.3 Matrix Operations.pdf` (root) | `1shHnNllATjHF2PwBuQfxxA3ishTX7fUx` | 1 | 6 | `../assets/03-matrix-operations-1/page-001-part-006.webp` | [§ 2.2 Addition and Subtraction](#22-matrix-addition-and-subtraction) |
| `1.3 Matrix Operations.pdf` (root) | `1shHnNllATjHF2PwBuQfxxA3ishTX7fUx` | 1 | 7 | `../assets/03-matrix-operations-1/page-001-part-007.webp` | [§ 2.3 Scalar Mult & § 2.4 Mult Def](#23-scalar-multiplication) |
| `1.3 Matrix Operations.pdf` (root) | `1shHnNllATjHF2PwBuQfxxA3ishTX7fUx` | 1 | 8 | `../assets/03-matrix-operations-1/page-001-part-008.webp` | [§ 2.4 Multiplication Scheme Diagram](#visual-scheme-of-matrix-multiplication) |
| `1.3 Matrix Operations.pdf` (root) | `1shHnNllATjHF2PwBuQfxxA3ishTX7fUx` | 1 | 9 | `../assets/03-matrix-operations-1/page-001-part-009.webp` | [§ 2.4 Non-Commutativity Example](#worked-example-non-commutativity-demonstration) |
| `1.3 Matrix Operations.pdf` (root) | `1shHnNllATjHF2PwBuQfxxA3ishTX7fUx` | 1 | 10 | `../assets/03-matrix-operations-1/page-001-part-010.webp` | [§ 2.5 Transpose & § 2.6 Trace](#25-transpose-of-a-matrix) |
| `1.3 Matrix Operations.pdf` (root) | `1shHnNllATjHF2PwBuQfxxA3ishTX7fUx` | 1 | 11 | `../assets/03-matrix-operations-1/page-001-part-011.webp` | [§ 4 Exercise 1](#exercise-1-size-compatibility-drill) |
| `1.3 Matrix Operations.pdf` (root) | `1shHnNllATjHF2PwBuQfxxA3ishTX7fUx` | 1 | 12 | `../assets/03-matrix-operations-1/page-001-part-012.webp` | [§ 4 Exercise 2 & § 3.1 Addition Rules](#exercise-2-dimensional-algebraic-reasoning) |
| `1.3 Matrix Operations.pdf` (root) | `1shHnNllATjHF2PwBuQfxxA3ishTX7fUx` | 1 | 13 | `../assets/03-matrix-operations-1/page-001-part-013.webp` | [§ 3.2 Multiplication & § 3.3 Transpose](#32-multiplication-properties) |
| `1.3 Matrix Operations.pdf` (root) | `1shHnNllATjHF2PwBuQfxxA3ishTX7fUx` | 1 | 14 | `../assets/03-matrix-operations-1/page-001-part-014.webp` | [§ 3.4 Trace Rules & § 4 Exercise 3](#exercise-3-operations-and-linear-combinations) |
| `1.3 Matrix Operations.pdf` (root) | `1shHnNllATjHF2PwBuQfxxA3ishTX7fUx` | 1 | 15 | `../assets/03-matrix-operations-1/page-001-part-015.webp` | [§ 4 Exercise 3(c-d) & Exercise 4](#exercise-4-solving-for-scalar-k-in-a-bilinear-form) |
| `1.3 Matrix Operations.pdf` (root) | `1shHnNllATjHF2PwBuQfxxA3ishTX7fUx` | 1 | 16 | `../assets/03-matrix-operations-1/page-001-part-016.webp` | [§ 4 Exercise 5 Quadratic Equation](#exercise-5-solving-a-quadratic-matrix-equation) |
| `1.3 Matrix Operations.pdf` (Test1) | `1Qsu838mD66GnI6SnX7Oi_7sGg9TuWFeZ` | 1 | 1 | `../assets/03-matrix-operations-2/page-001-part-001.webp` | [§ 1 Definitions & Variations](#1-matrix-definitions-and-special-types) |
| `1.3 Matrix Operations.pdf` (Test1) | `1Qsu838mD66GnI6SnX7Oi_7sGg9TuWFeZ` | 1 | 2 | `../assets/03-matrix-operations-2/page-001-part-002.webp` | [§ 1 Special Matrix Types](#classification-of-special-matrix-types) |
| `1.3 Matrix Operations.pdf` (Test1) | `1Qsu838mD66GnI6SnX7Oi_7sGg9TuWFeZ` | 1 | 3 | `../assets/03-matrix-operations-2/page-001-part-003.webp` | [§ 1 Triangular and Zero Matrices](#classification-of-special-matrix-types) |
| `1.3 Matrix Operations.pdf` (Test1) | `1Qsu838mD66GnI6SnX7Oi_7sGg9TuWFeZ` | 1 | 4 | `../assets/03-matrix-operations-2/page-001-part-004.webp` | [§ 1 Classification Drill](#classification-drill-from-lecture-notes) |
| `1.3 Matrix Operations.pdf` (Test1) | `1Qsu838mD66GnI6SnX7Oi_7sGg9TuWFeZ` | 1 | 5 | `../assets/03-matrix-operations-2/page-001-part-005.webp` | [§ 2.1 Equality Verification](#21-equality-of-matrices) |
| `1.3 Matrix Operations.pdf` (Test1) | `1Qsu838mD66GnI6SnX7Oi_7sGg9TuWFeZ` | 1 | 6 | `../assets/03-matrix-operations-2/page-001-part-006.webp` | [§ 2.2 Addition/Subtraction](#22-matrix-addition-and-subtraction) |
| `1.3 Matrix Operations.pdf` (Test1) | `1Qsu838mD66GnI6SnX7Oi_7sGg9TuWFeZ` | 1 | 7 | `../assets/03-matrix-operations-2/page-001-part-007.webp` | [§ 2.3 Scalar Mult & § 2.4 Multiplication](#23-scalar-multiplication) |
| `1.3 Matrix Operations.pdf` (Test1) | `1Qsu838mD66GnI6SnX7Oi_7sGg9TuWFeZ` | 1 | 8 | `../assets/03-matrix-operations-2/page-001-part-008.webp` | [§ 2.4 Multiplication Visual Scheme](#visual-scheme-of-matrix-multiplication) |
| `1.3 Matrix Operations.pdf` (Test1) | `1Qsu838mD66GnI6SnX7Oi_7sGg9TuWFeZ` | 1 | 9 | `../assets/03-matrix-operations-2/page-001-part-009.webp` | [§ 2.4 Non-Commutativity Example](#worked-example-non-commutativity-demonstration) |
| `1.3 Matrix Operations.pdf` (Test1) | `1Qsu838mD66GnI6SnX7Oi_7sGg9TuWFeZ` | 1 | 10 | `../assets/03-matrix-operations-2/page-001-part-010.webp` | [§ 2.5 Transpose & § 2.6 Trace](#25-transpose-of-a-matrix) |
| `1.3 Matrix Operations.pdf` (Test1) | `1Qsu838mD66GnI6SnX7Oi_7sGg9TuWFeZ` | 1 | 11 | `../assets/03-matrix-operations-2/page-001-part-011.webp` | [§ 4 Exercise 1 Compatibility](#exercise-1-size-compatibility-drill) |
| `1.3 Matrix Operations.pdf` (Test1) | `1Qsu838mD66GnI6SnX7Oi_7sGg9TuWFeZ` | 1 | 12 | `../assets/03-matrix-operations-2/page-001-part-012.webp` | [§ 4 Exercise 2 Dimensionality](#exercise-2-dimensional-algebraic-reasoning) |
| `1.3 Matrix Operations.pdf` (Test1) | `1Qsu838mD66GnI6SnX7Oi_7sGg9TuWFeZ` | 1 | 13 | `../assets/03-matrix-operations-2/page-001-part-013.webp` | [§ 3.2 Multiplication Rules](#32-multiplication-properties) |
| `1.3 Matrix Operations.pdf` (Test1) | `1Qsu838mD66GnI6SnX7Oi_7sGg9TuWFeZ` | 1 | 14 | `../assets/03-matrix-operations-2/page-001-part-014.webp` | [§ 3.4 Trace Rules](#34-trace-properties) |
| `1.3 Matrix Operations.pdf` (Test1) | `1Qsu838mD66GnI6SnX7Oi_7sGg9TuWFeZ` | 1 | 15 | `../assets/03-matrix-operations-2/page-001-part-015.webp` | [§ 4 Exercise 3 Linear Combinations](#exercise-3-operations-and-linear-combinations) |
| `1.3 Matrix Operations.pdf` (Test1) | `1Qsu838mD66GnI6SnX7Oi_7sGg9TuWFeZ` | 1 | 16 | `../assets/03-matrix-operations-2/page-001-part-016.webp` | [§ 4 Exercise 4 Scalar $k$](#exercise-4-solving-for-scalar-k-in-a-bilinear-form) |
| `1.3 Matrix Operations.pdf` (Test1) | `1Qsu838mD66GnI6SnX7Oi_7sGg9TuWFeZ` | 1 | 17 | `../assets/03-matrix-operations-2/page-001-part-017.webp` | [§ 4 Exercise 5 Quadratic Equation End](#exercise-5-solving-a-quadratic-matrix-equation) |
