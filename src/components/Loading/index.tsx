import { FunctionComponent } from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

interface ILoadingProps {
  spinning?: boolean
}

const Loading: FunctionComponent<ILoadingProps> = ({
  spinning = false,
  children,
}) => {
  if (typeof children === 'undefined')
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#ffffff70',
        }}
      >
        <Spin indicator={antIcon} />
      </div>
    )

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

export { Loading }
