import * as React from 'react';
// import { Redirect } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import TWHome from '@/views/home/TWHome';
import TWEmotion from '@/views/emotion/TWEmotion';

export default class AppRouting extends React.Component {
  public render() {
    return (
      <Switch>
        <Route exact={true} path="/" component={TWHome} />
        <Route path="/home" component={TWHome} />
        <Route path="/emotion" component={TWEmotion} />
      </Switch>
    );
  }
}
