import Bob from "./Bob";

export default class Test extends Bob {
  constructor(data) {
    super(data);
    this.childTemplates = { Test, TestChildren, CheckNameLength };
  }

  template() {
    return `
      <div class="{otherName} user {name}">
       <check test="data.name === 'Root'">
        <good>
          <div>{name}</div>
        </good>
        <bad>
          {{CheckNameLength}}
        </bad>
       </check>
       {{TestChildren|children}}
      </div>
    `;
  }
}

class TestChildren extends Bob {
  constructor(data) {
    super(data);
    this.data = data;
    this.childTemplates = { Test };
  }

  template() {
    return `
      <each>
        {{Test|(index)}}
      </each>
    `;
  }
}

class CheckNameLength extends Bob {
  template() {
    return `<check test="data.name.length >= 8">
    <good>
      Pretty long name
    </good>
    <bad>
      {otherName}
    </bad>
  </check>`;
  }
}
