import { createNamespace, isDef } from '../../src/utils'
import { emit, inherit } from '../../src/utils/functional'
import Icon from '../icon'
import { CreateElement, RenderContext } from 'vue/types'
import { DefaultSlots } from '../../src/utils/types'

const  [createComponent, bem] = createNamespace('popup')

export type PositionType = 'top' | 'right' | 'bottom' | 'left' | 'center'

export type PopupProps = {
  position?: PositionType;
  value?: boolean;
  closeOnClickOverlay?: boolean;
  hideMask?: boolean;
}

export type PopupEvent = {
  onClick?(event: Event): void
}

function Popup (
  h: CreateElement,
  props: PopupProps,
  slots: DefaultSlots,
  ctx: RenderContext<PopupProps>
) {
  const {
    position,
    value,
    closeOnClickOverlay,
    hideMask
  } = props

  function onCalcel (event: Event) {
    if (!this.closeOnClickOverlay) return
    emit(ctx, 'input', false)
  }

  const showMask = !!(value && !hideMask)

  const objTransitionSlideType = {
    bottom: 'ml-slide-bottom',
    left: 'ml-slide-left',
    top: 'ml-slide-top',
    right: 'ml-slide-right',
    center: 'ml-fade'
  }[position]

  const Content = () => {
    return (
      <transition name={objTransitionSlideType}>
        <div
          vShow={value}
          class={
            bem('content', [position])
          }
        >
          {slots.default && slots.default()}
        </div>
      </transition>
    )
  }

  return (
    <div
      class={bem()}
      {...inherit(ctx)}
    >
      <transition name="ml-fade">
        <div
          class={
            bem(['mask'])
          }
          vShow={showMask}
          onClick={onCalcel}
        ></div>
      </transition>
      {Content()}
    </div>
  )
}

Popup.props = {
  position: {
    type: String,
    default: 'center',
    validator (value) {
      return ['top', 'right', 'bottom', 'left', 'center'].indexOf(value) > -1
    }
  },
  value: {
    type: Boolean,
    required: true
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: true
  },
  hideMask: {
    type: Boolean,
    default: false
  }
}

export default createComponent<PopupProps, PopupEvent>(Popup)
