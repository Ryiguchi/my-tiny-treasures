import { FC } from 'react';
import Box from '../Box/Box.component';
import { FaArrowLeft } from 'react-icons/fa';
import { Title } from './goBackNav.styles';
import { theme } from '../../../styles/themes';

interface GoBackNavProps {
  title: string;
}

const GoBackNav: FC<GoBackNavProps> = ({ title }) => {
  return (
    <Box position="relative" padding="3rem">
      <Box
        position="absolute"
        left="1.2rem"
        top="50%"
        transform="translateY(-50%)"
        alignItems="center"
        justifyContent="center"
        width="6rem"
        height="6rem"
        onClick={() => window.history.back()}
      >
        <FaArrowLeft size={26} color={theme.color.blackMedium} />
      </Box>
      <Title>{title}</Title>
    </Box>
  );
};

export default GoBackNav;
