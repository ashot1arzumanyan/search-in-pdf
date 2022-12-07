interface Coordinate {
  pageNum: number;
  cords: DOMRect[];
  text: string;
}

const highlightText = (text: string) => {
  const container = document.getElementById('viewerContainer');
  const pages = container.querySelectorAll('.page');

  const coordinates = [] as Coordinate[];

  pages.forEach((page) => {
    const coordinate = { text } as Coordinate;

    if (page instanceof HTMLElement) {
      coordinate.pageNum = Number(page.dataset.pageNumber);

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

          if (coordinate.cords) {
            coordinate.cords.push(range.getBoundingClientRect());
          } else {
            coordinate.cords = [range.getBoundingClientRect()];
          }
        }
        currentNode = walker.nextNode();
      }
      coordinates.push(coordinate);
    }
  });

  coordinates.forEach((c) => {
    if (c.cords) {
      c.cords.forEach((rect) => {
        const div = document.createElement('div');
        div.classList.add(`selector--${c.text}`);
        div.style.background = 'red';

        div.style.position = 'absolute';
        div.style.top = `${rect.top + window.scrollY}px`;
        div.style.left = `${rect.left + window.scrollX}px`;
        div.style.width = `${rect.width}px`;
        div.style.height = `${rect.height}px`;
        div.style.opacity = '.5';

        document.body.appendChild(div);
      });
    }
  });
};

export default highlightText;
