import {
  createContext,
  useContext,
  useEffect,
  useState,
  FunctionComponent,
} from 'react'
// import {
//   FBSignInWithWithEmailAndPassword,
//   FBSignOut,
//   onFBAuthStateChanged,
// } from '../../config'
// import { useLoading } from '../loading'

interface IUser {
  uid: string
  email: string
  password: string
  photoURL: string
}

interface IAuthContext {
  user: IUser | null
  isAuth: boolean
  signIn: (user: IUser) => void
  signUp: () => void
  signOut: () => void
}

const defaultState = {
  user: null,
  isAuth: false,
  signIn: () => {},
  signUp: () => {},
  signOut: () => {},
}

const AuthContext = createContext<IAuthContext>(defaultState)

type AuthProviderProps = {
  children: React.ReactNode
}

const AuthProvider: FunctionComponent<AuthProviderProps> = ({
  children,
}: AuthProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null)
  // const loading = useLoading()

  // useEffect(() => {
  //   const unsubscribe = onFBAuthStateChanged((fBUser: any) => {
  //     setUser(fBUser)
  //   })
  //   return unsubscribe
  // }, [])

  const value = {
    user,
    isAuth: !!user,
    signIn: async (userInput: IUser) => {
      // loading.show()
      // try {
      //   await FBSignInWithWithEmailAndPassword(
      //     userInput.email,
      //     userInput.password
      //   )
      // } catch (error) {
      //   console.log(error)
      // } finally {
      //   loading.hide()
      // }
    },
    signUp: () => {},
    signOut: async () => {
      // loading.show()
      // try {
      //   await FBSignOut()
      // } catch (error) {
      //   console.log(error)
      // } finally {
      //   loading.hide()
      // }
    },
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuth = () => useContext(AuthContext)

export { useAuth }

export default AuthProvider
