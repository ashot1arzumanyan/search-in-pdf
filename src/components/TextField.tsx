import { ChangeEventHandler } from 'react';
import Input from '../atoms/Input';

interface ComponentProps {
  value: string;
  label: string;
  id: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const TextField = ({
  value,
  label,
  id,
  onChange,
}: ComponentProps) => (
  <div className="textField">
    <label className="textField__label" htmlFor={id}>{label}</label>
    <Input
      className="textField__input"
      id={id}
      name={id}
      value={value}
      onChange={onChange}
    />
  </div>
);

export default TextField;
