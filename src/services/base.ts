import axios from 'axios';

export const get = (url: string): Promise<any> => {
  return axios.get(url)
}

export const post = (url: string, params: any): Promise<any> => {
  return axios.post(url, params)
}

export const del = (url: string): Promise<any> => axios.delete(url)