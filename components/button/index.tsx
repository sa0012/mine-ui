import { createNamespace, isDef, isFunc } from '../../src/utils'
import { CreateElement, RenderContext } from 'vue/types'
// inherit 默认属性附加
import { emit, inherit } from '../../src/utils/functional'
import { DefaultSlots, ScopedSlot } from '../../src/utils/types'
import Icon from '../icon'

const [createComponent, bem] = createNamespace('button')

export type ButtonType = 'default' | 'primary' | 'info' | 'warning' | 'danger'
export type ButtonSize = 'large' | 'normal' | 'small' | 'mini'
export type iconPos = 'left' | 'right'
export type animated = 'antd-ripple' | 'ripple'

export type ButtonProps = {
  tag: keyof HTMLElementTagNameMap | string;
  icon?: string;
  type: ButtonType;
  size: ButtonSize;
  text?: string;
  htmlType?: string;
  disabled?: boolean;
  position: iconPos;
  animated: animated;
}

export type ButtonSlots = DefaultSlots & {
  icon?: ScopedSlot
}

export type ButtonEvents = {
  onClick?(event: Event): void;
}

function Button (
  h: CreateElement,
  props: ButtonProps,
  slots: ButtonSlots,
  ctx: RenderContext<ButtonProps>
) {
  const {
    icon,
    type,
    size,
    htmlType,
    disabled,
    animated
  } = props

  const classes = [
    bem([
      type,
      size,
      !disabled && animated,
      [...(props.disabled ? 'disabled' : '')]
    ])
  ]

  function onClick (event: Event) {
    emit(ctx, 'click', event)
  }

  function Content () {
    return (
      <span class={
        bem('content')
      }>
        {
          props.icon && (<Icon name={icon} />)
        }
        {
          slots.icon ? (
            slots.icon()
          ) : (
            isFunc(slots.default) ? slots.default() : slots.default
          )
        }
        <span class={bem('text')}>{props.text}</span>
      </span>
    )
  }
  return (
    <props.tag
      type={htmlType}
      class={classes}
      disabled={disabled}
      onClick={onClick}
      {...(inherit(ctx))}
    >
      { Content() }
    </props.tag>
  )
}

Button.props = {
  icon: String,
  tag: {
    type: String,
    default: 'button'
  },
  type: {
    type: String,
    default: 'default'
  },
  size: {
    type: String,
    default: 'normal'
  },
  position: {
    type: String,
    default: 'left'
  },
  animated: {
    type: String,
    default: 'antd-ripple'
  },
  text: String,
  htmlType: String,
  disabled: Boolean
}

export default createComponent<ButtonProps, ButtonEvents>(Button);
