import { FC } from 'react';
import Box from '../Box/Box.component';
import { IoIosArrowBack } from 'react-icons/io';
import { Title } from '../../../Routes/Post/post.styles';

interface GoBackNavProps {
  title: string;
}

const GoBackNav: FC<GoBackNavProps> = ({ title }) => {
  return (
    <Box position="relative">
      <Box
        position="absolute"
        left="1rem"
        top="50%"
        transform="translateY(-50%)"
      >
        <IoIosArrowBack onClick={() => window.history.back()} size={48} />
      </Box>
      <Title>{title}</Title>
    </Box>
  );
};

export default GoBackNav;
