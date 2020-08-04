export const splitDate = date => {
  if (typeof date !== 'string' || !date) return {}
  const str = date.split(' ')
  return {
    hms: str[1],
    ymd: str[0]
  }
}
