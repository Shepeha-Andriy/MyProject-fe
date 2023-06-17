import React from 'react'
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import { userSignUp } from '../../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './signup.scss'

export default function Signup() {
  const { register, formState: { errors, isValid }, handleSubmit, getValues, reset } = useForm({mode: 'onSubmit'})
  const { t } = useTranslation();
  const { user, message } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSignUp = (data) => {
    try {
      const { firstname, lastname, email, password, confirmpassword } = data
      dispatch(userSignUp({ firstname, lastname, email, password }))
      toast.error(message)
      // reset()
    } catch (error) {
      console.log(error)
    }
  }

const validatePassword = (value) => {
  const confirmPassword = getValues('password');

  if (value !== confirmPassword) {
    return  'Passwords do not match';
  }
  return true;
};

  return (
    <div className='wraper'>
      <form onSubmit={e => e.preventDefault()} className="form">
        <div className='form__username'>
          <label className="form__label form__username--item">
            {/* First Name: */}
            <input placeholder="First Name" {...register('firstname', {
              required: 'first name is required',
              pattern: {value: /^[A-Za-z]+$/, message: 'first name must contain only latters'}
            })}
              className="form__input form__username--item"
              style={errors?.firstname ? {marginTop: '0'} : {marginBottom: '20px'}}
            ></input>
            <div>
              {errors?.firstname && <p className='form__err'>{ errors?.firstname?.message }</p>}
            </div>
          </label>
          
          <label className="form__label form__username--item">
            {/* Last Name: */}
            <input placeholder="Last Name" {...register('lastname', {
              required: 'last name is required',
              pattern: {value: /^[A-Za-z]+$/, message: 'last name must contain only latters'}
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
          {/* Email: */}
          <input placeholder="Email" type='email' {...register('email', {
            required: 'email is required',
            // minLength: {value: 5, message: 'min length is 5'}
          })}
            className="form__input"
            style={errors?.email ? {marginTop: '0'} : {marginBottom: '20px'}}
          ></input>
          <div >
            {errors?.email && <p className='form__err'>{ errors?.email?.message }</p>}
          </div>
        </label>

        <label className="form__label">
          {/* Password: */}
          <input placeholder="Password" type='password' {...register('password', {
            required: 'password is required',
            minLength: { value: 6, message: 'min length is 6' },
            pattern: {value: /^(?=.*[A-Z])(?=.*\d).+$/, message: 'password must contain at least one capital letter and one number'},
          })}
            className="form__input"
            style={errors?.password ? {marginTop: '0'} : { marginBottom: '20px'}}
          ></input>
          <div>
            {errors?.password && <p className='form__err'>{ errors?.password?.message }</p>}
          </div>
        </label>

        <label className="form__label">
          {/* Password: */}
          <input placeholder="Confirm Password" type='password' {...register('confirmpassword', {
            required: 'password confirmation is required',
            minLength: { value: 6, message: 'min length is 6' },
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
          <span>Already have an account?<Link to={'/signin'}> Login</Link></span>
        </div>
      </form>

    </div>
  )
}
