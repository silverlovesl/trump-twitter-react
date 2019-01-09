import { observable, action } from 'mobx';
import { StatisticType1, StatisticType2, StatisticType3 } from '@/models/statistic';
import { statService } from '@/service/api/statistic.service';
import { WordCloud } from '@/models/word-cloud';
import { TWEnum } from '@/models/tw-enum';

export interface IHomeStore {
  annualTwitterStat: StatisticType1[];
  monthlyTwitterStat: StatisticType2[];
  hourlyTwitterStat: StatisticType3[];
  wordCloud: WordCloud[];
  fetchData: () => void;
  fetchWordCloud: (category: TWEnum.WordCategory) => void;
}

export default class HomeStore implements IHomeStore {
  @observable annualTwitterStat = new Array<StatisticType1>();
  @observable monthlyTwitterStat = new Array<StatisticType2>();
  @observable hourlyTwitterStat = new Array<StatisticType3>();
  @observable wordCloud = new Array<WordCloud>();

  @action.bound public async fetchData() {
    let _hourlyTwitterStat = await statService.getHourlyStatistic();
    let _monthlyTwitterStat = await statService.getMonthlyStatistic();
    let _annualTwitterStat = await statService.getAnnualStatistic();

    this.annualTwitterStat = _annualTwitterStat;
    this.monthlyTwitterStat = _monthlyTwitterStat;
    this.hourlyTwitterStat = _hourlyTwitterStat;
  }

  @action.bound public async fetchWordCloud(category: TWEnum.WordCategory) {
    let _wordCloud = await statService.getWordCloud(category);
    this.wordCloud = _wordCloud;
  }
}
