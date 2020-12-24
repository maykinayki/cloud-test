/* eslint-disable */

const fs = require("fs");
const path = require("path");

const VARIABLE_REGEX = /\${(.*?)}/g;
const CWD = process.cwd();
const args = process.argv;

const fileRelPath = args[2];
const filePath = path.resolve(CWD, fileRelPath);

const targetFileRelPath = args[3];
const targetFilePath = path.resolve(CWD, targetFileRelPath);

fs.readFile(filePath, "utf8", function (err, data) {
  if (err) return console.log(err);

  const replacedVars = new Map();

  const result = data.replace(VARIABLE_REGEX, match => {
    const getVarName = match.slice(2, -1);
    const getVarValue = process.env[getVarName] ?? `""`;

    replacedVars.set(getVarName, getVarValue);

    return getVarValue;
  });

  console.group("Replacing the variables below:");
  console.log(replacedVars);
  console.groupEnd();

  fs.writeFile(targetFilePath, result, "utf8", function (err) {
    if (err) return console.log(err);
  });
});
