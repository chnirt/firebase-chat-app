import { Form } from 'antd'
import {
  createContext,
  useContext,
  useState,
  FunctionComponent,
  useMemo,
} from 'react'

interface IModalContext {
  form: any
  visible: boolean
  show: () => void
  hide: () => void
}

const defaultState = {
  form: {},
  visible: false,
  show: () => {},
  hide: () => {},
}

const ModalContext = createContext<IModalContext>(defaultState)

interface IModalProviderProps {}

const ModalProvider: FunctionComponent<IModalProviderProps> = ({
  children,
}) => {
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)

  const value = useMemo(
    () => ({
      form,
      visible,
      show: () => setVisible(true),
      hide: () => setVisible(false),
    }),
    [form, visible]
  )

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

export const useModal = () => useContext(ModalContext)

export default ModalProvider
