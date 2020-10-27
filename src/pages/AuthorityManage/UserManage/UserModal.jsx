import React, {useState} from 'react'
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
  const {dispatch, visible, updateVisible, handelType, roleList, addLoading, updateData} = props
  const [formData, setFormData] = useState({username: null, account: null,info: null, roles: []})

  const [form] = Form.useForm()

  // 新增用户
  const handleOk = () => {
    form.validateFields().then(() => {
      dispatch({type: 'authority/addUser', payload: formData}).then(res => {
        if (res.status) {
          messageBox(true, '新增用户成功！')
          updateVisible(false)
          form.resetFields()
          updateData()
        } else messageBox(false, res.message)
      }).catch(err => {
        messageBox(false, err)
      })
    }).catch(() => {})
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

  return <Modal
      title={handelType === 'add' ? '新增用户' : '编辑用户信息'}
      visible={visible}
      confirmLoading={addLoading}
      onOk={handleOk}
      onCancel={handleCancel}>
    <Form {...formItemLayout} form={form} onValuesChange={onValuesChange}>
      <Item label="账号：" name="account" rules={[
        {required: true, message: '请输入账号'}
      ]}>
        <Input placeholder='请输入账号'/>
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
        <Input.TextArea placeholder='请输入用户名'/>
      </Item>
    </Form>
  </Modal>
}

export default connect(({loading, authority}) => ({
  roleList: authority.roleList,
  addLoading: loading.effects['authority/addUser']
}))(UserModal)
