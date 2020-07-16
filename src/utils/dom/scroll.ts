import { isIOS } from '../index'
type ScrollElement = HTMLElement | Window

export const getScrollTop = (): number => {
  return window.pageYOffset !== undefined
        ? window.pageYOffset
        : (document.documentElement || document.body.parentNode || document.body).scrollTop
}

export const calcTotalScrollTop = (el: any): number => {
  if (!el) return 0
  return (<HTMLElement>el).offsetTop + calcTotalScrollTop((<HTMLElement>el).offsetParent)
}

export function setScrollTop (element: ScrollElement, value: number) {
  'scrollTop' in element ? (element.scrollTop = value) : element.scrollTo(element.scrollX, value);
}

export function setRootScrollTop (value: number) {
  setScrollTop(window, value)
  setScrollTop(document.body, value)
}

export function resetScroll() {
  if (isIOS()) {
    setRootScrollTop(getScrollTop())
  }
}
