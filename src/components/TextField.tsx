import { ChangeEventHandler, memo } from 'react';

import getDatalistId from '../util/helpers/getDatalistId';
import SearchController from '../util/helpers/SearchController';
import selectController from '../util/helpers/SelectController';

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
  const listId = getDatalistId(id);

  const handleMouseEnter = () => {
    if (!saved) return;
    const valueLowerCased = value.toLowerCase();

    if (selectController.texts.has(valueLowerCased)) {
      selectController.enable(value.toLowerCase());
    } else {
      const coords = SearchController.coordinates(valueLowerCased);
      selectController.createSelectors(coords.rects, coords.text);
    }
  };

  const handleMouseLeave = () => {
    selectController.disable(value.toLowerCase());
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
        onMouseLeave={handleMouseLeave}
      />
      <MemoizedDataList
        listId={listId}
        words={words}
      />
    </div>
  );
};

export default TextField;
