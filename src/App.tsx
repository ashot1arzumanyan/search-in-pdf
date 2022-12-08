import * as pdflib from 'pdfjs-dist';
import * as pdfjsViewer from 'pdfjs-dist/web/pdf_viewer';
import { useEffect, useState } from 'react';

import Options from './components/Options';
import optionsExternal from './util/constants/options';
import Uploader from './components/Uploader';

pdflib.GlobalWorkerOptions.workerSrc = '../build/webpack/pdf.worker.bundle.js';

const LANG = 'en';

const App = () => {
  const [file, setFile] = useState<Uint8Array>(null);
  const [options, setOptions] = useState(optionsExternal);
  const [pdf, setPdf] = useState<pdflib.PDFDocumentProxy>(null);

  useEffect(() => {
    if (file) {
      const render = async () => {
        const container = document.getElementById('viewerContainer') as HTMLDivElement;

        const pdfDocument = await pdflib.getDocument(file).promise;

        const eventBus = new pdfjsViewer.EventBus();

        const pdfLinkService = new pdfjsViewer.PDFLinkService({
          eventBus,
        });

        const pdfFindController = new pdfjsViewer.PDFFindController({
          eventBus,
          linkService: pdfLinkService,
        });

        const pdfViewer = new pdfjsViewer.PDFViewer({
          container,
          eventBus,
          linkService: pdfLinkService,
          findController: pdfFindController,
          l10n: new pdfjsViewer.GenericL10n(LANG),
        });

        pdfViewer.setDocument(pdfDocument);

        pdfLinkService.setDocument(pdfDocument);

        setPdf(pdfDocument);
      };

      render().catch(console.log);
    }
  }, [file]);

  return (
    <div className="main">
      <div className="main__preview">
        <div id="viewerContainer">
          <div id="viewer" className="pdfViewer" />
        </div>
        {!file && <Uploader onLoaded={setFile} />}
      </div>
      <Options
        className="main__options"
        options={options}
        onChange={setOptions}
        pdf={pdf}
      />
      <div className="main__selectorsContainer">
        <div id="selectors" />
      </div>
    </div>
  );
};

export default App;
