import { get, post, del } from "./base";

interface Page {
  page: number;
  size: number;
}

interface Chapter {
  name: string;
  courseId: string;
}

const ENV = import.meta.env.VITE_BASE_API

const CHAPTER = `${ENV}/business/admin/chapter`

export const getChapter = (url: string): Promise<any> => {
  return get(url);
};

export const getPageChapter = (url: string, params: Page): Promise<any> => {
  return post(`${CHAPTER}${url}`, params);
};

export const addChapter = (params: Chapter, url?: string): Promise<any> => {
  if (!url) {
    url = `${CHAPTER}/save`
  }
  return post(url, params);
};

export const deleteChapter = (id: string): Promise<any> => {
  return del(`${CHAPTER}/delete/${id}`)
}
