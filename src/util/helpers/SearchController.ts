import { Coords } from '../../types/types';
import { viewerContainerId } from '../constants/base';
import FreezeScroll from './FreezeScroll';

class SearchController extends FreezeScroll {
  static containerId = viewerContainerId;

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
        const startIndex = currentNode.textContent.toLowerCase().indexOf(text);
        if (startIndex >= 0) {
          const range = new Range();
          range.setStart(currentNode, startIndex);
          range.setEnd(currentNode, startIndex + text.length);

          const clientRect = range.getBoundingClientRect();

          const rect = {
            top: clientRect.top + window.scrollY,
            left: clientRect.left + window.scrollX,
            width: clientRect.width,
            height: clientRect.height,
          };

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
