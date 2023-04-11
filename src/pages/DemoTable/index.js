import React, {useRef, useState, lazy, Suspense, useEffect} from 'react';
import {Button, message, Spin, Icon} from 'antd';
import { ExtTable, ComboList, utils } from '@sei/suid';
import JsPDF from 'jspdf';
import {useXState} from "@/utils/customerUse";

const EditModal = lazy(() => import('./EditModal'));
const {authAction} = utils;
const App = () => {
  const [cascadeParams, setCascadeParams] = useState(null);
  const [selectRows, setSelectedRows] = useState([]);
  const [visible, setVisible] = useState(false);
  const [record, setRecord] = useState({});
  const [loading, setLoading] = useState(false);
  const [xstate, setXState] = useXState(1);
  const tableRef = useRef();

  useEffect(() => {
    console.log('xstate---->', xstate);
  })

  const handlerNameChange = item => {
    setCascadeParams({ name: item.name });
  };

  const handleSelect = (keys, rows) => {
    setSelectedRows(rows);
  }

  const handleDel = () => {
    // todo 删除逻辑
    setTimeout(() => {
      console.log('selectRows', selectRows);
      message.success('操作成功');
      // 刷新列表
      tableRef.current.remoteDataRefresh();
    }, 1000);
  }

  const handleAdd = (rowData = {}) => {
    setVisible(true);
    setRecord(rowData);
  }

  const handleTest = () => {
    setXState(2, (value) => {
      console.log('xstate2222', value);
    });
    console.log('xstate', xstate);
  }

  const saveAsPDF = () => {
    const doc = new JsPDF();
    console.log('doc', doc);
    const element = document.getElementById('my-component');
    doc.addHTML(element, () => {
      doc.save('my-component.pdf');
    });
  }

  const props = {
    cascadeParams,
    checkbox: true,
    onSelectRow: handleSelect,
    columns: [
      {
        title: '操作',
        dataIndex: 'action',
        width: 60,
        render: (text, rowData) => <Icon type='edit' onClick={() => handleAdd(rowData)}/>
      },
      {
        title: '姓名',
        dataIndex: 'name',
        width: 120,
        required: true,
      },
      {
        title: '电子邮箱',
        dataIndex: 'email',
        width: 220,
      },
      {
        title: '年龄',
        dataIndex: 'age',
        width: 60,
      },
      {
        title: '地址',
        dataIndex: 'address',
        width: 260,
        optional: true,
      },
    ],
    store: {
      url: 'http://10.4.32.53:7300/mock/5dd5efbdc239b926aeb04627/seid.api/user/userList',
    },
    toolBar: {
      left: (
        <div>
         <Button type='primary' style={{marginRight: 8}} onClick={handleAdd} authCode='44444'>新增</Button>
          <Button style={{marginRight: 8}} onClick={handleTest} authCode='44444'>test</Button>
          <Button style={{marginRight: 8}} onClick={handleDel} authCode=''>批量删除</Button>
          <Button onClick={saveAsPDF}>保存为 PDF</Button>
          <span>收款类型：</span>
          <ComboList
            style={{ width: 280 }}
            store={{
              autoLoad: false,
              url: `http://10.4.32.53:7300/mock/5dd5efbdc239b926aeb04627/seid.api/receiverType/list`,
            }}
            rowKey="name"
            afterSelect={handlerNameChange}
            reader={{
              name: 'remark',
              description: 'name',
            }}
          />
        </div>
      ),
    },
  };

  const handleSave = (values) => {
    // todo 调用接口保存数据并刷新接口
    setLoading(true);
    console.log('values', values);
    setTimeout(() => {
      message.success('操作成功');
      setLoading(false);
      setVisible(false);
      tableRef.current.remoteDataRefresh();
    }, 1000)
  }

  const modalProps = {
    visible,
    setVisible,
    title: '新增',
    handleSave,
    record,
    confirmLoading: loading
  }
    return (
      <div id='my-component'>
        <ExtTable {...props} ref={tableRef}/>
        <Suspense fallback={<Spin/>}>
          {visible && <EditModal {...modalProps} />}
        </Suspense>
      </div>
    );
}

export default App;
