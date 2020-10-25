import React from 'react'
// import {connect} from 'umi'
import {Modal} from 'antd'

const UserModal = (props) => {
  const {visible, updateVisible, handelType} = props

  const handleOk = () => {
    updateVisible(false)
  }
  const handleCancel = () => {
    updateVisible(false)
  }

  return <Modal
    title={handelType === 'add' ? '新增用户' : '编辑用户信息' }
    visible={visible}
    onOk={handleOk}
    onCancel={handleCancel}>555</Modal>
}

export default UserModal
