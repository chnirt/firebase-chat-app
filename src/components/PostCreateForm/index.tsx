import { Button, Modal, Form, Input, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

interface Values {
  title: string
  description: string
  modifier: string
}

interface PostCreateFormProps {
  visible: boolean
  onCreate: (values: Values) => void
  onCancel: () => void
}

export const PostCreateForm: React.FC<PostCreateFormProps> = ({
  visible,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm()

  const normFile = (e: any) => {
    // console.log('Upload event:', e)
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }

  const onOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields()
        onCreate(values)
      })
      .catch((info) => {
        // console.log('Validate Failed:', info)
      })
  }

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
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={onOk}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: 'public' }}
      >
        <Form.Item
          name="caption"
          label="Caption"
          rules={[
            {
              required: true,
              message: 'Please input the caption of post!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="files"
          label="Files"
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
            // customRequest={customRequest}
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  )
}
