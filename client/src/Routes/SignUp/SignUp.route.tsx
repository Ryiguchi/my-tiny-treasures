import { FC } from 'react';
import Footer from '../../components/common/Footer/Footer.component';
import Box from '../../components/common/Box/Box.component';
import SignUpForm from './SignUpForm/SignUpForm.components';
import * as S from './signUp.styles';
import { imgUrls } from '../../utils/urls/imgUrls';

const SignUp: FC = () => {
  return (
    <S.Wrapper>
      <Box padding="2.4rem 3.2rem" gap="2.4rem">
        <Box width="100%" objectFit="cover">
          <img src={imgUrls.icons.logoBig} alt="Logo" />
        </Box>
        <SignUpForm />
      </Box>
    </S.Wrapper>
  );
};

export default SignUp;
