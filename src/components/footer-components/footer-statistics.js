import AbstractComponent from "components/abstract-component";
import {Count} from "../../consts";

const createFooterStatisticsTemplate = () => {
  return `<p>${Count.FILMS} movies inside</p>`;
};

export default class FooterStatistic extends AbstractComponent {
  getTemplate() {
    return createFooterStatisticsTemplate();
  }
}
