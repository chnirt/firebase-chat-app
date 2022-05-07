import {
  createContext,
  useContext,
  useEffect,
  useState,
  FunctionComponent,
  useMemo,
  useCallback,
} from 'react'
import {
  onAuthStateChanged,
  User,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import _ from 'lodash'
import { useLoading } from '../loading'
import { auth, getUserFromFirestore, saveUserToFirestore } from '../../firebase'
import { handleError } from '../../utils'

interface ISignInUser {
  email: string
  password: string
}

interface ISignUpUser extends ISignInUser {
  username: string
  fullName: string
}

interface IUser extends User {
  username?: string
  fullName?: string
}

interface IAuthContext {
  user: IUser | null
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
  const [user, setUser] = useState<IUser | null>(null)
  const loading = useLoading()

  const fetchUser = useCallback(
    async (fbUser: User) => {
      try {
        loading.show()
        const foundUser: any = await getUserFromFirestore(fbUser.uid)
        setUser({ ...fbUser, ...foundUser })
      } catch (error) {
      } finally {
        loading.hide()
      }
    },
    [loading]
  )

  const debounceFetchUser = _.debounce(fetchUser, 1000)

  useEffect(() => {
    onAuthStateChanged(
      auth,
      async (fbUser) => {
        if (fbUser) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          // const uid = user.uid
          if (user === null) {
            // const foundUser = await getUserFromFirestore(fbUser.uid)
            debounceFetchUser(fbUser)
          }
          // ...
        } else {
          // User is signed out
          // ...
        }
      },
      (error) => {
        handleError(error)
      },
      () => {}
    )
  }, [user, debounceFetchUser])

  const value = useMemo(
    () => ({
      user,
      isAuth: !!user,
      signIn: async (userInput: ISignInUser) => {
        loading.show()
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
          loading.hide()
        }
      },
      signUp: async (userInput: ISignUpUser) => {
        loading.show()
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
          loading.hide()
        }
      },
      signOut: async () => {
        loading.show()
        try {
          await signOut(auth)
          setUser(null)
        } catch (error) {
          handleError(error)
        } finally {
          loading.hide()
        }
      },
    }),
    [user, loading]
  )
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

export default AuthProvider
