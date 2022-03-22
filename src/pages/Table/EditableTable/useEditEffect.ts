import React, { useState } from "react";
import { Item } from "./types";
import { Form, FormInstance, Popconfirm, Typography, notification } from "antd";
import { addChapter, deleteChapter } from "../../../services/chapter";

type colType = {
  title: string;
  dataIndex: string;
  width?: string;
  editable?: boolean;
  render?: any;
}[];

interface EditReturnType {
  cancel: () => void;
  edit: (record: Partial<Item> & { key: React.Key }) => void;
  save: (key: string | number) => void;
  editingKey: string;
  setEditingKey: (editkey: string) => void;
  form: FormInstance;
  isEditing: (record: Item) => boolean;
  columns: colType;
  handleDeleteChapter: (record: Partial<Item> & { key: React.Key }) => void
}

export const useEditEffect = (
  chapterList: any[],
  setChapterList: (data: any) => void,
  editComponent: any,
  getTotalChapter: () => void
): EditReturnType => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState<string>("");

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ name: "", age: "", address: "", ...record });
    setEditingKey(record.id as string);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const isEditing = (record: Item) => record.id === editingKey;

  const openNotification = () => {
    notification.info({
      message: '新消息',
      description: '修改成功',
      placement: 'top'
    });
  };

  const save = async (key: string | number) => {
    try {
      const revisedItem = (await form.validateFields()) as Item;
      addChapter(revisedItem);
      setEditingKey("");
      getTotalChapter()
      openNotification()
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const handleDeleteChapter = (record: Partial<Item> & { key: React.Key }) => {
    try {
      deleteChapter(record?.id || '')
      getTotalChapter()
      openNotification()
    } catch (error) {
      console.log(error)
    }
  }

  const columns: colType = [
    {
      title: "ID",
      dataIndex: "id",
      width: "25%",
      editable: true,
    },
    {
      title: "名称",
      dataIndex: "name",
      width: "15%",
      editable: true,
    },
    {
      title: "课程ID",
      dataIndex: "courseId",
      width: "20%",
      editable: true,
    },
    {
      title: "操作",
      dataIndex: "operation",
      render: (_: any, record: Item) => {
        return editComponent(record, isEditing);
      },
    },
  ];
  return {
    cancel,
    save,
    edit,
    editingKey,
    setEditingKey,
    form,
    columns,
    isEditing,
    handleDeleteChapter
  };
};
