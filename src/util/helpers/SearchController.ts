import { Coords } from '../../types/types';
import { viewerContainerId } from '../constants/base';
import FreezeScroll from './FreezeScroll';

class SearchController {
  text: string;

  private coords: Coords;

  static containerId = viewerContainerId;

  constructor(text: string) {
    this.text = text;
    this.coords = { text, rects: [] };
  }

  getStartIndexes(content: string) {
    const startIndexes: number[] = [];
    let startIndex = 0;
    while (startIndex >= 0) {
      const position = startIndexes.length > 0
        ? startIndexes[startIndexes.length - 1] + this.text.length
        : undefined;

      const index = content.indexOf(this.text, position);
      if (index >= 0) startIndexes.push(index);
      startIndex = index;
    }

    return startIndexes;
  }

  getRect(node: Node, startIndex: number) {
    const range = new Range();
    range.setStart(node, startIndex);
    range.setEnd(node, startIndex + this.text.length);

    const clientRect = range.getBoundingClientRect();

    const rect = {
      top: clientRect.top + window.scrollY,
      left: clientRect.left + window.scrollX,
      width: clientRect.width,
      height: clientRect.height,
    };

    return rect;
  }

  coordinates() {
    FreezeScroll.freezeScroll();

    const container = document.getElementById(SearchController.containerId);
    const pages = container.querySelectorAll('.page');

    pages.forEach((page) => {
      const walker = document.createTreeWalker(
        page,
        NodeFilter.SHOW_TEXT,
        (node) => (node.nodeType === Node.TEXT_NODE
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT),
      );

      let currentNode = walker.nextNode();

      while (currentNode) {
        const startIndexes = this.getStartIndexes(currentNode.textContent);

        for (let i = 0; i < startIndexes.length; i += 1) {
          const index = startIndexes[i];
          const rect = this.getRect(currentNode, index);
          this.coords.rects.push(rect);
        }

        currentNode = walker.nextNode();
      }
    });

    FreezeScroll.unfreezeScroll();

    return this.coords;
  }
}

export default SearchController;
