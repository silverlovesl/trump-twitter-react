import * as React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { hot } from 'react-hot-loader';
import { Route } from 'react-router-dom';
import './App.scss';
import logo_small from '@/assets/image/logo_small.png';
import Home from '@/views/home/Home';
import { observer, inject } from 'mobx-react';
import IGlobalStore from './stores';

const { Sider, Header, Content } = Layout;

type AppProps = {
  globalStore?: IGlobalStore;
};

@inject('globalStore')
@observer
class App extends React.Component<AppProps, {}> {
  public render() {
    const { globalStore } = this.props;
    return (
      <div id="app">
        <Layout id="components-layout-demo-custom-trigger">
          <Sider trigger={null} collapsible={true} collapsed={globalStore!.collapsed}>
            <div className="logo">
              <img src={logo_small} />
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Icon type="bar-chart" />
                <span>Twitter every day</span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="cloud" />
                <span>Your are fired</span>
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
              <Route path={'/'} component={Home} />
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default hot(module)(App);
