import React from "react";
import { Popconfirm } from "antd";
import { Item } from "../types";

interface IConfirmProps {
  save?: (key: string | number) => void;
  cancel: () => void;
  record: Item;
}

export const Confirm = ({ save, cancel, record }:  React.PropsWithChildren<IConfirmProps>) => {
  return (
    <div>
      <a
        onClick={() => {
          save && save(record.id);
        }}
        style={{ marginRight: 8 }}
      >
        保存
      </a>
      <Popconfirm
        title="要取消编辑?"
        onConfirm={cancel}
        cancelText="否"
        okText="是"
      >
        <a>取消</a>
      </Popconfirm>
    </div>
  );
};
