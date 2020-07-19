import Drill from "../../Utilities/Drill";

// fill up data holes
export default function seal({ lumberObj, data }) {
  if (!lumberObj) {
    return;
  }

  if (lumberObj.text && typeof lumberObj.text === "string") {
    lumberObj.text = sealHolesInString(lumberObj.text, data);
  }

  if (lumberObj.attributes && typeof lumberObj.attributes === "string") {
    lumberObj.attributes = sealHolesInString(lumberObj.attributes, data);
  }

  for (let child of lumberObj.children) {
    seal({ lumberObj: child, data });
  }
  return { lumberObj, data };
}

function sealHolesInString(str, data) {
  let pointer = 0;
  const hole = new RegExp(/{([a-zA-Z0-9]+|([a-zA-Z0-9]+?\.[a-zA-Z0-9]+)+)}/);
  const template = new RegExp(
    /{(?<={)({([a-zA-Z0-9]+|([a-zA-Z0-9]+?\.[a-zA-Z0-9]+)+)})(?=})}/
  );
  let sealedString = str;
  let text = sealedString.slice(pointer);
  let matchesHole = hole.test(text);
  while (matchesHole && pointer < sealedString.length) {
    const matchResult = hole.exec(text);
    const matchIndex = matchResult.index;
    const [fullMatch, path] = matchResult;
    const replacement = Drill(path, data);
    if (replacement) {
      sealedString = sealedString.replace(fullMatch, replacement);
      pointer = matchIndex + replacement.length;
    } else if (template.test(text)) {
      // skip over template expressions
      const [fullMatch] = template.exec(text);
      pointer += fullMatch.length;
    } else {
      // for data that cannot be found
      pointer += fullMatch.length;
    }
    text = sealedString.slice(pointer);
    matchesHole = hole.test(text);
  }
  pointer = 0;
  return sealedString;
}
