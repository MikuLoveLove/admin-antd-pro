import React, { useState, useEffect } from 'react';
import { history, connect } from 'umi';

import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import CommonTable from '../../../components/CommonTable';

import './index.less';
import '../index.less';

const { Search } = Input;

const RoleManage = (props) => {
  const [dataList, setDataListFunc] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const { dispatch, tableLoading } = props;

  // 修改、编辑角色
  const addOrEditRole = (type, id) => () => {
    history.push({ pathname: '/authorityManage/roleManage/roleDetail', query: { type, id } });
  };

  // 删除角色
  const deleteRole = () => () => {};

  // 获取表格数据
  const getTableList = (params = { current: 1, pageSize: 10 }) => {
    dispatch({ type: 'authority/queryRoleList', payload: params }).then((res) => {
      if (res.status) {
        setDataListFunc(res.data);
        setPagination({ current: params.current, pageSize: 10, total: 99 });
      }
    });
  };

  const columns = [
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName',
    },
    {
      title: '角色描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '类型',
      dataIndex: 'createType',
      key: 'createType',
      render: (type) => (type === 1 ? '内置' : '创建'),
    },
    {
      title: '角色人数',
      dataIndex: 'userCount',
      key: 'userCount',
    },
    {
      title: '操作',
      render: (row) => {
        return (
          <Space>
            <a onClick={addOrEditRole('update', row.roleId)}>修改</a>
            {row.createType === 1 ? '' : <a onClick={deleteRole(row.roleId)}>删除</a>}
          </Space>
        );
      },
    },
  ];

  // 初始化获取数据
  useEffect(() => {
    getTableList();
  }, []);

  return (
    <PageContainer>
      <div className="role-box">
        <div className="table-top">
          <Button type="primary" icon={<PlusOutlined />} onClick={addOrEditRole('add')}>
            新增角色
          </Button>
          <Search
            placeholder="请输入角色名称"
            onSearch={(v) => getTableList({ name: v })}
            style={{ width: 280 }}
          />
        </div>
        <CommonTable
          isLoading={tableLoading}
          columns={columns}
          dataSource={dataList}
          pagination={pagination}
          onChange={getTableList}
          rowKey="roleId"
        />
      </div>
    </PageContainer>
  );
};

export default connect(({ authority, loading }) => ({
  roleData: authority.roleData,
  tableLoading: loading.effects['authority/queryRoleList'], // table的loading状态
}))(RoleManage);

// 原本写法 connect是一个高阶函数 接受函数作为参数并返回一个函数
// export default connect((dva) => {
//   return {
//     roleData: dva.authority.roleData,
//     tableLoading: dva.loading.effects['authority/queryRoleList'] // table的loading状态
//   }
// })(RoleManage)
