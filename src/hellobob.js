// introductory example into template definitions
import Bob from "../Bob";

export default class HelloBob extends Bob {
  constructor(data) {
    super();
    this.data = data;
  }

  template() {
    return `<h1>Hello, {name}!</h1>`;
  }
}

