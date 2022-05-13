import axios from 'axios';

const BACKEND_BASE = 'https://bot.shahidullahkhan.com/backend';

class AI {
  constructor() {
    this.fetchMemory();
  }

  fetchMemory() {
		axios.get(`${BACKEND_BASE}/web-ai-training.php?type=memory`).then(res => {
			if (res && res.data) {
				this.memory = res.data;
			}
		});
  }

  saveMemory() {
		axios.post(`${BACKEND_BASE}/web-ai-training.php?type=memory`, {
			memory: this.memory
		});
  }
}

class TextAI extends AI {
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
        if (this.memory[word].siblings.left) {
          this.memory[word].siblings.left.push(siblings.left);
        }
        if (this.memory[word].siblings.right) {
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

class TrainingData extends TextAI {
	constructor() {
    super();
		this.trainingData = [];
	}

	fetchTrainingData() {
		axios.get(`${BACKEND_BASE}/web-ai-training.php?type=trainingData`).then(res => {
			if (res && res.data) {
				this.trainingData = res.data;
			}
		});
	}

	saveTrainingData() {
		axios.post(`${BACKEND_BASE}/web-ai-training.php?type=trainingData`, {
			trainingData: this.trainingData
		});
	}

	train(message) {
		this.trainingData.push({
			message
		})
	}
}

export default class Bot extends TrainingData {
	constructor() {
		super();
	}

	init() {
		this.fetchTrainingData();
	}


	respond(newMessage, oldMessage) {

    return this.processResponse(newMessage?.toLowerCase(), oldMessage?.toLowerCase())
	}

  processResponse(newMessage, oldMessage) {
    this.tokenize(newMessage);
		const message = this.trainingData.find(t => t.message === newMessage);
		if (!message) {
			this.train(newMessage);
		}

		if (oldMessage) {
			const askedMessage = this.trainingData.find(t => t.message === oldMessage);
			if (!askedMessage.responses) {
				askedMessage.responses = [newMessage];
			} else {
				if (!askedMessage.responses.find(r => r.message === newMessage)) {
					askedMessage.responses.push(newMessage);
				}
			}
		}

		if (message?.responses) {
			return message.responses.random();
		}

		return newMessage;
  }
}