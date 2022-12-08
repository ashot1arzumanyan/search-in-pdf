export interface Option {
  id: string;
  name: string;
  value: string;
}

export interface TextContentItem {
  str: string;
}

export type Rect = Pick<DOMRect, 'top' | 'left' | 'width' | 'height'>;

export interface Coords {
  text: string;
  rects: Rect[];
}
