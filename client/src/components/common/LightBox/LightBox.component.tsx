import { FC, useState } from 'react';
import Box from '../Box/Box.component';
import * as S from './lightBox.styles';
import { theme } from '../../../styles/themes';
import { getIndex } from './lightBox.helpers';

interface LightBoxProps {
  images: string[];
}

const LightBox: FC<LightBoxProps> = ({ images }) => {
  const [currentImg, setCurrentImg] = useState<number>(0);

  const getImgIndex = (direction: string): number => {
    const lastIndex = images.length - 1;
    return getIndex(direction, currentImg, lastIndex);
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
