import { FC } from 'react';
import Footer from '../../components/common/Footer/Footer.component';
import Box from '../../components/common/Box/Box.component';
import { fileRefs } from '../../utils/fileRefs';
import SignUpForm from './SignUpForm/SignUpForm.components';
import * as S from './signUp.styles';

const SignUp: FC = () => {
  return (
    <S.Wrapper>
      <Box padding="2.4rem 3.2rem">
        <Box margin="0 0 3.2rem 0" gap="3.2rem">
          <Box width="100%" objectFit="cover">
            <img src={fileRefs.logoBig} alt="Logo" />
          </Box>
          <p>Create an account to exchange items for free.</p>
        </Box>
        <SignUpForm />

        <Box margin="3.2rem 0 0 0" gap="3.2rem">
          <Footer />
        </Box>
      </Box>
    </S.Wrapper>
  );
};

export default SignUp;
