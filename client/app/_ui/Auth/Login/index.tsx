'use client';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { loginService } from '@/_services';
import { useStore } from '@/_store';
import classNames from 'classnames';

type LoginProps = {
  switchToRegister: () => void;
};

interface ILoginFormInput {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email('Email is required').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password should be at least 6 characters')
    .required('Password is required'),
});

const fieldClasses = {
  wrapper: 'flex flex-col gap-2 w-full w-64 md:w-72',
  label: 'pl-1 text-sm opacity-75 text-white w-full',
  input:
    'px-4 py-2 rounded-lg bg-background text-white shadow-lg w-full outline-none focus:ring-2 focus:ring-primary',
};

export function Login({ switchToRegister }: LoginProps) {
  const setUser = useStore(state => state.setUser);
  const setToken = useStore(state => state.setToken);
  const setIsAuthenticated = useStore(state => state.setIsAuthenticated);
  const setRefreshToken = useStore(state => state.setRefreshToken);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    clearErrors,
  } = useForm<ILoginFormInput>({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    shouldFocusError: false,
  });

  const onSubmit = async (data: ILoginFormInput) => {
    const response = await loginService(data.email, data.password);
    setUser(response.user);
    setToken(response.token);
    setIsAuthenticated(true);
    setRefreshToken(response.refreshToken);
  };

  const handleFocus = (fieldName: keyof ILoginFormInput) => {
    clearErrors(fieldName);
  };

  return (
    <div className={'flex w-full flex-col gap-8'}>
      <h2 className={'flex items-center justify-center text-xl'}>Connexion</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={'flex flex-col items-center justify-center gap-8 text-black'}
      >
        <div className={fieldClasses.wrapper}>
          <label htmlFor={'email'} className={fieldClasses.label}>
            Email
          </label>
          <input
            type={'email'}
            id={'email'}
            {...register('email')}
            placeholder={'Email'}
            onChange={() => handleFocus('email')}
            className={classNames(
              fieldClasses.input,
              errors.email && 'ring-2 ring-red-400 focus:ring-primary',
            )}
          />
        </div>
        <div className={fieldClasses.wrapper}>
          <label htmlFor={'password'} className={fieldClasses.label}>
            Mot de passe
          </label>
          <input
            type={'password'}
            id={'password'}
            {...register('password')}
            placeholder={'Password'}
            onChange={() => handleFocus('password')}
            className={classNames(
              fieldClasses.input,
              errors.password && 'ring-2 ring-red-400 focus:ring-primary',
            )}
          />
        </div>
        <button
          type='submit'
          className={
            'mt-2 w-fit rounded-lg border-2 border-transparent bg-light px-8 py-2 text-center text-white shadow-xl hover:border-primary'
          }
        >
          {isSubmitting ? 'Connecting' : 'Connexion'}
        </button>
      </form>
      <span className={'h-[2px] w-full rounded-full bg-primary'}></span>
      <div className={'flex items-center justify-center gap-2 text-sm'}>
        <span>Pas encore de compte ?</span>
        <button
          onClick={switchToRegister}
          className={'text-primary hover:underline'}
        >
          Créer un compte
        </button>
      </div>
    </div>
  );
}
