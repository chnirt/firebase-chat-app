import { Suspense } from 'react'
// import ReactDOM from 'react-dom'
import * as ReactDOMClient from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Loading } from './components/Loading'
import AuthProvider from './context/auth'
import LoadingProvider from './context/loading'
import I18nProvider from './context/i18n'

// ReactDOM.render(
//   <React.StrictMode>
//     <Router>
//       <LoadingProvider>
//         <AuthProvider>
//           <Suspense fallback={<Loading />}>
//             <I18nProvider>
//               // <App />
//             </I18nProvider>
//           </Suspense>
//         </AuthProvider>
//       </LoadingProvider>
//     </Router>
//   </React.StrictMode>,
//   document.getElementById('root')
// )

const container = document.getElementById('root')
if (!container) throw new Error('Failed to find the root element')
const root = ReactDOMClient.createRoot(container)
root.render(
  <Router>
    <LoadingProvider>
      <AuthProvider>
        <Suspense fallback={<Loading />}>
          <I18nProvider>
            <App />
          </I18nProvider>
        </Suspense>
      </AuthProvider>
    </LoadingProvider>
  </Router>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
