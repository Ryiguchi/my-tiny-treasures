import { FC } from 'react';
import Box from '../../../../components/common/Box/Box.component';
import { theme } from '../../../../styles/themes';
import * as S from './categoryCard.styles';

interface CategoryCardProps {
  image: string;
  age: string;
  onClick: (age: string) => void;
}

const CategoryCard: FC<CategoryCardProps> = ({ image, age, onClick }) => {
  return (
    <Box
      width="22.3rem"
      minWidth="22.3rem"
      height="18.6rem"
      borderRadius={theme.radius.image}
      cursor="pointer"
      backgroundColor="#fff"
      margin="1rem 0"
      onClick={() => onClick(age)}
    >
      <Box alignItems="center" justifyContent="center" height="30%">
        {age} years
      </Box>
      <S.ImageBox url={image}></S.ImageBox>
    </Box>
  );
};

export default CategoryCard;
