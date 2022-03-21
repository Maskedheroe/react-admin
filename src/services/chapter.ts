import { get, post } from './base';

interface Page {
  page: number;
  size: number
}

export const getChapter = (url: string) => {
  return get(url)
}

export const getPageChapter = (url: string, params: Page) => {
  return post(url, params)
}