import Bob from "./Bob";
import Person from "./Person";

export default class List extends Bob {
  constructor(data) {
    super(data);
    this.childTemplates = { List, Person };
  }

  template() {
    return `<div>
    </div>`;
  }
}
