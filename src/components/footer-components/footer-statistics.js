import AbstractComponent from "Components/abstract-component";
import {FilmSetting} from "../../consts";

const createFooterStatisticsTemplate = () => {
  return `<p>${FilmSetting.COUNT} movies inside</p>`;
};

export default class FooterStatistic extends AbstractComponent {
  getTemplate() {
    return createFooterStatisticsTemplate();
  }
}
