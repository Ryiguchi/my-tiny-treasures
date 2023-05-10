import { FC } from 'react';
import Box from '../Box/Box.component';
import { FaArrowLeft } from 'react-icons/fa';
import { Title } from './goBackNav.styles';

interface GoBackNavProps {
  title: string;
}

const GoBackNav: FC<GoBackNavProps> = ({ title }) => {
  return (
    <Box position="relative" padding="3rem">
      <Box
        position="absolute"
        left="1rem"
        top="50%"
        transform="translateY(-50%)"
      >
        <FaArrowLeft onClick={() => window.history.back()} size={36} />
      </Box>
      <Title>{title}</Title>
    </Box>
  );
};

export default GoBackNav;
