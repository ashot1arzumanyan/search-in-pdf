import { createRoot } from 'react-dom/client';

import App from './App';
import './styles/base.scss';

const root = createRoot(document.getElementById('root'));

root.render(
  <App />,
);
