import { FC, useState, useEffect, Dispatch } from 'react';
import { GivePreviewFormData } from '../../../utils/types/interfaces/post.interface';
import Box from '../../../components/common/Box/Box.component';
import Button from '../../../components/common/Button/Button.component';
import * as S from './givePreview.styles';
import PostCardLarge from '../../../components/PostCardLarge/PostCardLarge.component';
import { Post } from '../../../utils/types/interfaces/state.interface';
import { ButtonType } from '../../../components/common/Button/button.types';
import { useCreateNewPost } from '../../../utils/hooks/reactQueryHooks';

interface GivePreviewProps {
  formData: GivePreviewFormData;
  setShowPreview: Dispatch<React.SetStateAction<boolean>>;
}

const GivePreview: FC<GivePreviewProps> = ({ formData, setShowPreview }) => {
  const [imgSrcArray, setImgSrcArray] = useState<string[]>([]);
  const [postData, setPostData] = useState<Post | null>(null);

  const mutation = useCreateNewPost();

  const createPostData = (): Post => {
    const post = {
      ...formData,
      id: '',
      createdAt: new Date(Date.now()).toString(),
      location: {
        city: 'Stockholm',
      },
      images: imgSrcArray,
      itemCount: parseInt(formData.itemCount),
    };
    return post;
  };

  useEffect(() => {
    if (!formData) return;

    const newPostData = createPostData();
    setPostData(newPostData);
  }, [imgSrcArray]);

  useEffect(() => {
    if (!formData.images) return;

    const promises: Promise<string>[] = [];

    formData.images.forEach(img => {
      const reader = new FileReader();

      if (!img || !img.type.startsWith('image/')) return;

      promises.push(
        new Promise(resolve => {
          reader.onload = () => {
            const result = reader.result as string;
            resolve(result);
          };
          reader.readAsDataURL(img);
        })
      );

      Promise.all(promises).then(results => {
        setImgSrcArray(results);
      });
    });
  }, [formData.images]);

  // const createPost = (e: FormEvent<HTMLFormElement>): void => {
  //   e.preventDefault();
  //   console.log('SUBMIT');

  //   const form = new FormData();
  //   imgFilesRef.current.forEach(file => {
  //     form.append('photos', file);
  //   });
  //   form.append('title', title);
  //   form.append('description', description);
  //   form.append('mainCategory', group);
  //   categories.forEach(category => {
  //     form.append('subCategories', category);
  //   });
  //   form.append('age', age);
  //   sizes.forEach(size => {
  //     form.append('size', size);
  //   });
  //   form.append('itemCount', itemCount);
  //   form.append('condition', condition);
  //   // for (const [key, value] of form.entries()) {
  //   //   console.log(key, value);
  //   // }
  //   // mutation.mutate(form);
  // };

  return (
    <S.Wrapper gap="5rem">
      {postData && <PostCardLarge post={postData} />}
      <Box flexDirection="row" justifyContent="center" gap="3rem">
        <Button
          onClick={() => setShowPreview(false)}
          buttonType={ButtonType.Message}
        >
          Edit
        </Button>
        <Button buttonType={ButtonType.Trade}>Publish</Button>
      </Box>
    </S.Wrapper>
  );
};

export default GivePreview;
