import { VNode, CreateElement, RenderContext } from 'vue'
import { InjectOptions, PropsDefinition } from 'vue/types/options'

/**
 * 事件模型
 */
export type EventHandler = (event: Event) => void

export type ObjectIndex = Record<string, any>

export type ScopedSlot<Props = any> = (props?: Props) => VNode[] | VNode | undefined

/**
 * 默认插槽模型
 */
export type DefaultSlots = {
  default?: ScopedSlot
}

/**
 * 作用域插槽模型
 */
export type ScopedSlots = DefaultSlots & {
  [key: string]: ScopedSlot | undefined
}

export type ModelOptions = {
  prop?: string,
  event?: string
}

export type DefaultProps = ObjectIndex

/**
 * 定义函数式组件模型
 */
export type FunctionComponent<Props = DefaultProps, PropDefs = PropsDefinition<Props>> = {
  (h: CreateElement, props: Props, slots: ScopedSlots, context: RenderContext<Props>):
    | VNode
    | undefined
  props?: PropDefs
  model?: ModelOptions
  inject?: InjectOptions
}
