import {
  createContext,
  useContext,
  useEffect,
  useState,
  FunctionComponent,
} from 'react'
import {
  onAuthStateChanged,
  User,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { useLoading } from '../loading'
import { auth, saveUserToFirestore } from '../../firebase'
import { handleError } from '../../utils'

interface ISignInUser {
  email: string
  password: string
}

interface ISignUpUser extends ISignInUser {
  username: string
  fullName: string
}

interface IAuthContext {
  user: ISignInUser | User | null
  isAuth: boolean
  signIn: (user: ISignInUser) => void
  signUp: (user: ISignUpUser) => void
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
  const [user, setUser] = useState<ISignInUser | User | null>(null)
  const { show, hide } = useLoading()

  useEffect(() => {
    show()
    onAuthStateChanged(
      auth,
      async (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          // const uid = user.uid
          setUser(user)
          // ...
        } else {
          // User is signed out
          // ...
        }
        hide()
      },
      (error) => {
        handleError(error)
        hide()
      },
      () => {
        hide()
      }
    )
  }, [user, show, hide])

  const value = {
    user,
    isAuth: !!user,
    signIn: async (userInput: ISignInUser) => {
      show()
      try {
        const { email, password } = userInput
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        )
        setUser(userCredential.user)
      } catch (error) {
        handleError(error)
      } finally {
        hide()
      }
    },
    signUp: async (userInput: ISignUpUser) => {
      show()
      try {
        const { fullName, email, username, password } = userInput
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        )
        if (userCredential) {
          await updateProfile(userCredential.user, {
            displayName: fullName,
            // photoURL: 'https://example.com/jane-q-user/profile.jpg',
          })
          await saveUserToFirestore({
            uid: userCredential.user.uid,
            fullName,
            email,
            username,
          })
          setUser(userCredential.user)
        }
      } catch (error) {
        handleError(error)
      } finally {
        hide()
      }
    },
    signOut: async () => {
      show()
      try {
        await signOut(auth)
        setUser(null)
      } catch (error) {
        handleError(error)
      } finally {
        hide()
      }
    },
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

export default AuthProvider
