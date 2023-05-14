import { FC, useEffect, useRef } from 'react';
import * as S from './chatImgPreview.style';
import { FaTimes } from 'react-icons/fa';

interface ChatImgPreviewProps {
  imgFile: File;
  cancelImg: () => void;
}

const ChatImgPreview: FC<ChatImgPreviewProps> = ({ imgFile, cancelImg }) => {
  const imgBox = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const imgEl = document.getElementById('chat-image');
    if (!imgFile || !imgBox.current || imgEl) return;

    const reader = new FileReader();

    const handleLoad = () => {
      if (!imgBox.current) return;

      const img = document.createElement('img');
      img.id = 'chat-image';
      img.src = reader.result as string;
      imgBox.current.appendChild(img);
    };

    reader.addEventListener('load', handleLoad);

    if (!imgFile || !imgFile.type.startsWith('image/')) return;

    reader.readAsDataURL(imgFile);

    return () => reader.removeEventListener('load', handleLoad);
  }, [imgFile, imgBox.current]);

  return (
    <S.Wrapper padding="2rem">
      <S.ImgBox ref={imgBox}>
        <S.CancelIconBox onClick={cancelImg}>
          <FaTimes size={24} color="#fff" />
        </S.CancelIconBox>
      </S.ImgBox>
    </S.Wrapper>
  );
};

export default ChatImgPreview;
