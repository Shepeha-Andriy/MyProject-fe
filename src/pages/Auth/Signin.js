import React from 'react'
import jwt_decode from 'jwt-decode'
import { GoogleLogin } from '@react-oauth/google';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form'

export default function Signin() {
  const { register, formState: { errors, isValid }, handleSubmit, reset } = useForm({
    mode: 'onBlur'
  })
  const { t } = useTranslation();

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

  const handleSubmit2 = (data) => {
    try {
      const { email, password} = data
      testdispatch({ email, password })
      reset()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <form onSubmit={e => e.preventDefault()} className="">

        <label className="">
          {/* Email: */}
          <input placeholder="Email" type='email' {...register('email', {
            required: 'email is required',
            // minLength: {value: 5, message: 'min length is 5'}
          })}
            className=""
          ></input>
          <div style={{marginTop: '3px'}}>
            {errors?.email && <p>{ errors?.email?.message }</p>}
          </div>
        </label>

        <label className="">
          {/* Password: */}
          <input placeholder="Password" type='password' {...register('password', {
            required: 'password is required',
            minLength: {value: 4, message: 'min length is 4'}
          })}
            className=""
          ></input>
          <div style={{marginTop: '3px'}}>
            {errors?.password && <p>{ errors?.password?.message }</p>}
          </div>
        </label>

        <button type='submit' onClick={handleSubmit(handleSubmit2)}>{ t('sign_in') }</button>
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
