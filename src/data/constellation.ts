// The eight areas as a constellation. Index 0 is the core (the HumanCorp orb).
// Positions are fractions of the hero stage.
export const nodes = [
  { l: 'HumanCorp', x: 0.5, y: 0.5 },
  { l: 'Diseño', x: 0.33, y: 0.24 },
  { l: 'Desarrollo', x: 0.52, y: 0.15 },
  { l: 'Marketing', x: 0.71, y: 0.25 },
  { l: 'Ventas · CRM', x: 0.39, y: 0.38 },
  { l: 'IA', x: 0.62, y: 0.37 },
  { l: 'Finanzas', x: 0.37, y: 0.67 },
  { l: 'Operaciones', x: 0.63, y: 0.68 },
  { l: 'Datos', x: 0.5, y: 0.82 },
];

export const edges: [number, number][] = [
  [0, 4], [0, 5], [0, 6], [0, 7], [0, 8], [0, 2],
  [1, 2], [2, 3], [1, 4], [2, 4], [2, 5], [3, 5],
  [4, 6], [5, 7], [6, 8], [7, 8],
];
