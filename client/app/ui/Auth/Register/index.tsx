'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

interface IRegisterFormInput {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export function Register() {
  const { register, handleSubmit } = useForm<IRegisterFormInput>();
  const onSubmit: SubmitHandler<IRegisterFormInput> = data =>
    console.log('form data:', data);

  return (
    <div className={''}>
      <form onSubmit={handleSubmit(onSubmit)} className={'flex flex-col gap-4'}>
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          id='username'
          {...register('username')}
          placeholder='Username'
        />
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          {...register('email')}
          placeholder='Email'
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          {...register('password')}
          placeholder='Password'
        />
        <label htmlFor='confirmPassword'>Confirm Password</label>
        <input
          type='password'
          id='confirmPassword'
          {...register('confirmPassword')}
          placeholder='confirmPassword'
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}
