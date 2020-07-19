import Bob from "./Bob";
import Test from "./Test";
import List from "./List";

export default class Person extends Bob {
  constructor(data) {
    super(data);
    this.childTemplates = { Test, List };
  }

  template() {
    return `
      <main class="anotherClass">
        <each>
         {{Test|(index)}}
        </each>
      </main>
    `;
  }
}
