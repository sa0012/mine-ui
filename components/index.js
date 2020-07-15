// This file is auto generated by build/build-entry.js'
import Accordion from './accordion'
import AccordionItem from './accordion-item'
import ActionSheet from './actionSheet'
import Button from './button'
import Cell from './cell'
import CellGroup from './cell-group'
import Checkbox from './checkbox'
import CheckboxGroup from './checkbox-group'
import Checkicon from './checkicon'
import Dialog from './dialog'
import DropdowmItem from './dropdowm-item'
import DropdownMenu from './dropdown-menu'
import Field from './field'
import Icon from './icon'
import ImagePreview from './image-preview'
import IndexAnchor from './index-anchor'
import IndexBar from './index-bar'
import InfiniteScroll from './infinite-scroll'
import NoticeBar from './noticeBar'
import NumberKeyboard from './number-keyboard'
import Overlay from './overlay'
import Picker from './picker'
import Popup from './popup'
import Radio from './radio'
import RadioGroup from './radio-group'
import Rater from './rater'
import Sticky from './sticky'
import Swiper from './swiper'
import SwiperItem from './swiper-item'
import Switch from './switch'
import Tabpane from './tabpane'
import Tabs from './tabs'
import Toast from './toast'

const version = '1.0.0'

const components = [
  Accordion,
  AccordionItem,
  ActionSheet,
  Button,
  Cell,
  CellGroup,
  Checkbox,
  CheckboxGroup,
  Checkicon,
  Dialog,
  DropdowmItem,
  DropdownMenu,
  Field,
  Icon,
  ImagePreview,
  IndexAnchor,
  IndexBar,
  InfiniteScroll,
  NoticeBar,
  NumberKeyboard,
  Overlay,
  Picker,
  Popup,
  Radio,
  RadioGroup,
  Rater,
  Sticky,
  Swiper,
  SwiperItem,
  Switch,
  Tabpane,
  Tabs,
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
  Accordion,
  AccordionItem,
  ActionSheet,
  Button,
  Cell,
  CellGroup,
  Checkbox,
  CheckboxGroup,
  Checkicon,
  Dialog,
  DropdowmItem,
  DropdownMenu,
  Field,
  Icon,
  ImagePreview,
  IndexAnchor,
  IndexBar,
  InfiniteScroll,
  NoticeBar,
  NumberKeyboard,
  Overlay,
  Picker,
  Popup,
  Radio,
  RadioGroup,
  Rater,
  Sticky,
  Swiper,
  SwiperItem,
  Switch,
  Tabpane,
  Tabs,
  Toast
}

export default {
  install,
  version
}
