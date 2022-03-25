import React from "react";
import CommonBreadcrumb from "components/CommonBreadcrumb";
import { Table, Tag, Space, Form, FormInstance } from "antd";
import { EditButtons } from "../../../components/TableHead/components/EditButtons";
import { TableHead } from "../../../components/TableHead";
import { TableHeadProps } from "../../../components/TableHead/index";
import "./style.css";
interface IBase<T, V> {
  tableHeader: TableHeadProps;
  columns: T[];
  data: V[];
  cell: any;
  form: FormInstance;
  cancel: () => void
}

const BasicTable = <T extends {}, V extends {}>(props: IBase<T, V>) => {
  return (
    <div>
      <TableHead {...props.tableHeader} />
      <Form form={props.form} component={false}>
        <Table
          columns={props.columns}
          dataSource={props.data}
          components={{
            body: {
              cell: props.cell,
            },
          }}
          rowClassName="editable-row"
          pagination={{
            onChange: props.cancel
          }}
          bordered
        />
      </Form>
    </div>
  );
};

export default BasicTable;
