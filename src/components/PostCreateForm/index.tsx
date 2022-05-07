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
} from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { useAuth } from '../../context'
import { useCallback } from 'react'

const { Title } = Typography

interface Values {
  title: string
  description: string
  modifier: string
}

interface PostCreateFormProps {
  form: FormInstance<any>
  visible: boolean
  onCreate: (values: Values) => void
  onCancel: () => void
}

export const PostCreateForm: React.FC<PostCreateFormProps> = ({
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
        // form.resetFields()
        onCreate(values)
      })
      .catch((info) => {
        // console.log('Validate Failed:', info)
      })
  }, [form, onCreate])

  return (
    <Modal
      style={{
        // borderWidth: 1,
        // borderStyle: 'solid',
        borderRadius: 8,
        overflow: 'hidden',
      }}
      visible={visible}
      title="Create new post"
      okText="Share"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={onOk}
    >
      <Row
        style={{
          // padding: '14px 4px 14px 16px',
          // borderWidth: 1,
          // borderStyle: 'solid',
          // marginTop: 18,
          marginBottom: 14,
        }}
        align="middle"
      >
        <Avatar
          shape="circle"
          size={24}
          // icon={<UserOutlined color="#eeeeee" />}
          src={user?.photoURL}
          // src={
          //   'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'
          // }
        >
          {user?.username?.split(' ').map((char: string) => char.charAt(0))}
        </Avatar>
        {user?.username && (
          <Title style={{ marginLeft: '14px', marginBottom: 0 }} level={5}>
            {user?.username}
          </Title>
        )}
      </Row>

      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: 'public' }}
      >
        <Form.Item
          name="caption"
          // label="Caption"
          rules={[
            {
              required: true,
              message: 'Please input the caption of post!',
            },
          ]}
        >
          <Input
            style={{ borderWidth: 0, padding: 0 }}
            placeholder="Write a caption..."
          />
        </Form.Item>

        <Form.Item
          name="files"
          // label="Files"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          // extra="longgggggggggggggggggggggggggggggggggg"
          rules={[
            {
              required: true,
              message: 'Please input the picture of post!',
            },
          ]}
        >
          <Upload
            name="picture"
            listType="picture"
            beforeUpload={(file) => {
              const isJPG = file.type === 'image/jpeg'
              if (!isJPG) {
                // message.error('You can only upload JPG file!')
              }
              return false
            }}
            maxCount={1}
            // customRequest={customRequest}
          >
            <Button icon={<UploadOutlined />}>Select from computer</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  )
}
