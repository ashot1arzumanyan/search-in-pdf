import { ChangeEventHandler } from 'react';

interface ComponentProps {
  className: string;
  id: string;
  value: string;
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const Input = ({
  className,
  id,
  value,
  name,
  onChange,
}: ComponentProps) => (
  <input
    className={className}
    id={id}
    name={name}
    value={value}
    onChange={onChange}
  />
);

export default Input;
