import * as pdflib from 'pdfjs-dist';
import * as pdfjsViewer from 'pdfjs-dist/web/pdf_viewer';
import { useEffect, useState } from 'react';

import Options from './components/Options';
import optionsExternal from './util/constants/options';
import Uploader from './components/Uploader';

pdflib.GlobalWorkerOptions.workerSrc = '../build/webpack/pdf.worker.bundle.js';

const App = () => {
  const [file, setFile] = useState<Uint8Array>(null);
  const [options, setOptions] = useState(optionsExternal);

  useEffect(() => {
    if (file) {
      const render = async () => {
        const container = document.getElementById('viewerContainer') as HTMLDivElement;

        const pdf = await pdflib.getDocument(file).promise;

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
          l10n: new pdfjsViewer.GenericL10n('en'),
        });
        pdfLinkService.setViewer(pdfViewer);

        eventBus.on('pagesinit', () => {
          eventBus.dispatch('find', {
            type: '',
            query: 'and',
            highlightAll: true,
          });

          eventBus.on('pagerendered', () => {
            const selected = container.getElementsByClassName('highlight');

            const rects = Array.from(selected).map((s) => {
              const rect = s.getBoundingClientRect();
              return {
                width: rect.width,
                height: rect.height,
                x: rect.x,
                y: rect.y,
              };
            });
            console.log(rects);
            setTimeout(() => {
            }, 2000);
          });
        });

        pdfViewer.setDocument(pdf);

        pdfLinkService.setDocument(pdf, null);
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
      />
    </div>
  );
};

export default App;
