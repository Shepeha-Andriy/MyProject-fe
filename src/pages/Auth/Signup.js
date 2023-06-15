import React from 'react'
import jwt_decode from 'jwt-decode'
import { GoogleLogin } from '@react-oauth/google';

export default function Signup() {

  const testdispatch = (t) => {
    return t
  }

  const googleSuccess = (credential) => {
    console.log(credential)
    console.log(jwt_decode(credential.credential))
    const decodedCredential = jwt_decode(credential.credential)
    
    testdispatch({
      username: decodedCredential.name,
      email: decodedCredential.email,
      googleId: decodedCredential.sub,
      token: credential.credential
    })
  }

  return (
    <div>
      <form>
        <input type='text'></input>
        <input type='text'></input>
        <input type='email'></input>
        <input type='password'></input>

        <button type='submit'>Sign Up</button>
      </form>

      <GoogleLogin
        onSuccess={googleSuccess}
        onError={() => {
          console.log('Login Failed');
        }}
        // theme='filled_black'
      >
      </GoogleLogin>

    </div>
  )
}
