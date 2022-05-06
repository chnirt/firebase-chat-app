const isDev = process.env.NODE_ENV === 'development'

export const signInAccount = {
  emailOrYourPhoneNumber: isDev ? 'trinhchinchin@gmail.com' : '',
  password: isDev ? 'Admin@123' : '',
  remember: false,
}

export const signUpAccount = {
  fullName: isDev ? 'Trịnh Chin Chin' : '',
  emailOrYourPhoneNumber: isDev ? 'trinhchinchin@gmail.com' : '',
  username: isDev ? 'trinhchinchin' : '',
  password: isDev ? 'Admin@123' : '',
}
