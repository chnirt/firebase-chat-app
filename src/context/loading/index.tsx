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

interface LoadingProviderProps {}

const LoadingProvider: FunctionComponent<LoadingProviderProps> = ({
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
      {/* {count > 0 && <Loading />} */}
      {children}
    </LoadingContext.Provider>
  )
}

const useLoading = () => useContext(LoadingContext)

export { useLoading }

export default LoadingProvider
