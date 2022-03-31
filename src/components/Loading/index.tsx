import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

export function Loading({ spinning = true, children = {} }) {
  // if (!children) {
  return <div>Loading...</div>
  return (
    <Spin
      style={
        {
          // position: 'fixed',
          // top: '50%',
          // left: '50%',
        }
      }
      // spinning={spinning}
      indicator={antIcon}
    />
  )
  // }
  return (
    <Spin
      style={{ maxHeight: '100vh' }}
      spinning={spinning}
      indicator={antIcon}
    >
      {children}
    </Spin>
  )
}
