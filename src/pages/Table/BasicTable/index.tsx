import React from 'react'
import CommonBreadcrumb from 'components/CommonBreadcrumb'
import { Table, Tag, Space } from 'antd';
import { EditButtons } from '../../../components/TableHead/components/EditButtons';
import { TableHead } from '../../../components/TableHead';
import { TableHeadProps } from '../../../components/TableHead/index';

interface IBase<T, V> {
  tableHeader: TableHeadProps;
  columns: T[];
  data: V[];
}

export default function BasicTable({...props}: IBase<any, any>) {
  return (
    <div>
      <TableHead {...props.tableHeader}/>
      <Table columns={props.columns} dataSource={props.data} />
    </div>
  )
}
