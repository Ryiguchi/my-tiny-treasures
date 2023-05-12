import { FC, Dispatch, useRef, useState, useEffect } from 'react';
import Input from '../../../components/common/Input/Input.component';
import SelectInput from '../../../components/common/SelectInput/SelectInput.component';
import Box from '../../../components/common/Box/Box.component';
import UploadImageBox from '../UploadImageBox/UploadImageBox.component';
import * as S from './giveEdit.styles';
import { ButtonType } from '../../../components/common/Button/button.types';
import Button from '../../../components/common/Button/Button.component';
import {
  checkIsFormValid,
  getCategory,
  getImgBox,
  getRemoveIcon,
  handleInputChange,
} from '../give.helpers';
import {
  ages,
  conditions,
  mainCategories,
} from '../../../utils/types/enums/enums';
import { GivePreviewFormData } from '../../../utils/types/interfaces/post.interface';
import { ConvertedChangeData } from '../../../utils/types/interfaces/general.interfaces';

interface GiveEditProps {
  setFormValues: Dispatch<React.SetStateAction<GivePreviewFormData>>;
  setShowPreview: Dispatch<React.SetStateAction<boolean>>;
  formValues: GivePreviewFormData;
}

const GiveEdit: FC<GiveEditProps> = ({
  setFormValues,
  setShowPreview,
  formValues,
}) => {
  const [addCategorySelect, setAddCategorySelects] = useState(false);

  const imgPreviewRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const imgFilesRef = useRef<File[]>([]);

  useEffect(() => {
    if (addCategorySelect || formValues.categories.length > 0) return;
    if (formValues.categories.length === 0) {
      setAddCategorySelects(true);
    }
  }, [formValues.categories]);

  // HANDLING CHANGE
  const handleSelectChange = ({ name, value }: ConvertedChangeData): void => {
    if (value instanceof File) return;
    const data: ConvertedChangeData = {
      name,
      value: [...formValues[name], value] as string[],
    };
    handleChange(data);
    if (name === 'categories') setAddCategorySelects(false);
  };

  const handleChange = ({ name, value }: ConvertedChangeData) => {
    const newFormValues = { ...formValues };
    newFormValues[name] = value;

    setFormValues(newFormValues);
  };

  // FILE PICKING
  const setImagesToFormValues = (): void => {
    const data = {
      name: 'images',
      value: imgFilesRef.current,
    };
    handleChange(data);
  };

  const openFilePicker = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleChooseImage = () => {
    if (!fileInputRef.current?.files) return;

    const files = [...fileInputRef.current.files];
    const newFileArray = [...imgFilesRef.current, ...files];
    imgFilesRef.current = newFileArray;

    setImagesToFormValues();

    files.forEach((file, i) => {
      const reader = new FileReader();
      const imgBox = getImgBox(file.name, i);
      const removeIcon = getRemoveIcon(i);

      removeIcon.addEventListener('click', () => {
        const newFileArray = [...imgFilesRef.current];
        const index = newFileArray.findIndex(imgFile => {
          return file.name === imgFile.name;
        });
        newFileArray.splice(index, 1);
        imgFilesRef.current = newFileArray;
        setImagesToFormValues();

        document.getElementById(`img-box-${file.name}-${i}`)?.remove();
      });

      const handleLoad = () => {
        const img = document.createElement('img');
        img.src = reader.result as string;
        img.id = `${file.name}-${i}`;
        imgBox.appendChild(img);
        imgBox.appendChild(removeIcon);
        imgPreviewRef.current?.appendChild(imgBox);
      };
      reader.addEventListener('load', handleLoad);

      if (!file || !file.type.startsWith('image/')) return;
      reader.readAsDataURL(file);
    });
  };

  // MULTIPLE SELECT OPTIONS

  return (
    <>
      <UploadImageBox onClick={openFilePicker} />
      <S.ImagePreviewBox ref={imgPreviewRef}></S.ImagePreviewBox>
      <Box gap="2rem" width="100%" margin="0 auto">
        <S.FileInput
          onChange={handleChooseImage}
          ref={fileInputRef}
          type="file"
          multiple
        />
        <Input
          onChange={e => handleChange(handleInputChange(e))}
          label="Title"
          name="title"
          type="text"
          previousValue={formValues.title}
          required
        />
        <Input
          onChange={e => handleChange(handleInputChange(e))}
          label="Description"
          name="description"
          type="textarea"
          previousValue={formValues.description}
          required
        />
        <SelectInput
          handleSelect={handleChange}
          name="group"
          previousValue={formValues.group}
          optionsArray={mainCategories}
          initialValue="Group"
          required
        />

        {formValues.categories.map((category, i) => (
          <SelectInput
            key={category}
            handleSelect={handleSelectChange}
            name="categories"
            previousValue={formValues.categories[i]}
            optionsArray={getCategory(formValues.group)}
            initialValue="Category"
            required
            disabled={formValues.group === ''}
          />
        ))}
        {addCategorySelect && (
          <SelectInput
            handleSelect={handleSelectChange}
            name="categories"
            previousValue=""
            optionsArray={getCategory(formValues.group)}
            initialValue="Category"
            required
            disabled={formValues.group === ''}
          />
        )}

        <Button
          buttonType={ButtonType.Primary}
          onClick={() => setAddCategorySelects(true)}
          disabled={
            formValues.group === '' || formValues.categories.length >= 5
          }
        >
          Add Category
        </Button>
        <SelectInput
          handleSelect={handleChange}
          name="age"
          previousValue={formValues.age}
          optionsArray={ages}
          initialValue="Age Group"
          required
        />
        <Input
          onChange={e => handleChange(handleInputChange(e))}
          name="itemCount"
          label="Number of Items"
          type="number"
          previousValue={formValues.itemCount}
          min={1}
          max={10}
          required
        />
        <SelectInput
          handleSelect={handleChange}
          name="condition"
          previousValue={formValues.condition}
          optionsArray={conditions}
          initialValue="Condition"
          required
        />
        <SelectInput
          handleSelect={handleChange}
          name="location"
          previousValue={formValues.location}
          optionsArray={['Home']}
          initialValue="Location"
          required
        />
        <Button
          buttonType={ButtonType.Primary}
          // disabled={checkIsFormValid(formValues)}
          onClick={() => setShowPreview(true)}
          type="button"
        >
          {checkIsFormValid(formValues) ? 'review' : 'invalid'}
        </Button>
      </Box>
    </>
  );
};

export default GiveEdit;
