import React from 'react';
import { Empty, Button, Card } from 'antd';
import { ProLayout, utils } from '@sei/suid';
import { Link } from 'umi';

const { getContextUser } = utils;
const { Content } = ProLayout;

export default () => {
  const currUser = getContextUser();

  const handleBtn = () => {
    console.log('aaa');
  }

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
              <Button type='primary' style={{marginRight: 8}} onClick={handleBtn}>btn1</Button>
              <Button>btn2</Button>
              <Card title='card-one' color='#8e8e8e'>
                <p>1111111111111</p>
                <p>2222222222222</p>
              </Card>
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
