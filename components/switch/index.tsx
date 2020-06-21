import { createNamespace } from '../../src/utils'
import { emit, inherit } from '../../src/utils/functional'

// Types
import { CreateElement, RenderContext } from 'vue/types'
import { DefaultSlots } from '../../src/utils/types'

export type SwitchEvent = {
  onChange?(checked: boolean): void
}

export type SwitchProps = {
  value: boolean;
  disabled: boolean;
  size: string | number;
  openColor: string;
  closeColor: string;
  baseColor?: string;
  animation?: boolean;
}

const [createComponent, bem] = createNamespace('switch')

function Switch (
  h: CreateElement,
  props: SwitchProps,
  slots: DefaultSlots,
  ctx: RenderContext<SwitchProps>
) {
  const {
    value,
    disabled,
    size,
    openColor,
    closeColor,
    baseColor,
    animation
  } = props
  function onClick (event: Event) {
    emit(ctx, 'click', event)
    if (disabled) return
    emit(ctx, 'change', !value)
    emit(ctx, 'input', !value)
  }

  const themeColor = value ? openColor : closeColor
  const boxShadowSize = (Number(size) / 30) * 16
  let defaultStyle = {
    fontSize: size + 'px',
    backgroundColor: themeColor
  }
  const checkedStyle = {
    borderColor: themeColor,
    boxShadow: `${themeColor || baseColor} 0 0 0 ${boxShadowSize < 10 ? 10 : boxShadowSize}px inset`,
    webkitBoxShadow: `${themeColor || baseColor} 0 0 0 ${boxShadowSize < 10 ? 10 : boxShadowSize}px inset`,
    backgroundColor: themeColor
  }

  if (value && animation) {
    defaultStyle = Object.assign({}, defaultStyle, checkedStyle)
  }
  return (
    <div
      class={bem({
        'checked': value,
        'disabled': disabled,
        'animation': animation
      })}
      style={defaultStyle}
      onClick={onClick}
      {...inherit(ctx)}
    >
      <div class={bem('circle')}></div>
    </div>
  )
}

Switch.props = {
  value: {
    type: Boolean,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  size: {
    type: [String, Number],
    default: 30
  },
  // theme-color
  baseColor: {
    type: String,
    default: '#4A90E2'
  },
  // animation
  animation: {
    type: Boolean,
    default: false
  },
  openColor: String,
  closeColor: String
}

export default createComponent<SwitchProps, SwitchEvent>(Switch)
