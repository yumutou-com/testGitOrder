import React, { Component } from 'react';
import { Menu, Layout } from 'antd';
import cls from 'classnames';
import { ScrollBar } from 'suid';
import styles from './index.less';

const { Header, Content } = Layout;
const { SubMenu } = Menu;

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

class Home extends Component {
  getNavMenuItems = menusData => {
    if (!menusData) {
      return [];
    }
    return menusData
      .filter(item => item.name)
      .map(item => this.getSubMenuOrItem(item))
      .filter(item => item);
  };

  getSubMenuOrItem = item => {
    if (item.children && item.children.some(child => child.name)) {
      return (
        <SubMenu title={item} key={item.id}>
          {item.children}
        </SubMenu>
      );
    }
    return <Menu.Item key={item.id}>{item}</Menu.Item>;
  };

  render() {
    return (
      <Layout className={cls(styles['main-box'])}>
        <Header className={cls('menu-header')}>应用路由列表</Header>
        <Content className={cls('menu-box')}>
          <ScrollBar>
            <Menu key="Menu" mode="inline" theme="light">
              {this.getNavMenuItems(menuData)}
            </Menu>
          </ScrollBar>
        </Content>
      </Layout>
    );
  }
}

export default Home;
