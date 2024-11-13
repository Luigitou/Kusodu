'use client';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import { registerService } from '@/services';
import { toast } from 'react-toastify';

interface IRegisterFormInput {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password should be at least 6 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), ''], 'Passwords must match')
    .required('Confirm password is required'),
});

const fieldClasses = {
  groups: 'mb-8 flex flex-col gap-8 lg:flex-row lg:gap-12',
  wrapper: 'flex flex-col gap-3 w-full w-64 md:w-72',
  label: 'text-sm opacity-75 text-white text-center w-full',
  input:
    'px-4 py-2 rounded-lg bg-background text-white text-sm shadow-lg w-full outline-none focus:ring-2 focus:ring-primary',
};

export function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    clearErrors,
  } = useForm<IRegisterFormInput>({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    shouldFocusError: false,
  });

  const onSubmit = async (data: IRegisterFormInput) => {
    try {
      registerService(data.username, data.email, data.password);
    } catch (error) {
      console.error('Register error:', error);
      toast('Une erreur est survenue, veuillez réessayer plus tard');
    }
  };

  const handleFocus = (fieldName: keyof IRegisterFormInput) => {
    clearErrors(fieldName);
  };

  return (
    <div className={'flex w-full flex-col gap-8'}>
      <h2 className={'flex items-center justify-center text-xl'}>
        Créer un compte
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={'flex flex-col items-center justify-center text-black'}
      >
        <div className={fieldClasses.groups}>
          <div className={fieldClasses.wrapper}>
            <label htmlFor='username' className={fieldClasses.label}>
              Nom d&apos;utilisateur *
            </label>
            <input
              type='text'
              id='username'
              {...register('username')}
              placeholder='Username'
              className={classNames(
                fieldClasses.input,
                errors.username && 'ring-2 ring-red-400 focus:ring-primary',
              )}
              onChange={() => handleFocus('username')}
            />
          </div>
          <div className={fieldClasses.wrapper}>
            <label htmlFor='email' className={fieldClasses.label}>
              Email *
            </label>
            <input
              type='email'
              id='email'
              {...register('email')}
              placeholder='Email'
              className={classNames(
                fieldClasses.input,
                errors.email && 'ring-2 ring-red-400 focus:ring-primary',
              )}
              onChange={() => handleFocus('email')}
            />
          </div>
        </div>
        <div className={fieldClasses.groups}>
          <div className={fieldClasses.wrapper}>
            <label htmlFor='password' className={fieldClasses.label}>
              Mot de passe (Min 6 caractères) *
            </label>
            <input
              type='password'
              id='password'
              {...register('password')}
              placeholder='Password'
              className={classNames(
                fieldClasses.input,
                errors.password && 'ring-2 ring-red-400 focus:ring-primary',
              )}
              onChange={() => handleFocus('password')}
            />
          </div>
          <div className={fieldClasses.wrapper}>
            <label htmlFor='confirmPassword' className={fieldClasses.label}>
              Confirmer le mot de passe *
            </label>
            <input
              type='password'
              id='confirmPassword'
              {...register('confirmPassword')}
              placeholder='confirmPassword'
              className={classNames(
                fieldClasses.input,
                errors.confirmPassword &&
                  'ring-2 ring-red-400 focus:ring-primary',
              )}
              onChange={() => handleFocus('confirmPassword')}
            />
          </div>
        </div>

        <button
          className={
            'mt-2 w-fit rounded-lg border-2 border-transparent bg-light px-8 py-2 text-center text-white shadow-xl hover:border-primary'
          }
          type='submit'
        >
          {isSubmitting ? 'Submit' : 'Processing'}
        </button>
      </form>
    </div>
  );
}
