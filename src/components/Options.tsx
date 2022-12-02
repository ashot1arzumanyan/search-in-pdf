/* eslint-disable jsx-a11y/label-has-associated-control */
interface ComponentProps {
  className: string;
}

const Options = ({ className }: ComponentProps) => {
  console.log('opts');

  return (
    <div className={`options ${className}`}>
      <div className="content">
        <div className="options__field">
          <label htmlFor="field_1">
            Field 1
          </label>
          <input type="text" id="field_1" />
        </div>
        <div className="options__field">
          <label htmlFor="field_2">
            Field 2
          </label>
          <input type="text" id="field_2" />
        </div>
        <div className="options__field">
          <label htmlFor="field_3">
            Field 3
          </label>
          <input type="text" id="field_3" />
        </div>
        <div>
          <button type="button">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Options;
