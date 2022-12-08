class FreezeScroll {
  static enable = () => {
    document.body.style.height = '100%';
    document.body.style.overflow = 'hidden';
  };

  static disable = () => {
    document.body.style.height = 'auto';
    document.body.style.overflow = 'auto';
  };
}

export default FreezeScroll;
