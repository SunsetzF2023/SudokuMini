export type CellValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type SudokuGrid = CellValue[][];

export interface Cell {
  row: number;
  col: number;
  value: CellValue;
  isFixed: boolean;
  isError?: boolean;
}

export interface GameState {
  grid: SudokuGrid;
  solution: SudokuGrid;
  selectedCell: { row: number; col: number } | null;
  isComplete: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
}
