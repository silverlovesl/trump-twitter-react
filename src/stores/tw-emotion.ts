import { observable, action } from 'mobx';
import { Emotion } from '@/models/statistic';
import { statService } from '@/service/api/statistic.service';

export interface IEmotionStore {
  emotion: Emotion;
  fetchData: () => void;
}

export default class EmotionStore implements IEmotionStore {
  @observable emotion = new Emotion();

  @action.bound public async fetchData() {
    let _emotion = await statService.getEmotion();
    this.emotion = _emotion;
  }
}
