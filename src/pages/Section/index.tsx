import React, { createRef, useState, useEffect } from "react";
import BasicTable from "../Table/BasicTable";
import {
  Table,
  Space,
  Modal,
  Form,
  Input,
  FormInstance,
  notification,
  Spin,
  Typography,
  Popconfirm,
} from "antd";
import { RenderedCell } from "rc-table/lib/interface";
import { Action } from "./components/action/index";
import FormList from "./components/formlist";
import { addSection, getPageChapter } from "../../services/section";
import EditCell from "./components/cell";

type cReturnType = React.ReactNode | RenderedCell<couml>;

interface couml {
  title: string;
  dataIndex: string;
  key: string;
  width?: string;
  editable?: boolean;
  render?: (value: any, record: item, index: number) => cReturnType;
}

export type item = {
  id: string;
  key: string;
  title: string;
  chapterId: string;
  video: string;
  time: string;
  charge: string;
  sort: string;
  createdAt: string;
  updatedAt: string;
};

export type title = {
  label: string;
  name: string;
};

export default function Section() {
  const [visiable, setVisiable] = useState(false);
  const submitFormRef = createRef<FormInstance>();
  const [section, setSection] = useState<item[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [editingKey, setEditingKey] = useState("");
  const [form] = Form.useForm();

  const convertToZh = (charge: string) => {
    const res =  (charge.toUpperCase() === 'C') ? '收费' : '免费'
    return res
  }

  const loadSection = () => {
    getPageChapter("/list", {
      page: 1,
      size: 10,
      // TODO 需要处理size和page，不能默认是 1， 10
    }).then((res) => {
      const lists = res.data.content.list.map((i: any) => {
        return {
          ...i,
          video: "1",
          key: i.id,
          charge: convertToZh(i.charge)
        };
      });
      setSection(lists);
    });
  };
  useEffect(() => {
    loadSection();
  }, []);

  const edit = (record: Partial<item> & { key: React.Key }) => {
    form.setFieldsValue({ name: "", age: "", address: "", ...record });
    setEditingKey(record.key);
  };

  const isEditing = (record: item) => record.key === editingKey;

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as item;
      const { updatedAt ,...reqData } = row
        addSection({...reqData})
        loadSection()
        openNotification("修改成功!")
        setEditingKey("");
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const cancel = () => {
    setEditingKey("");
  };

  const columns: couml[] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "10%",
      editable: true,
      render: (text) => <a>{text}</a>,
    },
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
      editable: true,
      width: "12%",
    },
    {
      title: "章",
      dataIndex: "chapterId",
      key: "chapterId",
      editable: true,
      width: "12%",
    },
    {
      title: "视频",
      dataIndex: "video",
      key: "video",
      editable: true,
      width: "10%",
    },
    {
      title: "时长",
      dataIndex: "time",
      key: "time",
      editable: true,
      width: "10%",
    },
    {
      title: "收费",
      dataIndex: "charge",
      key: "charge",
      editable: true,
      width: "8%"
    },
    {
      title: "顺序",
      dataIndex: "sort",
      key: "sort",
      editable: true,
      width: "8%",
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "10%",
    },
    {
      title: "修改时间",
      dataIndex: "updatedAt",
      key: "updatedAt",
      width: "10%",
    },
    {
      title: "操作",
      key: "action",
      dataIndex: "action",
      width: "10%",
      render: (text, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              保存
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <>
            <Action
              id={record.id}
              reload={loadSection}
              openNotification={openNotification}
              disabled={editingKey !== ""}
              edit={() => edit(record)}
            />
          </>
        );
      },
    },
  ];
  const openNotification = (text: string) => {
    notification.info({
      message: "新消息",
      description: text,
      placement: "top",
    });
  };
  const tableHader = {
    handleAdd: () => {
      setVisiable(true);
    },
    handleRefresh: () => {
      setLoading(true);
      loadSection();
      openNotification("刷新成功");
      setLoading(false);
    },
  };
  const titleList: title[] = [
    {
      label: "标题",
      name: "title",
    },
    {
      label: "课程",
      name: "course",
    },
    {
      label: "章",
      name: "chapter",
    },
    {
      label: "视频",
      name: "video",
    },
    {
      label: "时长",
      name: "time",
    },
    {
      label: "收费",
      name: "payment",
    },
    {
      label: "顺序",
      name: "order",
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: item) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div>
      {loading ? (
        <Spin />
      ) : (
        <BasicTable
          columns={mergedColumns}
          data={section}
          tableHeader={tableHader}
          cell={EditCell}
          form={form}
          cancel={cancel}
        />
      )}
      <Modal
        visible={visiable}
        title="新增小节"
        // confirmLoading={confirmLoading}
        onCancel={() => setVisiable(false)}
        onOk={() => {
          const ref = submitFormRef.current;
          ref &&
            ref
              .validateFields()
              .then((e) => {
                addSection({
                  ...e,
                  chapterId: e.chapter,
                  id: e.ID,
                  courseId: e.course,
                  charge: e.payment,
                  updatedAt: e.reviseTime,
                  createdAt: e.createdTime,
                  sort: e.order,
                });
                setVisiable(false);
                openNotification("新增成功");
              })
              .catch((info: string) => {
                console.log("Error", info);
              });
          // 要弹一个请求失败
        }}
        okText="提交"
        cancelText="取消"
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 20 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          ref={submitFormRef}
        >
          <FormList titleList={titleList} />
        </Form>
      </Modal>
    </div>
  );
}
