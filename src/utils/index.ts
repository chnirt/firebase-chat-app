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
