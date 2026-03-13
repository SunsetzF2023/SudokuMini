import React, { useState, useEffect, useCallback } from 'react';
import { SudokuGridComponent } from './components/SudokuGrid';
import { NumberPad } from './components/NumberPad';
import { SudokuGenerator } from './utils/sudoku';
import type { GameState, CellValue, SudokuGrid } from './types/sudoku';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    grid: [],
    solution: [],
    selectedCell: null,
    isComplete: false,
    difficulty: 'easy',
  });

  const [highlightedCells, setHighlightedCells] = useState<Set<string>>(new Set());
  const [errorCells, setErrorCells] = useState<Set<string>>(new Set());
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);

  // 初始化游戏
  const initGame = useCallback((difficulty: 'easy' | 'medium' | 'hard') => {
    const solution = SudokuGenerator.generateSolution();
    const puzzle = SudokuGenerator.generatePuzzle(solution, difficulty);
    
    setGameState({
      grid: puzzle,
      solution,
      selectedCell: null,
      isComplete: false,
      difficulty,
    });
    setHighlightedCells(new Set());
    setErrorCells(new Set());
    setSelectedNumber(null);
  }, []);

  // 组件挂载时初始化游戏
  useEffect(() => {
    initGame('easy');
  }, [initGame]);

  // 更新高亮格子
  const updateHighlightedCells = useCallback((row: number, col: number) => {
    const highlighted = new Set<string>();
    const value = gameState.grid[row][col];
    
    // 高亮同行、同列、同九宫格
    for (let i = 0; i < 9; i++) {
      highlighted.add(`${row}-${i}`);
      highlighted.add(`${i}-${col}`);
    }
    
    // 高亮同九宫格
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = boxRow; i < boxRow + 3; i++) {
      for (let j = boxCol; j < boxCol + 3; j++) {
        highlighted.add(`${i}-${j}`);
      }
    }
    
    // 高亮相同数字
    if (value !== 0) {
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (gameState.grid[i][j] === value) {
            highlighted.add(`${i}-${j}`);
          }
        }
      }
    }
    
    setHighlightedCells(highlighted);
  }, [gameState.grid]);

  // 检查错误
  const checkErrors = useCallback((grid: SudokuGrid) => {
    const errors = new Set<string>();
    
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const value = grid[row][col];
        if (value === 0) continue;
        
        // 检查行冲突
        for (let x = 0; x < 9; x++) {
          if (x !== col && grid[row][x] === value) {
            errors.add(`${row}-${col}`);
            errors.add(`${row}-${x}`);
          }
        }
        
        // 检查列冲突
        for (let x = 0; x < 9; x++) {
          if (x !== row && grid[x][col] === value) {
            errors.add(`${row}-${col}`);
            errors.add(`${x}-${col}`);
          }
        }
        
        // 检查九宫格冲突
        const boxRow = Math.floor(row / 3) * 3;
        const boxCol = Math.floor(col / 3) * 3;
        for (let i = boxRow; i < boxRow + 3; i++) {
          for (let j = boxCol; j < boxCol + 3; j++) {
            if ((i !== row || j !== col) && grid[i][j] === value) {
              errors.add(`${row}-${col}`);
              errors.add(`${i}-${j}`);
            }
          }
        }
      }
    }
    
    setErrorCells(errors);
  }, []);

  // 处理格子点击
  const handleCellClick = useCallback((row: number, col: number) => {
    setGameState(prev => ({ ...prev, selectedCell: { row, col } }));
    updateHighlightedCells(row, col);
  }, [updateHighlightedCells]);

  // 处理数字输入
  const handleNumberInput = useCallback((number: number) => {
    if (!gameState.selectedCell) return;
    
    const { row, col } = gameState.selectedCell;
    const newGrid = gameState.grid.map(r => [...r]);
    
    // 检查是否为固定格子（题目给出的数字）
    const isFixed = gameState.solution[row][col] !== 0 && 
                   gameState.grid[row][col] !== 0 && 
                   gameState.grid[row][col] === gameState.solution[row][col];
    
    if (isFixed) return;
    
    newGrid[row][col] = number as CellValue;
    
    setGameState(prev => ({
      ...prev,
      grid: newGrid,
      isComplete: SudokuGenerator.checkWin(newGrid, gameState.solution),
    }));
    
    checkErrors(newGrid);
    setSelectedNumber(number);
  }, [gameState.selectedCell, gameState.grid, gameState.solution, checkErrors]);

  // 处理清除
  const handleClear = useCallback(() => {
    if (!gameState.selectedCell) return;
    
    const { row, col } = gameState.selectedCell;
    const newGrid = gameState.grid.map(r => [...r]);
    
    // 检查是否为固定格子
    const isFixed = gameState.solution[row][col] !== 0 && 
                   gameState.grid[row][col] !== 0 && 
                   gameState.grid[row][col] === gameState.solution[row][col];
    
    if (isFixed) return;
    
    newGrid[row][col] = 0;
    
    setGameState(prev => ({
      ...prev,
      grid: newGrid,
      isComplete: false,
    }));
    
    checkErrors(newGrid);
    setSelectedNumber(null);
  }, [gameState.selectedCell, gameState.grid, gameState.solution, checkErrors]);

  // 键盘事件处理
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameState.selectedCell) return;
      
      const key = e.key;
      if (key >= '1' && key <= '9') {
        handleNumberInput(parseInt(key));
      } else if (key === 'Delete' || key === 'Backspace' || key === '0') {
        handleClear();
      } else if (key === 'ArrowUp' && gameState.selectedCell.row > 0) {
        handleCellClick(gameState.selectedCell.row - 1, gameState.selectedCell.col);
      } else if (key === 'ArrowDown' && gameState.selectedCell.row < 8) {
        handleCellClick(gameState.selectedCell.row + 1, gameState.selectedCell.col);
      } else if (key === 'ArrowLeft' && gameState.selectedCell.col > 0) {
        handleCellClick(gameState.selectedCell.row, gameState.selectedCell.col - 1);
      } else if (key === 'ArrowRight' && gameState.selectedCell.col < 8) {
        handleCellClick(gameState.selectedCell.row, gameState.selectedCell.col + 1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState.selectedCell, handleNumberInput, handleClear, handleCellClick]);

  return (
    <div className="min-h-screen bg-editor-bg flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-mono text-editor-text mb-2">SudokuMini</h1>
          <p className="text-editor-text opacity-70">深色模式数独游戏</p>
        </header>

        {gameState.isComplete && (
          <div className="text-center mb-6 p-4 bg-green-900 bg-opacity-30 border border-green-500 rounded-lg">
            <p className="text-green-400 text-xl font-mono">🎉 恭喜完成！</p>
          </div>
        )}

        <main className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          <div className="flex flex-col items-center">
            <SudokuGridComponent
              grid={gameState.grid}
              selectedCell={gameState.selectedCell}
              onCellClick={handleCellClick}
              highlightedCells={highlightedCells}
              errorCells={errorCells}
            />
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <h3 className="text-editor-text font-mono mb-3">数字输入</h3>
              <NumberPad
                onNumberClick={handleNumberInput}
                onClearClick={handleClear}
                selectedNumber={selectedNumber}
              />
            </div>

            <div>
              <h3 className="text-editor-text font-mono mb-3">难度选择</h3>
              <div className="flex flex-col gap-2">
                {(['easy', 'medium', 'hard'] as const).map((level) => (
                  <button
                    key={level}
                    className={`number-button text-left ${
                      gameState.difficulty === level ? 'bg-editor-selected border-editor-accent' : ''
                    }`}
                    onClick={() => initGame(level)}
                  >
                    {level === 'easy' ? '简单' : level === 'medium' ? '中等' : '困难'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-editor-text font-mono mb-3">操作说明</h3>
              <div className="text-editor-text opacity-70 text-sm font-mono space-y-1">
                <p>• 点击格子选中</p>
                <p>• 使用数字键 1-9 填入</p>
                <p>• Delete/Backspace 清除</p>
                <p>• 方向键移动选择</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
