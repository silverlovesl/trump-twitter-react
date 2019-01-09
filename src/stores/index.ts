import { observable, action } from 'mobx';
import HomeStore from './home';

export interface IGlobalStore {
  collapsed: boolean;
  toggleCollapsed: () => void;
}

export default class GlobalStore implements IGlobalStore {
  @observable collapsed = false;

  @action.bound public toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }
}

export const stores = {
  globalStore: new GlobalStore(),
  homeStore: new HomeStore(),
};
