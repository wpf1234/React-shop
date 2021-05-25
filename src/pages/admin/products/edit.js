import React, { Component } from 'react'
import { Form, Card, Input, Button, message } from 'antd'
import { createAPI, getOnByID, modifyAPI } from '../../../service/products'

class Edit extends Component {

    formRef = React.createRef()
    // 加载时判断是否绑定了 id 
    componentDidMount(){
        console.log('Props: ', this.props)
        if (this.props.match.params.id){
            let id = this.props.match.params.id
            // 有 ID 值调用 getOneByID 接口
            getOnByID( id )
            .then( res => {
                // console.log(res)
                if (res.data.code === 200){
                    // 请求后台数据成功
                    // '表单字段name': '需要设置的值'
                    this.formRef.current.setFieldsValue({
                        name: res.data.data.name,
                    })
                    this.formRef.current.setFieldsValue({
                        price: res.data.data.price + '',
                    })
                    this.formRef.current.setFieldsValue({
                        repertory: res.data.data.repertory + '',
                    })
                }else{
                    console.log('Error: ', res.data.message)
                }
            }).catch( err => {
                console.log('Error: ',err)
            })
        }
    }

    render() {
        
        const onFinish = values => {
            console.log("输入的内容是: ",values)
            // 调用后台 API 接口，将数据发送到后台，并存入数据库
            if (this.props.match.params.id){
                let id = this.props.match.params.id
                // 修改相应数据
                let data = {
                    id: Number(id),
                    name: values.name,
                    price: Number(values.price),
                    repertory: Number(values.repertory)
                }
                // 修改接口
                modifyAPI(data)
                .then( res => {
                    // console.log('Requst: ', res)
                    if (res.data.code === 200){
                        // 更新成功,返回商品列表
                        message.info(res.data.message)
                        this.props.history.push('/admin/products')
                    }else{
                        message.error(res.data.message)
                    }
                }).catch( err => {
                    console.log('Error: ',err)
                })  
            }else {
                // 新增接口
                let data = {
                    name: values.name,
                    price: Number(values.price),
                    repertory: Number(values.repertory)
                }
                createAPI( data )
                .then( res => {
                    // console.log('新增请求返回结果: ',res)
                    if (res.data.code === 200){
                        // 新增成功
                        message.info(res.data.message)
                        this.props.history.push('/admin/products')
                    }else{
                        message.warn(res.data.message)
                        
                    }
                }).catch( err => {
                    console.log('Error: ',err)
                })
            }
        }

        // 自定义一些规则
        // const priceValidator = ( rule, value, callback ) => {
        //     // 字符串转数字 string*1
        //     if ( value*1 > 100){
        //         callback('价格不能大于100!')
        //     }else{
        //         callback('')
        //     }
        // }

        return (
            <Card 
                title='商品编辑'
                extra={
                    <Button onClick={ () => this.props.history.push('/admin/products') }>
                        返回
                    </Button>
                }
            >
                <Form
                    initialValues={{ remember: true }}
                    onFinish = { onFinish }
                    ref={ this.formRef }
                >
                    <Form.Item 
                        label='名称' 
                        name='name'
                        rules={[
                            { 
                                required: true, 
                                message: '商品名称不能为空!' 
                            }
                        ]}
                        // initialValue={ this.state.data.name }
                    >
                        <Input placeholder='请输入商品名称' />
                    </Form.Item>
                    <Form.Item 
                        label='价格' 
                        name='price'
                        rules={[
                            { 
                                required: true, 
                                message: '商品价格不能为空!' 
                            },
                            // {
                            //     validator: priceValidator
                            // }
                        ]}
                        // initialValue={ this.state.data.price }
                    >
                        <Input placeholder='请输入商品价格' />
                    </Form.Item>
                    <Form.Item 
                        label='库存' 
                        name='repertory'
                        rules={[
                            { 
                                required: true, 
                                message: '库存不能为空!' 
                            },
                            // {
                            //     validator: priceValidator
                            // }
                        ]}
                        // initialValue={ this.state.data.price }
                    >
                        <Input placeholder='请输入库存数量' />
                    </Form.Item>
                    <Form.Item>
                        <Button 
                            type='primary'
                            htmlType='submit'
                        >
                            保存
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}

export default Edit