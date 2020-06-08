import { createNamespace, isDef } from '../../src/utils'
import { CreateElement, RenderContext } from 'vue/types'
import { emit, inherit } from '../../src/utils/functional'
import { DefaultSlots, ScopedSlot } from '../../src/utils/types'

const [createComponent, bem] = createNamespace('button')

export type ButtonType = 'default' | 'primary' | 'info' | 'warning' | 'danger'
export type ButtonSize = 'large' | 'normal' | 'small' | 'mini'

export type ButtonProps = {
  icon?: String,
  type: ButtonType,
  size: ButtonSize,
  text?: String,
  color?: string,
  htmlType?: String,
  disabled?: boolean
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
    text,
    color,
    htmlType,
    disabled
  } = props

  console.log(slots, 'slots')

  const classes = [
    bem([
      type,
      size,
    ])
  ]

  function onClick (event: Event) {
    emit(ctx, 'click', event)
  }

  function Content () {
    const iconSlot = slots.icon || isDef(props.icon)
    return (
      <div>
        {
          slots.icon ? (
            slots.icon()
          ) : (
            slots.default()
          )
        }
        <span class={bem('text')}>{props.text}</span>
      </div>
    )
  }
  return (
    <button
      type={htmlType}
      class={classes}
      disabled={disabled}
      onClick={onClick}
    >
      { Content() }
    </button>
  )
}

Button.props = {
  icon: String,
  type: {
    type: String,
    default: 'default'
  },
  size: {
    type: String,
    default: 'normal'
  },
  text: String,
  color: String,
  htmlType: String,
  disabled: Boolean
}

export default createComponent<ButtonProps, ButtonEvents>(Button);
