import axios from 'axios';

const BACKEND_BASE = 'https://bot.shahidullahkhan.com/backend';

class TrainingData {
	constructor() {
		this.trainingData = [];
	}

	fetchTrainingData() {
		axios.get(`${BACKEND_BASE}/web-ai-training.php`).then(res => {
			if (res && res.data) {
				this.trainingData = res.data;
			}
		});
	}

	saveTrainingData() {
		axios.post(`${BACKEND_BASE}/web-ai-training.php`, {
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