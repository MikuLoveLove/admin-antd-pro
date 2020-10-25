import React, {useState, useEffect} from 'react'
// import {history} from 'umi'
import { PageContainer } from '@ant-design/pro-layout';
import {PlusOutlined} from '@ant-design/icons';
import {Table, Button, Input, Tag, Space} from 'antd'
import UserModal from './UserModal'
import './index.less'
import '../index.less'

const {Search} = Input

const UserManage = () => {

  const [dataList, setDataListFunc] = useState([])
  const [visible, updateVisible] = useState(false)
  const [handelType, setHandelType] = useState('add')
  const [userId, setCurrentUserId] = useState(null)

  // userModal 的props
  // const modalProps = {handelType, visible, updateVisible, userId}

  const data = [
    {
      account: '110',
      userName: '赵灵妃',
      ownRoles: '管理员',
      status: 1,
      userId: 1
    },
    {
      account: '002',
      userName: '苏小小',
      ownRoles: '管理员',
      status: 0,
      userId: 2
    }
  ]

  // 修改、编辑角色
  const addOrEditRole = (type, id) => () => {
    setHandelType(type)
   if (type !== 'add')  setCurrentUserId(id)
    updateVisible(true)
  }

  // 删除角色
  const deleteRole = (id) => () => {
    console.log(id)
  }

  // 获取表格数据
  const getTableList = (params = {}) => {
    setDataListFunc(data)
  }

  const columns = [
    {
      title: '账号',
      dataIndex: 'account',
      key: 'account',
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      key: 'userName',
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
        return status ? <Tag color='success'>正常</Tag> : <Tag color='default'>禁用</Tag>
      }
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
        return <Space>
          <a onClick={addOrEditRole('update',id)}>修改</a>
          <a onClick={deleteRole(id)}>删除</a>
        </Space>
      }
    }
  ];


// 初始化获取数据
  useEffect(() => {
    getTableList()
    console.log('执行了')
  }, [])

  return <PageContainer>
    <div className='role-box'>
      <div className='table-top'>
        <Button type="primary" icon={<PlusOutlined/>} onClick={addOrEditRole('add')}>新增用户</Button>
        <Search placeholder='请输入用户名或账号' onSearch={(v) => getTableList({name: v})} style={{width: 280}}/>
      </div>
      <Table columns={columns} dataSource={dataList} rowKey='userId'/>
    </div>
    <UserModal
      visible={visible}
      handelType={handelType}
      updateVisible={updateVisible}
      userId={userId}/>
  </PageContainer>
}

export default UserManage
