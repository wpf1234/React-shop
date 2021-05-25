import React, { Component } from 'react'
import { Layout, Menu,Dropdown, Avatar, message } from 'antd'
import './frame.css'
import {withRouter} from 'react-router-dom'
import Logo from '../../assets/favicon.ico'
import { adminRoutes } from '../../routes'
import { createFromIconfontCN } from '@ant-design/icons'
import { dropToken } from '../../utils/auth'

// const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout
const routes = adminRoutes.filter( route => route.isShow)

const IconFont = createFromIconfontCN({
    scriptUrl: [
      '//at.alicdn.com/t/font_1725149_4ygfdvlw8jt.js'  // icon-shop, icon-barchart, icon-qiapian, icon-1, icon-sousuo
    ],
})

class Frame extends Component {
    render() {
        const popMenu = (
            <Menu onClick={ (p) =>{
                if(p.key === 'logOut'){
                    dropToken()
                    this.props.history.push('/login')
                }else{
                    message.info(p.key)
                }
            } } >
                <Menu.Item key='notice'>通知中心</Menu.Item>
                <Menu.Item key='setting'>设置</Menu.Item>
                <Menu.Item key='logOut'>退出</Menu.Item>
            </Menu>
        )
        return (
            <Layout>
                <Header className="header" style={{backgroundColor: '#222222'}}>
                    <div className="logo">
                        {/* eslint-disable-next-line */}
                        <img src={Logo}  />
                    </div>
                    {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu> */}
                    <Dropdown overlay={popMenu}>
                        <div>
                            <Avatar>U</Avatar>
                            <span className='manage' >管理员</span>
                            <IconFont type='icon-setting' />
                        </div>
                    </Dropdown>
                </Header>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                        >
                        {routes.map( route => {
                            return(
                                <Menu.Item key={route.path} onClick={ p => this.props.history.push(p.key)}>
                                    {/* 如何使用数据中的 Icon */}
                                    {/* {
                                        React.createElement(
                                            Icon[route.icon],
                                            {
                                                style:{ fontSize: '16px', color: '#08c' }
                                            }
                                        )
                                    } */}
                                    <IconFont type={ route.icon } />
                                    {route.title}
                                </Menu.Item>
                            )
                        })}
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '16px' }}>
                        {/* <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb> */}
                        <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                        >
                        {this.props.children}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}

export default withRouter(Frame)