const data1 = {
  '浙江': ['杭州', '宁波', '温州', '杭州'],
  '上海': ['黄浦区', '静安区', '长宁区', '徐汇区']
}
export const data = data1
export const mock = [
  {
    values: Object.keys(data1)
  },
  {
    values: data1['浙江']
  }
]