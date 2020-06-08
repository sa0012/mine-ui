import imgConfig from './imgConfig'

export default (Vue) => {
  Vue.filter('imgUrl', url => {
    return imgConfig[url]
  })
}