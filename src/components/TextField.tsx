import {
  ChangeEvent,
  ChangeEventHandler,
  memo,
  useMemo,
} from 'react';

import getDatalistId from '../util/helpers/getDatalistId';
import SearchController from '../util/helpers/SearchController';
import { selectControllerInstance as selectController } from '../util/helpers/SelectController';
import debounce from '../util/helpers/debounce';

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
  const listId = useMemo(() => getDatalistId(id), [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value.toLowerCase();

    selectController.destroy(id);
    if (text) {
      const highlight = () => {
        const searchController = new SearchController(text);
        const coords = searchController.coordinates();
        selectController.createSelectors(coords.rects, coords.text, id);
      };

      debounce.handle(highlight);
    } else {
      debounce.clear();
      selectController.destroy(id);
    }
    onChange(e);
  };

  const handleMouseEnter = () => {
    const valueLowerCased = value.toLowerCase();

    if (valueLowerCased) {
      if (selectController.selections.getSelectionByText(valueLowerCased)) {
        selectController.enable(id);
      } else {
        const searchController = new SearchController(valueLowerCased);
        const coords = searchController.coordinates();
        selectController.createSelectors(coords.rects, coords.text, id);
      }
    }
  };

  const handleMouseLeave = () => {
    selectController.disable(id);
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
        onChange={handleChange}
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
