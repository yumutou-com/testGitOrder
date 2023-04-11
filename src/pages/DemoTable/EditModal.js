/**
 * @Title: EditModal
 * @ProjectName sei-blank-app
 * @Description:
 * @author yulan
 * @date 2023/3/2415:30
 */
import React, {useState} from 'react';
import {Form, Input, Icon} from 'antd';
import {ExtModal, Attachment, ComboList} from '@sei/suid';

const EditModal = ({visible, setVisible, title, form, handleSave, record, confirmLoading}) => {
  const [fileList, setFileList] = useState([]);
  const {getFieldDecorator} = form;
  getFieldDecorator('needRemark',{initialValue: record.needRemark});
  const handleCancel = () => {
    setVisible(false);
  }

  const handleOk = () => {
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('values', values);
        handleSave(values);
      }
    })
  }

  const handlerDeleteFile = (files) => {
    console.log('files', files);
  }

  const props = {
    title,
    visible,
    onCancel: handleCancel,
    onOk: handleOk,
    confirmLoading
  };
  const attachmentProps = {
    serviceHost: '/api-gateway/edm-service',
    multiple: true,
    fileList,
    toolExtras: [{ title: '替换', key: 'replace' }],
    onDeleteFile: handlerDeleteFile,
  };
  return <ExtModal {...props} >
    <Form>
      <Form.Item>
        {getFieldDecorator('tempName', {
          initialValue: record.tempName,
          rules: [{ required: true, message: 'Please input your tempName!' }],
        })(
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="tempName"
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('needName', {
          initialValue: record.needName,
          rules: [{ required: true, message: 'Please input your needName!' }],
        })(
          <ComboList
            style={{ width: 280 }}
            store={{
              autoLoad: false,
              url: `http://10.4.32.53:7300/mock/5dd5efbdc239b926aeb04627/seid.api/receiverType/list`,
            }}
            form={form}
            field={['needRemark']}
            rowKey="name"
            name='needName'
            reader={{
              name: 'name',
              field: ['remark'],
              description: 'remark',
            }}
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('attachment', {
          initialValue: record.attachment,
        })(
          <Attachment {...attachmentProps} />,
        )}
      </Form.Item>
    </Form>
  </ExtModal>
}
export default Form.create()(EditModal);
