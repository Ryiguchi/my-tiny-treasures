import Box from '../../components/common/Box/Box.component';
import { fileRefs, googleCallbackUrl } from '../../utils/fileRefs';
import * as S from './signIn.styles';
import Button from '../../components/common/Button/Button.component';
import { ButtonType } from '../../components/common/Button/button.types';
import Footer from '../../components/common/Footer/Footer.component';
import SignInForm from './SignInForm/SignInForm.component';
import { useNavigate } from 'react-router-dom';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  return (
    <S.Wrapper>
      <Box padding="2.4rem 3.2rem">
        <Box margin="0 0 3.2rem 0" gap="3.2rem">
          <Box width="100%" objectFit="cover">
            <img src={fileRefs.logoBig} alt="Logo" />
          </Box>
          <p>Log in or create an account to exchange items for free.</p>
        </Box>
        <SignInForm />
        <Box margin="3.2rem 0 0 0" gap="3.2rem">
          <span>Or</span>
          <a href={googleCallbackUrl}>
            <Button
              buttonType={ButtonType.Google}
              iconLeft={fileRefs.google}
              type="button"
            >
              Continue with Google
            </Button>
          </a>

          <Footer />
        </Box>
      </Box>
    </S.Wrapper>
  );
};

export default SignIn;

{
  /* <label htmlFor="email">Email</label>
      

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
      </div> */
}
