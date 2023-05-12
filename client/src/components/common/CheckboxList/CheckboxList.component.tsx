import { FC } from 'react';
import Box from '../Box/Box.component';
import { theme } from '../../../styles/themes';
import { useSelector } from 'react-redux';
import {
  selectQueryData,
  selectTempQueryData,
} from '../../../store/features/query/query.selectors';
import * as S from './checkboxList.styles';
import { CheckboxSizes } from '../../../utils/types/enums/enums';
import Divider from '../Divider/Divider.component';

interface CheckboxListProps {
  label?: string;
  name: string;
  items: string[];
  size: CheckboxSizes;
  setOptions: (name: string, item: string, isChecked: boolean) => void;
}

const CheckboxList: FC<CheckboxListProps> = ({
  name,
  label = name,
  items,
  setOptions,
  size,
}) => {
  const tempQueryData = useSelector(selectTempQueryData);

  return (
    <S.Wrapper
      alignItems="center"
      gap="3rem"
      // padding="2rem"
    >
      <h2>{label}</h2>
      <Box
        display="grid"
        gridTemplateColumns={
          size === CheckboxSizes.Small ? 'repeat(3, 1fr)' : '1fr 1fr'
        }
        columnGap="2rem"
        rowGap="2.4rem"
        width="fit-content"
      >
        {items &&
          items.map(item => (
            <S.CheckboxContainer
              size={size}
              key={item}
              selected={tempQueryData[name].includes(item)}
            >
              <input
                onChange={e => setOptions(name, item, e.target.checked)}
                key={item}
                name={item}
                type="checkbox"
                checked={tempQueryData[name].includes(item)}
              />

              <p>{item}</p>
            </S.CheckboxContainer>
          ))}
      </Box>
    </S.Wrapper>
  );
};

export default CheckboxList;
