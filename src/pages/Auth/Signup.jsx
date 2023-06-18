import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import { userSignUp } from '../../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { checkTheme } from '../../components/DarkMode/DarkMode';
import { FaHome } from "react-icons/fa";
import './signup.scss'

export default function Signup() {
  const [isCreated, setIsCreated] = useState(false)
  const { register, formState: { errors, isValid }, handleSubmit, getValues, reset } = useForm({mode: 'onSubmit'})
  const { t } = useTranslation();
  const { user, message } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSignUp = async (data) => {
    try {
      const { firstname, lastname, email, password, confirmpassword } = data
      const res = await dispatch(userSignUp({ firstname, lastname, email, password, confirmpassword }))
      toast.error(message)
      
      if (res?.payload?.data?.token) {
        reset()
        setIsCreated(true)
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const validatePassword = (value) => {
    const confirmPassword = getValues('password');

    if (value !== confirmPassword) {
      return t('pass_d_match');
    }
    return true;
  };
  
  checkTheme()

  return (
    <div className='wraper' onClick={() => setIsCreated(false)}>
      <div className='toHome'><FaHome onClick={() => navigate('/')} size={'30px'} style={{cursor: 'pointer'}}></FaHome></div>
      {
        isCreated && (
          <div className='signup__success'>
            <span>{ t('signup_success') }</span>
          </div>
        )
      }

      <form onSubmit={e => e.preventDefault()} className="form">
        <div className='form__username'>
          <label className="form__label form__username--item">
            <input placeholder={t('first_name')} {...register('firstname', {
              required: t('first_name_is_r'),
              pattern: {value: /^[A-Za-z]+$/, message: t('fn_only_l')}
            })}
              className="form__input form__username--item"
              style={errors?.firstname ? {marginTop: '0'} : {marginBottom: '20px'}}
            ></input>
            <div>
              {errors?.firstname && <p className='form__err'>{ errors?.firstname?.message }</p>}
            </div>
          </label>
          
          <label className="form__label form__username--item">
            <input placeholder={t('last_name')} {...register('lastname', {
              required: t('last_name_is_r'),
              pattern: {value: /^[A-Za-z]+$/, message: t('ln_only_l')}
            })}
              className="form__input form__username--item"
              style={errors?.lastname ? {marginTop: '0'} : {marginBottom: '20px'}}
            ></input>
            <div>
              {errors?.lastname && <p className='form__err'>{ errors?.lastname?.message }</p>}
            </div>
          </label>
        </div>

        <label className="form__label">
          <input placeholder={t('email')} type='email' {...register('email', {
            required: t('email_is_r'),
          })}
            className="form__input"
            style={errors?.email ? {marginTop: '0'} : {marginBottom: '20px'}}
          ></input>
          <div >
            {errors?.email && <p className='form__err'>{ errors?.email?.message }</p>}
          </div>
        </label>

        <label className="form__label">
          <input placeholder={t('password')} type='password' {...register('password', {
            required: t('password_is_r'),
            minLength: { value: 6, message: t('min_length', {length: 6}) },
            pattern: {value: /^(?=.*[A-Z])(?=.*\d).+$/, message: t('pass_valid')},
          })}
            className="form__input"
            style={errors?.password ? {marginTop: '0'} : { marginBottom: '20px'}}
          ></input>
          <div>
            {errors?.password && <p className='form__err'>{ errors?.password?.message }</p>}
          </div>
        </label>

        <label className="form__label">
          <input placeholder={t('confirm_password')} type='password' {...register('confirmpassword', {
            required: t('passwordc_is_r'),
            minLength: { value: 6, message: t('min_length', {length: 6}) },
            validate: validatePassword
          })}
            className="form__input"
            style={errors?.confirmpassword ? {marginTop: '0'} : {marginBottom: '20px'}}
          ></input>
          <div>
            {errors?.confirmpassword && <p className='form__err form__err--l'>{ errors?.confirmpassword?.message }</p>}
          </div>
        </label>

        <div>
          <button type='submit' onClick={handleSubmit(handleSignUp)} className='form__btn'>{t('sign_up')}</button>
          <span>{t('have_acc')}<Link to={'/signin'} style={{textDecoration: 'none', color: 'green'}}>{ t('login') }</Link></span>
        </div>
      </form>

    </div>
  )
}
