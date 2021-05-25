import React, { Component } from 'react'
import {Card, Table, Button, Popconfirm, message} from 'antd'
import { deleteAPI, listAPI } from '../../../service/products'

class List extends Component {
    state = {
        dataSources: [],
        total: 0,
        page: 1,
        pageSize: 5 
    }

    loadData = ( (page, pageSize) => {
        this.setState({
            page: page,
            pageSize: pageSize
        })
        listAPI( page, pageSize )
        .then( res => {
            // console.log("Resopnse: ",res)
            this.setState( {
                dataSources: res.data.data.list,
                total: res.data.data.total
            })
            console.log("State data: ",this.state);
        }).catch ( (err) => {
            console.log("Error: ",err)
        })
    })

    // 需要在组件初始化的时候调用接口
    // 组件第一次渲染完成，此时 DOM 节点已生成，可以调用 ajax 请求
    componentDidMount(){
        let page = this.state.page
        let size = this.state.pageSize
        listAPI( page, size )
        .then( res => {
            // console.log("Resopnse: ",res)
            this.setState( {
                dataSources: res.data.data.list,
                total: res.data.data.total
            })
            console.log("State data: ",this.state);
        }).catch ( (err) => {
            console.log("Error: ",err)
        })
    }
    
    render() {
        const columns = [
            {
                title: '序号',
                key: 'id',
                width: 80,
                align: 'center',
                render: ( txt, record, index) => index + 1
            },
            {
                title: '名称',
                dataIndex: 'name'
            },
            {
                title: '价格',
                dataIndex: 'price'
            },
            {
                title: '库存',
                dataIndex: 'repertory'
            },
            {
                title: '操作',
                render: ( txt, record, index ) => {
                    return (
                        <div>
                            <Button 
                                type='primary' 
                                size='small' 
                                style={ {marginLeft: '1rem'} }
                                onClick={ () => {
                                    console.log("Record: ", record)
                                    this.props.history.push(`/admin/products/edit/${record.id}`)
                                }} 
                            >
                                修改
                            </Button>
                            <Popconfirm
                                title='确定删除该项?'
                                onCancel={ () => console.log('取消删除') }
                                onConfirm={ 
                                    () => {
                                        console.log('确认删除: ', record.id)
                                        let id = record.id
                                        // 访问后台 API 进行相应的操作
                                        deleteAPI( id )
                                        .then( res => {
                                            console.log('Delete requst: ',res)
                                            if (res.data.code === 200){
                                                message.info(res.data.message)
                                                // 重新加载页面，刷新页面
                                                window.location.reload()
                                            }else{
                                                message.warn(res.data.message)
                                            }
                                        }).catch( err => {
                                            console.log('Error: ',err)
                                        })
                                    } 
                                }
                            >
                                <Button danger size='small' style={ {margin: '0 1rem'} } >
                                    删除
                                </Button>
                            </Popconfirm>
                        </div>
                    )
                }
            }
        ]
        return (
            <Card 
                title='商品列表'
                extra={
                    <Button 
                        type='primary' 
                        size='small'
                        onClick={
                            () => this.props.history.push('/admin/products/edit')
                        }
                    >
                        新增
                    </Button>
                }
            >
                <Table 
                    rowKey='id' 
                    bordered
                    pagination={
                        { 
                            total: this.state.total, 
                            pageSize: this.state.pageSize, 
                            pageSizeOptions: ['5','10','20','30','40','50'],
                            // 页码或 pageSize 改变的回调，参数是改变后的页码及每页条数
                            onChange: this.loadData,
                            showSizeChanger: true,
                            // onShowSizeChange: this.onShowSizeChange,
                            showTotal: total=> `总共 ${this.state.total} 条数据`
                        }
                    }
                    columns={columns} 
                    dataSource={this.state.dataSources} 
                />
            </Card>
        )
    }
}

export default List