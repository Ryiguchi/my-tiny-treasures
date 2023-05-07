import { FC } from 'react';
import { MainCategories } from '../../../utils/enums';
import Box from '../../../components/common/Box/Box.component';
import Button from '../../../components/common/Button/Button.component';
import { ButtonType } from '../../../components/common/Button/button.types';
import CategoryCard from './CategoryCard/CategoryCard.component';
import { categoryRefs } from '../../../utils/fileRefs';
import * as S from './categorySlider.styles';
import { capitalize } from '../../../utils/helpers';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  initialQueryData,
  setQuery,
  setQueryData,
} from '../../../store/features/query/querySlice';

interface CategorySliderProps {
  category: string;
}

const ages = ['0-3', '4-7', '8-11'];

const CategorySlider: FC<CategorySliderProps> = ({ category }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoToCategory = () => {
    const newQuery = `mainCategory=${category}`;
    dispatch(setQuery(newQuery));
    dispatch(setQueryData(initialQueryData));

    navigate(`/category/${category}`);
  };

  const handleGoToCategoryAndAge = (age: string): void => {
    const newQuery = `mainCategory=${category}&age=${age}`;
    dispatch(setQuery(newQuery));
    dispatch(setQueryData({ ...initialQueryData, Age: [age] }));

    navigate(`/category/${category}`);
  };

  return (
    <Box gap="2rem" backgroundColor="#eee" padding="0 2rem">
      <S.CategoryTitle>{capitalize(category)}</S.CategoryTitle>
      <Box
        gap="4rem"
        flexDirection="row"
        overflowX="scroll"
        whiteSpace="nowrap"
      >
        {ages.map((age, i) => (
          <CategoryCard
            key={age}
            image={categoryRefs[category][i]}
            age={age}
            onClick={handleGoToCategoryAndAge}
          />
        ))}
      </Box>
      <Box alignItems="center" justifyContent="center">
        <Button onClick={handleGoToCategory} buttonType={ButtonType.Primary}>
          Show All {capitalize(category)}
        </Button>
      </Box>
    </Box>
  );
};

export default CategorySlider;
