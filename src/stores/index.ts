import { observable, action } from 'mobx';
import HomeStore from './tw-home';
import EmotionStore from './tw-emotion';

export interface IGlobalStore {
  collapsed: boolean;
  toggleCollapsed: () => void;
}

export default class GlobalStore implements IGlobalStore {
  @observable collapsed = true;

  @action.bound public toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }
}

export const stores = {
  globalStore: new GlobalStore(),
  homeStore: new HomeStore(),
  emotionStore: new EmotionStore(),
};
