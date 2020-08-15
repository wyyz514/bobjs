// rendering lists with Bob
import Bob from "../Bob";

export default class Tools extends Bob {
  constructor(data) {
    super();
    this.data = data;
    this.childTemplates = { Tool };
  }

  template() {
    return `
     <div>
       <h2>Lists</h2>
        <ul>
          <each>
            {{Tool|(index)}}
          </each>
        </ul>
      </div>
    `;
  }
}

// child template used in the Tools main template
// structurally the same (constructor/template)
class Tool extends Bob {
  constructor(data) {
    // can pass data to super class or set it on the instance directly
    super(data);
  }

  template() {
    return `
      <li id="{name}">
        {name} - {description}
      </li>
    `;
  }
}

