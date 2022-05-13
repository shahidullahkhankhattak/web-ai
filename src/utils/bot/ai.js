import axios from 'axios';
import { BACKEND_BASE } from '../constants';
import { TrainingData } from './trainingData';

export class AI extends TrainingData {
  constructor() {
    super();
    this.fetchMemory();
  }

  async fetchMemory() {
    await new Promise(resolve => {
      axios.get(`${BACKEND_BASE}/web-ai-training.php?type=memory`).then(res => {
        if (res && res.data) {
          this.memory = res.data;
          resolve(this.memory);
        }
      });
    })
  }

  saveMemory() {
    axios.post(`${BACKEND_BASE}/web-ai-training.php?type=memory`, {
      memory: this.memory
    });
  }
}