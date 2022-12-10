import { Rect } from '../../types/types';
import { selectorsContainerId } from '../constants/base';
import Selections from './Selections';

class SelectController {
  selectorsContainerId: string;

  selections: Selections;

  enabledIndex: number;

  styleElementId: string;

  constructor() {
    this.selectorsContainerId = selectorsContainerId;
    this.selections = new Selections();
    this.enabledIndex = -1;
    this.styleElementId = 'selected';
  }

  static selectorsContainerId = selectorsContainerId;

  getSelectorClassName(text: string) {
    return `selector--${text}`;
  }

  getSelectionContainer(name: string) {
    const id = this.getSelectorClassName(name);
    return document.getElementById(id);
  }

  private createSelector(rect: Rect, text?: string) {
    const span = document.createElement('span');

    span.classList.add('selector');
    if (text) {
      span.classList.add(`selector--${text}`);
    }

    span.style.top = `${rect.top}px`;
    span.style.left = `${rect.left}px`;
    span.style.width = `${rect.width}px`;
    span.style.height = `${rect.height}px`;

    return span;
  }

  createSelectors(rects: Rect[], text: string, name: string) {
    if (this.selections.hasName(name).found) {
      return;
    }

    this.enable(name);

    const container = document.createElement('div');
    container.id = this.getSelectorClassName(name);

    const selectorsContainer = document.getElementById(this.selectorsContainerId);
    if (selectorsContainer) selectorsContainer.appendChild(container);

    rects.forEach((coord) => {
      const span = this.createSelector(coord);
      container.appendChild(span);
    });

    this.selections.add({ rects, text, name });
  }

  destroyAll() {
    document.getElementById(this.selectorsContainerId).innerHTML = '';
    this.selections.removeAll();
  }

  destroy(name: string) {
    const container = this.getSelectionContainer(name);
    if (container) {
      container.remove();
    }
    this.selections.remove(name);
  }

  enable(name: string) {
    const { index, found } = this.selections.hasName(name);
    this.enabledIndex = index;

    if (found) {
      const container = this.getSelectionContainer(name);

      if (container) {
        container.classList.remove('disabled');
        container.classList.add('enabled');
      }
    }
  }

  disable(name: string) {
    const { found } = this.selections.hasName(name);

    if (found) {
      const container = this.getSelectionContainer(name);

      if (container) {
        container.classList.add('disabled');
        container.classList.remove('enabled');
      }
    }

    this.enabledIndex = -1;
  }
}

const selectControllerInstance = new SelectController();

export { selectControllerInstance };

export default SelectController;
