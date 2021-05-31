import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { mainRoutes } from './routes'
import { ConfigProvider } from 'antd'
import { ZHCN } from 'antd/lib/locale/zh_CN'

ReactDOM.render(
  <ConfigProvider locale={ZHCN}>
    <Router>
      <Switch>
        {/* <Route path="/login" component={Login} />
        <Route path="/products" component={List} /> */}
        <Route 
          path="/admin" 
          render ={
            routeProps => <App {...routeProps} />
          }
        />
        {
          mainRoutes.map( route => {
            return(
              <Route key={route.path} {...route} />
            )
          })
        }
        {/* 重定向，当访问管理后台时，做一个设置 */}
        <Redirect to="/admin" from='/' />
        <Redirect to="/404" />
      </Switch>
    </Router>
  </ConfigProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
