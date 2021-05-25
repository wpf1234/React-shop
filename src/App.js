import './App.css';
import React from 'react'
import { Switch, Route, Redirect} from 'react-router-dom'
import { adminRoutes } from './routes'
import Frame from './components/frame'
import { isLogined } from './utils/auth'

/**
 * 在 App 组件中渲染路由
 * @returns 
 */
function App() {
  return isLogined() ? ( 
    <Frame className="App">
      <Switch >
        {
          adminRoutes.map( route => {
            return(
              <Route 
                key={route.path} 
                path={route.path} 
                exact={route.exact} 
                render={ routeProps => {
                  return(
                    <route.component {...routeProps} />
                  )
                }}
              />
            )
          })
        }
        <Redirect to={ adminRoutes[0].path }  from='/admin' />
        <Redirect to='/404' />
      </Switch>
    </Frame>
  ) : (
    <Redirect to='/login' />
  )
}

export default App;
