/**
 * Alert 组件 Props 类型申明
 */
import { PlatformsComponent } from './component'

export declare class PlAlert extends PlatformsComponent {
  /**
   * @name 弹窗显示的类型
   * @default info,
   * @type string
   */
  type: 'success' | 'info' | 'warning' | 'error'

  /**
   * @name 是否关闭弹窗开关
   * @default false,
   * @type boolean
   */
  closable: boolean

  /**
   * @name 关闭按钮位置的文本描述（这里可以是字符描述， 也可以插入一个slot）
   * @default void,
   * @type any (string | slot)
   */
  closeText: any

  /**
   * @name 弹窗内容（这里可以是字符描述， 也可以插入一个slot）
   * @default void,
   * @type any (string | slot)
   */
  title: any

  /**
   * @name 弹窗内容详述（这里可以是字符描述， 也可以插入一个slot）
   * @default void,
   * @type any (string | slot)
   */
  description: any

  /**
   * @name 弹窗关闭后的回调函数
   * @default () => void,
   * @type function
   */
  onClose: () => void

  /**
   * @name 是否在内容左侧显示一个icon图标
   * @default false,
   * @type boolean
   */
  showIcon: boolean

  /**
   * @name 页面顶部横幅样式显示（这里可以是字符描述， 也可以插入一个slot）
   * @default false,
   * @type boolean
   */
  banner: boolean

  /**
   * @name 插入一个自定义icon（这里可以是字符描述， 也可以插入一个slot）
   * @default void,
   * @type any (string | slot)
   */
  icon: any
}
