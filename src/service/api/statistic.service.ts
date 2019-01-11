import { ApiService } from './api.service';
import { StatisticType1, StatisticType2, StatisticType3, Emotion } from '@/models/statistic';
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
    if (this.isUseMock) {
      const mock = require('@/assets/mock-data/annual-statistic.json');
      return mock.data.map((d: any) => new StatisticType1().deserialize(d));
    }
    return this.getList(StatisticType1, `/annual-statistic`, {});
  }

  getMonthlyStatistic(): Promise<StatisticType2[]> {
    if (this.isUseMock) {
      const mock = require('@/assets/mock-data/monthly-statistic.json');
      return mock.data.map((d: any) => new StatisticType2().deserialize(d));
    }
    return this.getList(StatisticType2, `/monthly-statistic`, {});
  }

  getHourlyStatistic(): Promise<StatisticType3[]> {
    if (this.isUseMock) {
      const mock = require('@/assets/mock-data/hourly-statistic.json');
      return mock.data.map((d: any) => new StatisticType3().deserialize(d));
    }
    return this.getList(StatisticType3, `/hourly-statistic`, {});
  }

  getWordCloud(category: TWEnum.WordCategory): Promise<WordCloud[]> {
    if (this.isUseMock) {
      const mock = require('@/assets/mock-data/word-cloud.json');
      return mock.data.map((d: any) => new WordCloud().deserialize(d));
    }
    let param = category ? { category: category } : {};
    return this.getList(WordCloud, `/word-cloud`, param);
  }

  getEmotion(): Promise<Emotion> {
    const mock = require('@/assets/mock-data/emotion.json');
    return Promise.resolve(mock).then(d => {
      return new Emotion().deserialize(d);
    });
  }
}

export const statService = new StatisticService();
