export const TOOLS = [
  {
    href: '/tools/rref/',
    nameKey: 'tools.rref.name',
    shortNameKey: 'tools.rref.name',
    descriptionKey: 'tools.rref.description',
    name: 'System solver',
    shortName: 'System solver',
    description:
      'Gauss–Jordan elimination on [A | b] with every row operation explained, playback controls, and a classified answer: one solution, infinitely many, or none.',
  },
  {
    href: '/tools/matrices/',
    nameKey: 'tools.matrices.name',
    shortNameKey: 'tools.matrices.name',
    descriptionKey: 'tools.matrices.description',
    name: 'Matrix operations',
    shortName: 'Matrix operations',
    description:
      'Add, subtract, multiply (with a step-by-step visualizer), scale and transpose; find determinants, inverses, rank, column space and null space.',
  },
  {
    href: '/tools/determinant/',
    nameKey: 'tools.determinant.name',
    shortNameKey: 'tools.determinant.short',
    descriptionKey: 'tools.determinant.description',
    name: 'Determinant calculators',
    shortName: 'Determinants',
    description: '2×2 and 3×3 determinants worked out the way you would on paper: ad − bc, cofactor expansion and the diagonal rule.',
  },
  {
    href: '/tools/cramer/',
    nameKey: 'tools.cramer.name',
    shortNameKey: 'tools.cramer.name',
    descriptionKey: 'tools.cramer.description',
    name: 'Cramer’s rule',
    shortName: 'Cramer’s rule',
    description: 'Solve 2×2 and 3×3 systems with determinants, and see why the rule fails when det(A) = 0.',
  },
] as const
