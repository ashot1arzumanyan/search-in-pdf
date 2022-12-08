class FreezeScroll {
  static freezeScroll = () => {
    document.body.style.height = '100%';
    document.body.style.overflow = 'hidden';
  };

  static unfreezeScroll = () => {
    document.body.style.height = 'auto';
    document.body.style.overflow = 'auto';
  };
}

export default FreezeScroll;
