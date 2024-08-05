const path = require("path");

module.exports = {
  entry: "./src/recursiveMethods.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};
