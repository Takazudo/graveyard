var postcss = require("postcss");
const fs = require("fs");

const myPlugin = () => {
  return {
    postcssPlugin: "myPlugin",
    Declaration(decl) {
      if (decl.value === "my-favorite-color") {
        decl.value = "orange";
      }
    },
  };
};
myPlugin.postcss = true;

fs.readFile("styles.css", (err, css) => {
  postcss([myPlugin])
    .process(css, { from: "styles.css", to: "styles-converted.css" })
    .then((result) => {
      console.log(result.css);
      fs.writeFile("styles-converted.css", result.css, () => true);
    });
});
