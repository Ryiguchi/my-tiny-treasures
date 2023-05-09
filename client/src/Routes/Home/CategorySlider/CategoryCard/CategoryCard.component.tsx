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
      width="10.6rem"
      height="16rem"
      borderRadius={theme.radius.image}
      cursor="pointer"
      backgroundColor="#fff"
      margin="1rem 0"
      onClick={() => onClick(age)}
      boxShadow="2px 4px 14px rgba(0, 0, 0, 0.2)"
    >
      <S.ImageBox url={image}></S.ImageBox>
      <Box alignItems="center" justifyContent="center" height="30%">
        {age} years
      </Box>
    </Box>
  );
};

export default CategoryCard;
