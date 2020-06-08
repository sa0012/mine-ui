const camelizeRE = /-(\w)/g

/**
 * @name 将字符串 （component-name） 格式化为 componentName 驼峰命名
 * @param str 
 * @return string
 */
export function camelize(str: string): string {
  return str.replace(camelizeRE, (_, c) => c.toUpperCase())
}
