import * as React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { hot } from 'react-hot-loader';
import './App.scss';
import logo_small from '@/assets/image/logo_small.png';
import { observer, inject } from 'mobx-react';
import IGlobalStore from './stores';
import AppRouting from './AppRouting';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';

const { Sider, Header, Content } = Layout;
const history = createBrowserHistory();

interface AppProps {
  globalStore?: IGlobalStore;
}

@inject('globalStore')
@observer
class App extends React.Component<AppProps> {
  public handMenuClick(param: any) {
    history.replace(param.key);
  }

  public render() {
    const { globalStore } = this.props;
    return (
      <div id="app">
        <Layout id="components-layout-demo-custom-trigger">
          <Sider trigger={null} collapsible={true} collapsed={globalStore!.collapsed}>
            <div className="logo">
              <img src={logo_small} />
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onClick={this.handMenuClick}>
              <Menu.Item key="home">
                <Icon type="bar-chart" />
                <span>Twitter every day</span>
              </Menu.Item>
              <Menu.Item key="emotion">
                <Icon type="frown" />
                <span>Emotion</span>
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="pie-chart" />
                <span>XXXX</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Icon
                className="trigger"
                type={globalStore!.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={globalStore!.toggleCollapsed}
              />
            </Header>
            <Content style={{ margin: '16px', padding: '4px', minHeight: '280px' }}>
              <Router history={history}>
                <AppRouting />
              </Router>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default hot(module)(App);
