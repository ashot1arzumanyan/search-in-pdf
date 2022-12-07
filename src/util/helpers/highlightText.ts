interface TextNodesAndStartIndex {
  node: Node,
  startIndex: number
}

const highlightText = (text: string) => {
  const container = document.getElementById('viewerContainer');
  const textLayers = container.querySelectorAll('.textLayer');
  const textNodeAndStartIndexes = [] as TextNodesAndStartIndex[];
  textLayers.forEach((el) => {
    const walker = document.createTreeWalker(
      el,
      NodeFilter.SHOW_TEXT,
      (node) => (node.nodeType === Node.TEXT_NODE
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_ACCEPT),
    );

    let currentNode = walker.nextNode();

    while (currentNode) {
      const startIndex = currentNode.textContent.toLowerCase().indexOf(text);
      if (startIndex >= 0) {
        textNodeAndStartIndexes.push({
          node: currentNode,
          startIndex,
        });
      }
      currentNode = walker.nextNode();
    }
  });

  const selectionClassName = `selected--${text}`;

  let style = document.head.querySelector('#selection');
  if (!style) {
    style = document.createElement('style');
    style.setAttribute('id', 'selection');
  }

  style.innerHTML = `.${selectionClassName} {background: blue}`;

  document.head.appendChild(style);

  textNodeAndStartIndexes.forEach((textAndStartIndex) => {
    const { node, startIndex } = textAndStartIndex;

    const range = new Range();
    range.setStart(node, startIndex);
    range.setEnd(node, startIndex + text.length);

    const wrapper = document.createElement('span');
    wrapper.classList.add(selectionClassName);

    range.surroundContents(wrapper);
  });
};

export default highlightText;
