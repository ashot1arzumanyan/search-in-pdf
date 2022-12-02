import * as pdflib from 'pdfjs-dist';
import { useEffect } from 'react';
import Options from './components/Options';
import renderPage from './util/helpers/renderPage';

pdflib.GlobalWorkerOptions.workerSrc = '../build/webpack/pdf.worker.bundle.js';

const pdfPath = './pdfs/Lorem_ipsum.pdf';

const App = () => {
  useEffect(() => {
    pdflib.getDocument(pdfPath).promise
      .then((pdf) => renderPage(pdf))
      .then((renderPageFn) => renderPageFn(1))
      .catch(console.log);
  }, []);

  return (
    <div className="main">
      <canvas className="main__preview" id="pdf-container" />
      <Options className="main__options" />
    </div>
  );
};

export default App;
