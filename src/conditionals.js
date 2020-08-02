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
       <h2>My Tools</h2>
       <h4>Non-drill tools are struckthrough</h4>
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
          <s>{brand}&nbsp;<small>{type}</small></s>
        </div>
        </bad>
      </check>
    `;
  }
}

