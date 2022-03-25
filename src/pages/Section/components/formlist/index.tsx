import React from "react";
import { Form, Input, Select } from "antd";
import { title } from "../../index";

const { Option } = Select;

export default function FormList({ titleList }: { titleList: title[] }) {
  return (
    <div>
      {titleList.map((item: title) => {
        return (
          <Form.Item
            label={item.label}
            name={item.name}
            rules={[{ required: true, message: `${item.label}不能为空` }]}
            key={item.name}
          >
            {item.label === "收费" ? (
              <Select>
                <Option value="F">免费</Option>
                <Option value="C">收费</Option>
              </Select>
            ) : (
              <Input />
            )}
          </Form.Item>
        );
      })}
    </div>
  );
}
