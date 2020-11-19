import React from 'react'
import {Card} from 'antd'
import {connect} from 'umi'
import { PageHeaderWrapper } from '@ant-design/pro-layout';
// import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import './index.less'

const Home = () => {
  return (<PageHeaderWrapper><Card className='home'>5555</Card></PageHeaderWrapper>)
}

export default connect((data) => {
  // console.log(data)
  return {
    ...data.global
  }
})(Home)
