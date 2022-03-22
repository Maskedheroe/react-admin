import { useState } from "react";
import { addChapter } from "../../../services/chapter";
import { getPageChapter } from "../../../services/chapter";
import { Form } from 'antd';

type Chapter = {
  id: string;
  name: string;
  courseId: string;
};

const useChapterEffect = () => {
  const [chapterList, setChapterList] = useState([]);
  const [visiable, setVisiable] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [courseId, setCourseId] = useState("");
  const onCancel = () => {
    setVisiable(false);
  };
  const onFinish = (name: string, id: string, handleRefresh: () => void) => {
    setConfirmLoading(true);
    try {
      setTimeout(() => {
        addChapter({
          name,
          courseId: id,
        });
        setVisiable(false);
        setConfirmLoading(false);
        handleRefresh();
      }, 1000);
    } catch (error) {
      alert(error);
    }
  };
  const getTotalChapter = () => {
    getPageChapter("http://127.0.0.1:9000/business/admin/chapter/list", {
      page: 1,
      size: 20,
    }).then((res) => {
      const resp = res.data;
      setChapterList(
        resp.content.list.map((item: Chapter) => {
          return { ...item, key: item.id };
        })
      );
    });
  };
  return {
    chapterList,
    visiable,
    confirmLoading,
    courseName,
    courseId,
    setChapterList,
    setVisiable,
    setConfirmLoading,
    onCancel,
    onFinish,
    setCourseName,
    setCourseId,
    getTotalChapter
  };
};
export default useChapterEffect;
