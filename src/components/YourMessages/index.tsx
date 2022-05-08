import { Button, Empty, Typography } from 'antd'
const { Title, Text } = Typography

export const YourMessages = ({ handleNewMessage = () => {} }) => {
  return (
    <Empty
      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      imageStyle={{
        height: 60,
      }}
      description={
        <div>
          <Title level={4}>Your Messages</Title>
          <Text type="secondary">
            Send private photos and messages to a friend or group.
          </Text>
        </div>
      }
    >
      <Button
        type="primary"
        style={{
          backgroundColor: '#0095f6',
          borderColor: '#0095f6',
          borderRadius: 4,
        }}
        onClick={handleNewMessage}
      >
        Send Message
      </Button>
    </Empty>
  )
}
