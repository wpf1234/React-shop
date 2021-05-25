import React, { Component } from 'react'
import { Form, Input, Button, Card, Checkbox, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import './login.css'
import { setToken } from '../utils/auth'
import { loginAPI } from '../service/auth'

/*
   登录的路由组件
 */
class Login extends Component {
   
    render() {
        const onFinish = values => {
            console.log('username: ', values.username);
            console.log('password: ', values.password);
            // setToken(values.username)
            // this.props.history.push('/admin')
            loginAPI(
                {
                    username: values.username,
                    password: values.password
                }
            ).then( res => {
                // console.log(res.data)
                if (res.data.code === 200) {
                    // 登陆成功，显示结果，存储 Token
                    console.log("Message: ",res.data.message)
                    console.log('Token: ',res.data.data.token)
                    message.success(res.data.message)
                    setToken(res.data.data.token)

                    // 路由跳转
                    this.props.history.push('/admin')
                }else{
                    message.error(res.data.message)
                }
            }).catch( (err) => {
                // console.log('Error: ',err);
                message.error('Error: 用户不存在!')
            })
        }

        return (
            
            <Card title='QF Admin SYS' className='login-form' >
                <Form
                    name="normal_login"
                    // className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={
                            [
                                { required: true, message: '请输入用户名!' }
                            ]
                        }
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={
                            [
                                { required: true, message: '请输入密码!' },
                                { min: 6, message: '密码至少6位!'}
                            ]
                        }
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>记住我</Checkbox>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}

export default Login