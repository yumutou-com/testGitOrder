import React from 'react';
import {message} from 'antd';
import {get} from 'lodash';
import {utils} from "@sei/suid";
import {handleSaveData} from './server';


const {pathMatchRegexp} = utils;


const DemoTableModel = {
  namespace: 'DemoTableModel',
  state: {
    visible: false, // 文本框的显示与隐藏
    record: {},
    tableRef: React.createRef(), // 表格-实例
  },
  subscriptions: {
    // setup({dispatch, history}) {
    //   history.listen(location => {
    //     const match = pathMatchRegexp('/demoTable', location.pathname);
    //     if (match) {
    //         dispatch({
    //           type: 'loadDataSource',
    //         })
    //     }
    //   })
    // }
  },
  effects: {
    // 加载表格中的数据
    *saveData({ payload }, { put, call, select }) {
      const {tableRef} = yield select(state => state.DemoTableModel);
      const {success} = yield call(handleSaveData, payload);
      if (success) {
        yield put({
          type: 'setEditObj',
          payload: {visible: false},
        });
        tableRef.current.remoteDataRefresh();
      } else {
        message.error('操作失败');
      }
    },
  },
  reducers: {
    setEditObj(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default DemoTableModel;
