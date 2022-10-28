const Mustache = require("mustache");
const writePackage = require("write-pkg");
const fs = require('fs');
require('colors');

const createStylePackage = async (template) => {

    const data = fs.readFile('./templates/style.css.mustache', 'utf8', async (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        const output = Mustache.render(data.toString(), template);

        fs.writeFile('../style.css', output, err => {
            if (err) {
              console.error(err);
            }
            // file written successfully
            console.log('File create successfully.'.green)
        });
      
        await writePackage(
          '../package.json',
          Object.fromEntries(
            Object.entries(
              {
              "name": template.theme_name,
              "version": template.version,
              "description": template.theme_description,
              "main": "index.js",
              "scripts": {
                "bs": "browser-sync start --config src/build/browser-sync.config.js",
                "css": "npm-run-all css-compile css-postcss css-minify",
                "css-compile": "sass --style expanded --source-map --embed-sources --no-error-css --quiet src/sass/child-theme.scss:css/child-theme.css src/sass/custom-editor-style.scss:css/custom-editor-style.css",
                "css-minify": "cleancss -O1 --format breakWith=lf --with-rebase --source-map --source-map-inline-sources --output css/ --batch --batch-suffix \".min\" \"css/*.css\" \"!css/*.min.css\" \"!css/*rtl*.css\"",
                "css-postcss": "postcss --config src/build/postcss.config.js --replace \"css/*.css\" \"!css/*.rtl*.css\" \"!css/*.min.css\"",
                "js": "npm-run-all js-compile js-minify",
                "js-compile": "rollup --config src/build/rollup.config.js --sourcemap",
                "js-minify": "terser --config-file src/build/terser.config.json --output js/child-theme.min.js js/child-theme.js",
                "watch": "npm-run-all --parallel watch-run-*",
                "watch-bs": "npm-run-all --parallel bs watch-run-*",
                "watch-run-css": "nodemon --watch src/sass/ --ext scss --exec \"npm-run-all css\"",
                "watch-run-js": "nodemon --watch src/js/ --ext js --exec \"npm-run-all js\"",
                "copy-assets": "node src/build/copy-assets.js",
                "dist": "npm-run-all --parallel css js",
                "dist-build": "node src/build/dist-build.js",
                "dist-clean": "node src/build/dist-clean.js",
                "compile": "npm-run-all css js",
                "build": "wp-scripts build --webpack-copy-php",
                "format": "wp-scripts format",
                "lint:css": "wp-scripts lint-style",
                "lint:js": "wp-scripts lint-js",
                "packages-update": "wp-scripts packages-update",
                "plugin-zip": "wp-scripts plugin-zip",
                "start": "wp-scripts start --webpack-copy-php",
              },
              "engines": {
                "node": ">=14"
              },
              "repository": {
                "type": "git",
                "url": template.git_uri
              },
              "keywords": [
                "wordpress",
                "theme",
                "framework",
                "bootstrap",
                "underscores"
              ],
              "author": template.author,
              "license": "GPL-2.0",
              "bugs": {
                "url": template.git_uri+"/issues"
              },
              "homepage": template.theme_uri,
              "dependencies": {
                "@fortawesome/fontawesome-free": "^6.1.1",
                "animate.css": "^4.1.1",
                "bootstrap": "^5.2.0-beta1",
                "flickity": "^3.0.0",
                "flickity-as-nav-for": "^3.0.0",
                "hover.css": "^2.3.2"
              },
              "devDependencies": {
                "@wordpress/scripts": "^24.1.0",
                "@babel/core": "^7.16.0",
                "@babel/preset-env": "^7.16.4",
                "@popperjs/core": "^2.11.0",
                "@rollup/plugin-babel": "^5.3.0",
                "@rollup/plugin-commonjs": "^21.0.0",
                "@rollup/plugin-multi-entry": "^4.1.0",
                "@rollup/plugin-node-resolve": "^13.0.6",
                "@rollup/plugin-replace": "^3.0.0",
                "autoprefixer": "^10.4.0",
                "bootstrap": "^5.2.0",
                "browser-sync": "^2.27.7",
                "browserslist": "^4.18.1",
                "caniuse-lite": "^1.0.30001283",
                "clean-css-cli": "^5.4.2",
                "del": "^6.0.0",
                "@fortawesome/fontawesome-free": "^6.1.1",
                "nodemon": "^2.0.15",
                "npm-run-all": "^4.1.5",
                "popper.js": "^1.16.1",
                "postcss": "^8.4.4",
                "postcss-cli": "^9.0.2",
                "postcss-understrap-palette-generator": "git+https://github.com/understrap/postcss-understrap-palette-generator.git",
                "rollup": "^2.60.2",
                "sass": "^1.44.0",
                "terser": "^5.10.0",
                "understrap": "github:understrap/understrap#develop"
              }
            }
            ).filter(([, value]) => !!value)
          )
        );
        
      });
}

module.exports = {
    createStylePackage
}