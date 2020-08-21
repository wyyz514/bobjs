import HelloBob from "./Examples/hellobob";
import Tools from "./Examples/lists";
import ShowDrills from "./Examples/conditionals";
import RecursiveMenu, { MenuTitle } from "./Examples/recursive";
import Bob from "./Bob";

export default class Examples extends Bob {
  constructor(data) {
    super(data);
    this.childTemplates = {
      HelloBob,
      Tools,
      ShowDrills,
      RecursiveMenu,
      MenuTitle
    };
  }

  template() {
    return `
      <div>
        {{HelloBob|bobData}}
        <hr/>
        {{Tools|tools}}
        <hr/>
        {{ShowDrills|toFilter}}
        <hr/>
        {{MenuTitle}}
        {{RecursiveMenu|menu}}
        <hr/>
      </div>
    `;
  }
}

