const getDemoModules = () => {
  // 获取components下所有的demo
  // **?/*.html
  const moduleContext = require.context('../components', true, /index\.vue$/)
  return moduleContext.keys().reduce((moduleObj, module) => {
    const moduleName = module.replace('./', '').replace('.vue', '').split('/')[0]
    const moduleConfig = moduleContext(module)
    /**
    * 兼容 import export 和 require module.export 两种规范
    */
    const ctrl = moduleConfig.default || moduleConfig
    moduleObj[moduleName] = ctrl
    moduleObj[moduleName]['path'] = module.replace('./', '@@/')
    return moduleObj
  }, {})
}

const menuList = {
  button: 'Button - 按钮',
  icon: 'Icon - 图标',
  popup: 'Popup - 弹层'
}

export const routeList = () => {
  const obj = getDemoModules()
  const list = []
  if (obj) {
    for (let k in obj) {
      list.push({
        path: `/${k}`,
        meta: { name: menuList[k] },
        component: () => import(
          /* webpackChunkName: "[obj[k].name]" */
          '@@/' + k + '/demo/index.vue'
        )
      })
    }
  }

  return list
}
