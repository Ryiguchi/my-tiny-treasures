import { FC } from 'react';
import { ResponseWithData } from '../../utils/hooks';
import Box from '../../components/common/Box/Box.component';
import { fileRefs } from '../../utils/fileRefs';
import CategorySlider from './CategorySlider/CategorySlider.component';
import { queryClient } from '../../main';
import { Enum } from '../../utils/interfaces';

const Home: FC = () => {
  const enumsData: ResponseWithData<Enum[]> | undefined =
    queryClient.getQueryData(['enums']);

  return (
    <>
      <Box objectFit="contain" width="100%">
        <img src={fileRefs.homeMain} alt="Kid on bike" />
      </Box>
      <Box>
        {enumsData?.data.data[0].main.map(category => (
          <CategorySlider key={category} category={category} />
        ))}
      </Box>
    </>
  );
};

export default Home;
