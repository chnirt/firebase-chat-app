import { createContext, useContext, useState, FunctionComponent } from 'react'
import { Loading } from '../../components'

interface ILoadingContext {
  show: () => void
  hide: () => void
}

const defaultState = {
  show: () => {},
  hide: () => {},
}

const LoadingContext = createContext<ILoadingContext>(defaultState)

interface ILoadingProviderProps {}

const LoadingProvider: FunctionComponent<ILoadingProviderProps> = ({
  children,
}) => {
  const [count, setCount] = useState(0)

  const value = {
    count,
    show: () => {
      setCount((prevState) => prevState + 1)
    },
    hide: () => {
      setCount((prevState) => Math.max(prevState - 1, 0))
    },
  }

  return (
    <LoadingContext.Provider value={value}>
      <Loading spinning={count > 0}>{children}</Loading>
    </LoadingContext.Provider>
  )
}

export const useLoading = () => useContext(LoadingContext)

export default LoadingProvider
