import { ChangeEventHandler, memo, useRef } from 'react';
import getDatalistId from '../util/helpers/getDatalistId';
import highlightText from '../util/helpers/highlightText';
import DataList from './DataList';

const MemoizedDataList = memo(DataList);

interface ComponentProps {
  value: string;
  label: string;
  id: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  words: Set<string>;
  saved: boolean;
}

const TextField = ({
  value,
  label,
  id,
  onChange,
  words,
  saved,
}: ComponentProps) => {
  const selectedObj = useRef({ selected: false });

  const listId = getDatalistId(id);

  const handleMouseEnter = () => {
    if (!saved || !value || selectedObj.current.selected) return;
    selectedObj.current.selected = true;

    highlightText(value.toLowerCase());
  };

  return (
    <div className="textField">
      <label className="textField__label" htmlFor={id}>{label}</label>
      <input
        className="textField__input"
        id={id}
        list={listId}
        name={id}
        value={value}
        onChange={onChange}
        onMouseEnter={handleMouseEnter}
      />
      <MemoizedDataList
        listId={listId}
        words={words}
      />
    </div>
  );
};

export default TextField;
