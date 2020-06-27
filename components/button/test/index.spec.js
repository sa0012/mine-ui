import { mount } from '@vue/test-utils'
import Button from '..'

test('size', () => {
  const wrapper = mount(Button, {
    propsData: {
      size: 'large'
    }
  })
  expect(wrapper).toMatchSnapshot()
})

test('click event', () => {
  const onClick = jest.fn()
  const wrapper = mount(Button, {
    context: {
      on: {
        click: onClick
      }
    }
  })

  wrapper.trigger('click')
  expect(onClick).toHaveBeenCalled()
})

test('disabled is not trigger click event', () => {
  const onClick = jest.fn()
  const wrapper = mount(Button, {
    propsData: {
      disabled: true
    },
    context: {
      on: {
        click: onClick
      }
    }
  })

  wrapper.trigger('click')
  expect(onClick).toHaveBeenCalledTimes(0)
})
