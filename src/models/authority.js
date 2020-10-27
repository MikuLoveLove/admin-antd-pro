import { getRoleList, getUserList, getAllRole, addUser, deleteUser } from '@/services/authority';

const authorityModel = {
  namespace: 'authority',
  state: {
    roleList: []
  },
  effects: {
    // 获取角色列表
    * queryRoleList ({payload}) {
      try {
        return yield getRoleList(payload);
      } catch (e) {
        return e
      }
    },
    // 获取所有角色
    * queryAllRole (action, {call, put}) {
      const res = yield call(getAllRole)
      yield put({type: 'setRoleList', payload: res.data})
    },
    // 获取用户列表
    * queryUserList ({payload}) {
      try {
        return yield getUserList(payload)
      } catch (e) {
        return e
      }
    },
    // 添加用户
    * addUser ({payload}) {
      try {
        return yield addUser(payload)
      } catch (e) {
        return e
      }
    },
    // 删除用户
    *deleteUser ({payload}) {
      try {
        return yield deleteUser(payload)
      } catch (e) {
        return e
      }
    }
  },
  reducers: {
    setRoleList(state, { payload }) {
      return { ...state, roleList: payload };
    },
  },
};
export default authorityModel;
