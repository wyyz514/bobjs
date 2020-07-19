export default function check({ lumberObj, data }) {
  const conditionRegex = new RegExp(/test="(.*)(?=")/);
  if (lumberObj.tagName === "check") {
    const [fullMatch, condition] = conditionRegex.exec(lumberObj.attributes);
    const evaluation = eval(condition);
    const [good, bad] = lumberObj.children;
    if (evaluation) {
      lumberObj.children = [good];
    } else {
      lumberObj.children = [bad];
    }
  }
  for (const child of lumberObj.children) {
    check({ lumberObj: child, data });
  }
}
