import { useState } from "react";

const useAddChapterEffect = () => {
  const [chapterList, setChapterList] = useState([]);
  const [visiable, setVisiable] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const onOk = () => {
    console.log('onOk')
  }
  const onCancel = () => {
    setVisiable(false)
  }
  return {
    chapterList,
    visiable,
    confirmLoading,
    setChapterList,
    setVisiable,
    setConfirmLoading,
    onOk,
    onCancel
  }
}
export default useAddChapterEffect