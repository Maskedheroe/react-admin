import React, { useState, useEffect, createRef } from "react";
import "./style.css";
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Typography,
  Modal,
  Spin,
  FormInstance,
} from "antd";
import useChapterEffect from "./useChapterEffect";
import { useEditEffect } from "./useEditEffect";
import { Confirm } from "./component/Confirm";
import { Item } from "./types";
import { TableHead } from "../../../components/TableHead/index";
import DeleteAction from "../../../components/DeleteAction";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: Item;
  index: number;
  children: React.ReactNode;
}
const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const EditableTable = () => {
  const submitFormRef = createRef<FormInstance>();
  const {
    chapterList,
    visiable,
    confirmLoading,
    courseId,
    courseName,
    loading,
    setChapterList,
    setVisiable,
    setConfirmLoading,
    onCancel,
    onFinish,
    setCourseId,
    setCourseName,
    getTotalChapter,
    setLoading,
  } = useChapterEffect();

  const handleAddChapter = (): void => {
    setVisiable(true);
  };

  const handleRefresh = () => {
    getTotalChapter();
  };

  const {
    cancel,
    save,
    edit,
    editingKey,
    setEditingKey,
    form,
    columns,
    isEditing,
    handleDeleteChapter,
  } = useEditEffect(
    chapterList,
    setChapterList,
    editComponent,
    getTotalChapter
  );

  function editComponent(record: Item, isEditing: (record: Item) => boolean) {
    const editable = isEditing(record);
    return editable ? (
      <span>
        <Confirm save={save} cancel={cancel} record={record} />
      </span>
    ) : (
      <div>
        <Typography.Link
          disabled={editingKey !== ""}
          onClick={() => edit(record)}
        >
          ??????
        </Typography.Link>
        <DeleteAction
          cancel={cancel}
          handleDelete={handleDeleteChapter}
          record={record}
          editingKey={editingKey}
          title={"??????????????????????????????"}
        />
      </div>
    );
  }

  useEffect(() => {
    try {
      getTotalChapter();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        id: record.id,
        key: record.id,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <>
      <TableHead handleAdd={handleAddChapter} handleRefresh={handleRefresh} />
      {loading ? (
        <div className="center_sping">
          <Spin tip="?????????" />
        </div>
      ) : (
        <Form form={form} component={false}>
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={chapterList}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={{
              onChange: cancel,
              position: ["bottomCenter"],
              pageSize: 8,
              showQuickJumper: true,
            }}
          />
        </Form>
      )}
      <Modal
        title="??????????????????"
        visible={visiable}
        confirmLoading={confirmLoading}
        onCancel={onCancel}
        onOk={() => {
          submitFormRef.current
            ?.validateFields()
            .then(() => {
              onFinish(courseName, courseId, handleRefresh);
            })
            .catch((info: string) => {
              console.log("Error", info);
            });
        }}
        okText="??????"
        cancelText="??????"
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 20 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          ref={submitFormRef}
        >
          <Form.Item
            label="??????"
            name="courseName"
            rules={[{ required: true, message: "??????????????????" }]}
          >
            <Input
              onChange={(e) => {
                setCourseName(e.target.value);
              }}
              value={courseName}
            />
          </Form.Item>

          <Form.Item
            label="??????ID"
            name="courseId"
            rules={[{ required: true, message: "??????ID????????????" }]}
          >
            <Input
              onChange={(e) => {
                setCourseId(e.target.value);
              }}
              value={courseId}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditableTable;
