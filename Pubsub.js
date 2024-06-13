class Pubsub {
  constructor() {
    this.subscribers = {}; // {'eventName:' [cb_sub1, cb_sub2, cb_sub3]}
  }
  /**
   * @param event -> it is a string denoting unique event fired by the publisher
   * @param callback -> for a subscriber callback function to be called when the event is fired
   */
  subscribe(event, callback) {
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];
    }
    this.subscribers[event].push(callback);

    return () => this.unsubscribe(event, callback);
  }

  unsubscribe(event, callback) {
    if (!this.subscribers[event]) {
      return;
    }
    this.subscribers[event] = this.subscribers[event].filter(
      (cb) => cb !== callback
    );
  }

  /**
   * @param event -> it is a string denoting unique event fired by the publisher
   * @param data -> for the given event what data should be passed along with publishing evnet
   */

  publish(event, data) {
    if (!this.subscribers[event]) {
      return;
    }
    this.subscribers[event].forEach((callback) => {
      callback(data);
    });
  }
}

const pb = new Pubsub();

const unsubs1 = pb.subscribe("airforce", (data) =>
  console.log(`subscriber 1 of airforce `, data)
);
const unsubs2 = pb.subscribe("airforce", (data) =>
  console.log(`subscriber 2 of airforce`, data)
);
const unsubs3 = pb.subscribe("new balance", (data) =>
  console.log(`subscriber 3 of new balance`, data)
);

pb.publish("airforce", { shoeName: "Jordan", color: "black" });
pb.publish("new balance", { name: "nb1", color: "off white" });
