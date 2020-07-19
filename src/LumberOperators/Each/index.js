export default function each({ lumberObj, data }) {
  const spreadTemplates = [];
  if (lumberObj.tagName === "each") {
    if (Array.isArray(data)) {
      for (let i = 0; i < data.length; i++) {
        for (const child of lumberObj.children) {
          const childWithIndex = { ...child };
          childWithIndex.text = childWithIndex.text.replace(
            /\(index\)/g,
            `${i}`
          );
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
