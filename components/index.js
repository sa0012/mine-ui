// This file is auto generated by build/build-entry.js'
import Button from './button'
import Cell from './cell'
import CellGroup from './cell-group'
import Checkbox from './checkbox'
import CheckboxGroup from './checkbox-group'
import Checkicon from './checkicon'
import Dialog from './dialog'
import Field from './field'
import Icon from './icon'
import NoticeBar from './noticeBar'
import Overlay from './overlay'
import Popup from './popup'
import Radio from './radio'
import RadioGroup from './radio-group'
import Rater from './rater'
import Switch from './switch'
import Toast from './toast'

const version = '1.0.0'

const components = [
  Button,
  Cell,
  CellGroup,
  Checkbox,
  CheckboxGroup,
  Checkicon,
  Dialog,
  Field,
  Icon,
  NoticeBar,
  Overlay,
  Popup,
  Radio,
  RadioGroup,
  Rater,
  Switch,
  Toast
]

const install = Vue => {
  components.forEach(Component => {
    Vue.use(Component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export {
  install,
  version,
  Button,
  Cell,
  CellGroup,
  Checkbox,
  CheckboxGroup,
  Checkicon,
  Dialog,
  Field,
  Icon,
  NoticeBar,
  Overlay,
  Popup,
  Radio,
  RadioGroup,
  Rater,
  Switch,
  Toast
}

export default {
  install,
  version
}
