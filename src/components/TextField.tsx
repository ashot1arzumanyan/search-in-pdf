import { ChangeEventHandler, memo } from 'react';
import Input from '../atoms/Input';
import getDatalistId from '../util/helpers/getDatalistId';
import DataList from './DataList';

const MemoizedDataList = memo(DataList);

interface ComponentProps {
  value: string;
  label: string;
  id: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  words: Set<string>;
}

const TextField = ({
  value,
  label,
  id,
  onChange,
  words,
}: ComponentProps) => {
  const listId = getDatalistId(id);

  return (
    <div className="textField">
      <label className="textField__label" htmlFor={id}>{label}</label>
      <Input
        className="textField__input"
        id={id}
        listId={listId}
        name={id}
        value={value}
        onChange={onChange}
      />
      <MemoizedDataList
        listId={listId}
        words={words}
      />
    </div>
  );
};

export default TextField;
