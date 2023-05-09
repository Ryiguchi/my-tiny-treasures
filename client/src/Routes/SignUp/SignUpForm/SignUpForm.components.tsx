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
        <Box gap="6.4rem">
          <Box gap="1.2rem">
            <Box gap="4.8rem" alignItems="center">
              <h2>Sign Up</h2>
              <Input label="Name" onChange={e => setName(e.target.value)} />
              <Box width="100%" gap="2.4rem">
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
              </Box>
              <Box width="100%" gap="2.4rem">
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
              </Box>
            </Box>
          </Box>
          <Box>
            <Button type="submit" buttonType={ButtonType.Primary}>
              Sign Up
            </Button>
          </Box>
        </Box>
        <a onClick={() => navigate('/signin')}>
          Already have an account?&nbsp;<span>Sign In</span>
        </a>
      </form>
    </Wrapper>
  );
};

export default SignUpForm;
