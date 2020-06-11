import { createNamespace, isDef } from '../../src/utils'
import { emit, inherit } from '../../src/utils/functional'
import Icon from '../icon'
import { CreateElement, RenderContext } from 'vue/types'
import { DefaultSlots } from '../../src/utils/types'

const [createComponent, bem] = createNamespace('checkicon')

export type shapeType = 'round' | 'square' | 'square-border'

export type CheckiconProps = {
  value: boolean;
  type?: shapeType;
  disabled?: boolean;
  size?: string;
}

export type CheckiconEvent = {
  onClick?(event: Event): void;
  onChange?(event: Event): void;
}

function Checkicon (
  h: CreateElement,
  props: CheckiconProps,
  slots: DefaultSlots,
  ctx: RenderContext<CheckiconProps>
) {
  const {
    value,
    type,
    size,
    disabled
  } = props
  const iconName =
    value && type === 'round' ?
    'checkicon' :
    !value && type === 'round' ?
    'unchecked' :
    value && type === 'square' ?
    'square-checked' :
    !value && type === 'square' ?
    'square-unchecked' :
    value && type === 'square-border' ?
    'square-border-checked' :
    !value && type === 'square-border' ?
    'square-border-unchecked' : ''

  function onClick (event: Event) {
    if (disabled) return
    emit(ctx, 'change', !value, event)
    emit(ctx, 'click', value, event)
  }

  return (
    <span
      class={
        bem('wrap', [
          'disabled' ? disabled : ''
        ])
      }
      {...inherit(ctx)}
      onClick={onClick}
    >
      <Icon
        name={iconName}
        size={size}
      />
      {slots.default && slots.default()}
    </span>
  )
}

Checkicon.props = {
  value: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'round',
    validator (value) {
      return ['round', 'square', 'square-border'].indexOf(value) > -1
    }
  },
  size: {
    type: [String, Number],
    default: 16
  },
  disabled: {
    type: Boolean,
    default: false
  }
}

export default createComponent<CheckiconProps, CheckiconEvent>(Checkicon)
