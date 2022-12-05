import { ChangeEvent } from 'react';
import { Option } from '../types/types';
import TextField from './TextField';

interface ComponentProps {
  className: string;
  options: Option[];
  onChange: (o: Option[]) => void;
}

const Options = ({ className, options, onChange }: ComponentProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newOptions = options.map((o) => {
      const option = o;
      if (option.id === name) {
        option.value = value;
        return option;
      }
      return option;
    });
    onChange(newOptions);
  };

  return (
    <div className={`options ${className}`}>
      {options.map((option) => (
        <TextField
          key={option.id}
          id={option.id}
          label={option.name}
          value={option.value}
          onChange={handleChange}
        />
      ))}
      <div className="options__buttonContainer">
        <button type="button">
          Save
        </button>
      </div>
    </div>
  );
};

export default Options;
