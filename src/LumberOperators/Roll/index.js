import Drill from "../../Utilities/Drill";

let pointer = 0;

// roll child templates into parent by building them and replacing built content in parent
export default function roll({ lumberObj, data, childTemplates }) {
  const hasBoundDataTemplateRegex = new RegExp(
    /{{(([a-zA-Z]+)\|([a-zA-Z.0-9]+))}}/
  );
  if (!data) {
    return lumberObj;
  }
  let text = lumberObj.text.slice(pointer);
  while (hasBoundDataTemplateRegex.test(text)) {
    const matchResult = hasBoundDataTemplateRegex.exec(text);
    const matchIndex = matchResult.index;
    const [fullMatch, match, templateId, dataPath] = matchResult;
    const templateData = Drill(dataPath, data);
    const TemplateClass = childTemplates[templateId];
    const childTemplate = new TemplateClass(templateData);
    const template = childTemplate.build();
    // first obj passed is root lumberObj.
    // then first template is the one in the first children object
    // once that template is created
    if (templateData != null) {
      lumberObj.templates =
        typeof lumberObj.templates !== "undefined"
          ? [...lumberObj.templates]
          : [];
      lumberObj.templates.push({
        [fullMatch]: template
      });
      // _roll({
      //   lumberObj: template.lumberObj,
      //   templateData,
      //   childTemplates
      // });
    }
    pointer = matchIndex + fullMatch.length;
    text = text.slice(pointer);
  }
  pointer = 0;
  for (const child of lumberObj.children) {
    roll({ lumberObj: child, data, childTemplates });
  }
  return lumberObj;
}
