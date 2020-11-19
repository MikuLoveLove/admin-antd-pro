import React, {useState, useEffect} from 'react';
import {connect} from 'umi';

import {PageContainer} from '@ant-design/pro-layout';
import {PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import {Button, Input, Tag, Space, Modal} from 'antd';
import {messageBox} from '@/utils/utils'
import CommonTable from '../../../components/CommonTable';
import UserModal from './UserModal';


import './index.less';
import '../index.less';

const {Search} = Input;

const UserManage = (props) => {
  // 定义函数组件状态 操作方法
  const [dataList, setDataListFunc] = useState([])
  const [visible, updateVisible] = useState(false)
  const [handelType, setHandelType] = useState('add')
  const [pagination, setPagination] = useState({current: 1, pageSize: 10, total: 20})
  const [userId, setCurrUser] = useState(null)

  const {dispatch, tableLoading, roleList} = props

  // const testProps = {name: 5555, wife: {name: '刘晓文', age: 26}}

  // 获取表格数据
  const getTableList = (params = {...pagination}) => {
    const {current = 1, pageSize = 10, keyword = ''} = params;
    dispatch({type: 'authority/queryUserList', payload: {current, pageSize, keyword}}).then(
        (res) => {
          if (res.status) {
            const {data} = res
            setDataListFunc(data.list);
            setPagination({current: data.current, pageSize: data.pageSize, total: data.total});
          }
        },
    );
  }

  // 修改、编辑角色
  const addOrEditUser = (type, user) => () => {
    setHandelType(type)
    if (type !== 'add') {
      localStorage.setItem('currUser', JSON.stringify(user))
      setCurrUser(user.userId)
    }
    updateVisible(true);
  }

  // 删除用户
  const deleteUser = (id) => {
    dispatch({type: 'authority/deleteUser', payload: id}).then(res => {
      if (res.status) {
        messageBox(true, '删除用户成功！')
        getTableList()
      } else  messageBox(false, res.message)
    }).catch(err => {
      messageBox(false, err)
    })
  }

// 删除按钮
  const deleteBtn = (user) => () => {
    Modal.confirm({
      title: '删除用户',
      icon: <ExclamationCircleOutlined />,
      content: '确认删除该用户？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        deleteUser(user.userId)
        return Promise.resolve()
      },
      onCancel: () => Promise.resolve()
    })
  }

  // 搜索
  const searchUser = (val) => {
    getTableList({...pagination, current: 1, keyword: val});
  }

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
      dataIndex: 'roles',
      key: 'roles',
      render: (roles) => (roles.reduce((prev, curr, index) => {
        const role = roleList.find(item => item.roleId === curr)
        const roleName = role ? role.roleName : ''
        return `${prev}${index > 0 && prev ? '、' : ''}${roleName}`

      }, ''))
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
      render: (row) => {
        return (
            <Space>
              <a onClick={addOrEditUser('update', row)}>修改</a>
              <a onClick={deleteBtn(row)}>删除</a>
              <a>重置密码</a>
            </Space>
        )
      }
    }
  ]

  // 初始化获取数据
  useEffect(() => {
    getTableList();
  }, []);
  // useEffect(() => {
  //   console.log(roleList)
  // }, [roleList.length])
  return (
      <PageContainer>
        <div className="role-box">
          <div className="table-top">
            <Button type="primary" icon={<PlusOutlined/>} onClick={addOrEditUser('add')}>新增用户</Button>
            <Search placeholder="请输入用户名或账号" onSearch={searchUser} style={{width: 280}}/>
          </div>
          <CommonTable
              isLoading={tableLoading}
              columns={columns}
              dataSource={dataList}
              rowKey="userId"
              pagination={pagination}
              onChange={getTableList}/>
        </div>
        {/* 新增用户 */}
        <UserModal
            visible={visible}
            updateData={getTableList}
            handelType={handelType}
            updateVisible={updateVisible}
            userId={userId}/>
      </PageContainer>
  );
};

export default connect(({loading, authority}) => ({
  roleList: authority.roleList,
  tableLoading: loading.effects['authority/queryUserList'],
}))(UserManage);
