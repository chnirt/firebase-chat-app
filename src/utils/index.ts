import { notification } from 'antd'

export const handleError = (error: any) => {
  notification['error']({
    message: error.code,
    description: error.message,
    onClick: () => {
      console.log('Notification Clicked!')
    },
    placement: 'bottomRight',
  })
}

export const capitalizeFirstLetter = (value: string) => {
  return value.charAt(0).toUpperCase()
}

export const capitalizeAvatarUsername = (value: string) => {
  return value.split(' ').map((char: string) => capitalizeFirstLetter(char))
}
