import { PDFDocumentProxy } from 'pdfjs-dist';

const renderPage = (pdf: PDFDocumentProxy) => async (pageNumber: number) => {
  const page = await pdf.getPage(pageNumber);
  const scale = 1.5;
  const viewport = page.getViewport({ scale });

  const outputScale = window.devicePixelRatio || 1;

  const canvas = document.getElementById('pdf-container') as HTMLCanvasElement;
  const context = canvas.getContext('2d');

  canvas.width = Math.floor(viewport.width * outputScale);
  canvas.height = Math.floor(viewport.height * outputScale);
  canvas.style.width = `${Math.floor(viewport.width)}px`;
  canvas.style.height = `${Math.floor(viewport.height)}px`;

  const transform = outputScale !== 1
    ? [outputScale, 0, 0, outputScale, 0, 0]
    : null;

  const renderContext = {
    canvasContext: context,
    transform,
    viewport,
  };
  page.render(renderContext);
};

export default renderPage;
