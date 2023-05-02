import { FormEvent, useRef } from 'react';
import { useCreateNewPost } from '../../utils/hooks';

const Account = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const mutation = useCreateNewPost();

  const uploadFile = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!fileInputRef.current?.files) return;

    const form = new FormData();
    Array.from(fileInputRef.current.files).forEach(file => {
      form.append('photos', file);
    });

    mutation.mutate(form);
  };

  return (
    <div>
      <form onSubmit={uploadFile}>
        <input ref={fileInputRef} type="file" multiple />;
        <button>Create</button>
      </form>
    </div>
  );
};

export default Account;
