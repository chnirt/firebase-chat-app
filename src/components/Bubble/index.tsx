export const Bubble = ({
  type = 'message',
  placement = 'left',
  content = '',
}) => {
  const isLeft = placement === 'left'
  const isMessage = type === 'message'

  if (isMessage && isLeft) {
    return (
      <div
        style={{
          marginBottom: 8,
        }}
      >
        <div
          style={{
            padding: 16,
            minHeight: 44,
            borderRadius: 22,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: '#EFEFEF',
            backgroundColor: '#FFFFFF',
          }}
        >
          {content}
        </div>
      </div>
    )
  }

  if (isMessage)
    return (
      <div
        style={{
          marginBottom: 8,
        }}
      >
        <div
          style={{
            padding: 16,
            minHeight: 44,
            borderRadius: 22,
            borderWidth: 1,
            // borderStyle: 'solid',
            backgroundColor: '#efefef',
          }}
        >
          {content}
        </div>
      </div>
    )

  return null
}
