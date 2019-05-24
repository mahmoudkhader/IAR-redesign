// https://github.com/webpack/docs/wiki/context
const cache = {};
// require.context(directory, useSubdirectories = false, regExp = /^\.\//)
const req = require.context("./", false, /\.js$/);
// is an array containing all the matching modules

req.keys().forEach(filename => {
  cache[filename.replace(/\.\/|\.js/g, "")] = req(filename).default;
});

export default cache;
