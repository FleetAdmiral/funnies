import _ from 'lodash';
import defaultMessages from './funnies';
import FunniesComponent from './react';

class Funnies {
  constructor(messages=[], opts={}) {
    // Should messages be appended to what is already there or be used as a substitute?
    opts.appendMessages = typeof opts.appendMessages === 'undefined' ? true : opts.appendMessages;
    if (opts.appendMessages) {
      this.messages = _.shuffle(defaultMessages.concat(messages));
    } else {
      this.messages = _.shuffle(messages);
    }

    // convert messages into a map of message to how many times it has been
    // used.
    this.record = {};
    this.messages.forEach(message => {
      this.record[message] = 0;
    });
  }

  // pick the smallest of the freqencies for a message to get a more random
  // distribution
  message() {
    let smallestMessage = this.messages.reduce((smallest, message) => {
      if (this.record[smallest] > this.record[message]) {
        return message;
      } else if (this.record[smallest] === this.record[message]) {
        return _.sample([smallest, message]);
      } else {
        return smallest;
      }
    });

    // update the recrd to show that this message was picked
    this.record[smallestMessage] += 1;
    return smallestMessage;
  }

  messageHTML() {
    let message = this.message();
    let html = `<div class="funnies">
      <span class="loading-funny">${message}</span>
    </div>`.replace(/(\r?\n|^ +)/gm, '');
    return {message, html};
  }
}

export {
  Funnies as default,
  Funnies,
  FunniesComponent,
};

// for browser support
if (typeof window !== 'undefined') {
  window.Funnies = Funnies;
  window.FunniesComponent = FunniesComponent;
}
