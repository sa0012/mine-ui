import { createNamespace, isDef } from '../../src/utils'
import { emit, inherit } from '../../src/utils/functional'
import Icon from '../icon'
import { CreateElement, RenderContext } from 'vue/types'
import { DefaultSlots, ScopedSlot } from '../../src/utils/types'

export type CellProps = {
  leftIcon?: string;
  rightIcon?: string;
  title?: string,
  value?: string;
  isLink?: boolean;
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
  const leftContent = slots['left-icon'] ? slots['left-icon']() : props.leftIcon ? (
    <Icon class={bem('left-icon')} name={props.leftIcon} />
  ) : ''

  const titleContent = slots.title ? slots.title() : props.title

  const Content = slots.default ? slots.default() : props.value

  const rightContent = slots['right-icon'] ? slots['right-icon']() : props.rightIcon || props.isLink ? (
    <Icon class={bem('arrow')} name={props.isLink ? 'arrow-right' : props.rightIcon} />
  ) : ''

  function onClick (event: Event) {
    emit(ctx, 'click', event)
  }

  return (
    <div
      class={bem('')}
      {...inherit(ctx)}
    >
      <section class={bem('head')}>
        {leftContent}
        {titleContent}
      </section>
      <section class={bem('bd')} onClick={onClick}>
        {Content}
      </section>
      {rightContent}
    </div>
  )
}

Cell.props = {
  leftIcon: String,
  rightIcon: String,
  title: String,
  value: String,
  isLink: {
    type: Boolean,
    default: false
  }
}

export default createComponent<CellProps, CellEvents>(Cell)