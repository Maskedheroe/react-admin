
// /admin/section
import { get, post, del } from "./base";

interface Page {
  page: number;
  size: number;
}

type Section = {
  id: string;
  title: string;
  courseId: string;
  chapterId: string;
  video: string;
  time: number;
  charge: string;
  sort: number;
  createdAt: number;
  updatedAt: number;
}

const ENV = import.meta.env.VITE_BASE_API

const CHAPTER = `${ENV}/business/admin/section`

export const getAllSection = (url: string): Promise<any> => {
  return get(url);
};

export const getPageChapter = (url: string, params: Page): Promise<any> => {
  return post(`${CHAPTER}${url}`, params);
};

export const addSection = (params: Section, url?: string): Promise<any> => {
  if (!url) {
    url = `${CHAPTER}/save`
  }
  return post(url, params);
};

export const deleteAction = (id: string): Promise<any> => {
  return del(`${CHAPTER}/delete/${id}`)
}
