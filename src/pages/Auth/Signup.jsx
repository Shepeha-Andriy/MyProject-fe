import React from 'react'
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form'
import { userSignUp } from '../../redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './signup.scss'

export default function Signup() {
  const { register, formState: { errors, isValid }, handleSubmit, reset } = useForm({mode: 'onBlur'})
  const { t } = useTranslation();
  const dispatch = useDispatch()

  const handleSignUp = (data) => {
    try {
      const { firstname, lastname, email, password } = data
      dispatch(userSignUp({ firstname, lastname, email, password }))
      reset()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='wraper'>
      <form onSubmit={e => e.preventDefault()} className="form">
        <div className='form__username'>
          <label className="form__label form__username--item">
            {/* First Name: */}
            <input placeholder="First Name" {...register('firstname', {
              required: 'first name is required',
              minLength: {value: 1, message: 'min length is 1'}
            })}
              className="form__input form__username--item"
              style={errors?.firstname ? {marginTop: '0'} : {marginTop: '20px'}}
            ></input>
            <div style={{marginTop: '3px'}}>
              {errors?.firstname && <p className='form__err'>{ errors?.firstname?.message }</p>}
            </div>
          </label>
          
          <label className="form__label form__username--item">
            {/* Last Name: */}
            <input placeholder="Last Name" {...register('lastname', {
              required: 'last name is required',
              minLength: {value: 1, message: 'min length is 1'}
            })}
              className="form__input form__username--item"
              style={errors?.firstname ? {marginTop: '0'} : {marginTop: '20px'}}
            ></input>
            <div style={{marginTop: '3px'}}>
              {errors?.lastname && <p className='form__err'>{ errors?.lastname?.message }</p>}
            </div>
          </label>
        </div>

        <label className="form__label">
          {/* Email: */}
          <input placeholder="Email" type='email' {...register('email', {
            required: 'email is required',
            // minLength: {value: 5, message: 'min length is 5'}
          })}
            className="form__input"
            style={errors?.firstname ? {marginTop: '0'} : {marginTop: '20px'}}
          ></input>
          <div style={{marginTop: '3px'}}>
            {errors?.email && <p className='form__err'>{ errors?.email?.message }</p>}
          </div>
        </label>

        <label className="form__label">
          {/* Password: */}
          <input placeholder="Password" type='password' {...register('password', {
            required: 'password is required',
            minLength: {value: 4, message: 'min length is 4'}
          })}
            className="form__input"
            style={errors?.firstname ? {marginTop: '0'} : {marginTop: '20px'}}
          ></input>
          <div>
            {errors?.password && <p className='form__err form__err--l'>{ errors?.password?.message }</p>}
          </div>
        </label>

        {/* <button type='submit' disabled={!isValid}>{ t('sign_up') }</button> */}
        <div>
          <button type='submit' onClick={handleSubmit(handleSignUp)} className='form__btn'>{t('sign_up')}</button>
          <span>Already have an account?<Link to={'/signin'}> Login</Link></span>
        </div>
      </form>

    </div>
  )
}
