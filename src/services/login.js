import request from '@/utils/request';

export const userLogin = async (params) =>
  request('/api/userLogin', { method: 'POST', data: params });

export const getFakeCaptcha = async (mobile) => request(`/api/login/captcha?mobile=${mobile}`);

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}
