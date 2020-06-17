import { createNamespace, isDef } from '../../src/utils'
import { emit, inherit } from '../../src/utils/functional'
import { CreateElement, RenderContext } from 'vue/types'
import { DefaultSlots } from '../../src/utils/types'

import Overlay from '../overlay'

const  [createComponent, bem] = createNamespace('popup')

export type PositionType = 'top' | 'right' | 'bottom' | 'left' | 'center'

export type PopupProps = {
  position?: PositionType;
  value?: boolean;
  closeOnClickOverlay?: boolean;
  hideMask?: boolean;
  zIndex?: string | number;
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

  function onCancel (event: Event) {
    if (!closeOnClickOverlay) return
    emit(ctx, 'input', event, false)
  }

  let showMask = !!value

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
            bem(['content', position])
          }
        >
          {slots.default && slots.default()}
        </div>
      </transition>
    )
  }

  function closeOverlay (event: Event) {
    console.log(12233333)
    showMask = false
    emit(ctx, 'input', event, false)
    // onCancel(event)
  }

  return (
    <div
      class={bem()}
      {...inherit(ctx)}
    >
      <Overlay
        show={showMask}
        onClick={closeOverlay}
      />
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
    default: false
  },
  hideMask: {
    type: Boolean,
    default: false
  },
  zIndex: {
    type: [String, Number],
    default: 333
  }
}

export default createComponent<PopupProps, PopupEvent>(Popup)
