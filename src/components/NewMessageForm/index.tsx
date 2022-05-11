import { useCallback, useEffect, useState } from 'react'
import {
  Button,
  Modal,
  Input,
  FormInstance,
  Row,
  Typography,
  Divider,
  Form,
  Radio,
} from 'antd'
import { IoCloseSharp } from 'react-icons/io5'

import { User } from '../User'
import { getUsersFromFirestore } from '../../firebase'

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
  const [users, setUsers] = useState<any>([])

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUsersFromFirestore()
      setUsers(data)
    }

    fetchUser()
  }, [])

  const handleSelectUser = useCallback((email: string) => {
    setUsers((prevState: any) =>
      prevState.map((user: any) =>
        user.email === email
          ? { ...user, isChecked: !user.isChecked }
          : { ...user, isChecked: false }
      )
    )
  }, [])

  const onOk = useCallback(() => {
    form
      .validateFields()
      .then((values) => {
        console.log(values)
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
            // onClick={handleCreateChat}
            onClick={onOk}
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
          <Text strong>Suggested</Text>
        </Row>
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{}}
        >
          <Form.Item name="userId">
            <Radio.Group
              style={{ borderWidth: 0 }}
              onChange={(e) => {
                const email = e.target.value
                handleSelectUser(email)
              }}
            >
              {users.length > 0 &&
                users.map((user: any, ui: number) => {
                  return (
                    <Radio.Button
                      key={`user-${ui}`}
                      style={{
                        paddingLeft: 0,
                        paddingRight: 0,
                        borderWidth: 0,
                        width: '100%',
                      }}
                      type="link"
                      value={user.email}
                    >
                      <User key={`user-${ui}`} user={user} />
                    </Radio.Button>
                  )
                })}
            </Radio.Group>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  )
}
