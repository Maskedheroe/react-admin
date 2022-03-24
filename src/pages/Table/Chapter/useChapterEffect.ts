import { useState } from "react";
import { addChapter } from "../../../services/chapter";
import { getPageChapter } from "../../../services/chapter";
import { Form, FormInstance } from "antd";

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
  const [loading, setLoading] = useState(false);
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
    try {
      setLoading(true);
      getPageChapter("/list", {
        page: 1,
        size: 20,
      }).then((res) => {
        setTimeout(() => {
          const resp = res.data;
          setChapterList(
            resp.content.list.map((item: Chapter) => {
              return { ...item, key: item.id };
            })
          );
          setLoading(false);
        }, 500);
      });
    } catch (error) {
      console.log(error);
    }
  };
  return {
    chapterList,
    visiable,
    confirmLoading,
    courseName,
    courseId,
    loading,
    setLoading,
    setChapterList,
    setVisiable,
    setConfirmLoading,
    onCancel,
    onFinish,
    setCourseName,
    setCourseId,
    getTotalChapter,
  };
};
export default useChapterEffect;
