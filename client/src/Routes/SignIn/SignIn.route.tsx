import Box from '../../components/common/Box/Box.component';
import * as S from './signIn.styles';
import Button from '../../components/common/Button/Button.component';
import { ButtonType } from '../../components/common/Button/button.types';
import Footer from '../../components/common/Footer/Footer.component';
import SignInForm from './SignInForm/SignInForm.component';
import { imgUrls } from '../../utils/urls/imgUrls';
import { serverRoute } from '../../utils/urls/serverUrls';

const SignIn: React.FC = () => {
  return (
    <S.Wrapper>
      <Box padding="2.4rem  3.2rem" gap="2.4rem">
        <Box width="100%" objectFit="cover">
          <img src={imgUrls.icons.logoBig} alt="Logo" />
        </Box>
        <Box padding="1.2rem 0" gap="2.4rem">
          <p>Log in or create an account to exchange items for free.</p>
          <SignInForm />
          <Box gap="2.4rem">
            <span>Or</span>
            <a href={serverRoute.googleCallbackUrl}>
              <Button
                buttonType={ButtonType.Google}
                iconLeft={imgUrls.icons.google}
                type="button"
              >
                Continue with Google
              </Button>
            </a>
          </Box>
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
