interface ComponentProps {
  listId: string;
  words: Set<string>;
}

const DataList = ({ listId, words }: ComponentProps) => (
  <datalist id={listId}>
    {Array.from(words).map((word) => (
      <option key={word}>{word}</option>
    ))}
  </datalist>
);

export default DataList;
