import { Rect } from '../../types/types';

interface Selection {
  name: string;
  text: string;
  rects: Rect[];
}

class Selections {
  private selections: Selection[];

  constructor() {
    this.selections = [];
  }

  get() {
    return this.selections;
  }

  private has(prop: keyof Selection, value: string) {
    let index = -1;
    this.selections.some((s, i) => {
      if (s[prop] === value) {
        index = i;
        return true;
      }
      return false;
    });
    return { index, found: !(index < 0) };
  }

  hasName(name: string) {
    return this.has('name', name);
  }

  hasText(text: string) {
    return this.has('text', text);
  }

  getSelectionByText(text: string) {
    const { index } = this.hasText(text);
    return this.selections[index];
  }

  add(selection: Selection) {
    const { found, index } = this.hasName(selection.name);
    if (found) {
      this.selections.splice(index, 1, selection);
    } else {
      this.selections.push(selection);
    }
  }

  remove(name: string) {
    const { found, index } = this.hasName(name);
    if (found) {
      this.selections.splice(index, 1);
    }
  }

  removeAll() {
    this.selections = [];
  }
}

export default Selections;
