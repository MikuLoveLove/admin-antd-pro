// '/api/getRoleList'
import request from '@/utils/request';

// 获取角色列表
export const getRoleList = async (params) => request('/api/getRoleList', { method: 'GET', params });

// 获取用户列表
export const getUserList = async (params) => request('/api/getUserList', { method: 'GET', params })

// 获取所有角色
export const getAllRole = async () => request('/api/getAllRole', { method: 'GET' });

// 添加用户
export const addUser = async (data) => request('/api/addUser', { method: 'POST', data });

// 删除用户
export const deleteUser = async (id) => request(`/api/deleteUser/${id}`, { method: 'GET' });

// 更新用户
export const updateUser = async (data) => request(`/api/updateUser`, { method: 'POST', data });
