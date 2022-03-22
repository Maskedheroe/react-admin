import React, { useState, useEffect } from "react";
import "./style.css";
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Typography,
  Button,
  Modal,
} from "antd";
import CustomBreadcrumb from "components/CommonBreadcrumb";
import { ReloadOutlined, FileAddOutlined } from "@ant-design/icons";
import useChapterEffect from "./useChapterEffect";
import { useEditEffect } from "./useEditEffect";
import { Confirm } from "./component/Confirm";
import { Item } from "./types";
// const originData: Item[] = [];
// for (let i = 0; i < 100; i++) {
//   originData.push({
//     id: i.toString(),
//     name: `Edrward ${i}`,
//     courseId: 32
//   });
// }
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
  const {
    chapterList,
    visiable,
    confirmLoading,
    courseId,
    courseName,
    setChapterList,
    setVisiable,
    setConfirmLoading,
    onCancel,
    onFinish,
    setCourseId,
    setCourseName,
    getTotalChapter,
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
          编辑
        </Typography.Link>
        {/* <Typography.Link
          style={{ marginLeft: '10px' }}
          disabled={editingKey !== ""}
          onClick={() => handleDeleteChapter(record)}
        >
          删除
        </Typography.Link> */}
        <Popconfirm
          title="确定要删除该大章？"
          onConfirm={() => handleDeleteChapter(record)}
          onCancel={cancel}
          okText="确认"
          cancelText="取消"
        >
          <Typography.Link
            style={{ marginLeft: "10px" }}
            disabled={editingKey !== ""}
          >
            删除
          </Typography.Link>
        </Popconfirm>
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
      <div className="bread_heade">
        <CustomBreadcrumb arr={["表格", "可编辑行表格"]} />
        <div className="edit_area">
          <Button type="primary" className="add_btn" onClick={handleAddChapter}>
            <FileAddOutlined />
            新增
          </Button>
          <Button
            type="primary"
            className="refresh_btn"
            onClick={handleRefresh}
          >
            <ReloadOutlined />
            刷新
          </Button>
        </div>
      </div>
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
      <Modal
        title="新增课程大章"
        visible={visiable}
        confirmLoading={confirmLoading}
        onCancel={onCancel}
        onOk={() => onFinish(courseName, courseId, handleRefresh)}
        okText="提交"
        cancelText="取消"
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 20 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            label="名称"
            name="courseName"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              onChange={(e) => {
                setCourseName(e.target.value);
              }}
              value={courseName}
            />
          </Form.Item>

          <Form.Item
            label="课程id"
            name="courseId"
            rules={[{ required: true, message: "Please input your password!" }]}
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
