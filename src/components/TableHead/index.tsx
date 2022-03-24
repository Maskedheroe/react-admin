import React from 'react'
import { EditButtons } from './components/EditButtons';
import CustomBreadcrumb from '../CommonBreadcrumb';
import './style.css'

export interface TableHeadProps {
  handleAdd: () => void;
  handleRefresh: () => void
}

export const TableHead = ({handleAdd, handleRefresh}: TableHeadProps) => {
  return (
    <div className="bread_heade">
    <CustomBreadcrumb arr={["表格", "可编辑行表格"]} />
    <EditButtons handleAdd={handleAdd} handleRefresh={handleRefresh} />
  </div>
  )
}
