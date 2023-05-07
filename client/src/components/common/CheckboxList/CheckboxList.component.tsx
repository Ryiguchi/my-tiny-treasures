import { FC } from 'react';
import Box from '../Box/Box.component';
import { theme } from '../../../styles/themes';
import { useSelector } from 'react-redux';
import { selectQueryData } from '../../../store/features/query/query.selectors';

interface CheckboxListProps {
  name: string;
  items: string[];
  checked?: boolean;
  setOptions: (name: string, item: string, isChecked: boolean) => void;
}

const CheckboxList: FC<CheckboxListProps> = ({
  name,
  items,
  setOptions,
  checked = true,
}) => {
  const queryData = useSelector(selectQueryData);

  return (
    <Box
      padding="2rem"
      backgroundColor="#fff"
      borderRadius={theme.radius.image}
      boxShadow={theme.shadow}
      gap="1rem"
    >
      <h3>{name}:</h3>
      <Box gap=".4rem" display="grid" gridTemplateColumns="1fr 1fr">
        {items.map(item => (
          <Box key={item} flexDirection="row" gap="2rem">
            <input
              onChange={e => setOptions(name, item, e.target.checked)}
              key={item}
              name={item}
              type="checkbox"
              checked={queryData[name].includes(item) && checked}
            />
            <label htmlFor={item}>{item}</label>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CheckboxList;
