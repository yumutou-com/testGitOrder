import {utils} from '@sei/suid';
import constants, { CRM_SALE } from '@/utils/constants';

const { SERVER_PATH } = constants;
const {request} = utils;
// 保存业务实体
export const createCrmOrder = (data = {}) =>
  request({
    url: `${SERVER_PATH}/${CRM_SALE}/saleOrder/createCrmOrder`,
    method: 'POST',
    data,
  });

// 保存业务实体
export const handleSaveData = (data = {}) =>{
  return new Promise((resolve => {
    setTimeout(() => {
      resolve({success: true})
    }, 1000)
  }))
}





