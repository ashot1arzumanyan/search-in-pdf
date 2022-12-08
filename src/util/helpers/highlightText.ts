import createSelector from './createSelector';
import FreezeScroll from './FreezeScroll';

const highlightText = (text: string) => {
  FreezeScroll.enable();

  const container = document.getElementById('viewerContainer');
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

        createSelector(range.getBoundingClientRect(), text);
      }
      currentNode = walker.nextNode();
    }
  });

  FreezeScroll.disable();
};

export default highlightText;
