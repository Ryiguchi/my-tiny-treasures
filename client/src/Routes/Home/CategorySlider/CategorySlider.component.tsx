import { FC } from 'react';
import Box from '../../../components/common/Box/Box.component';
import Button from '../../../components/common/Button/Button.component';
import { ButtonType } from '../../../components/common/Button/button.types';
import CategoryCard from './CategoryCard/CategoryCard.component';
import * as S from './categorySlider.styles';
import { capitalize } from '../../../utils/helpers';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  initialQueryData,
  setQuery,
  setQueryData,
} from '../../../store/features/query/querySlice';
import { imgUrls } from '../../../utils/urls/imgUrls';

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
    dispatch(setQueryData({ ...initialQueryData, MainCategories: [category] }));

    navigate(`/category/${category}`);
  };

  const handleGoToCategoryAndAge = (age: string): void => {
    const newQuery = `mainCategory=${category}&age=${age}`;
    dispatch(setQuery(newQuery));
    dispatch(
      setQueryData({
        ...initialQueryData,
        Age: [age],
      })
    );

    navigate(`/category/${category}`);
  };

  return (
    <S.Wrapper>
      <Box gap="2.4rem" alignItems="center">
        <S.CategoryTitle>{capitalize(category)}</S.CategoryTitle>
        <p>Choose an age group</p>
        <Box gap="1rem" flexDirection="row">
          {ages.map((age, i) => (
            <CategoryCard
              key={age}
              image={imgUrls.categories[category][i]}
              age={age}
              onClick={handleGoToCategoryAndAge}
            />
          ))}
        </Box>
        <p>or</p>
        <Button onClick={handleGoToCategory} buttonType={ButtonType.Primary}>
          Show All {capitalize(category)}
        </Button>
      </Box>
    </S.Wrapper>
  );
};

export default CategorySlider;
