const path = require(`path`);

module.exports = {
  mode: `development`,  // режим сборки
  entry: `./src/main.js`,  // точка входа приложения
  output: {  // Настройка выходного файла
    filename: `bundle.js`,
    path: path.join(__dirname, `public`)
  },
  devtool: `source-map`, // подключаем sourcemap
  devServer : {
    contentBase: path.join(__dirname, `public`), // где искать сборку
    // автоматическая перезагрузка страницы
    // По умолчанию приложение будет доступно по адресу http://localhost:8080
    // Лучше открывать в режиме инкогнито, что бы браузер не кэшировал файлы сборки
    watchContentBase: true
  },
  resolve: {
    alias: {
      mock: path.resolve(__dirname, `./src/mock`),
      components: path.resolve(__dirname, `./src/components`),
      utils: path.resolve(__dirname, `./src/utils`),
      controllers: path.resolve(__dirname, `./src/controllers`)
    }
  }
};
