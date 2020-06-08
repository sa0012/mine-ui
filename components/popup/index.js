import { createNamespace, isDef } from '../../src/utils'

const [createComponent, bem] = createNamespace('popup')

export default createComponent({
  props: {
    round: Boolean,
    duration: Number,
    closeable: Boolean,
    transition: String,
    safeAreaInsetBottom: Boolean,
    closeIcon: {
      type: String,
      default: 'cross'
    },
    closeIconPosition: {
      type: String,
      default: 'top-right'
    },
    position: {
      type: String,
      default: 'center'
    },
    overlay: {
      type: Boolean,
      default: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    }
  },

  beforeCreate () {
    const createEmitter = eventName => event => this.$emit(eventName, event)

    this.onClick = createEmitter('click')
    this.onOpened = createEmitter('opened')
    this.onClosed = createEmitter('closed')
  },

  render () {
    const { round, position, duration } = this

    const transitionName =
      this.transition ||
      (position === 'center' ? 'ml-fade' : `ml-popup-slide-${position}`)

    const style = {}
    if (isDef(duration)) {
      style.transitionDuration = `${duration}s`
    }

    return (
      <transition
        name={transitionName}
        onAfterEnter={this.onOpened}
        onAfterLeave={this.onClosed}
      >
        <div
          style={style}
          class={bem({
            round,
            [position]: position,
            'safe-area-inset-bottom': this.safeAreaInsetBottom
          })}
          onClick={this.onClick}
        >
          {this.slots()}
          this is a popup component
        </div>
      </transition>
    )
  }
})
