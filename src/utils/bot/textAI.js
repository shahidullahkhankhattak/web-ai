import { AI } from './ai';

export class TextAI extends AI {
  constructor() { super(); }

  tokenize(sentence) {
    const words = sentence.split(/[\W\d]+/g).filter(s => !!s.trim());
    words.forEach((word, index) => {
      let siblings = {
        left: index > 1 && words[index - 1],
        right: index < words.length - 2 && words[index + 1]
      }
      if (this.memory[word]) {
        this.memory[word].count++;
        if (siblings.left) {
          this.memory[word].siblings.left.push(siblings.left);
        }
        if (siblings.right) {
          this.memory[word].siblings.right.push(siblings.right);
        }
      } else {
        this.memory[word] = { count: 1, siblings: {
          left: siblings.left && [siblings.left] || [],
          right: siblings.right && [siblings.right] || []
        }};
      }
    });

    this.saveMemory();
  }
}