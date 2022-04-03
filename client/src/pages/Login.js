import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <div className="max-w-xxl justify-center">
{data ? (
    <p>
      Success! You may now head{' '}
      <Link to="/">back to the homepage.</Link>
    </p>
  ) : (
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleFormSubmit}>
            <h1 className='text-xl font-extrabold'>Login</h1><br/>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Email
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                     placeholder="Your email"
                     name="email"
                     type="email"
                     value={formState.email}
                     onChange={handleChange}
              />

            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                     placeholder="******"
                     name="password"
                     type="password"
                     value={formState.password}
                     onChange={handleChange}
              />
            </div>
            
              <button className="bg-purple-100 hover:bg-purple-200 text-white font-bold py-2 px-4 rounded w-full" 
                      type="submit"
              >
                Sign In
              </button>

          </form>
        )}

    {error && (
      <div className="my-3 p-3 bg-danger text-white">
        {error.message}
      </div>
    )}
    <p className="text-center text-white text-xs">
      &copy;2022 GitFit Corp. All rights reserved.
    </p>
</div>

  );
};

export default Login;
