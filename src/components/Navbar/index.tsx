import { useCallback } from 'react'
import { Avatar, Badge, Button, Col, Dropdown, Menu, Popover, Row } from 'antd'
import { CgBookmark, CgProfile } from 'react-icons/cg'
import {
  IoChatbubbleEllipsesOutline,
  IoHomeOutline,
  IoSettingsOutline,
} from 'react-icons/io5'
import { AiOutlineCompass, AiOutlinePlusSquare } from 'react-icons/ai'
import { FiHeart, FiLogOut } from 'react-icons/fi'
import { UserOutlined } from '@ant-design/icons'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'

import { MyAutoComplete } from '../AutoComplete'
import { useAuth, useLoading, useModal } from '../../context'
import { ReactComponent as Logo } from '../../assets/logo/logo-standard.svg'
import { modalState } from '../../atoms'
import { PostCreateForm } from '../PostCreateForm'
import { savePostToFirestore } from '../../firebase'

export const MyNavbar = () => {
  const loading = useLoading()
  const auth = useAuth()
  const modal = useModal()
  const navigate = useNavigate()

  const handleMenuClick = (e: any) => {
    switch (e.key) {
      case '4':
        return handleSignOut()
      default:
        return null
    }
  }

  const handleCreatePost = useCallback(() => modal.show(), [])

  const onCreate = useCallback(async (values: any) => {
    loading.show()
    // console.log('Received values of form: ', values)
    try {
      await savePostToFirestore(values)
    } catch (error) {
    } finally {
      modal.hide()
      modal.form.resetFields()
      loading.hide()
    }
  }, [])

  const onCancel = useCallback(() => modal.hide(), [])

  const handleSignOut = useCallback(async () => {
    try {
      await auth.signOut()
    } catch (error) {}
  }, [])

  const navigateHome = useCallback(() => {
    navigate('/home')
  }, [navigate])

  const navigateChat = useCallback(() => {
    navigate('/chat')
  }, [navigate])

  const items = [
    {
      key: '0',
      label: 'Profile',
      icon: <CgProfile size={16} />,
    },
    {
      key: '1',
      label: 'Saved',
      icon: <CgBookmark size={16} />,
    },
    {
      key: '2',
      label: 'Setting',
      icon: <IoSettingsOutline size={16} />,
    },
    {
      key: '3',
      type: 'divider',
    },
    {
      key: '4',
      label: 'Log Out',
    },
  ]

  const menu = (
    <Menu
    // items={[
    //   {
    //     label: <a href="https://www.antgroup.com">1st menu item</a>,
    //     key: '0',
    //   },
    //   {
    //     label: <a href="https://www.aliyun.com">2nd menu item</a>,
    //     key: '1',
    //   },
    //   {
    //     type: 'divider',
    //   },
    //   {
    //     label: '3rd menu item',
    //     key: '3',
    //   },
    // ]}
    />
  )

  // const menu = (
  //   <Menu
  //     style={{
  //       width: '200px',
  //     }}
  //     onClick={handleMenuClick}
  //     items={items}
  //   >
  //     <Menu.Item key={1} icon={<CgProfile size={16} />}>
  //       Profile
  //     </Menu.Item>
  //     <Menu.Item key={2} icon={<CgBookmark size={16} />}>
  //       Saved
  //     </Menu.Item>
  //     <Menu.Item key={3} icon={<IoSettingsOutline size={16} />}>
  //       Setting
  //     </Menu.Item>
  //     <Menu.Divider />
  //     <Menu.Item key={4}>Log Out</Menu.Item>
  //   </Menu>
  // )

  const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  )

  return (
    <Row
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        borderBottom: '1px solid #dbdbdb',
        position: 'fixed',
        top: 0,
        background: '#fff',
        zIndex: 1,
      }}
    >
      <Row
        style={{
          height: 60,
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'center',
          maxWidth: 975,
          width: '100%',
        }}
        justify="center"
        align="middle"
      >
        <Col
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
          // span={18}
          xs={24}
          sm={24}
          // md={18}
          // lg={24}
          // xl={24}
        >
          <Col
            style={
              {
                // borderWidth: 1,
                // borderStyle: 'solid',
              }
            }
            xs={8}
          >
            <Button
              style={{
                border: 0,
                boxShadow: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
              }}
              ghost
              onClick={navigateHome}
            >
              <Logo
                width={(29 * 938) / 264}
                height={29}
                // fill={PRIMARY_COLOR}
              />
            </Button>
          </Col>

          <Col xs={0} sm={8}>
            {/* <MyAutoComplete /> */}
          </Col>

          <Col
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingLeft: '24px',
            }}
            xs={16}
            sm={8}
          >
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
              icon={<IoHomeOutline size={24} color="#767676" />}
              onClick={navigateHome}
            />
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
              icon={
                <Badge count={9} overflowCount={99}>
                  <IoChatbubbleEllipsesOutline size={24} color="#767676" />
                </Badge>
              }
              onClick={navigateChat}
            />
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
              icon={<AiOutlinePlusSquare size={24} color="#767676" />}
              onClick={handleCreatePost}
            />
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
              icon={<AiOutlineCompass size={24} color="#767676" />}
            />
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
              icon={<FiHeart size={24} color="#767676" />}
            />
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
              icon={<FiLogOut size={24} color="#767676" />}
              onClick={handleSignOut}
            />
            {/* <Popover content={content} title="Title" trigger="hover">
              <Button>Hover me</Button>
            </Popover> */}
            {/* <Dropdown
              overlay={menu}
              placement="bottomRight"
              arrow={{ pointAtCenter: true }}
              trigger={['click']}
            >
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
              >
                <Avatar
                  shape="circle"
                  size={24}
                  icon={<UserOutlined color="#eeeeee" />}
                  src={
                    'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'
                  }
                />
              </Button>
            </Dropdown> */}
          </Col>
        </Col>
      </Row>

      <PostCreateForm
        form={modal.form}
        visible={modal.visible}
        onCreate={onCreate}
        onCancel={onCancel}
      />
    </Row>
  )
}
