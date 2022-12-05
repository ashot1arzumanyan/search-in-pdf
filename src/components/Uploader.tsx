import {
  ChangeEvent,
  DragEvent,
  FormEvent,
  useState,
} from 'react';

interface ComponentProps {
  onLoaded: (file: Uint8Array) => void;
}

const handleFile = (file: File, setLoaded: (f: Uint8Array) => void) => {
  const filReader = new FileReader();

  filReader.onload = function onload() {
    const typedarray = new Uint8Array(this.result as ArrayBuffer);
    setLoaded(typedarray);
  };

  filReader.readAsArrayBuffer(file);
};

const Uploader = ({ onLoaded }: ComponentProps) => {
  const [dragActive, setDragActive] = useState(false);

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      handleFile(e.target.files[0], onLoaded);
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files) {
      handleFile(e.dataTransfer.files[0], onLoaded);
    }
    setDragActive(false);
  };

  const handleDrag = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handlePreventSubmit = (e: FormEvent<HTMLFormElement>) => e.preventDefault();

  return (
    <form
      onSubmit={handlePreventSubmit}
      className={`uploader ${dragActive ? 'uploader--active' : 'uploader--inactive'}`}
      onDragEnter={handleDrag}
    >
      <label htmlFor="fileInput" className="uploader__label">
        <input
          id="fileInput"
          className="uploader__fileInput"
          type="file"
          onChange={handleUpload}
        />
        <p>
          Drag and Drop file here
        </p>
      </label>
      {dragActive && (
        <div
          className="uploader__dragArea"
          onDrop={handleDrop}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
        />
      )}
    </form>
  );
};

export default Uploader;
