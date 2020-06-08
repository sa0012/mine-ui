import configData from '@/config'

export const config = (key, val) => key ? configData[val][key] : ''
