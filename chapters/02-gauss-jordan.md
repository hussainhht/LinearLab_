---
id: "02-gauss-jordan"
title: "1.2 — Gaussian and Gauss–Jordan elimination"
course: "MATHS211"
type: "chapter-section"
order: 2
language: "en"
source_ids: ["1_howvee-xm2zxP24DqQcQA1nZ8PqCKPg", "1n8MA2sIJjHe4U7uPpcxuJYxQ3Qzt4uY4"]
source_page_count: 2
content_format: "complete_transcription_with_archival_references"
source_coverage: "all pages of every listed source version"
editable_transcription: "complete transcription of all source versions, row operations, worked examples, and reconciled website content"
transcribed_source_ids: ["1_howvee-xm2zxP24DqQcQA1nZ8PqCKPg", "1n8MA2sIJjHe4U7uPpcxuJYxQ3Qzt4uY4"]
---

# 1.2 — Gaussian and Gauss–Jordan Elimination

## 1. Echelon Forms of a Matrix

### 1.1 Row-Echelon Form (REF)

A matrix is said to be in **row-echelon form (REF)** if it satisfies the following three conditions:

1. **Zero Rows at the Bottom:** Any row consisting entirely of zeros is grouped at the very bottom of the matrix.
   $$\begin{bmatrix} \cdot & \cdot & \cdot & \cdot & \cdot \\ \cdot & \cdot & \cdot & \cdot & \cdot \\ 0 & 0 & 0 & 0 & 0 \\ 0 & 0 & 0 & 0 & 0 \end{bmatrix}$$

2. **Leading 1 (Pivot):** For each non-zero row, the first non-zero entry from the left is $1$, known as the **leading 1** (or pivot entry).
   $$\begin{bmatrix} 0 & 0 & \mathbf{1} & 2 & 3 \\ \vdots & \vdots & \vdots & \vdots & \vdots \\ 0 & 0 & 0 & 0 & 0 \end{bmatrix}$$

3. **Staircase Pattern:** If two successive rows are non-zero, the leading $1$ of the lower row must appear strictly to the right of the leading $1$ of the upper row.
   $$\begin{bmatrix} 0 & 0 & \mathbf{1} & 2 & 3 \\ 0 & 0 & 0 & \mathbf{1} & -1 \\ 0 & 0 & 0 & 0 & \mathbf{1} \\ 0 & 0 & 0 & 0 & 0 \end{bmatrix}$$

### 1.2 Reduced Row-Echelon Form (RREF)

A matrix is in **reduced row-echelon form (RREF)** if it satisfies conditions (1)–(3) above, and in addition:

4. **Zero Above and Below Each Leading 1:** Every column containing a leading $1$ has zeros in every other entry (both above and below the leading $1$).

---

## 2. Classification Examples (REF vs. RREF vs. Neither)

The following matrices from the lecture notes illustrate the exact distinctions:

| Matrix | Classification | Explanation / Justification |
| :--- | :--- | :--- |
| $\begin{bmatrix} \mathbf{1} & 0 & 2 & 0 \\ 0 & \mathbf{1} & 0 & 0 \\ 0 & \mathbf{1} & 0 & 0 \end{bmatrix}$ | **Neither** | Leading 1 of row 3 is directly below that of row 2 (not strictly to the right). |
| $\begin{bmatrix} 0 & \mathbf{1} & 0 & 0 \\ 0 & 0 & \mathbf{1} & 1 \\ 0 & 0 & 0 & 0 \end{bmatrix}$ | **Reduced (RREF)** | Leading 1s at $(1,2)$ and $(2,3)$; their columns have zeros everywhere else. |
| $\begin{bmatrix} \mathbf{1} & 0 & 1 \\ 0 & 2 & 0 \\ 0 & 0 & 0 \end{bmatrix}$ | **Neither** | The first non-zero entry in row 2 is $2 \ne 1$. |
| $\begin{bmatrix} \mathbf{1} & 1 \\ 0 & \mathbf{1} \\ 0 & 0 \end{bmatrix}$ | **Row-Echelon (REF)** | In REF, but not reduced because the entry in row 1 above the leading 1 of row 2 is $1 \ne 0$. |
| $\begin{bmatrix} 0 & \mathbf{1} & 0 & 1 \\ \mathbf{1} & 0 & 0 & 0 \\ 0 & 0 & 0 & 0 \end{bmatrix}$ | **Neither** | Leading 1 of row 2 is in column 1, which is to the left of row 1's leading 1 (column 2). |
| $\begin{bmatrix} 0 & \mathbf{1} & 0 & 1 \\ 0 & 0 & 0 & 0 \\ 0 & 0 & 0 & 0 \end{bmatrix}$ | **Reduced (RREF)** | Single leading 1 in column 2 with zeros elsewhere in that column. |
| $\begin{bmatrix} 0 & \mathbf{1} & 2 \\ 0 & 0 & \mathbf{1} \\ 0 & 0 & 0 \end{bmatrix}$ | **Row-Echelon (REF)** | Entry in row 1, column 3 is $2 \ne 0$ above the leading 1 of row 2. |
| $\begin{bmatrix} \mathbf{1} & 0 & 1 & 2 \\ 0 & \mathbf{1} & 0 & 1 \\ 0 & 0 & 0 & 0 \end{bmatrix}$ | **Reduced (RREF)** | Pivot columns 1 and 2 have zeros in all other row positions. |
| $\begin{bmatrix} \mathbf{1} & 0 & 1 & 2 \\ 0 & 0 & 0 & \mathbf{1} \\ 0 & 0 & 0 & 0 \end{bmatrix}$ | **Row-Echelon (REF)** | Column 4 has entry $2 \ne 0$ above the leading 1. |
| $\begin{bmatrix} \mathbf{1} & 2 & 0 & 1 \\ 0 & 0 & \mathbf{1} & 0 \\ 0 & 0 & 0 & \mathbf{1} \end{bmatrix}$ | **Row-Echelon (REF)** | Column 4 has entry $1 \ne 0$ in row 1 above the leading 1 of row 3. |
| $\begin{bmatrix} 0 & \mathbf{1} \\ 0 & 0 \\ 0 & 0 \end{bmatrix}$ | **Reduced (RREF)** | Leading 1 in column 2, all other entries in column 2 are zero. |
| $\begin{bmatrix} \mathbf{1} & 2 & 0 & 0 & 1 \\ 0 & 0 & \mathbf{1} & 0 & 5 \end{bmatrix}$ | **Reduced (RREF)** | Pivot columns 1 and 3 are standard unit vectors. |

---

## 3. Elementary Row Operations and Algorithms

To systematically reduce an arbitrary matrix to REF or RREF, we use the three **elementary row operations**:

1. **Row Interchange ($R_i \longleftrightarrow R_j$):** Swap two rows.
   $$\begin{bmatrix} 1 & 0 & 2 \\ 0 & 0 & 0 \\ 0 & 3 & 1 \end{bmatrix} \xrightarrow{R_2 \leftrightarrow R_3} \begin{bmatrix} 1 & 0 & 2 \\ 0 & 3 & 1 \\ 0 & 0 & 0 \end{bmatrix}$$

2. **Row Scaling ($R_j \longrightarrow k R_j, \, k \ne 0$):** Multiply a row by a non-zero real scalar $k$.
   $$\begin{bmatrix} 1 & 0 & 2 & 1 \\ 0 & 4 & 0 & 1 \\ 0 & 0 & 0 & 0 \end{bmatrix} \xrightarrow{R_2 \to \frac{1}{4} R_2} \begin{bmatrix} 1 & 0 & 2 & 1 \\ 0 & 1 & 0 & 1/4 \\ 0 & 0 & 0 & 0 \end{bmatrix}$$

3. **Row Addition ($R_i \longrightarrow R_i + k R_j, \, i \ne j$):** Add a scalar multiple of row $j$ to row $i$.
   $$\begin{bmatrix} 1 & 2 & 0 & 1 \\ 3 & 6 & 1 & 7 \\ 0 & 0 & 0 & 0 \end{bmatrix} \xrightarrow{R_2 \to R_2 - 3 R_1} \begin{bmatrix} 1 & 2 & 0 & 1 \\ 0 & 0 & 1 & 4 \\ 0 & 0 & 0 & 0 \end{bmatrix}$$

### The Two Elimination Methods:
- **Gaussian Elimination (Forward Phase):** Transforms the matrix into **Row-Echelon Form (REF)** by proceeding from top-left downwards. The system is then solved by **back-substitution**.
- **Gauss–Jordan Elimination (Forward + Backward Phase):** Continues from the REF by eliminating entries above each pivot from bottom-right upwards, transforming the matrix into **Reduced Row-Echelon Form (RREF)**. Solutions are read directly without back-substitution.

---

## 4. Complete Worked Examples from Course Sources

### Example 1: Reducing a $3 \times 4$ Matrix to REF and RREF

Transform the matrix $A$ to row-echelon form, and then to reduced row-echelon form:
$$
A = \begin{bmatrix}
2 & 4 & 6 & 8 \\
3 & 1 & 2 & 1 \\
0 & 1 & 0 & 1
\end{bmatrix}
$$

#### Forward Phase (Gaussian Elimination):
*Step 1: Create leading 1 in Row 1 ($R_1 \to \frac{1}{2} R_1$):*
$$
\begin{bmatrix}
\mathbf{1} & 2 & 3 & 4 \\
3 & 1 & 2 & 1 \\
0 & 1 & 0 & 1
\end{bmatrix}
$$

*Step 2: Clear entry below in Row 2 ($R_2 \to R_2 - 3 R_1$):*
$$
\begin{bmatrix}
\mathbf{1} & 2 & 3 & 4 \\
0 & -5 & -7 & -11 \\
0 & 1 & 0 & 1
\end{bmatrix}
$$

*Step 3: Swap rows to bring a simple leading coefficient to Row 2 ($R_2 \longleftrightarrow R_3$):*
$$
\begin{bmatrix}
\mathbf{1} & 2 & 3 & 4 \\
0 & \mathbf{1} & 0 & 1 \\
0 & -5 & -7 & -11
\end{bmatrix}
$$

*Step 4: Clear entry below in Row 3 ($R_3 \to R_3 + 5 R_2$):*
$$
\begin{bmatrix}
\mathbf{1} & 2 & 3 & 4 \\
0 & \mathbf{1} & 0 & 1 \\
0 & 0 & -7 & -6
\end{bmatrix}
$$

*Step 5: Scale Row 3 to obtain leading 1 ($R_3 \to -\frac{1}{7} R_3$):*
$$
\begin{bmatrix}
\mathbf{1} & 2 & 3 & 4 \\
0 & \mathbf{1} & 0 & 1 \\
0 & 0 & \mathbf{1} & \frac{6}{7}
\end{bmatrix}
\quad \text{\textbf{(Row-Echelon Form)}}
$$

#### Backward Phase (Gauss–Jordan Elimination):
*Step 6: Clear entries above pivot in Row 3 ($R_1 \to R_1 - 3 R_3$):*
$$
4 - 3\left(\frac{6}{7}\right) = 4 - \frac{18}{7} = \frac{10}{7}
$$
$$
\begin{bmatrix}
\mathbf{1} & 2 & 0 & \frac{10}{7} \\
0 & \mathbf{1} & 0 & 1 \\
0 & 0 & \mathbf{1} & \frac{6}{7}
\end{bmatrix}
$$

*Step 7: Clear entry above pivot in Row 2 ($R_1 \to R_1 - 2 R_2$):*
$$
\frac{10}{7} - 2(1) = \frac{10}{7} - \frac{14}{7} = -\frac{4}{7}
$$
$$
\begin{bmatrix}
\mathbf{1} & 0 & 0 & -\frac{4}{7} \\
0 & \mathbf{1} & 0 & 1 \\
0 & 0 & \mathbf{1} & \frac{6}{7}
\end{bmatrix}
\quad \text{\textbf{(Reduced Row-Echelon Form)}}
$$

---

### Example 2: Solving a Consistent $3 \times 3$ System (Unique Solution)

Solve by Gaussian elimination:
$$
\begin{cases}
x + y + 2z = 9 \\
2x + 4y - 3z = 1 \\
3x + 6y - 5z = 0
\end{cases}
$$

#### Augmented Matrix and Reduction:
$$
\left[\begin{array}{rrr|r}
\mathbf{1} & 1 & 2 & 9 \\
2 & 4 & -3 & 1 \\
3 & 6 & -5 & 0
\end{array}\right]
\xrightarrow{R_2 \to R_2 - 2R_1, \, R_3 \to R_3 - 3R_1}
\left[\begin{array}{rrr|r}
\mathbf{1} & 1 & 2 & 9 \\
0 & 2 & -7 & -17 \\
0 & 3 & -11 & -27
\end{array}\right]
$$

Perform $R_3 \to R_3 - R_2$ to generate a leading $1$:
$$
\left[\begin{array}{rrr|r}
\mathbf{1} & 1 & 2 & 9 \\
0 & 2 & -7 & -17 \\
0 & \mathbf{1} & -4 & -10
\end{array}\right]
\xrightarrow{R_2 \longleftrightarrow R_3}
\left[\begin{array}{rrr|r}
\mathbf{1} & 1 & 2 & 9 \\
0 & \mathbf{1} & -4 & -10 \\
0 & 2 & -7 & -17
\end{array}\right]
$$

Eliminate entry below Row 2 pivot ($R_3 \to R_3 - 2R_2$):
$$
-7 - 2(-4) = 1, \quad -17 - 2(-10) = 3
$$
$$
\left[\begin{array}{rrr|r}
\mathbf{1} & 1 & 2 & 9 \\
0 & \mathbf{1} & -4 & -10 \\
0 & 0 & \mathbf{1} & 3
\end{array}\right]
\quad \text{(REF)}
$$

#### Back-Substitution:
$$
\begin{cases}
x + y + 2z = 9 & (1) \\
y - 4z = -10 & (2) \\
z = 3 & (3)
\end{cases}
$$
1. From $(3)$: $z = 3$.
2. From $(2)$: $y = -10 + 4(3) = 2$.
3. From $(1)$: $x = 9 - 2 - 2(3) = 1$.

**Solution set:** $S = \{(1, 2, 3)\}$ (Unique solution).

---

### Example 3: Inconsistent Linear System ($S = \emptyset$)

Solve by Gauss–Jordan elimination:
$$
\begin{cases}
2x_1 - 3x_2 = -2 \\
2x_1 + x_2 = 1 \\
3x_1 + 2x_2 = 1
\end{cases}
$$

#### Augmented Matrix and Reduction:
$$
\left[\begin{array}{rr|r}
2 & -3 & -2 \\
2 & 1 & 1 \\
3 & 2 & 1
\end{array}\right]
\xrightarrow{R_1 \to \frac{1}{2} R_1}
\left[\begin{array}{rr|r}
\mathbf{1} & -\frac{3}{2} & -1 \\
2 & 1 & 1 \\
3 & 2 & 1
\end{array}\right]
$$
$$
\xrightarrow{R_2 \to R_2 - 2R_1, \, R_3 \to R_3 - 3R_1}
\left[\begin{array}{rr|r}
\mathbf{1} & -\frac{3}{2} & -1 \\
0 & 4 & 3 \\
0 & \frac{13}{2} & 4
\end{array}\right]
$$
$$
\xrightarrow{R_2 \to \frac{1}{4} R_2}
\left[\begin{array}{rr|r}
\mathbf{1} & -\frac{3}{2} & -1 \\
0 & \mathbf{1} & \frac{3}{4} \\
0 & \frac{13}{2} & 4
\end{array}\right]
\xrightarrow{R_3 \to R_3 - \frac{13}{2} R_2}
\left[\begin{array}{rr|r}
\mathbf{1} & -\frac{3}{2} & -1 \\
0 & \mathbf{1} & \frac{3}{4} \\
0 & 0 & -\frac{7}{8}
\end{array}\right]
$$
$$
\xrightarrow{R_3 \to -\frac{8}{7} R_3}
\left[\begin{array}{rr|r}
\mathbf{1} & -\frac{3}{2} & -1 \\
0 & \mathbf{1} & \frac{3}{4} \\
0 & 0 & \mathbf{1}
\end{array}\right]
\quad \text{(REF)}
$$

Continuing Gauss–Jordan elimination:
$$
\xrightarrow{R_1 \to R_1 + R_3, \, R_2 \to R_2 - \frac{3}{4} R_3}
\left[\begin{array}{rr|r}
\mathbf{1} & -\frac{3}{2} & 0 \\
0 & \mathbf{1} & 0 \\
0 & 0 & \mathbf{1}
\end{array}\right]
\xrightarrow{R_1 \to R_1 + \frac{3}{2} R_2}
\left[\begin{array}{rr|r}
\mathbf{1} & 0 & 0 \\
0 & \mathbf{1} & 0 \\
0 & 0 & \mathbf{1}
\end{array}\right]
\quad \text{(RREF)}
$$

The third row corresponds to the equation:
$$
0x_1 + 0x_2 = 1 \quad \Longrightarrow \quad 0 = 1 \quad \text{(Contradiction!)}
$$
**Conclusion:** The system is inconsistent; solution set $S = \emptyset$.

---

### Example 4: System with Free Variables ($\infty$ Solutions)

Solve by Gaussian and Gauss–Jordan elimination:

**Version 1 formulation:**
$$
\begin{cases}
3x - y + z - 7w = 13 \\
-2x + y - z - 3w = -9 \\
-2x + y - 7w = -8
\end{cases}
$$

Augmented matrix:
$$
\left[\begin{array}{rrrr|r}
3 & -1 & 1 & -7 & 13 \\
-2 & 1 & -1 & -3 & -9 \\
-2 & 1 & 0 & -7 & -8
\end{array}\right]
$$

*Reduction:*
1. $R_1 \to R_1 + R_2$:
   $$
   \left[\begin{array}{rrrr|r}
   \mathbf{1} & 0 & 0 & -10 & 4 \\
   -2 & 1 & -1 & -3 & -9 \\
   -2 & 1 & 0 & -7 & -8
   \end{array}\right]
   $$
2. $R_2 \to R_2 + 2R_1, \, R_3 \to R_3 + 2R_1$:
   $$
   \left[\begin{array}{rrrr|r}
   \mathbf{1} & 0 & 0 & -10 & 4 \\
   0 & \mathbf{1} & -1 & -23 & -1 \\
   0 & 1 & 0 & -27 & 0
   \end{array}\right]
   $$
3. $R_3 \to R_3 - R_2$:
   $$
   \left[\begin{array}{rrrr|r}
   \mathbf{1} & 0 & 0 & -10 & 4 \\
   0 & \mathbf{1} & -1 & -23 & -1 \\
   0 & 0 & \mathbf{1} & -4 & 1
   \end{array}\right]
   \quad \text{(REF)}
   $$

*Analysis:*
- Leading variables: $x, y, z$ (columns 1, 2, 3 have pivots).
- Free variable: $w = r \in \mathbb{R}$.
- From row 3: $z - 4r = 1 \implies z = 1 + 4r$.
- From row 2: $y - z - 23r = -1 \implies y = -1 + 23r + (1 + 4r) = 27r$.
- From row 1: $x - 10r = 4 \implies x = 4 + 10r$.

*Gauss–Jordan backward step ($R_2 \to R_2 + R_3$):*
$$
\left[\begin{array}{rrrr|r}
\mathbf{1} & 0 & 0 & -10 & 4 \\
0 & \mathbf{1} & 0 & -27 & 0 \\
0 & 0 & \mathbf{1} & -4 & 1
\end{array}\right]
\quad \text{(RREF)}
$$
Direct reading confirms: $x = 4 + 10r, \, y = 27r, \, z = 1 + 4r, \, w = r$.

**Solution set:**
$$
S = \{ (4 + 10r, \, 27r, \, 1 + 4r, \, r) : r \in \mathbb{R} \}
$$

**Version 2 formulation (with $+7w$):**
$$
\begin{cases}
3x - y + z + 7w = 13 \\
-2x + y - z - 3w = -9 \\
-2x + y - 7w = -8
\end{cases}
$$
Following identical row operations yields the RREF:
$$
\left[\begin{array}{rrrr|r}
\mathbf{1} & 0 & 0 & 4 & 4 \\
0 & \mathbf{1} & 0 & 1 & 0 \\
0 & 0 & \mathbf{1} & -4 & 1
\end{array}\right]
\quad \Longrightarrow \quad
\begin{cases}
x = 4 - 4r \\
y = -r \\
z = 1 + 4r \\
w = r \in \mathbb{R}
\end{cases}
$$
Solution set: $S = \{ (4 - 4r, \, -r, \, 1 + 4r, \, r) : r \in \mathbb{R} \}$.

---

### Example 5: Underdetermined System with 2 Free Parameters

Solve by Gaussian elimination:
$$
\begin{cases}
-2z + 7v = 12 \\
2x + 4y - 10z + 6u + 12v = 28 \\
2x + 4y - 5z + 6u - 5v = -1
\end{cases}
$$

Variables: $x, y, z, u, v$ ($p=5$ variables, $n=3$ equations).

#### Augmented Matrix and Reduction:
$$
\left[\begin{array}{rrrrr|r}
0 & 0 & -2 & 0 & 7 & 12 \\
2 & 4 & -10 & 6 & 12 & 28 \\
2 & 4 & -5 & 6 & -5 & -1
\end{array}\right]
\xrightarrow{R_1 \longleftrightarrow R_2}
\left[\begin{array}{rrrrr|r}
2 & 4 & -10 & 6 & 12 & 28 \\
0 & 0 & -2 & 0 & 7 & 12 \\
2 & 4 & -5 & 6 & -5 & -1
\end{array}\right]
$$
$$
\xrightarrow{R_1 \to \frac{1}{2} R_1}
\left[\begin{array}{rrrrr|r}
\mathbf{1} & 2 & -5 & 3 & 6 & 14 \\
0 & 0 & -2 & 0 & 7 & 12 \\
2 & 4 & -5 & 6 & -5 & -1
\end{array}\right]
\xrightarrow{R_3 \to R_3 - 2R_1}
\left[\begin{array}{rrrrr|r}
\mathbf{1} & 2 & -5 & 3 & 6 & 14 \\
0 & 0 & -2 & 0 & 7 & 12 \\
0 & 0 & 5 & 0 & -17 & -29
\end{array}\right]
$$
$$
\xrightarrow{R_2 \to -\frac{1}{2} R_2}
\left[\begin{array}{rrrrr|r}
\mathbf{1} & 2 & -5 & 3 & 6 & 14 \\
0 & 0 & \mathbf{1} & 0 & -\frac{7}{2} & -6 \\
0 & 0 & 5 & 0 & -17 & -29
\end{array}\right]
\xrightarrow{R_3 \to R_3 - 5R_2}
\left[\begin{array}{rrrrr|r}
\mathbf{1} & 2 & -5 & 3 & 6 & 14 \\
0 & 0 & \mathbf{1} & 0 & -\frac{7}{2} & -6 \\
0 & 0 & 0 & 0 & \frac{1}{2} & 1
\end{array}\right]
$$
$$
\xrightarrow{R_3 \to 2R_3}
\left[\begin{array}{rrrrr|r}
\mathbf{1} & 2 & -5 & 3 & 6 & 14 \\
0 & 0 & \mathbf{1} & 0 & -\frac{7}{2} & -6 \\
0 & 0 & 0 & 0 & \mathbf{1} & 2
\end{array}\right]
\quad \text{(REF)}
$$

- Pivot columns: $1, 3, 5 \implies x, z, v$ are **leading variables**.
- Non-pivot columns: $2, 4 \implies y = r, \, u = s$ ($r, s \in \mathbb{R}$) are **free variables**.
- Solving upward:
  - $v = 2$
  - $z - \frac{7}{2}(2) = -6 \implies z - 7 = -6 \implies z = 1$
  - $x + 2r - 5(1) + 3s + 6(2) = 14 \implies x + 2r + 3s + 7 = 14 \implies x = 7 - 2r - 3s$

**Reduced RREF form:**
$$
\left[\begin{array}{rrrrr|r}
\mathbf{1} & 2 & 0 & 3 & 0 & 7 \\
0 & 0 & \mathbf{1} & 0 & 0 & 1 \\
0 & 0 & 0 & 0 & \mathbf{1} & 2
\end{array}\right]
$$

**Solution set:**
$$
S = \{ (7 - 2r - 3s, \, r, \, 1, \, s, \, 2) : r, s \in \mathbb{R} \}
$$

---

### Example 6: System Depending on a Parameter $a$

Find the values of the parameter $a$ for which the following linear system has:
(a) a unique solution,
(b) infinitely many solutions,
(c) no solution.

$$
\begin{cases}
x + 2y - 3z = 4 \\
3x - y + 5z = 2 \\
4x + y + (a^2 - 2)z = a + 4
\end{cases}
$$

#### Augmented Matrix and Row Reduction:
$$
\left[\begin{array}{ccc|c}
\mathbf{1} & 2 & -3 & 4 \\
3 & -1 & 5 & 2 \\
4 & 1 & a^2 - 2 & a + 4
\end{array}\right]
\xrightarrow{R_2 \to R_2 - 3R_1, \, R_3 \to R_3 - 4R_1}
\left[\begin{array}{ccc|c}
\mathbf{1} & 2 & -3 & 4 \\
0 & -7 & 14 & -10 \\
0 & -7 & a^2 + 10 & a - 12
\end{array}\right]
$$

Apply $R_3 \to R_3 - R_2$ and $R_2 \to -\frac{1}{7} R_2$:
$$
\left[\begin{array}{ccc|c}
\mathbf{1} & 2 & -3 & 4 \\
0 & \mathbf{1} & -2 & \frac{10}{7} \\
0 & 0 & a^2 - 4 & a - 2
\end{array}\right]
$$

#### Case Analysis on $a$:

1. **Case 1: $a^2 - 4 \ne 0 \iff a \ne \pm 2$ ($a \notin \{2, -2\}$):**
   The entry $(a^2 - 4)$ is non-zero, allowing $R_3 \to \frac{1}{a^2 - 4} R_3$:
   $$
   \frac{a-2}{a^2-4} = \frac{a-2}{(a-2)(a+2)} = \frac{1}{a+2}
   $$
   The matrix becomes:
   $$
   \left[\begin{array}{ccc|c}
   \mathbf{1} & 2 & -3 & 4 \\
   0 & \mathbf{1} & -2 & \frac{10}{7} \\
   0 & 0 & \mathbf{1} & \frac{1}{a+2}
   \end{array}\right]
   $$
   Every column of the coefficient matrix contains a pivot. The system has a **unique solution**:
   $$
   z = \frac{1}{a+2}, \quad y = \frac{10}{7} + \frac{2}{a+2}, \quad x = \dots
   $$

2. **Case 2: $a = 2$:**
   Substitute $a = 2$ into the bottom row:
   $$
   a^2 - 4 = 2^2 - 4 = 0, \quad a - 2 = 2 - 2 = 0
   $$
   $$
   \left[\begin{array}{ccc|c}
   \mathbf{1} & 2 & -3 & 4 \\
   0 & \mathbf{1} & -2 & \frac{10}{7} \\
   0 & 0 & 0 & 0
   \end{array}\right]
   $$
   The bottom row is entirely zeros ($0 = 0$). Variable $z$ is free, yielding **infinitely many solutions**.

3. **Case 3: $a = -2$:**
   Substitute $a = -2$ into the bottom row:
   $$
   a^2 - 4 = (-2)^2 - 4 = 0, \quad a - 2 = -2 - 2 = -4
   $$
   $$
   \left[\begin{array}{ccc|c}
   \mathbf{1} & 2 & -3 & 4 \\
   0 & \mathbf{1} & -2 & \frac{10}{7} \\
   0 & 0 & 0 & -4
   \end{array}\right]
   $$
   The third row represents $0x + 0y + 0z = -4 \iff 0 = -4$, which is impossible.
   Therefore, the system has **no solution** (inconsistent).

---

## 5. Supplementary Course Insights & Reconciled Content

*(Integrated from LinearLab interactive lesson modules: `row-operations.mdx`, `echelon-forms.mdx`, `gauss-jordan-elimination.mdx`, `general-solutions.mdx`)*

### Uniqueness of RREF
While a given matrix has infinitely many different Row-Echelon Forms depending on the sequence of operations chosen, its **Reduced Row-Echelon Form (RREF) is strictly unique**. Every matrix has one and only one RREF.

### Why Elementary Row Operations Preserve Solutions
Each of the three elementary row operations corresponds to an invertible linear transformation. If $E$ is an elementary matrix representing a row operation, $E$ is always invertible. Thus, the system $AX = B$ is equivalent to $(EA)X = (EB)$, sharing precisely the identical solution set.

---

## 6. Archival Source Reference & Verification Ledger

The 30 source image assets for this chapter are mapped as follows:

| Source File | Source ID | Page | Part | Local Asset Path | Coverage Anchor |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `1.2 GaussJordan elimination.pdf` | `1_howvee-xm2zxP24DqQcQA1nZ8PqCKPg` | 1 | 1 | `../assets/02-gauss-jordan-1/page-001-part-001.webp` | [§ 1.1](#11-row-echelon-form-ref) |
| `1.2 GaussJordan elimination.pdf` | `1_howvee-xm2zxP24DqQcQA1nZ8PqCKPg` | 1 | 2 | `../assets/02-gauss-jordan-1/page-001-part-002.webp` | [§ 1.1 & § 1.2](#12-reduced-row-echelon-form-rref) |
| `1.2 GaussJordan elimination.pdf` | `1_howvee-xm2zxP24DqQcQA1nZ8PqCKPg` | 1 | 3 | `../assets/02-gauss-jordan-1/page-001-part-003.webp` | [§ 2](#2-classification-examples-ref-vs-rref-vs-neither) |
| `1.2 GaussJordan elimination.pdf` | `1_howvee-xm2zxP24DqQcQA1nZ8PqCKPg` | 1 | 4 | `../assets/02-gauss-jordan-1/page-001-part-004.webp` | [§ 3](#3-elementary-row-operations-and-algorithms) |
| `1.2 GaussJordan elimination.pdf` | `1_howvee-xm2zxP24DqQcQA1nZ8PqCKPg` | 1 | 5 | `../assets/02-gauss-jordan-1/page-001-part-005.webp` | [§ 4 Example 1](#example-1-reducing-a-3-times-4-matrix-to-ref-and-rref) |
| `1.2 GaussJordan elimination.pdf` | `1_howvee-xm2zxP24DqQcQA1nZ8PqCKPg` | 1 | 6 | `../assets/02-gauss-jordan-1/page-001-part-006.webp` | [§ 4 Example 1 Forward/Backward](#forward-phase-gaussian-elimination) |
| `1.2 GaussJordan elimination.pdf` | `1_howvee-xm2zxP24DqQcQA1nZ8PqCKPg` | 1 | 7 | `../assets/02-gauss-jordan-1/page-001-part-007.webp` | [§ 4 Example 1 End & Example 2 Setup](#backward-phase-gaussjordan-elimination) |
| `1.2 GaussJordan elimination.pdf` | `1_howvee-xm2zxP24DqQcQA1nZ8PqCKPg` | 1 | 8 | `../assets/02-gauss-jordan-1/page-001-part-008.webp` | [§ 4 Example 3](#example-3-inconsistent-linear-system-s--emptyset) |
| `1.2 GaussJordan elimination.pdf` | `1_howvee-xm2zxP24DqQcQA1nZ8PqCKPg` | 1 | 9 | `../assets/02-gauss-jordan-1/page-001-part-009.webp` | [§ 4 Example 3 Reduction](#augmented-matrix-and-reduction-1) |
| `1.2 GaussJordan elimination.pdf` | `1_howvee-xm2zxP24DqQcQA1nZ8PqCKPg` | 1 | 10 | `../assets/02-gauss-jordan-1/page-001-part-010.webp` | [§ 4 Example 3 Inconsistency & Example 4 Setup](#example-4-system-with-free-variables-infty-solutions) |
| `1.2 GaussJordan elimination.pdf` | `1_howvee-xm2zxP24DqQcQA1nZ8PqCKPg` | 1 | 11 | `../assets/02-gauss-jordan-1/page-001-part-011.webp` | [§ 4 Example 4 Solution](#example-4-system-with-free-variables-infty-solutions) |
| `1.2 GaussJordan elimination.pdf` | `1_howvee-xm2zxP24DqQcQA1nZ8PqCKPg` | 1 | 12 | `../assets/02-gauss-jordan-1/page-001-part-012.webp` | [§ 4 Example 5 Setup](#example-5-underdetermined-system-with-2-free-parameters) |
| `1.2 GaussJordan elimination.pdf` | `1_howvee-xm2zxP24DqQcQA1nZ8PqCKPg` | 1 | 13 | `../assets/02-gauss-jordan-1/page-001-part-013.webp` | [§ 4 Example 5 Reduction](#augmented-matrix-and-reduction-2) |
| `1.2 GaussJordan elimination.pdf` | `1_howvee-xm2zxP24DqQcQA1nZ8PqCKPg` | 1 | 14 | `../assets/02-gauss-jordan-1/page-001-part-014.webp` | [§ 4 Example 6 Setup & Reduction](#example-6-system-depending-on-a-parameter-a) |
| `1.2 GaussJordan elimination.pdf` | `1_howvee-xm2zxP24DqQcQA1nZ8PqCKPg` | 1 | 15 | `../assets/02-gauss-jordan-1/page-001-part-015.webp` | [§ 4 Example 6 Case Analysis](#case-analysis-on-a) |
| `1.2 Gaussian elimination.pdf` | `1n8MA2sIJjHe4U7uPpcxuJYxQ3Qzt4uY4` | 1 | 1 | `../assets/02-gauss-jordan-2/page-001-part-001.webp` | [§ 1.1](#11-row-echelon-form-ref) |
| `1.2 Gaussian elimination.pdf` | `1n8MA2sIJjHe4U7uPpcxuJYxQ3Qzt4uY4` | 1 | 2 | `../assets/02-gauss-jordan-2/page-001-part-002.webp` | [§ 1.2](#12-reduced-row-echelon-form-rref) |
| `1.2 Gaussian elimination.pdf` | `1n8MA2sIJjHe4U7uPpcxuJYxQ3Qzt4uY4` | 1 | 3 | `../assets/02-gauss-jordan-2/page-001-part-003.webp` | [§ 2](#2-classification-examples-ref-vs-rref-vs-neither) |
| `1.2 Gaussian elimination.pdf` | `1n8MA2sIJjHe4U7uPpcxuJYxQ3Qzt4uY4` | 1 | 4 | `../assets/02-gauss-jordan-2/page-001-part-004.webp` | [§ 3](#3-elementary-row-operations-and-algorithms) |
| `1.2 Gaussian elimination.pdf` | `1n8MA2sIJjHe4U7uPpcxuJYxQ3Qzt4uY4` | 1 | 5 | `../assets/02-gauss-jordan-2/page-001-part-005.webp` | [§ 4 Example 1](#example-1-reducing-a-3-times-4-matrix-to-ref-and-rref) |
| `1.2 Gaussian elimination.pdf` | `1n8MA2sIJjHe4U7uPpcxuJYxQ3Qzt4uY4` | 1 | 6 | `../assets/02-gauss-jordan-2/page-001-part-006.webp` | [§ 4 Example 1 Forward/Backward](#forward-phase-gaussian-elimination) |
| `1.2 Gaussian elimination.pdf` | `1n8MA2sIJjHe4U7uPpcxuJYxQ3Qzt4uY4` | 1 | 7 | `../assets/02-gauss-jordan-2/page-001-part-007.webp` | [§ 4 Example 2 Setup](#example-2-solving-a-consistent-3-times-3-system-unique-solution) |
| `1.2 Gaussian elimination.pdf` | `1n8MA2sIJjHe4U7uPpcxuJYxQ3Qzt4uY4` | 1 | 8 | `../assets/02-gauss-jordan-2/page-001-part-008.webp` | [§ 4 Example 2 Solution](#augmented-matrix-and-reduction) |
| `1.2 Gaussian elimination.pdf` | `1n8MA2sIJjHe4U7uPpcxuJYxQ3Qzt4uY4` | 1 | 9 | `../assets/02-gauss-jordan-2/page-001-part-009.webp` | [§ 4 Example 3 Alternative](#example-3-inconsistent-linear-system-s--emptyset) |
| `1.2 Gaussian elimination.pdf` | `1n8MA2sIJjHe4U7uPpcxuJYxQ3Qzt4uY4` | 1 | 10 | `../assets/02-gauss-jordan-2/page-001-part-010.webp` | [§ 4 Example 3 Inconsistency](#augmented-matrix-and-reduction-1) |
| `1.2 Gaussian elimination.pdf` | `1n8MA2sIJjHe4U7uPpcxuJYxQ3Qzt4uY4` | 1 | 11 | `../assets/02-gauss-jordan-2/page-001-part-011.webp` | [§ 4 Example 4 (Version 2)](#example-4-system-with-free-variables-infty-solutions) |
| `1.2 Gaussian elimination.pdf` | `1n8MA2sIJjHe4U7uPpcxuJYxQ3Qzt4uY4` | 1 | 12 | `../assets/02-gauss-jordan-2/page-001-part-012.webp` | [§ 4 Example 4 Solution](#example-4-system-with-free-variables-infty-solutions) |
| `1.2 Gaussian elimination.pdf` | `1n8MA2sIJjHe4U7uPpcxuJYxQ3Qzt4uY4` | 1 | 13 | `../assets/02-gauss-jordan-2/page-001-part-013.webp` | [§ 4 Example 5 Gauss-Jordan RREF](#reduced-rref-form) |
| `1.2 Gaussian elimination.pdf` | `1n8MA2sIJjHe4U7uPpcxuJYxQ3Qzt4uY4` | 1 | 14 | `../assets/02-gauss-jordan-2/page-001-part-014.webp` | [§ 4 Example 6 Setup](#example-6-system-depending-on-a-parameter-a) |
| `1.2 Gaussian elimination.pdf` | `1n8MA2sIJjHe4U7uPpcxuJYxQ3Qzt4uY4` | 1 | 15 | `../assets/02-gauss-jordan-2/page-001-part-015.webp` | [§ 4 Example 6 Cases](#case-analysis-on-a) |
