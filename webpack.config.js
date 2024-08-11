/* eslint-disable no-undef */
const path = require("path");

module.exports = {
  entry: "./src/binarySearchTree.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};
