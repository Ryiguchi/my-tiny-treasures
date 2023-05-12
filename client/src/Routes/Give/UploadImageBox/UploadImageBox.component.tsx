import { FC } from 'react';
import { theme } from '../../../styles/themes';
import { FaCamera } from 'react-icons/fa';
import * as S from './uploadImageBox.styles';

interface UploadImageBoxProps {
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const UploadImageBox: FC<UploadImageBoxProps> = ({ onClick }) => {
  return (
    <S.Wrapper
      width="100%"
      height="25rem"
      borderRadius={theme.radius.image}
      backgroundColor={theme.color.black}
      alignItems="center"
      justifyContent="center"
      gap="3rem"
      onClick={onClick}
    >
      <FaCamera color="#f5f5f5" size={72} />
      <p>Upload Images here from your photo library</p>
    </S.Wrapper>
  );
};

export default UploadImageBox;
