import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [createUser, { error, data }] = useMutation(CREATE_USER);
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await createUser({
        variables: { ...formState },
      });

      Auth.login(data.createUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
        <div className = "items-center">
            <div className="px-6 flex items-center justify-center bg-gray-100"></div>
                <div className="px-8 py-3 mt-4 text-left"></div>
                    <h3 className="text-2xl font-bold text-center">Sign up!</h3>
                    {data ? (
                  <p>
                    Success! You may now head{' '}
                    {/* <Link to='/exercise'>back to the homepage.</Link> */}
                  </p>
                ) : (
                <form onSubmit={handleFormSubmit}>
                    <input
                      className="form-input items-center w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                      placeholder="firstName"
                      name="firstName"
                      type="text"
                      value={formState.firstName}
                      onChange={handleChange}
                    />
                    <input
                      className="form-input items-center w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                      placeholder="lastName"
                      name="lastName"
                      type="text"
                      value={formState.lastName}
                      onChange={handleChange}
                    />
                    <input
                      className="form-input items-center w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                      placeholder="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                    />
                    <input
                      className="form-input items-center w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                      placeholder="password"
                      name="password"
                      type="password"
                      value={formState.password}
                      onChange={handleChange}
                    />
                    <button
                      className="items-center w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                      style={{ cursor: 'pointer' }}
                      type="submit"
                    >
                      Sign up
                    </button>
                  </form>
                )}

                {error && (
                  <div className="my-3 p-3 bg-danger text-white">
                    {error.message}
                  </div>
                )}

            </div>
        </div>
  );
};

export default Signup;
