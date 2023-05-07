import { FC, useState } from 'react';
import Box from '../../../components/common/Box/Box.component';
import { useAppDispatch } from '../../../utils/hooks';
import { signInUser } from '../../../store/features/user/userSlice';
import Input from '../../../components/common/Input/Input.component';
import Button from '../../../components/common/Button/Button.component';
import { ButtonType } from '../../../components/common/Button/button.types';
import { Wrapper } from './signInForm.styles';
import { useNavigate } from 'react-router-dom';

const SignInForm: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    await dispatch(signInUser({ email, password }));
  };

  return (
    <Wrapper>
      <form onSubmit={signIn}>
        <Box gap="6.4rem">
          <Box gap="1.2rem">
            <Box gap="2.4rem" alignItems="center">
              <h2>Log In</h2>
              <Input
                label="Email"
                type="email"
                onChange={e => setEmail(e.target.value)}
              />
              <Input
                label="Password"
                onChange={e => setPassword(e.target.value)}
                type="password"
              />
            </Box>
            <span id="forgot-text">Forgot your password?</span>
          </Box>
          <Box>
            <Button type="submit" buttonType={ButtonType.Primary}>
              Sign In
            </Button>
          </Box>
        </Box>
        <a onClick={() => navigate('/signup')}>
          Don't have an account?&nbsp;<span>Sign Up</span>
        </a>
      </form>
    </Wrapper>
  );
};

export default SignInForm;
