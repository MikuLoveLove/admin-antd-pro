import React from 'react'
import {Modal} from 'antd'

const CommonModal = (props) => {
  const {children, title, visible, btnLoading} = props
  const handleOk = () => {}
  const handleCancel = () => {}
  return <Modal
      title={title}
      visible={visible}
      confirmLoading={btnLoading}
      onOk={handleOk}
      onCancel={handleCancel}>
    {children}
  </Modal>
}
export default CommonModal
