import React from "react";
import { item } from "../../index";
import { Form, InputNumber, Input } from 'antd';

// id: string;
//   key: string;
//   title: string;
//   chapterId: string;
//   video: string;
//   time: string;
//   charge: string;
//   sort: string;
//   createdAt: string;
//   updatedAt: string;
interface EditCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: item;
  index: number;
  children: React.ReactNode;
}

const EditCell: React.FC<EditCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber/> : <Input/>
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
export default EditCell;
