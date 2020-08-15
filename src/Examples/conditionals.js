import Bob from "../Bob";

export default class ShowDrills extends Bob {
  constructor(data) {
    super();
    this.data = data;
    this.childTemplates = { Tool };
  }

  template() {
    return `
      <div>
       <h2>Conditionals</h2>
       <p style="color: red">Non-drill tools are struckthrough</p>
        <each>
          {{Tool|(index)}}
        </each>
      </div>
    `;
  }
}

class Tool extends Bob {
  constructor(data) {
    super();
    this.data = data;
  }

  template() {
    return `
      <check test="data.type === 'drill'">
        <good>
          <div>
            <p>{brand}&nbsp;<small>{type}</small></p>
          </div>
        </good>
        <bad>
        <div>
          <s>This is not a drill</s>
        </div>
        </bad>
      </check>
    `;
  }
}

