import React, { PureComponent } from 'react';
import md5 from 'md5';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import { Button, Form, Input, Select } from 'antd';
import { utils, ExtIcon } from 'suid';
import { title } from '../../../package.json';
import styl from './index.less';

const { Item } = Form;
const { Option } = Select;

@connect(({ global, loading }) => ({ global, loading }))
@Form.create()
class LoginForm extends PureComponent {
  static loginReqId;

  constructor(props) {
    super(props);
    this.loginReqId = utils.getUUID();
  }

  componentDidMount() {
    this.userInput.focus();
    this.handleVertify();
  }

  handlerSubmit = () => {
    const { form } = this.props;
    form.validateFields((err, formData) => {
      if (!err) {
        const { dispatch } = this.props;
        const user = { ...formData };
        user.password = md5(user.password);
        user.reqId = this.loginReqId;
        dispatch({
          type: 'global/login',
          payload: {
            ...user,
          },
        });
      }
    });
  };

  handleVertify = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/getVerifyCode',
      payload: {
        reqId: this.loginReqId,
      },
    });
  };

  handlerLocaleChange = locale => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/changeLocale',
      payload: {
        locale,
      },
    });
  };

  render() {
    const { loading, form, global } = this.props;
    const { getFieldDecorator } = form;
    const { showTenant, locale, verifyCode, showVertifCode } = global;
    return (
      <div className={styl['login-form-box']}>
        <div className="login-form">
          <div className="login-logo">
            <div className="login-name">{`${title}-用户登录`}</div>
          </div>
          <Form>
            {showTenant && (
              <Item>
                {getFieldDecorator('tenant', {
                  rules: [
                    {
                      required: false,
                      message: formatMessage({
                        id: 'login.tenant.required',
                        defaultMessage: '请输入租户账号',
                      }),
                    },
                  ],
                })(
                  <Input
                    autoFocus="autoFocus"
                    size="large"
                    prefix={<ExtIcon antd type="safety" />}
                    placeholder="租户账号"
                  />,
                )}
              </Item>
            )}
            <Item>
              {getFieldDecorator('account', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'login.account.required',
                      defaultMessage: '请输入用户名',
                    }),
                  },
                ],
              })(
                <Input
                  ref={inst => {
                    this.userInput = inst;
                  }}
                  size="large"
                  prefix={<ExtIcon antd type="user" />}
                  placeholder={formatMessage({ id: 'login.account', defaultMessage: '用户名' })}
                />,
              )}
            </Item>
            <Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码!' }],
              })(
                <Input
                  prefix={<ExtIcon antd type="lock" />}
                  size="large"
                  type="password"
                  placeholder="密码"
                />,
              )}
            </Item>
            {showVertifCode && verifyCode ? (
              <Item>
                {getFieldDecorator('verifyCode', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: '请输入验证码!',
                    },
                  ],
                })(
                  <Input
                    size="large"
                    disabled={loading.global}
                    prefix={<ExtIcon antd type="code" />}
                    placeholder="验证码"
                    addonAfter={<img alt="验证码" onClick={this.handleVertify} src={verifyCode} />}
                  />,
                )}
              </Item>
            ) : null}
            <Item>
              {getFieldDecorator('locale', {
                initialValue: locale,
                rules: [{ required: true }],
              })(
                <Select size="large" onChange={this.handlerLocaleChange}>
                  <Option value="zh-CN">简体中文</Option>
                  <Option value="en-US">English</Option>
                </Select>,
              )}
            </Item>
            <Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="login-form-button"
                onClick={this.handlerSubmit}
                loading={loading.global}
              >
                登录
              </Button>
            </Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
