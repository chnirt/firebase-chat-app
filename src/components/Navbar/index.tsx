import { Avatar, Badge, Button, Col, Dropdown, Menu, Row } from 'antd'
import { CgBookmark, CgProfile } from 'react-icons/cg'
import {
  IoChatbubbleEllipsesOutline,
  IoHomeOutline,
  IoSettingsOutline,
} from 'react-icons/io5'
import { useAuth } from '../../context'
import { ReactComponent as Logo } from '../../assets/logo/logo-standard.svg'
import { MyAutoComplete } from '../AutoComplete'
import { AiOutlineCompass, AiOutlinePlusSquare } from 'react-icons/ai'
import { FiHeart } from 'react-icons/fi'
import { UserOutlined } from '@ant-design/icons'
import { signOut } from 'firebase/auth'

export const MyNavbar = ({ handleCreatePost = () => {} }) => {
  const auth = useAuth()

  const handleMenuClick = (e: any) => {
    switch (e.key) {
      case '4':
        return handleSignOut()
      default:
        return null
    }
  }

  const handleSignOut = () => {
    try {
      auth.signOut()
    } catch (error) {}
  }

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
            <Logo
              width={(29 * 938) / 264}
              height={29}
              // fill={PRIMARY_COLOR}
            />
          </Col>

          <Col xs={0} sm={8}>
            <MyAutoComplete />
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
              onClick={async () => {
                await auth.signOut()
              }}
            />
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
    </Row>
  )
}
