import * as pdflib from 'pdfjs-dist';
import * as pdfjsViewer from 'pdfjs-dist/web/pdf_viewer';
import { useEffect, useState } from 'react';

import Options from './components/Options';
import optionsExternal from './util/constants/options';
import Uploader from './components/Uploader';
import { TextContentItem } from './types/types';

pdflib.GlobalWorkerOptions.workerSrc = '../build/webpack/pdf.worker.bundle.js';

const LANG = 'en';

const App = () => {
  const [file, setFile] = useState<Uint8Array>(null);
  const [options, setOptions] = useState(optionsExternal);
  const [textContentItems, setTextContentItems] = useState<TextContentItem[]>(null);

  useEffect(() => {
    if (file) {
      const render = async () => {
        let textContentItemsCombined: TextContentItem[] = [];
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
          l10n: new pdfjsViewer.GenericL10n(LANG),
        });

        pdfViewer.setDocument(pdf);

        pdfLinkService.setDocument(pdf);

        const pagesCount = pdf.numPages;

        for (let i = 1; i <= pagesCount; i += 1) {
          const page = await pdf.getPage(i);
          const textContentItemsByPage = await page.getTextContent();
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          textContentItemsCombined = [...textContentItemsCombined, ...textContentItemsByPage.items];
        }

        setTextContentItems(textContentItemsCombined);
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
        textContentItems={textContentItems}
      />
    </div>
  );
};

export default App;
