const fs = require('fs');

function getAllBlogs() {
  const files = fs.readdirSync('./blogs');
  return files.map(f => {
    const [name] = f.split('.');
    return `blog/${name}`;
  });
}

let routes = ['', '404'];
routes = routes.concat(getAllBlogs());

routes = routes.map(r => '/' + r);
module.exports = routes;