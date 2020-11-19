import React, {useState, useEffect} from 'react'
import {connect} from 'umi'
import {Modal, Form, Input, Select} from 'antd'
import {messageBox} from '@/utils/utils'

const {Item} = Form
const {Option} = Select

const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 5}
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 16}
  }
}

const UserModal = (props) => {
  const {dispatch, visible, updateVisible, handelType, roleList, addLoading, updateLoading, userId, updateData} = props
  const [formData, setFormData] = useState({username: null, account: null,info: null, roles: []})
  // const [testData, setTestData] = useState({wife: {}})

  const [form] = Form.useForm()

  const addOrUpdateUser = (cb) => {
    cb.then(res => {
      if (res.status) {
        messageBox(true,`${handelType === 'add' ? '新增' : '更新'}用户成功！`)
        updateVisible(false)
        form.resetFields()
        updateData()
      } else messageBox(false, res.message)
    }).catch(() => {})
  }

  // 新增用户
  const handleOk = () => {
    form.validateFields().then(() => {
      const cb = dispatch({type: `authority/${handelType}User`, payload: {...formData, userId}})
      addOrUpdateUser(cb)
    })
  }

  // 取消新增
  const handleCancel = () => {
    form.resetFields()
    updateVisible(false)
  }

  // 受控表单
  const onValuesChange = (val, allVal) => {
    setFormData(allVal)
  }

  const initFormData = () => {
    if (visible && handelType === 'update') {
      const {name, account, info, roles} = JSON.parse(localStorage.getItem('currUser')) || {username: null, account: null,info: null, roles: []}
      localStorage.removeItem('currUser')
      const user = {username: name, account, info, roles}
      setFormData(user)
      // setTestData(testProps)
      form.setFieldsValue(user)
    }
  }

  useEffect(initFormData, [visible])

  return <Modal
      title={handelType === 'add' ? '新增用户' : '编辑用户信息'}
      visible={visible}
      confirmLoading={addLoading || updateLoading}
      onOk={handleOk}
      onCancel={handleCancel}>
    <Form {...formItemLayout} form={form} onValuesChange={onValuesChange}>
      <Item label="账号：" name="account" rules={[
        {required: true, message: '请输入账号'}
      ]}>
        <Input placeholder='请输入账号' disabled={handelType === 'update'}/>
      </Item>
      <Item label="用户名：" name="username" rules={[
        {required: true, message: '请输入用户名'}
      ]}>
        <Input placeholder='请输入用户名'/>
      </Item>
      <Item label="授权角色：" name="roles" rules={[
        {required: true, message: '请选择角色'}
      ]}>
        <Select placeholder='请选择角色'  mode="multiple">
          {roleList.map(item => (<Option value={item.roleId} key={item.roleId}>{item.roleName}</Option>))}
        </Select>
      </Item>
      <Item label="备注：" name="info">
        <Input.TextArea placeholder='请输入备注'/>
      </Item>
    </Form>
  </Modal>
}

export default connect(({loading, authority}) => ({
  roleList: authority.roleList,
  addLoading: loading.effects['authority/addUser'],
  updateLoading: loading.effects['authority/updateUser'],
}))(UserModal)
