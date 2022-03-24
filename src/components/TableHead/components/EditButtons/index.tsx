import React from "react";
import { ReloadOutlined, FileAddOutlined } from "@ant-design/icons";
import { Button } from "antd";
import './style.css'
export const EditButtons = ({
  handleAdd,
  handleRefresh,
}: {
  handleRefresh: () => void;
  handleAdd: () => void;
}) => {
  return (
    <div className="edit_area">
      <Button type="primary" className="add_btn" onClick={handleAdd}>
        <FileAddOutlined />
        新增
      </Button>
      <Button type="primary" className="refresh_btn" onClick={handleRefresh}>
        <ReloadOutlined />
        刷新
      </Button>
    </div>
  );
};
