import React, { useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import { GoogleLogin } from '@react-oauth/google';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { userSignIn, userGoogleAuth } from '../../redux/slices/userSlice'
import { Link, useNavigate } from 'react-router-dom';
import { checkTheme } from '../../components/DarkMode/DarkMode';
import { FaHome } from "react-icons/fa";
import './signin.scss'

export default function Signin() {
  const { register, formState: { errors, isValid }, handleSubmit, reset } = useForm({mode: 'onSubmit'})
  const { t } = useTranslation();
  const { user, message } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const googleSuccess = (credential) => {
    const decodedCredential = jwt_decode(credential.credential)
    
    dispatch(userGoogleAuth({
      username: decodedCredential.name,
      email: decodedCredential.email,
      googleId: decodedCredential.sub,
      token: credential.credential
    }))

    navigate('/')
  }

  const handleSignIn = async (data) => {
    try {
      const { email, password } = data
      const res = await dispatch(userSignIn({ email, password }))//Baneblade2004k

      if (res?.payload?.data?.token) {
        reset()
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    console.log('mess',message)
    if (message) {
      message.type === 'error'
      ? toast.error(message.mess)
      : toast.success(message.mess)
    }
  }, [message])

  checkTheme()

  return (
    <div className='iwraper'>
      <form onSubmit={e => e.preventDefault()} className="iform">

        <div className='itoHome'><FaHome onClick={() => navigate('/')} size={'30px'} style={{cursor: 'pointer'}}></FaHome></div>

        <label className="iform__label">
          {/* Email: */}
          <input placeholder={t('email')} type='email' {...register('email', {
            required: t('email_is_r'),
          })}
            className="iform__input"
            style={errors?.email ? {marginTop: '0'} : {marginBottom: '20px'}}
          ></input>
          <div>
            {errors?.email && <p className='iform__err'>{ errors?.email?.message }</p>}
          </div>
        </label>

        <label className="iform__label">
          {/* Password: */}
          <input placeholder={t('password')} type='password' {...register('password', {
            required: t('password_is_r'),
            minLength: {value: 6, message: t('min_length', {length: 6})}
          })}
            className="iform__input"
            style={errors?.password ? {marginTop: '0'} : {marginBottom: '20px'}}
          ></input>
          <div>
            {errors?.password && <p className='iform__err iform__err--l'>{ errors?.password?.message }</p>}
          </div>
        </label>

        <div className='iform__btn--wraper'>
          <button type='submit' onClick={handleSubmit(handleSignIn)} className='iform__btn'>{t('sign_in')}</button>
          <span>{t('dont_have_acc')}<Link to={'/signup'} style={{textDecoration: 'none', color: 'green'}}>{ t('create_acc') }</Link></span>
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
