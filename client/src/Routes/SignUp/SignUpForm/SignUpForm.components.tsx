import { FC, FormEvent, useState } from 'react';
import Box from '../../../components/common/Box/Box.component';
import Input from '../../../components/common/Input/Input.component';
import Button from '../../../components/common/Button/Button.component';
import { ButtonType } from '../../../components/common/Button/button.types';
import {
  SignUpUserData,
  signUpUser,
} from '../../../store/features/user/userSlice';
import { Wrapper } from './signUpForm.styles';
import { useAppDispatch } from '../../../utils/hooks/reduxHooks';
import { useNavigate } from 'react-router-dom';

const SignUpForm: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailConfirm, setEmailConfirm] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const signUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email !== emailConfirm) {
      console.log('Emails do not match');
      return;
    }
    if (password !== passwordConfirm) {
      console.log('Passwords do not match');
      return;
    }
    const userData: SignUpUserData = {
      name,
      email,
      password,
      passwordConfirm,
    };

    await dispatch(signUpUser(userData));
    navigate('/home');
  };

  return (
    <Wrapper>
      <form onSubmit={signUp}>
        <Box gap="2.4rem" alignItems="center" padding="1.2rem 0">
          <h2>Sign Up</h2>
          <Input label="Name" onChange={e => setName(e.target.value)} />

          <Input
            label="Email"
            type="email"
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            label="Repeat Email"
            onChange={e => setEmailConfirm(e.target.value)}
            type="email"
          />

          <Input
            label="Password"
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
          <Input
            label="Repeat Password"
            onChange={e => setPasswordConfirm(e.target.value)}
            type="password"
          />

          <Button type="submit" buttonType={ButtonType.Primary}>
            Sign Up
          </Button>
        </Box>
      </form>
    </Wrapper>
  );
};

export default SignUpForm;
