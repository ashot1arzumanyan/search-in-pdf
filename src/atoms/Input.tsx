import { ChangeEventHandler } from 'react';

interface ComponentProps {
  className: string;
  id: string;
  listId: string;
  value: string;
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const Input = ({
  className,
  id,
  listId,
  value,
  name,
  onChange,
}: ComponentProps) => (
  <input
    className={className}
    id={id}
    list={listId}
    name={name}
    value={value}
    onChange={onChange}
  />
);

export default Input;
