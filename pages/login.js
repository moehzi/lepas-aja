import React, { useState, useRef, useEffect } from 'react';
import Modal from '../components/Modal';
import {
  Authentication,
  SignIn,
  GetSignInErrorMessage,
  GoogleAuth,
  FacebookAuth,
  sendEmailResetPassword,
} from '../services/Auth';
import { useRouter } from 'next/dist/client/router';
import withUnProtected from '../hoc/withUnprotected';
import { Alert } from '@mui/material';

const login = () => {
  const [modal, setModal] = useState(false);
  const router = useRouter();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState('');
  const [isAlert, setIsAlert] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const toggleModal = (e) => {
    e.preventDefault();
    setModal(!modal);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError('');
      await SignIn(emailRef.current.value, passwordRef.current.value);
      setIsSuccess(true);
      setTimeout(() => {
        router.replace('/');
      }, 3500)
    } catch (err) {
      const message = GetSignInErrorMessage(err.code);
      setError(message);
      setIsError(true);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      await GoogleAuth();
      setIsSuccess(true);
      setTimeout(() => {
        router.replace('/');
      }, 3500)
    } catch (err) {
      const message = GetSignInErrorMessage(err.code);
      setError(message);
      setIsError(true);
    }
  };

  const handleFacebookAuth = async () => {
    try {
      await FacebookAuth();
      setIsSuccess(true);
      setTimeout(() => {
        router.replace('/');
      }, 3500)
    } catch (err) {
      const message = GetSignInErrorMessage(err.code);
      setError(message);
      setIsError(true);
    }
  };
  const onSendEmail = async ({ email }) => {
    
    try {
      await sendEmailResetPassword(email);
      setModal(!modal);
      setIsAlert(true);
      console.log('Please check your email!');
    } catch (error) {
      console.log('error');
      console.log(error);
    }
  };

  useEffect(() => {
    if (isAlert) {
      let timer = setTimeout(() => setIsAlert(false), 5000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [isAlert]);

  useEffect(() => {
    if(isSuccess){
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000)
    }
  }, [isSuccess]);

  useEffect(() => {
    if(isError){
      setTimeout(() => {
        setIsError(false);
      }, 5000)
    }
  }, [isError]);

  return (
    <section className="w-full min-h-[80vh] flex flex-col justify-center items-center py-8">
      
      <h1 className="text-5xl mb-14">LOGIN</h1>
      <form
        className="mb-4 flex flex-col max-w-[450px] w-full"
        onSubmit={handleSubmit}
      >
        <div className='relative mt-4'>
          {isAlert && (
          <div className='-top-14 absolute ml-0 mr-0 left-0 right-0'>
            <Alert variant='filled' severity='success'>
              Email sudah terkirim. Silahkan cek email anda!
            </Alert>
          </div>
          )}
          {isSuccess && (
            <div className='-top-14 absolute ml-0 mr-0 left-0 right-0'>
              <Alert variant='filled' severity='success'>
                Anda telah berhasil login!
              </Alert>
            </div>
          )}
          {isError && (
            <div className='-top-14 absolute ml-0 mr-0 left-0 right-0'>
              <Alert variant='filled' severity='error'>
                {error}
              </Alert>
            </div>
          )}
        </div>
        {/* {error && (
          <div
            className="relative px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded"
            role="alert"
          >
            <strong className="font-bold">Danger! </strong>
            <span className="block sm:inline">{error}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg
                className="w-6 h-6 text-red-500 fill-current"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </span>
          </div>
        )} */}

        <div className="mb-4 shadow appearance-none border-red-600 border rounded py-2 px-4 text-gray-700 leading-tight flex flex-col bg-[#E4E4E4]">
          <label
            className="text-[#706C88] mb-1 border-b-[3px] border-red-600 max-w-max"
            htmlFor="username-email"
          >
            Email
          </label>
          <input
            ref={emailRef}
            className="bg-[#E4E4E4] focus:outline-none focus:shadow-outline text-red-600 text-xl"
            placeholder="Enter your email/username here"
          />
        </div>
        <div className="mb-4 shadow appearance-none border-red-600 border rounded py-2 px-4 text-gray-700 leading-tight flex flex-col bg-[#E4E4E4]">
          <label
            className="text-[#706C88] mb-1 border-b-[3px] border-red-600 max-w-max"
            htmlFor="password"
          >
            Password
          </label>
          <input
            ref={passwordRef}
            className="bg-[#E4E4E4] focus:outline-none focus:shadow-outline text-red-600 text-xl"
            id="password"
            type="password"
            placeholder="Enter your password here"
          />
        </div>
        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="w-4 h-4 text-red-600 justify-center form-checkbox"
            />
            <span className="ml-2 text-lg text-gray-700">Remember Me</span>
          </label>
        </div>
        <div className="flex flex-col items-center gap-4">
          <button
            className="rounded-[4px] bg-red-600 mx-auto max-w-[196px] w-full py-4 mt-8 text-xl text-white font-medium"
            type="submit"
          >
            Login
          </button>
          <button
            className="text-lg font-bold text-black opacity-50"
            onClick={toggleModal}
          >
            Forgot Password?
          </button>
        </div>
      </form>
      <div className="flex flex-col items-center mt-8 gap-y-4">
        <p className="font-bold opacity-70">Or Log in With</p>
        <div className="flex gap-x-8">
          <button onClick={handleFacebookAuth}>
            <img src="/icons/facebook.svg" />
          </button>
          <button onClick={handleGoogleAuth}>
            <img src="/icons/google.svg" />
          </button>
        </div>
      </div>
      {modal && <Modal onSendEmail={onSendEmail} toggleModal={toggleModal} />}
    </section>
  );
};

export default withUnProtected(login);
