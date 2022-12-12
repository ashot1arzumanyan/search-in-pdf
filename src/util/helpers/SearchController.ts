import { Coords } from '../../types/types';
import { viewerContainerId } from '../constants/base';
import FreezeScroll from './FreezeScroll';

class SearchController extends FreezeScroll {
  static containerId = viewerContainerId;

  static getStartIndexes = (content: string, text: string) => {
    const startIndexes: number[] = [];
    let startIndex = 0;
    while (startIndex >= 0) {
      const position = startIndexes.length > 0
        ? startIndexes[startIndexes.length - 1] + text.length
        : undefined;

      const index = content.indexOf(text, position);
      if (index >= 0) startIndexes.push(index);
      startIndex = index;
    }

    return startIndexes;
  };

  static getRect = (node: Node, text: string, startIndex: number) => {
    const range = new Range();
    range.setStart(node, startIndex);
    range.setEnd(node, startIndex + text.length);

    const clientRect = range.getBoundingClientRect();

    const rect = {
      top: clientRect.top + window.scrollY,
      left: clientRect.left + window.scrollX,
      width: clientRect.width,
      height: clientRect.height,
    };

    return rect;
  };

  static coordinates = (text: string) => {
    this.freezeScroll();

    const coords: Coords = { text, rects: [] };

    const container = document.getElementById(this.containerId);
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
        const startIndexes = this.getStartIndexes(currentNode.textContent, text);

        for (let i = 0; i < startIndexes.length; i += 1) {
          const index = startIndexes[i];
          const rect = this.getRect(currentNode, text, index);
          coords.rects.push(rect);
        }

        currentNode = walker.nextNode();
      }
    });

    this.unfreezeScroll();

    return coords;
  };
}

export default SearchController;
