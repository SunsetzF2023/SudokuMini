import React from 'react';
import type { CellValue, SudokuGrid } from '../types/sudoku';

interface SudokuGridProps {
  grid: SudokuGrid;
  selectedCell: { row: number; col: number } | null;
  onCellClick: (row: number, col: number) => void;
  highlightedCells: Set<string>;
  errorCells: Set<string>;
}

export const SudokuGridComponent: React.FC<SudokuGridProps> = ({
  grid,
  selectedCell,
  onCellClick,
  highlightedCells,
  errorCells,
}) => {
  const getCellClass = (row: number, col: number, value: CellValue): string => {
    const cellKey = `${row}-${col}`;
    let classes = 'sudoku-cell';
    
    // 添加边框样式
    if (row % 3 === 0 && row !== 0) classes += ' border-t-2';
    if (col % 3 === 0 && col !== 0) classes += ' border-l-2';
    if (row === 8) classes += ' border-b-2';
    if (col === 8) classes += ' border-r-2';
    
    // 选中状态
    if (selectedCell?.row === row && selectedCell?.col === col) {
      classes += ' selected';
    }
    
    // 高亮相关格子
    if (highlightedCells.has(cellKey)) {
      classes += ' highlighted';
    }
    
    // 错误状态
    if (errorCells.has(cellKey)) {
      classes += ' error';
    }
    
    // 固定数字（题目给出的数字）
    if (value !== 0) {
      classes += ' fixed';
    }
    
    return classes;
  };

  const getCellValue = (value: CellValue): string => {
    return value === 0 ? '' : value.toString();
  };

  return (
    <div className="inline-block bg-editor-surface border-2 border-editor-border rounded-lg p-2">
      <div className="grid grid-cols-9 gap-0">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={getCellClass(rowIndex, colIndex, cell)}
              onClick={() => onCellClick(rowIndex, colIndex)}
              style={{ width: '48px', height: '48px' }}
            >
              {getCellValue(cell)}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
