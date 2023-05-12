import { ChangeEvent } from 'react';
import {
  MainCategories,
  clothes,
  other,
  toys,
} from '../../utils/types/enums/enums';
import { ConvertedChangeData } from '../../utils/types/interfaces/general.interfaces';
import { GivePreviewFormData } from '../../utils/types/interfaces/post.interface';

export const getCategory = (group: string): string[] => {
  if (group === MainCategories.B) return clothes;
  if (group === MainCategories.C) return toys;
  if (group === MainCategories.A) return other;
  return [];
};

export const getImgBox = (name: string, i: number): Node => {
  const div = document.createElement('div');
  div.id = `img-box-${name}-${i}`;
  div.style.minHeight = '10rem';
  div.style.minWidth = '10rem';
  div.style.width = '10rem';
  div.style.borderRadius = '8px';
  div.style.margin = '3rem 0';
  div.style.position = 'relative';

  return div;
};

export const getRemoveIcon = (i: number): Node => {
  const div = document.createElement('div');
  div.id = `remove-icon-${i}`;
  div.className = `remove-icon`;
  div.textContent = 'x';

  return div;
};

export const checkIsFormValid = (data: GivePreviewFormData) => {
  if (
    data.title === '' ||
    data.description === '' ||
    data.group === '' ||
    data.age === '' ||
    data.itemCount === '' ||
    data.condition === '' ||
    data.location === '' ||
    !data.categories.length ||
    !data.sizes
  )
    return false;
  return true;
};

export const initialFormValues: GivePreviewFormData = {
  title: '',
  description: '',
  group: '',
  categories: [],
  age: '',
  condition: '',
  itemCount: '',
  sizes: [],
  location: '',
  images: [],
};

// GiveEdit HELPERS

export const handleInputChange = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
): ConvertedChangeData => {
  return {
    name: e.target.name,
    value: e.target.value,
  };
};
