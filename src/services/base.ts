import axios from 'axios';

axios.interceptors.request.use((config) => {
  console.log('请求:', config)
  return config;
// eslint-disable-next-line @typescript-eslint/no-empty-function
}, error => {})

axios.interceptors.response.use((response) => {
  console.log('返回结果:', response)
  return response;
// eslint-disable-next-line @typescript-eslint/no-empty-function
}, error => {})

export const get = (url: string): Promise<any> => {
  return axios.get(url)
}

export const post = (url: string, params: any): Promise<any> => {
  return axios.post(url, params)
}

export const del = (url: string): Promise<any> => axios.delete(url)