import React from 'react';
import { Table } from 'antd';

const CommonTable = (props) => {
  const { columns, dataSource, isLoading, rowKey, total, pagination, onChange } = props;
  const paginationPro = {
    total,
    ...pagination,
    showTotal: () => `总共${pagination.total}条`,
  };
  return (
    <Table
      loading={isLoading}
      rowKey={rowKey || 'userId'}
      columns={columns}
      dataSource={dataSource}
      pagination={paginationPro}
      onChange={onChange}
    />
  );
};

export default CommonTable;
