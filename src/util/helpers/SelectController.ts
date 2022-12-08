import { Rect } from '../../types/types';
import { selectorsContainerId } from '../constants/base';

class SelectController {
  selectorsContainerId: string;

  texts: Set<string>;

  enabled?: string;

  styleElementId: string;

  constructor() {
    this.selectorsContainerId = selectorsContainerId;
    this.texts = new Set();
    this.styleElementId = 'selected';
  }

  static selectorsContainerId = selectorsContainerId;

  getSelectorClassName(text: string) {
    return `selector--${text}`;
  }

  getDisabledStyle(text: string) {
    return `.selector--${text} { display: none; }`;
  }

  getEnabledStyle(text: string) {
    return `.selector--${text} { display: block; }`;
  }

  private createSelector(rect: Rect, text: string) {
    const span = document.createElement('span');

    span.classList.add('selector');
    span.classList.add(`selector--${text}`);

    span.style.top = `${rect.top}px`;
    span.style.left = `${rect.left}px`;
    span.style.width = `${rect.width}px`;
    span.style.height = `${rect.height}px`;

    document.querySelector(`#${SelectController.selectorsContainerId}`).appendChild(span);
  }

  createSelectors(rects: Rect[], text?: string) {
    if (this.texts.has(text)) {
      return text;
    }

    if (this.enabled !== text) {
      this.enable(text);
    }

    rects.forEach((coord) => {
      this.createSelector(coord, text);
    });

    const uniqueString = text || Date.now().toString();

    this.texts.add(text);
    this.enabled = text;

    return uniqueString;
  }

  destroy() {
    document.getElementById(this.selectorsContainerId).innerHTML = '';
  }

  enable(text: string) {
    const className = this.getSelectorClassName(text);
    let style = document.getElementById(className);
    const styleInnerText = this.getEnabledStyle(text);

    if (!style) {
      style = document.createElement('style');
      style.setAttribute('type', 'text/css');
      style.id = className;
      style.innerText = styleInnerText;
      document.head.appendChild(style);
    } else {
      style.innerText = styleInnerText;
    }
    this.enabled = text;
  }

  disable(text: string) {
    const className = this.getSelectorClassName(text);
    const style = document.getElementById(className);

    if (style) {
      style.innerText = this.getDisabledStyle(text);
    }
    if (this.enabled === text) {
      this.enabled = '';
    }
  }
}

export default new SelectController();
