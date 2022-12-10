class Debounce {
  private timeout: ReturnType<typeof setTimeout>;

  // eslint-disable-next-line @typescript-eslint/ban-types
  handle(callback: Function, ms = 300) {
    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      callback();
    }, ms);
  }

  clear() {
    clearTimeout(this.timeout);
  }
}

export default new Debounce();
