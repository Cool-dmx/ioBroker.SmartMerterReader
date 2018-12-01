"use strict";
module.exports = async (answers) => {
    const template = `
# ioBroker.${answers.adapterName}

${answers.description || "Describe your project here"}

## Changelog

### 0.0.1
* (${answers.authorName}) initial release

## License
${answers.licenseText || "TODO: enter license text here"}
`;
    return template.trim();
};
