import {
  createContext,
  useContext,
  useState,
  FunctionComponent,
  useMemo,
} from 'react'
import { Loading } from '../../components'

interface ILoadingContext {
  count: number
  show: () => void
  hide: () => void
}

const defaultState = {
  count: 0,
  show: () => {},
  hide: () => {},
}

const LoadingContext = createContext<ILoadingContext>(defaultState)

interface ILoadingProviderProps {}

const LoadingProvider: FunctionComponent<ILoadingProviderProps> = ({
  children,
}) => {
  const [count, setCount] = useState(0)

  const value = useMemo(
    () => ({
      count,
      show: () => {
        setCount((prevState) => prevState + 1)
      },
      hide: () => {
        setCount((prevState) => Math.max(prevState - 1, 0))
      },
    }),
    [count]
  )

  return (
    <LoadingContext.Provider value={value}>
      <Loading spinning={count > 0}>{children}</Loading>
    </LoadingContext.Provider>
  )
}

export const useLoading = () => useContext(LoadingContext)

export default LoadingProvider
