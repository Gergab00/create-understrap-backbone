const Mustache = require("mustache");
const fs = require('fs');
require('colors');

const create = async (template) => {

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
        
      });



}

module.exports = {
    create
}