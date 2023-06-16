import React from 'react'
import jwt_decode from 'jwt-decode'
import { GoogleLogin } from '@react-oauth/google';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { userSignIn, userGoogleAuth } from '../../redux/slices/userSlice'
import { Link } from 'react-router-dom';
import './signin.scss'

export default function Signin() {
  const { register, formState: { errors, isValid }, handleSubmit, reset } = useForm({mode: 'onBlur'})
  const { t } = useTranslation();
  const dispatch = useDispatch()

  const googleSuccess = (credential) => {
    const decodedCredential = jwt_decode(credential.credential)
    
    dispatch(userGoogleAuth({
      username: decodedCredential.name,
      email: decodedCredential.email,
      googleId: decodedCredential.sub,
      token: credential.credential
    }))
  }

  const handleSignIn = (data) => {
    try {
      const { email, password } = data
      dispatch(userSignIn({ email, password }))
      reset()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='iwraper'>
      <form onSubmit={e => e.preventDefault()} className="iform">

        <label className="iform__label">
          {/* Email: */}
          <input placeholder="Email" type='email' {...register('email', {
            required: 'email is required',
            // minLength: {value: 5, message: 'min length is 5'}
          })}
            className="iform__input"
            style={errors?.email ? {marginTop: '0'} : {marginTop: '20px'}}
          ></input>
          <div style={{marginTop: '3px'}}>
            {errors?.email && <p className='iform__err'>{ errors?.email?.message }</p>}
          </div>
        </label>

        <label className="iform__label">
          {/* Password: */}
          <input placeholder="Password" type='password' {...register('password', {
            required: 'password is required',
            minLength: {value: 1, message: 'min length is 4'}
          })}
            className="iform__input"
            style={errors?.password ? {marginTop: '0'} : {marginTop: '20px'}}
          ></input>
          <div style={{marginTop: '3px'}}>
            {errors?.password && <p className='iform__err iform__err--l'>{ errors?.password?.message }</p>}
          </div>
        </label>

        <div>
          <button type='submit' onClick={handleSubmit(handleSignIn)} className='iform__btn'>{t('sign_in')}</button>
          <span>Don't have an account?<Link to={'/signup'}> Create account</Link></span>
        </div>
      </form>

      <div className='googleBtn'>
        <GoogleLogin
          onSuccess={googleSuccess}
          onError={() => {
            console.log('Login Failed');
          }}
          // theme='filled_black'
        >
        </GoogleLogin>
      </div>

    </div>
  )
}
