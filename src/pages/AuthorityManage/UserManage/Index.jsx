import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, Tag, Space } from 'antd';
import CommonTable from '../../../components/CommonTable';
import UserModal from './UserModal';
import './index.less';
import '../index.less';

const { Search } = Input;

const UserManage = (props) => {
  // 定义函数组件状态 操作方法
  const [dataList, setDataListFunc] = useState([]);
  const [visible, updateVisible] = useState(false);
  const [handelType, setHandelType] = useState('add');
  const [userId, setCurrentUserId] = useState(null);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 20 });

  const { dispatch, tableLoading } = props;

  // 修改、编辑角色
  const addOrEditRole = (type, id) => () => {
    setHandelType(type);
    if (type !== 'add') setCurrentUserId(id);
    updateVisible(true);
  };

  // 删除角色
  const deleteRole = () => () => {};

  // 获取表格数据
  const getTableList = (params = {}) => {
    const { current = 1, pageSize = 10, keyword = '' } = params;
    dispatch({ type: 'authority/queryUserList', payload: { current, pageSize, keyword } }).then(
      (res) => {
        if (res.status) {
          setDataListFunc(res.data);
          setPagination({ current: params.current, pageSize: params.pageSize, total: 99 });
        }
      },
    );
  };

  // 搜索
  const searchUser = (val) => {
    getTableList({ ...pagination, current: 1, keyword: val });
  };

  const columns = [
    {
      title: '账号',
      dataIndex: 'account',
      key: 'account',
    },
    {
      title: '用户名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '拥有角色',
      dataIndex: 'ownRoles',
      key: 'ownRoles',
    },
    {
      title: '当前状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        return status ? <Tag color="success">正常</Tag> : <Tag color="default">禁用</Tag>;
      },
    },
    {
      title: '操作',
      dataIndex: 'userId',
      key: 'userId',
      render: (id) => {
        // console.log(row)
        // return (<Fragment>
        //   <Button danger type="text" onClick={addOrEditRole('update', row.roleId)}>修改</Button>
        //   <Button danger type="text" onClick={deleteRole(row.roleId)}>删除</Button>
        // </Fragment>)
        return (
          <Space>
            <a onClick={addOrEditRole('update', id)}>修改</a>
            <a onClick={deleteRole(id)}>删除</a>
          </Space>
        );
      },
    },
  ];

  // 初始化获取数据
  useEffect(() => {
    getTableList();
    console.log('执行了');
  }, []);

  return (
    <PageContainer>
      <div className="role-box">
        <div className="table-top">
          <Button type="primary" icon={<PlusOutlined />} onClick={addOrEditRole('add')}>
            新增用户
          </Button>
          <Search placeholder="请输入用户名或账号" onSearch={searchUser} style={{ width: 280 }} />
        </div>
        <CommonTable
          isLoading={tableLoading}
          columns={columns}
          dataSource={dataList}
          rowKey="userId"
          pagination={pagination}
          onChange={getTableList}
        />
      </div>
      <UserModal
        visible={visible}
        handelType={handelType}
        updateVisible={updateVisible}
        userId={userId}
      />
    </PageContainer>
  );
};

export default connect(({ loading }) => ({
  tableLoading: loading.effects['authority/queryUserList'],
}))(UserManage);
