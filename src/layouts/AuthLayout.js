import React from 'react';
import { ProLayout, ScrollBar, utils } from '@sei/suid';
import { Menu, Icon } from 'antd';
import { isEmpty } from 'lodash';
import Link from 'umi/link';
import router from 'umi/router';
import cls from 'classnames';
import { constants } from '@/utils';
import routers from '../../config/router.config';

import styles from './AuthLayout.less';

const { Header, Content, SiderBar } = ProLayout;
const { SubMenu } = Menu;
const { getContextUser } = utils;
const { IS_PRODUCTION } = constants;

const Layout = ({ children }) => {
  if (IS_PRODUCTION) {
    return children;
  }

  const currUser = getContextUser();

  if (isEmpty(currUser)) {
    router.replace({
      pathname: '/user/login',
    });
  }

  const getMenuNavItemByMode = item => {
    return <Link to={item.path}>{item.title}</Link>;
  };

  // 递归渲染树形菜单
  const getMenuItems = data =>
    data.map(item => {
      if (!item.title) {
        return undefined;
      }
      if (item.routes && item.routes.length) {
        const title = (
          <span>
            {item.iconType ? <Icon type={item.iconType} /> : <Icon type="profile" />}
            <span>{item.title}</span>
          </span>
        );

        return (
          <SubMenu title={title} key={item.path}>
            {getMenuItems(item.routes)}
          </SubMenu>
        );
      }

      return (
        <Menu.Item title={item.title} key={item.path}>
          {getMenuNavItemByMode(item)}
        </Menu.Item>
      );
    });

  return (
    <ProLayout>
      <SiderBar width={220}>
        <div
          style={{
            height: '100%',
            background: '#001529',
          }}
        >
          <ScrollBar>
            <Menu defaultOpenKeys={['/']} mode="inline" theme="dark" inlineCollapsed={false}>
              {getMenuItems(routers)}
            </Menu>
          </ScrollBar>
        </div>
      </SiderBar>
      <Content>
        <ProLayout>
          <Header
            title={`您好，${currUser.userName}`}
            extra={<Link to="/user/login">切换用户</Link>}
          />
          <Content className={cls(styles.auth_layout_content)}>{children}</Content>
        </ProLayout>
      </Content>
    </ProLayout>
  );
};

export default Layout;
