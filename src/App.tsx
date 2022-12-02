import * as pdflib from 'pdfjs-dist';
import * as pdfViewer from 'pdfjs-dist/web/pdf_viewer';
import { useEffect } from 'react';
import Options from './components/Options';

pdflib.GlobalWorkerOptions.workerSrc = '../build/webpack/pdf.worker.bundle.js';

const pdfPath = './pdfs/Lorem_ipsum.pdf';

const App = () => {
  useEffect(() => {
    pdflib.getDocument(pdfPath).promise
      .then((pdf) => {
        const container = document.getElementById('viewerContainer') as HTMLDivElement;

        const eventBus = new pdfViewer.EventBus();

        const linkService = new pdfViewer.PDFLinkService({ eventBus });

        const viewer = new pdfViewer.PDFViewer({
          container,
          eventBus,
          linkService,
          l10n: new pdfViewer.GenericL10n('en'),
        });

        viewer.setDocument(pdf);
      })

      .catch(console.log);
  }, []);

  return (
    <div className="main">
      <div className="main__preview">
        <div id="viewerContainer">
          <div id="viewer" className="pdfViewer" />
        </div>
      </div>
      <Options className="main__options" />
    </div>
  );
};

export default App;
