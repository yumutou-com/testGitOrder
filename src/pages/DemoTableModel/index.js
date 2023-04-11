import React, {useRef, useState, lazy, Suspense} from 'react';
import {Button, message, Spin, Icon} from 'antd';
import { ExtTable, ComboList, utils } from '@sei/suid';
import { useDispatch, useSelector } from 'react-redux';

const EditModal = lazy(() => import('./EditModal'));
const {authAction} = utils;
const App = () => {
  const [cascadeParams, setCascadeParams] = useState(null);
  const [selectRows, setSelectedRows] = useState([]);
  const {visible, tableRef} = useSelector(state => state.DemoTableModel);
  const dispatch = useDispatch();

  const handlerNameChange = item => {
    setCascadeParams({ name: item.name });
  };

  const handleSelect = (keys, rows) => {
    setSelectedRows(rows);
  }

  const handleDel = () => {
    // todo 删除逻辑
    setTimeout(() => {
      message.success('操作成功');
      // 刷新列表
      tableRef.current.remoteDataRefresh();
    }, 1000);
  }

  const handleAdd = (rowData = {}) => {
    dispatch({
      type: 'DemoTableModel/setEditObj',
      payload: {
        visible: true,
        record: rowData
      }
    })
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
          <Button type='primary' style={{marginRight: 8}} onClick={handleAdd} authCode=''>新增</Button>
          <Button style={{marginRight: 8}} onClick={handleDel} authCode=''>批量删除</Button>
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

  const modalProps = {
    title: '新增',
  }
    return (
      <>
        <ExtTable {...props} ref={tableRef}/>
        <Suspense fallback={<Spin/>}>
          {visible && <EditModal {...modalProps} />}
        </Suspense>
      </>
    );
}

export default App;
