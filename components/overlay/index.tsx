import { createNamespace, isDef } from '../../src/utils'
import { emit, inherit } from '../../src/utils/functional'

import { CreateElement,RenderContext } from 'vue/types'
import { DefaultSlots } from '../../src/utils/types'

const [createComponent, bem] = createNamespace('overlay')

export  type OverlayProps = {
  show?: boolean;
  zIndex?: number | string;
  duration: number | string;
  className?: any;
  customStyle?: object;
  transition?: string;
  overlayStyle?: object;
}

export type OverlayEvent = {
  onClick(event: Event): void;
}

function preventTouchMove (event: TouchEvent) {
  event.preventDefault();
}

function Overlay (
  h: CreateElement,
  props: OverlayProps,
  slots: DefaultSlots,
  ctx: RenderContext<OverlayProps>
) {
  const style: { [key: string]: any } = {
    zIndex: props.zIndex,
    ...props.customStyle,
    ...props.overlayStyle
  }

  if (isDef(props.duration)) {
    style.animationDuration = `${props.duration}s`
  }

  function onClick (event: Event): void {
    emit(ctx, 'click', event)
  }

  return (
    <transition name={props.transition}>
      <div
        vShow={props.show}
        style={style}
        class={[
          bem(), props.className
        ]}
        onTouchmove={preventTouchMove}
        onClick={onClick}
        {...inherit(ctx, true)}
      >
        { slots.default && slots.default() }
      </div>
    </transition>
  )
}

Overlay.props = {
  show: Boolean,
  duration: [Number, String],
  className: null as any,
  customStyle: Object,
  zIndex: {
    type: [Number, String],
    default: 33
  },
  transition: {
    type: String,
    default: 'ml-fade'
  },
  overlayStyle: {
    type: Object,
    default: () => {
      return {
        position: 'fixed'
      }
    }
  }
}

export default createComponent<OverlayProps, OverlayEvent>(Overlay)
