import React from 'react'
import {Card} from 'antd'
import {connect} from 'umi'
// import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import './index.less'

const Home = () => {
  return (<Card className='home'>5555</Card>)
}

export default connect((data) => {
  // console.log(data)
  return {
    ...data.global
  }
})(Home)
