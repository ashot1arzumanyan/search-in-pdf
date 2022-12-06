import { TextContentItem } from '../../types/types';

const extractWords = (textContentItems: TextContentItem[]) => {
  const words = new Set<string>();
  if (!textContentItems || !textContentItems.length) return words;
  for (let i = 0; i < textContentItems.length; i += 1) {
    const { str } = textContentItems[i];
    const itemWords = str.split(' ');
    for (let ii = 0; ii < itemWords.length; ii += 1) {
      words.add(itemWords[ii].replace(/[,;:.`-]$/, ''));
    }
  }
  return words;
};

export default extractWords;
