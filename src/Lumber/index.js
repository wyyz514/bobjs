const openingTagRegex = new RegExp(
  /^<([a-z0-9]+)\s*?(([a-z-]+=("|')[a-zA-Z-0-9,=:/\-.?#+'><|{}(); ]*("|')\s*)*)>/
);
const closingTagRegex = new RegExp(/^<\/([a-z0-9]+)>/);
const selfTerminatingTagRegex = new RegExp(
  /^<(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)\s*(([a-z-]+?=("|')[a-zA-Z-0-9,=:/\-.?#+| ]*("|')\s*)+)?(\/|)?>/
);
const textRegex = new RegExp(/^([a-zA-Z0-9!:${}@\[\]\.|(),\-'&;s ]+)\s*?</);

export default class Lumber {
  static _rest(index) {
    return Lumber.template.slice(index).trim();
  }

  static _matches(regex, template) {
    return regex.test(template);
  }

  static _props(regex, template) {
    return regex.exec(template);
  }

  static parse(rawTemplate) {
    let template = rawTemplate.replace(/\n/g, "").replace(/\s{2,}/g, "");
    Lumber.template = template;
    let pointerIndex = 0;
    const _parse = () => {
      const parsed = {
        tagName: "",
        attributes: "",
        children: [],
        text: ""
      };

      let subTemplate = Lumber._rest(pointerIndex);
      while (
        !Lumber._matches(closingTagRegex, subTemplate) &&
        pointerIndex < Lumber.template.length
      ) {
        if (Lumber._matches(openingTagRegex, subTemplate)) {
          const [fullMatch, match, attributes] = Lumber._props(
            openingTagRegex,
            subTemplate
          );
          parsed.tagName = match;
          parsed.attributes = attributes;
          pointerIndex += fullMatch.length;
        }
        subTemplate = Lumber._rest(pointerIndex);
        if (Lumber._matches(textRegex, subTemplate)) {
          const parsedText = {
            text: "",
            children: []
          };
          const [fullMatch, match] = Lumber._props(textRegex, subTemplate);
          parsedText.text = match;
          pointerIndex += match.length;
          parsed.children.push(parsedText);
        }
        subTemplate = Lumber._rest(pointerIndex);
        if (Lumber._matches(selfTerminatingTagRegex, subTemplate)) {
          const parsedSelfTerminating = {
            tagName: "",
            text: "",
            children: [],
            attributes: [],
            selfTerminating: true
          };
          const [fullMatch, match, attributes] = Lumber._props(
            selfTerminatingTagRegex,
            subTemplate
          );
          parsedSelfTerminating.attributes = attributes;
          parsedSelfTerminating.tagName = match;
          pointerIndex += fullMatch.length;
          parsed.children.push(parsedSelfTerminating);
        }
        subTemplate = Lumber._rest(pointerIndex);
        while (
          Lumber._matches(openingTagRegex, subTemplate) &&
          pointerIndex < Lumber.template.length
        ) {
          const child = _parse();
          if (child.tagName) {
            parsed.children.push(child);
          }
          subTemplate = Lumber._rest(pointerIndex);
        }
        subTemplate = Lumber._rest(pointerIndex);
      }
      if (Lumber._matches(closingTagRegex, subTemplate)) {
        const [fullMatch, match] = Lumber._props(closingTagRegex, subTemplate);
        pointerIndex += fullMatch.length;
      }
      return parsed;
    };
    return _parse();
  }
}
