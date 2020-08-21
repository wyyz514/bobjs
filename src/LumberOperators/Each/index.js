export default function each({ lumberObj, data }) {
  const spreadTemplates = [];
  if (lumberObj.tagName === "each") {
    if (Array.isArray(data)) {
      for (let i = 0; i < data.length; i++) {
        for (const child of lumberObj.children) {
          const childWithIndex = replaceIndex({ ...child }, i);
          spreadTemplates.push(childWithIndex);
        }
      }
      lumberObj.children = [...spreadTemplates];
    }
  }
  for (const child of lumberObj.children) {
    each({ lumberObj: child, data });
  }
}

function replaceIndex(lumberObj, i) {
  if (lumberObj == null) {
    return;
  }
  const withIndex = { ...lumberObj, children: [] };
  withIndex.text = withIndex.text.replace(/\(index\)/g, `${i}`);
  for (const child of lumberObj.children) {
    const childWithIndex = replaceIndex({ ...child }, i);
    withIndex.children.push(childWithIndex);
  }
  return withIndex;
}

