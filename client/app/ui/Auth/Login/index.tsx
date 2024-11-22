'use client';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { loginService } from '@/services';
import { useStore } from '@/store';

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

export function Login({ switchToRegister }: LoginProps) {
  const setUser = useStore(state => state.setUser);
  const setToken = useStore(state => state.setToken);
  const setIsAuthenticated = useStore(state => state.setIsAuthenticated);

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
  };

  const handleFocus = (fieldName: keyof ILoginFormInput) => {
    clearErrors(fieldName);
  };

  return (
    <div>
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor={'email'}>Email</label>
          <input
            type={'email'}
            id={'email'}
            {...register('email')}
            placeholder={'Email'}
            onChange={() => handleFocus('email')}
          />
        </div>
        <div>
          <label htmlFor={'password'}>Mot de passe</label>
          <input
            type={'password'}
            id={'password'}
            {...register('password')}
            placeholder={'Password'}
            onChange={() => handleFocus('password')}
          />
        </div>
        <button type='submit'>
          {isSubmitting ? 'Connecting' : 'Connexion'}
        </button>
      </form>
      <span className={'h-2 w-full rounded-full bg-primary'}></span>
      <button onClick={switchToRegister}>Créer un compte</button>
    </div>
  );
}
