// '/api/getRoleList'
import request from '@/utils/request';

export const getRoleList = async (params) => request('/api/getRoleList', { method: 'GET', params });

export const getUserList = async (params) => request('/api/getUserList', { method: 'GET', params });
