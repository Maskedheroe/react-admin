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
import { getPageChapter } from "../../../services/chapter";
import { ReloadOutlined, FileAddOutlined } from "@ant-design/icons";
import useAddChapterEffect from "./useAddChapterEffect";

type Chapter = {
  id: string;
  name: string;
  courseId: string;
};
interface Item {
  id: string;
  name: string;
  courseId: string;
  key: string;
}

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
  const [form] = Form.useForm();
  // const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");

  const {
    chapterList,
    visiable,
    confirmLoading,
    setChapterList,
    setVisiable,
    setConfirmLoading,
    onOk,
    onCancel,
  } = useAddChapterEffect();

  const isEditing = (record: Item) => record.id === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ name: "", age: "", address: "", ...record });
    setEditingKey(record.id as string);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;

      const newData: Item[] = [...chapterList];
      const index = newData.findIndex((item) => key === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setChapterList(newData as any);
        setEditingKey("");
      } else {
        newData.push(row);
        setChapterList(newData as any);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  useEffect(() => {
    try {
      getPageChapter("http://127.0.0.1:9000/business/admin/chapter/list", {
        page: 1,
        size: 20,
      }).then((res) => {
        setChapterList(
          res.data.list.map((item: Chapter) => {
            return { ...item, key: item.id };
          })
        );
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const columns = [
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
      title: "operation",
      dataIndex: "operation",
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => save(record.id)}
              style={{ marginRight: 8 }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            // onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];

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
  const handleAddChapter = (): void => {
    setVisiable(true);
  };
  return (
    <>
      <div className="bread_heade">
        <CustomBreadcrumb arr={["表格", "可编辑行表格"]} />
        <div className="edit_area">
          <Button type="primary" className="add_btn" onClick={handleAddChapter}>
            <FileAddOutlined />
            新增
          </Button>
          <Button type="primary" className="refresh_btn">
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
        title="Title"
        visible={visiable}
        onOk={onOk}
        confirmLoading={confirmLoading}
        onCancel={onCancel}
      >
        <p>text</p>
      </Modal>
    </>
  );
};

export default EditableTable;
