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
      Mock: path.resolve(__dirname, `src/mock`),
      Components: path.resolve(__dirname, `src/components`),
      HeaderComponents: path.resolve(__dirname, `src/components/header-components`),
      MainComponents: path.resolve(__dirname, `src/components/main-components`),
        FilmComponents: path.resolve(__dirname, `src/components/main-components/film-components`),
        PopupDetail: path.resolve(__dirname, `src/components/main-components/popup-detail-components`),
      FooterComponents: path.resolve(__dirname, `src/components/footer-components`),
      Utils: path.resolve(__dirname, `src/utils`),
      Controllers: path.resolve(__dirname, `src/controllers`)
    }
  }
};
