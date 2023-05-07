import { FC, useState } from 'react';
import Box from '../../../components/common/Box/Box.component';
import CheckboxList from '../../../components/common/CheckboxList/CheckboxList.component';
import { ages, sizes } from '../../../utils/enums';
import Button from '../../../components/common/Button/Button.component';
import { ButtonType } from '../../../components/common/Button/button.types';
import { useDispatch, useSelector } from 'react-redux';
import { selectQueryData } from '../../../store/features/query/query.selectors';
import {
  QueryData,
  setQueryData,
} from '../../../store/features/query/querySlice';

interface FilterPopupProps {
  categoryName: string;
  subCategories: string[];
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  getFilterResults: () => void;
}

const FilterPopup: FC<FilterPopupProps> = ({
  categoryName,
  subCategories,
  onClick,
  getFilterResults,
}) => {
  const [sizeOrAge, setSizeOrAge] = useState<string>('Age');
  const dispatch = useDispatch();
  const queryData = useSelector(selectQueryData);

  const handleOptions = (
    category: string,
    item: string,
    isChecked: boolean
  ) => {
    const newData: QueryData = {
      Categories: [...queryData.Categories],
      Sizes: [...queryData.Sizes],
      Age: [...queryData.Age],
      Sort: [...queryData.Sort],
    };

    if (category === 'Sort') {
      newData.Sort = [];
    }

    if (categoryName === 'Clothes' && category === 'Sizes' && isChecked) {
      newData.Age = [];
      setSizeOrAge('Sizes');
    } else if (categoryName === 'Clothes' && category === 'Age' && isChecked) {
      newData.Sizes = [];
      setSizeOrAge('Age');
    }

    if (isChecked) {
      newData[category].push(item);
    }
    if (!isChecked) {
      const i = newData[category].indexOf(item);
      if (i === -1) return;
      newData[category].splice(i, 1);
    }
    dispatch(setQueryData(newData));
  };
  return (
    <Box
      padding="10rem 2.4rem 2.4rem 2.4rem"
      gap="6rem"
      backgroundColor="#eee"
      width="100%"
      maxWidth="40rem"
      height="100vh"
      position="absolute"
      top="0"
      left="0"
      zIndex={100}
    >
      <Box position="absolute" top="2rem" right="2rem" onClick={onClick}>
        X
      </Box>
      <Box gap="3rem">
        <CheckboxList
          name="Categories"
          items={subCategories}
          setOptions={handleOptions}
        />
        {categoryName === 'Clothes' && (
          <CheckboxList
            name="Sizes"
            items={sizes}
            setOptions={handleOptions}
            checked={sizeOrAge === 'Sizes'}
          />
        )}

        <CheckboxList
          name="Age"
          items={ages}
          setOptions={handleOptions}
          checked={sizeOrAge === 'Age'}
        />
        <CheckboxList
          name="Sort"
          items={['Most Recent', 'Distance']}
          setOptions={handleOptions}
        />
      </Box>
      <Box justifyContent="center" alignItems="center">
        <Button onClick={getFilterResults} buttonType={ButtonType.Message}>
          View Results
        </Button>
      </Box>
    </Box>
  );
};

export default FilterPopup;
