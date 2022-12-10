import { createRoot } from 'react-dom/client';

import App from './App';
import './styles/styles.scss';
import 'pdfjs-dist/web/pdf_viewer.css';

const root = createRoot(document.getElementById('root'));

root.render(
  <App />,
);
