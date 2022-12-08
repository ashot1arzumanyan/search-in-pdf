import { PDFDocumentProxy } from 'pdfjs-dist';
import {
  ChangeEvent,
  useEffect,
  useState,
} from 'react';

import { Option, TextContentItem } from '../types/types';
import extractWords from '../util/helpers/extractWords';
import Modal from './Modal';

import TextField from './TextField';

interface ComponentProps {
  className: string;
  options: Option[];
  onChange: (o: Option[]) => void;
  pdf: PDFDocumentProxy;
}

const Options = ({
  className,
  options,
  onChange,
  pdf,
}: ComponentProps) => {
  const [saved, setSaved] = useState(false);
  const [words, setWords] = useState<Set<string>>(new Set());
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const getTextCombined = async () => {
      let textContentItemsCombined: TextContentItem[] = [];

      const pagesCount = pdf.numPages;

      for (let i = 1; i <= pagesCount; i += 1) {
        const page = await pdf.getPage(i);
        const textContentItemsByPage = await page.getTextContent();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        textContentItemsCombined = [...textContentItemsCombined, ...textContentItemsByPage.items];
      }

      return textContentItemsCombined;
    };

    if (pdf) {
      getTextCombined()
        .then((textContentItemsCombined) => {
          setWords(extractWords(textContentItemsCombined));
        })
        .catch(console.log);
    }
  }, [pdf]);

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

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleSave = () => {
    setSaved(true);
    setModalOpen(true);
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
          words={words}
          saved={saved}
        />
      ))}
      <div className="options__buttonContainer">
        <button type="button" onClick={handleSave}>
          Save
        </button>
      </div>
      <Modal open={modalOpen} closeModal={handleModalClose}>
        <div>Content</div>
      </Modal>
    </div>
  );
};

export default Options;
