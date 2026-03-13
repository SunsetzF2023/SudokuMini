import { CellValue, SudokuGrid } from '../types/sudoku';

export class SudokuGenerator {
  private static isValid(grid: SudokuGrid, row: number, col: number, num: CellValue): boolean {
    // 检查行
    for (let x = 0; x < 9; x++) {
      if (grid[row][x] === num) return false;
    }
    
    // 检查列
    for (let x = 0; x < 9; x++) {
      if (grid[x][col] === num) return false;
    }
    
    // 检查3x3九宫格
    const startRow = row - (row % 3);
    const startCol = col - (col % 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[i + startRow][j + startCol] === num) return false;
      }
    }
    
    return true;
  }

  private static solveSudoku(grid: SudokuGrid): boolean {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (this.isValid(grid, row, col, num as CellValue)) {
              grid[row][col] = num as CellValue;
              if (this.solveSudoku(grid)) {
                return true;
              }
              grid[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  static generateSolution(): SudokuGrid {
    const grid: SudokuGrid = Array(9).fill(null).map(() => Array(9).fill(0));
    
    // 填充对角线的3x3九宫格（它们不会相互影响）
    for (let box = 0; box < 9; box += 3) {
      const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9] as CellValue[];
      this.shuffle(nums);
      
      let index = 0;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          grid[box + i][box + j] = nums[index++];
        }
      }
    }
    
    // 使用回溯算法解决剩余的格子
    this.solveSudoku(grid);
    
    return grid;
  }

  private static shuffle<T>(array: T[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  static generatePuzzle(solution: SudokuGrid, difficulty: 'easy' | 'medium' | 'hard'): SudokuGrid {
    const puzzle = solution.map(row => [...row]);
    const cellsToRemove = difficulty === 'easy' ? 35 : difficulty === 'medium' ? 45 : 55;
    
    const positions: [number, number][] = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        positions.push([i, j]);
      }
    }
    
    this.shuffle(positions);
    
    for (let i = 0; i < cellsToRemove; i++) {
      const [row, col] = positions[i];
      puzzle[row][col] = 0;
    }
    
    return puzzle;
  }

  static isValidMove(grid: SudokuGrid, row: number, col: number, num: CellValue): boolean {
    return this.isValid(grid, row, col, num);
  }

  static isComplete(grid: SudokuGrid): boolean {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === 0) return false;
      }
    }
    return true;
  }

  static checkWin(grid: SudokuGrid, solution: SudokuGrid): boolean {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] !== solution[row][col]) return false;
      }
    }
    return true;
  }
}
