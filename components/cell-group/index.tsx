import { createNamespace } from '../../src/utils'
import { emit, inherit } from '../../src/utils/functional'
import { CreateElement, RenderContext } from 'vue/types'
import { DefaultSlots } from '../../src/utils/types'

const [createComponent, bem] = createNamespace('cell-group')

export type CellGroupProps = {
  title: string;
  label?: string;
}

export type CellGroupEvent = {
  onClick?(event: Event): void;
}

function CellGroup (
  h: CreateElement,
  props: CellGroupProps,
  slots: DefaultSlots,
  ctx: RenderContext<CellGroupProps>
) {
  function onClick (event: Event) {
    emit(ctx, 'click', event)
  }

  function showTitleOrLabel () {
    return (
      <div class={bem('wrap')}>
        {
          props.title && (<div class={bem('wrap-left')}>{ props.title }</div>)
        }
        {
          props.label && (<div
            class={bem('wrap-right')}
            onClick={onClick}
          >{ props.label }</div>)
        }
      </div>
    )
  }
  return (
    <section
      class={bem('group')}
      {...inherit(ctx)}
    >
      {showTitleOrLabel()}
      {slots.default && slots.default()}
    </section>
  )
}

CellGroup.props = {
  title: String,
  label: String
}

export default createComponent<CellGroupProps, CellGroupEvent>(CellGroup)