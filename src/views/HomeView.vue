<script>
import Bot from '../utils/bot';

const bot = new Bot();

export default {
  data: () => ({
    message: '',
    messages: []
  }),
  methods: {
    sendMessage() {
      const response = bot.respond(this.message, this.messages.lastElem('message'));
      this.messages.push({
        type: 'human',
        message: this.message
      })
      this.messages.push({
        type: 'computer',
        message: response
      })
      this.message = '';
      bot.saveTrainingData();
    }
  },
  mounted() {
    bot.init();
  }
}
</script>

<template>
  <div class="container">
    <div class="chat-wrapper">
      <div class="content">
        <div v-for="m in messages" :class="m.type === 'human' ? 'chat-sent' : 'chat-recieved'">{{ m.message }}</div>
      </div>
      <div class="actions">
        <input type="text" placeholder="type here ..." v-model="message" @keyup.enter="sendMessage()" />
        <button type="button" @click="sendMessage()">Send</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.container {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;

  .chat-wrapper {
    display: flex;
    height: 1000px;
    width: 800px;
    flex-direction: column;
    background: white;
    border-radius: 5px;

    .content {
      display: block;
      flex: 0.9;

      [class^=chat-] {
        clear: both;
        padding: 10px;
        margin: 5px;
        border-radius: 20px;
      }

      .chat-recieved {
        background: lightgreen;
        float: left;
      }

      .chat-sent {
        background: lightblue;
        float: right;
      }
    }

    .actions {
      display: flex;
      flex: 0.1;

      * {
        font-size: 18px;
      }

      input {
        flex: 0.9;
        padding-left: 10px;
      }

      button {
        flex: 0.1;
      }
    }
  }
}
</style>
