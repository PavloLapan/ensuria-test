import React, { ChangeEventHandler, FC, useRef, useState } from "react";
import { DatasetList } from "../../Types/DatasetList.ts";
import { FixedSizeList as List } from 'react-window';

type SelectProps = {
  onChange: ChangeEventHandler<HTMLSelectElement>,
  options: [] | DatasetList[],
  value: string | undefined,
  className?: string
}

const ITEM_HEIGHT = 35;
const CONTAINER_HEIGHT = 200;

export const Select: FC<SelectProps> = ({ options, value, onChange, className }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const selectRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<List>(null);
  const blurTimeout = useRef<number | undefined>(undefined);

  const handleToggle = () => setIsOpen(prev => !prev);

  const handleFocus = () => {
    clearTimeout(blurTimeout.current);
    setIsOpen(true);
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    blurTimeout.current = window.setTimeout(() => {
      if (selectRef.current && !selectRef.current.contains(e.relatedTarget)) {
        setIsOpen(false);
      }
    }, 100);
  };

  //can decompose below

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case 'ArrowDown':
        setHighlightedIndex(prev => {
          const newIndex = prev === null ? 0 : Math.min(prev + 1, options.length - 1);
          if (listRef.current) {
            listRef.current.scrollToItem(newIndex);
          }
          return newIndex;
        });
        break;
      case 'ArrowUp':
        setHighlightedIndex(prev => {
          const newIndex = prev === null ? options.length - 1 : Math.max(prev - 1, 0);
          if (listRef.current) {
            listRef.current.scrollToItem(newIndex);
          }
          return newIndex;
        });
        break;
      case 'Enter':
        if (highlightedIndex !== null) {
          onChange({ target: { value: options[highlightedIndex].Name } } as React.ChangeEvent<HTMLSelectElement>);
          setIsOpen(false);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  const handleOptionClick = (index: number) => {
    onChange({ target: { value: options[index].Name } } as React.ChangeEvent<HTMLSelectElement>);
    setIsOpen(false);
  };

  const Row = ({ index, style }: { index: number, style: React.CSSProperties }) => (
    <div
      style={style}
      className={`option ${highlightedIndex === index ? 'highlighted' : ''}`}
      onMouseEnter={() => setHighlightedIndex(index)}
      onMouseDown={() => handleOptionClick(index)}
    >
      {options[index].Name}
    </div>
  );
  // can decompose above

  return (
    <div
      className={`custom-select ${className}`}
      tabIndex={0}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      ref={selectRef}
    >
      <div className="selected-value" onClick={handleToggle}>
        {value || 'Select...'}
      </div>
      {isOpen && (
        <List
          height={CONTAINER_HEIGHT}
          itemCount={options.length}
          itemSize={ITEM_HEIGHT}
          width={300}
          className='listbox'
          ref={listRef}
        >
          {Row}
        </List>
      )}
    </div>
  );
}
