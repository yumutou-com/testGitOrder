import React from 'react';
import { Empty, Button } from 'antd';
import { ProLayout, utils } from '@sei/suid';
import { Link } from 'umi';

const { getContextUser } = utils;
const { Content } = ProLayout;

export default () => {
  const currUser = getContextUser();

  return (
    <ProLayout>
      <Content>
        <Empty
          image={null}
          description={
            <div
              style={{
                fontSize: 24,
                fontWeight: 'bolder',
              }}
            >
              欢迎来到本模块进行开发
              <Button type='primary' style={{marginRight: 8}}>btn1</Button>
              <Button>btn2</Button>
            </div>
          }
        >
          {!currUser && (
            <Button type="primary">
              <Link to="/user/login">去登陆</Link>
            </Button>
          )}
        </Empty>
      </Content>
    </ProLayout>
  );
};
