import axios from 'axios';
import { BACKEND_BASE } from '../constants';

export class TrainingData {
	constructor() {
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