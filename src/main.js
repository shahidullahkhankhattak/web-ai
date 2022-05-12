import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

Array.prototype.random = function () {
	return this[Math.floor((Math.random() * this.length))];
}
Array.prototype.lastElem = function (prop) {
	const lastItemsArr = this.slice(-1);
	if (lastItemsArr.length) {
		return lastItemsArr[0] && lastItemsArr[0][prop]
	}
	return undefined;
}

const app = createApp(App)

app.use(router)

app.mount('#app')
