import { ApiService } from './api.service';
import { StatisticType1, StatisticType2, StatisticType3 } from '@/models/statistic';
import { WordCloud } from '@/models/word-cloud';
import { TWEnum } from '@/models/tw-enum';
class StatisticService extends ApiService {
  constructor() {
    super();
  }

  /**
   * Get competency list
   */
  getAnnualStatistic(): Promise<StatisticType1[]> {
    return this.getList(StatisticType1, `/annual-statistic`, {});
  }

  getMonthlyStatistic(): Promise<StatisticType2[]> {
    return this.getList(StatisticType2, `/monthly-statistic`, {});
  }

  getHourlyStatistic(): Promise<StatisticType3[]> {
    return this.getList(StatisticType3, `/hourly-statistic`, {});
  }

  getWordCloud(category: TWEnum.WordCategory): Promise<WordCloud[]> {
    let param = category ? { category: category } : {};
    return this.getList(WordCloud, `/word-cloud`, param);
  }
}

export const statService = new StatisticService();
