import { createNamespace, isDef } from '../../src/utils'

import { CreateElement } from 'vue/types'
import { DefaultSlots } from '../../src/utils/types'

export type IconProps = {
  name: string;
  size?: string | number;
  color?: string;
  info?: string;
  classPrefix: string;
}

export type IconEvents = {
  onClick?(event: Event): void;
}

const [createComponent, bem] = createNamespace('icon')

function Icon (
  h: CreateElement,
  props: IconProps,
  slots: DefaultSlots
) {
  return (
    <i
      class={[`${props.classPrefix} ${props.classPrefix}-${props.name} ${bem('icon')}`]}
      style={{
        color: props.color
      }}
    >
      { slots.default && slots.default() }
      { props.info && (<span class={bem('text')}>{ props.info }</span>) }
    </i>
  )
}

Icon.props = {
  name: String,
  size: [String, Number],
  info: String,
  color: String,
  classPrefix: {
    type: String,
    default: 'ml-icon'
  }
}

export default createComponent<IconProps, IconEvents>(Icon)