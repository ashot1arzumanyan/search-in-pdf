import * as pdflib from 'pdfjs-dist';
import * as pdfjsViewer from 'pdfjs-dist/web/pdf_viewer';
import { useEffect } from 'react';

import Options from './components/Options';

pdflib.GlobalWorkerOptions.workerSrc = '../build/webpack/pdf.worker.bundle.js';

const pdfPath = './pdfs/Lorem_ipsum.pdf';

const App = () => {
  useEffect(() => {
    const render = async () => {
      const container = document.getElementById('viewerContainer') as HTMLDivElement;

      const pdf = await pdflib.getDocument(pdfPath).promise;

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

        setTimeout(() => {
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
        }, 2000);
      });

      pdfViewer.setDocument(pdf);

      pdfLinkService.setDocument(pdf, null);
    };

    render().catch(console.log);
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
