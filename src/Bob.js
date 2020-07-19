import Operators from "./LumberOperators";
import Lumber from "./Lumber";

export default class Bob {
  constructor(data) {
    this.lumberObj = Lumber.parse(this.template());
    Bob.reservedWords = ["each", "check", "good", "bad"];
    this.data = data;
  }

  _sealTemplates() {
    return Operators.Seal({ ...this });
  }

  _weldTemplates() {
    return Operators.Weld({ ...this });
  }

  _rollTemplates() {
    return Operators.Roll({ ...this });
  }

  _spreadTemplates() {
    return Operators.Each({ ...this });
  }

  _resolveTemplates() {
    return Operators.Check({ ...this });
  }

  _toString() {
    const stringify = lumberObj => {
      if (!lumberObj) {
        return "";
      }
      let text = lumberObj.text;
      let openingTag = "";
      let closingTag = "";
      let attributes = `${
        lumberObj.attributes ? " " + lumberObj.attributes : ""
      }`;
      const hasOpeningAndClosingTag =
        !lumberObj.selfTerminating &&
        lumberObj.tagName &&
        !Bob.reservedWords.includes(lumberObj.tagName);
      if (lumberObj.selfTerminating) {
        return `<${lumberObj.tagName} ${attributes}/>`;
      }

      if (lumberObj.templates) {
        let templateKeyToReplace = "";
        for (const template of lumberObj.templates) {
          const [templateKey] = Object.keys(template);
          templateKeyToReplace = templateKey;
          const _template = template[templateKey];
          const templateString = stringifyTemplate(_template);
          lumberObj.text = lumberObj.text.replace(templateKey, templateString);
        }
        text = lumberObj.text.replace(`${templateKeyToReplace}`, "");
      }

      if (hasOpeningAndClosingTag) {
        openingTag = `<${lumberObj.tagName}${attributes}>`;
        closingTag = `</${lumberObj.tagName}>`;
      }

      for (const child of lumberObj.children) {
        text += stringify(child);
      }
      return `${openingTag}${text}${closingTag}`;
    };

    const stringifyTemplate = template => {
      return stringify(template.lumberObj);
    };
    return stringify(this.lumberObj);
  }
  build() {
    this._spreadTemplates();
    this._resolveTemplates();
    this._sealTemplates();
    this._weldTemplates();
    this._rollTemplates();
    return this;
  }
}
