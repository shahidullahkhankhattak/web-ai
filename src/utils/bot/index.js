import { TextAI } from './textAI';

export default class Bot extends TextAI {
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