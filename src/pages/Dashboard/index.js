import React, { Component } from 'react';
import { Menu, Layout } from 'antd';
import cls from 'classnames';
import { ScrollBar } from 'suid';
import styles from './index.less';

const { Header, Content } = Layout;

const menuData = [
  {
    id: '10',
    name: 'moduleName',
    children: [
      {
        id: '100',
        name: 'menuName',
        path: '/moduleName/demo',
      },
    ],
  },
];

// eslint-disable-next-line react/prefer-stateless-function
class Home extends Component {
  render() {
    return (
      <Layout className={cls(styles['main-box'])}>
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
