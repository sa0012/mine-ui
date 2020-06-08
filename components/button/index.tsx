import { createNamespace } from '../../src/utils'
import { CreateElement, RenderContext } from 'vue/types'
import { DefaultSlots } from '../../src/utils/types'
import { emit, inherit } from '../../src/utils/functional'

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

export type ButtonEvents = {
  onClick?(event: Event): void;
}

function Button (
  h: CreateElement,
  props: ButtonProps,
  slots: DefaultSlots,
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
    const content = []

    let text = slots.default ? slots.default() : props.text

    if (text) {
      content.push(
        <span
          class={
            bem('text')
          }>{ text }</span>
      )
    }

    return content
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
