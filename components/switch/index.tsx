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
    size
  } = props
  function onClick (event: Event) {
    console.log(122222)
    emit(ctx, 'click', event)
    if (disabled) return
    emit(ctx, 'change', !value)
    emit(ctx, 'input', !value)
  }
  return (
    <div
      class={bem({
        'checked': value,
        'disabled': disabled
      })}
      style={{
        fontSize: size
      }}
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
    type: String,
    default: '30px'
  }
}

export default createComponent<SwitchProps, SwitchEvent>(Switch)
