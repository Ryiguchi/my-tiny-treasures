import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { signInUser } from '../../store/features/user/userSlice';
import { useAppDispatch } from '../../utils/hooks';

const SignIn: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    await dispatch(signInUser({ email, password }));
  };

  return (
    <div>
      <form onSubmit={signIn}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="password">password</label>
        <input
          type="text"
          name="password"
          onChange={e => setPassword(e.target.value)}
        />
        <button>Sign in</button>
      </form>
      <button onClick={() => navigate('/')}>Home</button>
      <div>
        <ul>
          <li>ryan@gmail.com</li>
          <li>tamela@gmail.com</li>
          <li>jamie@gmail.com</li>
          <li>jackie@gmail.com</li>
          <li>anton@gmail.com</li>
          <li>isabelle@gmail.com</li>
        </ul>
      </div>
    </div>
  );
};

export default SignIn;
