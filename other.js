import React, { Component } from 'react'
import './login.less'
import logo from '../assets/favicon.ico'
import { Form, Input, Button, Card } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
// import axios from 'axios'

/*
   登录的路由组件
 */
class Login extends Component {

    state = {
        username: '',
        password: ''
    }

    render() {
        const onFinish = values => {
            console.log('username: ', values.username);
            console.log('password: ', values.password);

        }
        const valueChange = (changedFields, allFields) => {
            // console.log("Change: ",changedFields);

            this.setState(
                {
                    username: allFields.username,
                    password: allFields.password
                }
            )

            // console.log("New state: ",this.state);
        }
        // const onSubmit = () => {
        //     axios({
        //         method: 'POST',
        //         url: 'login',
        //         data: {
        //             username: this.state.username,
        //             password: this.state.password
        //         }
        //     }).then((res) => {
        //         console.log("result: ", res);
        //         if (res.status !== 200) {
        //             console.log(res.statusText);
        //         }
        //         this.props.history.push("/")

        //     }).catch((err) => {
        //         console.log("Error: ", err);
        //     })
        // }
        return (
            <div className='login'>
                <header className='login-header'>
                    <img src={logo} alt='logo' />
                    <h1>后台管理系统</h1>
                </header>
                <Card className='login-content' title='用户登录' bordered={false} >

                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        /** 提交校验也不在button的onClick里，onFinish是成功的回调，onFinishFailed是失败的回调，注意Button要写在Form里，并且htmlType="submit" */
                        onFinish={onFinish}
                        // onFinishFailed={(value) => console.log(value)}
                        /** 不用提交，每一次数据变化都把值返回上层组件 */
                        // onFieldsChange={(changedFields, allFields) => console.log('onFieldsChange', changedFields, allFields)}
                        // onValuesChange={(changedFields, allFields) => console.log('onValuesChange', changedFields, allFields)}
                        onValuesChange={valueChange}

                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: '用户名不能为空，请输入!'
                                }
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={
                                [
                                    { required: true, message: '密码为空，请重新输入!' },
                                    {
                                        max: 20,
                                        message: '密码最多包含20个字符'
                                    },
                                    {
                                        min: 6,
                                        message: '密码至少含有6个字符'
                                    },
                                    {
                                        pattern: new RegExp(/^(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&*()]{6,}$/, "g"),
                                        message: '密码允许包含数字、字母和特殊字符'
                                    }
                                ]
                            }
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                                // href='/'
                                // onClick={onSubmit}
                            >
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        )
    }
}

export default Login