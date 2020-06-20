import Overlay from '../../../components/overlay'
import { context } from './context'
import { mount } from '../../utils/functional'

export type OverlayConfig = {
  zIndex?: number | string;
  className?: string;
  customStyle?: object[] | object;
}

const defaultConfig: OverlayConfig = {
  className: '',
  customStyle: {}
}

let overlay: any

// 点击遮罩层
function onClickOverlay (): void {
  if (context.top) {
    const { vm } = context.top
    vm.$emit('click-overlay')

    if (vm.closeOnClickOverlay) {
      vm.onClickOverlay()
    } else {
      vm.close()
    }
  }
}

export function updateOverlay (): void {
  if (!overlay) {
    overlay = mount(Overlay, {
      on: {
        click: onClickOverlay
      }
    })
  }

  if (context.top) {
    const { vm, config } = context.top
    const el = vm.$el

    if (el && el.parentNode) {
      el.parentNode.insertBefore(overlay.$el, el)
    } else {
      document.body.appendChild(overlay.$el)
    }

    Object.assign(overlay, defaultConfig, config, {
      show: true
    })
  } else {
    overlay.show = false
  }
}

export function opeOverlay (vm: any, config: OverlayConfig): void {
  if (context.stack.some(item => item.vm === vm)) {
    context.stack.push({ vm, config })
    updateOverlay()
  }
}

export function closeOverlay (vm: any): void {
  const { stack } = context

  if (stack.length) {
    if (context.top.vm === vm) {
      stack.pop()
      updateOverlay()
    } else {
      context.stack = stack.filter(item => item.vm !== vm)
    }
  }
}
