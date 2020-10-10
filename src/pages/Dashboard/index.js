import React, { Component } from 'react';
import { Menu, Layout } from 'antd';
import cls from 'classnames';
import { ScrollBar } from 'suid';

const { Header, Content } = Layout;

const menuData = [
  {
    id: '10',
    name: 'moduleName',
  },
];

class Home extends Component {
  componentDidMount() {
    console.log('tst');
  }

  render() {
    return (
      <Layout className={cls('main-box')}>
        <Header className={cls('menu-header')}>应用路由列表</Header>
        <Content className={cls('menu-box')}>
          <ScrollBar>
            <Menu key="Menu" mode="inline" theme="light">
              {menuData}
            </Menu>
          </ScrollBar>
        </Content>
      </Layout>
    );
  }
}

export default Home;
