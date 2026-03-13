import React from 'react';

interface NumberPadProps {
  onNumberClick: (number: number) => void;
  onClearClick: () => void;
  selectedNumber: number | null;
}

export const NumberPad: React.FC<NumberPadProps> = ({
  onNumberClick,
  onClearClick,
  selectedNumber,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            className={`number-button ${selectedNumber === num ? 'bg-editor-selected border-editor-accent' : ''}`}
            onClick={() => onNumberClick(num)}
          >
            {num}
          </button>
        ))}
      </div>
      <button
        className="number-button"
        onClick={onClearClick}
      >
        清除
      </button>
    </div>
  );
};
