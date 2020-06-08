import { createNamespace } from '../../src/utils'

const [createComponent, bem] = createNamespace('alert')

export default createComponent({
  render () {
    return (
      <div class={
        bem({
          'font-size': '16px',
          'color': 'red'
        })
      }>
        this is a alert component
      </div>
    )
  }
})
