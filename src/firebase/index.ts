// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
}

// Initialize Firebase
// export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
export const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)
export const auth = getAuth(app)
export const db = getFirestore(app)
// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(app)

export const saveUserToFirestore = async (userInput: any) => {
  try {
    const userData = {
      fullName: userInput.fullName,
      email: userInput.email,
      username: userInput.username,
      createdAt: serverTimestamp(),
    }
    const docRef = await setDoc(doc(db, 'users', userInput.uid), userData)
    // const docRef = await addDoc(collection(db, 'users'), userData)
    return docRef
  } catch (error) {}
}

export const getUsersFromFirestore = async (email?: string) => {
  const q = query(
    collection(db, 'users'),
    where('email', '!=', auth!.currentUser!.email),
    ...(email ? [where('email', '==', email)] : []),
    limit(10)
  )
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
  })
  const users = querySnapshot.docs.map((docSnapshot) => ({
    id: docSnapshot.id,
    ...docSnapshot.data(),
  }))
  return users
}

export const getUserFromFirestore = async (userId: string) => {
  try {
    const userDocRef = doc(db, 'users', userId)
    const userDocSnap = await getDoc(userDocRef)
    if (!userDocSnap.exists()) {
      console.log('No such document!')
      return
    }
    return userDocSnap.data()
  } catch (error) {}
}

// Upload the file and metadata
export const uploadFile = async (file: any, url = '') => {
  const storageRef = ref(storage, `${url}/${file.name}`)
  const snapshot = await uploadBytes(storageRef, file)
  const downloadURL = await getDownloadURL(snapshot.ref)
  return downloadURL
}

export const savePostToFirestore = async (postInput: any) => {
  try {
    const { caption, files } = postInput
    const user: any = await getUserFromFirestore(auth!.currentUser!.uid)
    // const userDocRef = doc(db, 'users', auth!.currentUser!.uid)
    // const userDocSnap = await getDoc(userDocRef)
    // if (!userDocSnap.exists()) {
    //   console.log('No such document!')
    //   return
    // }
    const postData = {
      caption,
      userId: auth!.currentUser!.uid,
      avatar: auth!.currentUser!.photoURL,
      fullName: user.fullName,
      username: user.username,
      createdAt: serverTimestamp(),
    }
    const docRef = await addDoc(collection(db, 'posts'), postData)

    const downloadURL = await uploadFile(
      files[0].originFileObj,
      `posts/${docRef.id}/files`
    )
    const postDocRef = doc(db, 'posts', docRef.id)
    await updateDoc(postDocRef, {
      files: [downloadURL],
    })

    return docRef
  } catch (error) {}
}

export const onSnapshotPosts = (nextOrObserver: any) => {
  const q = query(
    collection(db, 'posts'),
    orderBy('createdAt', 'desc'),
    limit(10)
  )
  return onSnapshot(q, nextOrObserver)
}

export const saveLikeToFirestore = async (likeInput: any) => {
  try {
    const { postId } = likeInput
    const postData = {
      postId,
      userId: auth!.currentUser!.uid,
      createdAt: serverTimestamp(),
    }
    const docRef = await addDoc(collection(db, 'likes'), postData)
    const newLike = {
      ...postData,
      id: docRef.id,
    }
    return newLike
  } catch (error) {}
}

export const onSnapshotLikes = (postId: string, nextOrObserver: any) => {
  const q = query(
    collection(db, 'likes'),
    where('postId', '==', postId),
    orderBy('createdAt', 'desc'),
    limit(10)
  )
  return onSnapshot(q, nextOrObserver)
}

export const deleteLikeFromFirestore = async (likeInput: any) => {
  try {
    const { id } = likeInput
    await deleteDoc(doc(db, 'likes', id))
  } catch (e) {}
}

export const saveCommentToFiretore = async (commentInput: any) => {
  try {
    const user: any = await getUserFromFirestore(auth!.currentUser!.uid)
    // const userDocRef = doc(db, 'users', auth!.currentUser!.uid)
    // const userDocSnap = await getDoc(userDocRef)
    // if (!userDocSnap.exists()) {
    //   console.log('No such document!')
    //   return
    // }

    const commentData = {
      userId: auth!.currentUser!.uid,
      avatar: auth!.currentUser!.photoURL,
      username: user.username,
      content: commentInput.content,
      createdAt: serverTimestamp(),
    }
    const docRef = await addDoc(
      collection(db, `posts/${commentInput.postId}/comments`),
      commentData
    )
    const newComment = {
      ...commentData,
      id: docRef.id,
    }
    return newComment
  } catch (error) {}
}

export const onSnapshotComments = (postId: string, nextOrObserver: any) => {
  const q = query(
    collection(db, `posts/${postId}/comments`),
    orderBy('createdAt', 'desc'),
    limit(10)
  )
  return onSnapshot(q, nextOrObserver)
}
