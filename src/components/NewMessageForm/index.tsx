import { useCallback } from 'react'
import {
  Button,
  Modal,
  Form,
  Input,
  Upload,
  FormInstance,
  Row,
  Avatar,
  Typography,
  Divider,
} from 'antd'
import { IoCloseSharp } from 'react-icons/io5'

import { useAuth } from '../../context'
import { capitalizeAvatarUsername } from '../../utils'

const { Title, Text } = Typography

interface Values {
  title: string
  description: string
  modifier: string
}

interface NewMessageFormProps {
  form: FormInstance<any>
  visible: boolean
  onCreate: (values: Values) => void
  onCancel: () => void
}

export const NewMessageForm: React.FC<NewMessageFormProps> = ({
  form,
  visible,
  onCreate,
  onCancel,
}) => {
  const { user } = useAuth()

  const normFile = useCallback((e: any) => {
    // console.log('Upload event:', e)
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }, [])

  const onOk = useCallback(() => {
    form
      .validateFields()
      .then((values) => {
        onCreate(values)
      })
      .catch((info) => {
        // console.log('Validate Failed:', info)
      })
  }, [form, onCreate])

  return (
    <Modal
      // title="New message"
      style={{
        borderRadius: 8,
        overflow: 'hidden',
        paddingBottom: 0,
      }}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      centered
      title={
        <Row justify="space-between">
          <Button
            style={{
              border: 0,
              boxShadow: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            ghost
            shape="circle"
            icon={<IoCloseSharp size={24} color="#767676" />}
            onClick={onCancel}
          />
          <Title level={5}>New message</Title>
          <Button
            style={{
              color: '#1698f7',
              paddingLeft: 0,
              paddingRight: 0,
            }}
            type="link"
            // loading={submitting}
            // onClick={onSubmit}
          >
            Next
          </Button>
        </Row>
      }
      closable={false}
      footer={false}
      bodyStyle={{ padding: 0, height: '65vh' }}
    >
      <Row style={{ margin: '8px 0' }}>
        <Row
          style={{
            padding: '4px 12px',
          }}
          align="middle"
        >
          <Title level={5} style={{ margin: 0 }}>
            To:
          </Title>
        </Row>
        <Row
          style={{
            width: 'calc(100% - 80px)',
          }}
          align="middle"
        >
          <Input
            style={{
              borderWidth: 0,
            }}
            placeholder="Search..."
          />
          {/* <Select
              mode="multiple"
              showArrow
              tagRender={tagRender}
              defaultValue={['gold', 'cyan']}
              style={{ width: '100%' }}
              options={options}
            /> */}
        </Row>
      </Row>
      <Divider style={{ margin: 0 }} />
      <div
        style={{
          overflow: 'hidden auto',
          width: '100%',
          height: 'calc(100% - 48px)',
        }}
      >
        <Row style={{ margin: 16 }}>
          <Text strong> Suggested</Text>
        </Row>
        {[...Array(20)].map((user: any, ui: any) => {
          return (
            <Row key={`user-${ui}`} style={{ margin: 16 }}>
              Some contents...
            </Row>
          )
        })}
      </div>
    </Modal>
  )
}
