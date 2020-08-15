import Bob from "../Bob";

// a little tricky
export default class RecursiveMenu extends Bob {
  constructor(data) {
    super();
    this.data = data;
    this.childTemplates = { MenuItem };
  }
  //the root component will iterate over the recursive object
  template() {
    return `
      <each>
        <ul>
          {{MenuItem|(index)}}
        </ul>
      </each>
    `;
  }
}

//the recursive object will pull out the name of the node
//and call the root component to perform the operation again
//ie (Node [children -> (Node [children -> (..)])])
class MenuItem extends Bob {
  constructor(data) {
    super(data);
    this.childTemplates = { RecursiveMenu };
  }

  template() {
    return `
      <li>
        {nodeName}
        {{RecursiveMenu|nodes}}
      </li>
    `;
  }
}

export class MenuTitle extends Bob {
  constructor() {
    super();
  }

  template() {
    return `<h2>Recursive Menu</h2>`;
  }
}


