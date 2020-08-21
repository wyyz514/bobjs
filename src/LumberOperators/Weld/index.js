let pointer = 0;

// weld child templates into parent by placing processed child template content in parent
export default function weld({ lumberObj, data, childTemplates }) {
  const templateRegex = new RegExp(/{{([a-zA-Z]+)}}/);
  if (!lumberObj) {
    return;
  }
  if (lumberObj.text && typeof lumberObj.text === "string") {
    let text = lumberObj.text.slice(pointer);
    while (templateRegex.test(text) && pointer < lumberObj.text.length) {
      const matchIndex = templateRegex.exec(text).index;
      const [fullMatch, match] = templateRegex.exec(text);
      const TemplateClass = childTemplates[match];
      const childTemplate = new TemplateClass(data);
      const template = childTemplate.build();
      lumberObj.templates =
        typeof lumberObj.templates !== "undefined"
          ? [...lumberObj.templates]
          : [];
      lumberObj.templates.push({ [fullMatch]: template });
      pointer = matchIndex + fullMatch.length;
      text = text.slice(pointer);
    }
  }
  pointer = 0;
  for (const child of lumberObj.children) {
    weld({ lumberObj: child, data, childTemplates });
  }
  return { lumberObj, data, childTemplates };
}
