import { FC, useState } from 'react';
import Box from '../Box/Box.component';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import * as S from './lightBox.styles';
import { theme } from '../../../styles/themes';

interface LightBoxProps {
  images: string[];
}

const LightBox: FC<LightBoxProps> = ({ images }) => {
  const [currentImg, setCurrentImg] = useState<number>(0);

  const getImgIndex = (direction: string): number => {
    if (direction === 'back' && currentImg === 0) {
      return images.length - 1;
    } else if (direction === 'back' && currentImg !== 0) {
      return currentImg - 1;
    } else if (direction === 'forward' && currentImg === images.length - 1) {
      return 0;
    } else return currentImg + 1;
  };

  return (
    <Box
      position="relative"
      width="100%"
      maxWidth="40rem"
      height="30rem"
      backgroundColor="#7B7777"
      margin="0 .4rem"
      borderRadius={theme.radius.image}
      boxShadow={theme.shadow}
    >
      <S.StyledArrowBack
        onClick={() => setCurrentImg(getImgIndex('back'))}
        size={48}
      />
      <S.StyledImg src={images[currentImg]} alt="Items for sale" />
      <S.StyledArrowForward
        onClick={() => setCurrentImg(getImgIndex('forward'))}
        size={48}
      />
    </Box>
  );
};

export default LightBox;
