import React, {useState, useEffect, Fragment} from 'react'
import {history} from 'umi'
import { PageContainer } from '@ant-design/pro-layout';
import {PlusOutlined} from '@ant-design/icons';
import {Table, Button, Input, Space} from 'antd'
import './index.less'
import '../index.less'

const {Search} = Input

const RoleManage = () => {

  const [dataList, setDataListFunc] = useState([])

  const data = [
    {
      roleName: '管理员',
      description: '系统超级管理员',
      createType: '内置',
      userCount: 17,
      roleId: 1
    }
  ]

  // 修改、编辑角色
  const addOrEditRole = (type, id) => () => {
    history.push({
      pathname: '/authorityManage/roleManage/roleDetail',
      query: {type, id}
    })
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
    },
    {
      title: '角色人数',
      dataIndex: 'userCount',
      key: 'userCount'
    },
    {
      title: '操作',
     dataIndex: 'roleId',
      render: (roleId) => {
        // console.log(row)
        return (<Space>
          <a onClick={addOrEditRole('update', roleId)}>修改</a>
          <a onClick={deleteRole(roleId)}>删除</a>
        </Space>)
      }
    }
  ];


// 初始化获取数据
  useEffect(() => {
    getTableList()
  }, [])

  return <PageContainer>
    <div className='role-box'>
      <div className='table-top'>
        <Button type="primary" icon={<PlusOutlined/>} onClick={addOrEditRole('add')}>新增角色</Button>
        <Search placeholder='请输入角色名称' onSearch={(v) => getTableList({name: v})} style={{width: 280}}/>
      </div>
      <Table columns={columns} dataSource={dataList} rowKey='roleId'/>
    </div>
  </PageContainer>
}

export default RoleManage
