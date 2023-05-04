import { FormEvent, useRef, useState } from 'react';
import { useCreateNewPost } from '../../utils/hooks';
import * as S from './Give.styles';

const Give = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [numItems, setNumItems] = useState('');
  const [category, setCategory] = useState('');
  const [size, setSize] = useState('');
  const [condition, setCondition] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const mutation = useCreateNewPost();

  const createPost = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!fileInputRef.current?.files) return;

    const form = new FormData();
    Array.from(fileInputRef.current.files).forEach(file => {
      form.append('photos', file);
    });
    form.append('title', title);
    form.append('description', description);
    form.append('itemCount', numItems);
    form.append('categories', category);
    form.append('size', size);
    form.append('condition', condition);

    mutation.mutate(form);
  };

  return (
    <div>
      <S.StyledForm onSubmit={createPost}>
        <label htmlFor="tile">Title:</label>
        <input
          onChange={e => setTitle(e.target.value)}
          name="tile"
          type="text"
          required
        />
        <label htmlFor="description">Description:</label>
        <input
          onChange={e => setDescription(e.target.value)}
          name="description"
          type="text"
        />
        <label htmlFor="item-count">Number of articles:</label>
        <input
          onChange={e => setNumItems(e.target.value)}
          name="item-count"
          type="number"
          required
          min={0}
          max={10}
        />
        <label htmlFor="categories">Category:</label>
        <select onChange={e => setCategory(e.target.value)} name="categories">
          <option value="">Choose an option...</option>
          <option value="clothes">Clothes</option>
          <option value="toys">Toys</option>
          <option value="other">Other</option>
        </select>
        {category === 'clothes' && (
          <>
            <label htmlFor="size">Size:</label>
            <select
              onChange={e => setSize(e.target.value)}
              name="size"
              required
            >
              <option value="">Choose an option...</option>

              <option value="1">44</option>
              <option value="2">50/56</option>
              <option value="3">62/68</option>
              <option value="4">74/80</option>
              <option value="5">86/92</option>
              <option value="6">98/104</option>
              <option value="7">110/116</option>
              <option value="8">122/128</option>
              <option value="9">134/140</option>
              <option value="10">146/152</option>
            </select>
          </>
        )}
        {category === 'toys' ||
          (category === 'other' && (
            <>
              <label htmlFor="size">Age:</label>
              <select
                onChange={e => setSize(e.target.value)}
                name="size"
                required
              >
                <option value="">Choose an option...</option>

                <option value="1">0-3</option>
                <option value="2">4-7</option>
                <option value="3">8-11</option>
              </select>
            </>
          ))}
        <label htmlFor="condition">Condition:</label>
        <select onChange={e => setCondition(e.target.value)} name="condition">
          <option value="">Choose an option...</option>

          <option value="used">Used</option>
          <option value="good">Good</option>
          <option value="new">New</option>
        </select>

        <input ref={fileInputRef} type="file" multiple />
        <button>Create</button>
      </S.StyledForm>
    </div>
  );
};

export default Give;
