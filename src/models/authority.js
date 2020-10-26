import { getRoleList, getUserList } from '@/services/authority';

const authorityModel = {
  namespace: 'authority',
  state: {
    roleData: {
      roleList: [],
      total: 0,
      pageSize: 10,
      current: 1,
    },
  },
  effects: {
    // 获取角色列表
    *queryRoleList({ payload }) {
      return yield getRoleList(payload);
    },
    // 获取用户列表
    *queryUserList({ payload }) {
      return yield getUserList(payload);
    },
  },
  reducers: {
    setRoleList(state, { payload }) {
      return { ...state, status: payload.status, type: 'account' };
    },
  },
};
export default authorityModel;
