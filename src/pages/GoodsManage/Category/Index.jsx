import React, {useState, useEffect} from 'react'
import {Card} from 'antd'
import {PageContainer} from '@ant-design/pro-layout'
import CommonTable from '../../../components/CommonTable';


const dataSource = [
  {
    categoryName: '电器',
    level: '一级',
    childCount: '2',
    status: 1,
    categoryId: 1
  }
]

const Category = (props) => {
  const [dataList, setDataList] = useState([])
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });

  const {tableLoading = false} = props

  const columns = [
    {
      title: '序号',
      render: (row, a, b, c) => {
        console.log(row, 'a', a, b, c, 'aend')
        return 1
      }
    },
    {
      title: '分类名称',
      dataIndex: 'categoryName',
      key: 'categoryName',
    },
    {
      title: '分类级别',
      dataIndex: 'level',
      key: 'level',
    },
    {
      title: '子类数量',
      dataIndex: 'childCount',
      key: 'childCount',
    },
    {
      title: '当前状态',
      dataIndex: 'status',
      key: 'status'
    },
    {
      title: '操作',
      render: () => '按钮'
    }
  ]

  const getDataList = () => {
    setDataList(dataSource)
  }

  useEffect(() => {
    getDataList()
  }, [])

  return (
      <PageContainer>
        <Card>
          <CommonTable
              isLoading={tableLoading}
              rowKey="categoryId"
              columns={columns}
              dataSource={dataList}
              pagination={pagination}/>
        </Card>
      </PageContainer>
  )
}
export default  Category


