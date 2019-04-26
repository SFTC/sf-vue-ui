var { exec } = require('child_process');
var packages = ['multi-select', 'multi-option'];

packages.forEach(package => {
  exec(`npx vue-cli-service build --target lib --name ${package} --dest lib/${package} packages/${package}/src/main.vue`, {
    stdio: 'inherit'
  }, () => {
    console.info(`${package} ——> 打包完成`);
  });
});
