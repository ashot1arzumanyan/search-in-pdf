const createSelector = (rect: DOMRect, text: string) => {
  const span = document.createElement('span');

  span.classList.add('selector');
  span.classList.add(`selector--${text}`);

  span.style.background = 'red';
  span.style.position = 'absolute';
  span.style.top = `${rect.top + window.scrollY}px`;
  span.style.left = `${rect.left + window.scrollX}px`;
  span.style.width = `${rect.width}px`;
  span.style.height = `${rect.height}px`;
  span.style.opacity = '.5';

  document.querySelector('#selectors').appendChild(span);
};

export default createSelector;
