import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect, routerRedux } from 'dva/router'
import dynamic from 'dva/dynamic'
import App from 'routes/app'

const { ConnectedRouter } = routerRedux

const Routers = function ({ history, app }) {
  const error = dynamic({
    app,
    component: () => import('./routes/error'),
  })
  const routes = [
    {
      path: '/',
      models: () => [import('./models/home')],
      component: () => import('./routes/home/'),
    },
    {
      path: '/login',
      models: () => [import('./models/login')],
      component: () => import('./routes/login/index'),
    },
    {
      path: '/myorder',
      models: () => [import('./models/myorder')],
      component: () => import('./routes/myorder/index'),
    },
    {
      path: '/trailer',
      models: () => [import('./models/trailer')],
      component: () => import('./routes/trailer/index'),
    },
    {
      path: '/join',
      models: () => [import('./models/join')],
      component: () => import('./routes/join/index'),
    },
    {
      path: '/news',
      models: () => [import('./models/news')],
      component: () => import('./routes/news/index'),
    },
    {
      path: '/details',
      models: () => [import('./models/details')],
      component: () => import('./routes/details/index'),
    },
    {
      path: '/about',
      models: () => [import('./models/about')],
      component: () => import('./routes/about/index'),
    },
    {
      path: '/successful',
      models: () => [import('./models/successful')],
      component: () => import('./routes/successful/index'),
    }                      
    ]

  return (
    <ConnectedRouter history={history}>
      <App>
        <Switch>
          
          {
            routes.map(({ path, ...dynamics }, key) => (
              <Route key={key}
                exact
                path={path}
                component={dynamic({
                  app,
                  ...dynamics,
                })}
              />
            ))
          }
          <Route component={error} />
        </Switch>
      </App>
    </ConnectedRouter>
  )
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
