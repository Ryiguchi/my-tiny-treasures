import { FC, useState } from 'react';
import Box from '../../../components/common/Box/Box.component';
import { useAppDispatch } from '../../../utils/hooks/reduxHooks';
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
    navigate('/home');
  };

  return (
    <Wrapper>
      <form onSubmit={signIn}>
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
          <span id="forgot-text">Forgot your password?</span>

          <Button type="submit" buttonType={ButtonType.LogIn}>
            Log In
          </Button>
          <Button
            onClick={() => navigate('/signup')}
            type="button"
            buttonType={ButtonType.Primary}
          >
            Sign Up
          </Button>
        </Box>
      </form>
    </Wrapper>
  );
};

export default SignInForm;
