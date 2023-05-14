import { FC, useEffect, useState } from 'react';
import { ChatMessage } from '../../../utils/types/interfaces/chat.interface';
import Box from '../../../components/common/Box/Box.component';
import * as S from './chatSlideshow.styles';
import { getAllChatImages } from '../chat.helpers';

interface ChatSlideshowProps {
  messages: ChatMessage[];
  initialImage: string;
  setIsSlideshowOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatSlideshow: FC<ChatSlideshowProps> = ({
  messages,
  initialImage,
  setIsSlideshowOpen,
}) => {
  const [imgArray, setImageArray] = useState<string[]>([]);
  const [initialimgIndex, setInitialImgIndex] = useState(-1);
  const [initialImageHasLoaded, setInitialImageHasLoaded] = useState(false);
  useEffect(() => {
    if (!messages) return;

    const imagesArray = getAllChatImages(messages);
    const imgIndex = imagesArray.findIndex(img => img === initialImage);

    setImageArray(imagesArray);
    setInitialImgIndex(imgIndex);
  }, [messages]);

  useEffect(() => {
    if (!initialImageHasLoaded) return;

    document
      .getElementById(`image-${initialimgIndex}`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [initialImageHasLoaded]);

  return (
    <S.Wrapper onClick={() => setIsSlideshowOpen(false)}>
      {imgArray.map((image, i, arr) => {
        // if (i === arr.length - 1) setImagesAreLoading(false);
        return (
          <Box
            key={image}
            width="100%"
            height="100%"
            padding={`${i === 0 ? '1rem' : '.5rem'} 1rem 1rem ${
              i === arr.length - 1 ? '.5rem' : '1rem'
            }`}
            marginBottom={i === arr.length - 1 ? '8rem' : '0'}
          >
            <img
              // ref={initialImage === image ? initialImageRef : null}
              id={`image-${i}`}
              src={image}
              alt="User Image"
              onLoad={() => setInitialImageHasLoaded(true)}
            />
          </Box>
        );
      })}
    </S.Wrapper>
  );
};

export default ChatSlideshow;
