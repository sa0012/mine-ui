import Vue from 'vue'

export { createNamespace } from './create'

export const isServer: boolean = Vue.prototype.$isServer;

export function noop () {}

export function isDef (value: any): boolean {
  return value !== undefined && value !== null;
}

export function isFunc (fn: Function): boolean {
  return fn && typeof fn === 'function'
}

export function isObj (x: any): boolean {
  const type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

export function isEmptyObj (obj: object): boolean {
  if (!isObj(obj)) return false
  return !!(Object.getOwnPropertyNames(obj).length)
}

export function isString (str: string): boolean {
  return !!(typeof str === 'string')
}

export const isArray = <array>(array: array) => Array.isArray(array)

export function get (object: any, path: string): any {
  const keys = path.split('.');
  let result = object;

  keys.forEach(key => {
    result = isDef(result[key]) ? result[key] : '';
  });

  return result;
}

export function isAndroid (): boolean {
  /* istanbul ignore next */
  return /android/.test(navigator.userAgent.toLowerCase());
}

export function isIOS (): boolean {
  /* istanbul ignore next */
  return /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());
}
