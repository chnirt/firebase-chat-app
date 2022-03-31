import React, { Suspense } from 'react'
// import ReactDOM from 'react-dom'
import * as ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import AuthProvider from './context/auth'
import { Loading } from './components/Loading'
import LoadingProvider from './context/loading'

// ReactDOM.render(
//   <React.StrictMode>
//     <Router>
//       <LoadingProvider>
//         <AuthProvider>
//           <Suspense fallback={<Loading />}>
//             <App />
//           </Suspense>
//         </AuthProvider>
//       </LoadingProvider>
//     </Router>
//   </React.StrictMode>,
//   document.getElementById('root')
// )

const container = document.getElementById('root')
if (!container) throw new Error('Failed to find the root element')
const root = ReactDOM.createRoot(container)
root.render(
  <Router>
    <LoadingProvider>
      <AuthProvider>
        <Suspense fallback={<Loading />}>
          <App />
        </Suspense>
      </AuthProvider>
    </LoadingProvider>
  </Router>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
