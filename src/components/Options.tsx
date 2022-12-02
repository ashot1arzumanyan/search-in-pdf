interface ComponentProps {
  className: string;
}

const Options = ({ className }: ComponentProps) => {
  console.log('opts');

  return (
    <div className={className}>
      <div>
        <input />
      </div>
      <div>
        <button type="button">
          Save
        </button>
      </div>
    </div>
  );
};

export default Options;
