import { createNamespace, isDef } from '../../src/utils'
import { emit, inherit } from '../../src/utils/functional'
import Icon from '../icon'
import { CreateElement, RenderContext } from 'vue/types'
import { DefaultSlots, ScopedSlot } from '../../src/utils/types'

export type textPosType = 'left' | 'right' | 'center'
export type requiredType = 'left' | 'right'
export type borderType = 'top' | 'bottom' | 'both' | 'none'

export type CellProps = {
  leftIcon?: string;
  rightIcon?: string;
  textPos?: textPosType;
  title?: string,
  value?: string;
  isLink?: boolean;
  required?: requiredType;
  border?: borderType;
}

export type CellSlots = DefaultSlots & {
  title?: ScopedSlot;
  value?: ScopedSlot;
  'left-icon'?: ScopedSlot;
  'right-icon'?: ScopedSlot;
}

export type CellEvents = {
  onClick?(event: Event): void;
}

const [createComponent, bem] = createNamespace('cell')

function Cell (
  h: CreateElement,
  props: CellProps,
  slots: CellSlots,
  ctx: RenderContext<CellProps>
) {
  const {
    leftIcon,
    rightIcon,
    title,
    required,
    value,
    isLink,
    border,
    textPos
  } = props
  const leftContent = slots['left-icon'] ?
    typeof slots['left-icon'] === 'function' ?
    slots['left-icon']() : slots['left-icon'] :
    leftIcon ?
    (
      <Icon class={bem('left-icon')} name={leftIcon} />
    ) : ''

  const titleContent = slots.title ?
  typeof slots.title === 'function' ?
  slots.title() : slots.title :
  (
    <span class={bem('text', [required ? required : ''])}>{title}</span>
  )

  const Content = slots.default ?
    typeof slots.default === 'function' ?
    slots.default() : slots.default : value

  const rightContent = slots['right-icon'] ?
    typeof slots['right-icon'] === 'function' ?
    slots['right-icon']() :
    slots['right-icon'] :
    rightIcon || isLink ?
    (
      <Icon class={bem('arrow')} name={isLink ? 'arrow-right' : rightIcon} />
    ) : ''

  function onClick (event: Event) {
    emit(ctx, 'click', event)
  }

  return (
    <div
      class={bem([
        border ? border : ''
      ])}
      {...inherit(ctx)}
    >
      <section class={bem('head')}>
        {leftContent}
        {titleContent}
      </section>
      <section class={bem('bd', [textPos ? textPos : 'right'])} onClick={onClick}>
        {Content}
      </section>
      {rightContent}
    </div>
  )
}

Cell.props = {
  leftIcon: String,
  rightIcon: String,
  textPos: {
    type: String,
    default: 'right'
  },
  border: {
    type: String,
    default: 'top'
  },
  title: String,
  value: String,
  required: String,
  isLink: {
    type: Boolean,
    default: false
  }
}

export default createComponent<CellProps, CellEvents>(Cell)