export class displayTools {
  newParag(obj, sectionId) {
    for (const item of Object.keys(obj)) {
      if (item === "till") continue;
      const val = obj[item];
      const newLine = document.createElement("p");
      const lineContent = document.createTextNode(` - ${val} ${item}`);
      newLine.appendChild(lineContent);
      document.querySelector(sectionId).append(newLine);
    }
  }
}
