import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectUser } from '../../store/features/user/user.selectors';
import { socket } from '../../socket';
import { useAllPosts } from '../../utils/hooks';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const { status, data, error, isFetching } = useAllPosts();

  const goToChat = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    if (!user) return;

    const receiver = e.currentTarget.dataset.user;
    socket.emit('join', [user.id, receiver]);
  };

  const goToItem = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    const itemId = e.currentTarget.dataset.item;
    navigate(`/posts/${itemId}`);
  };

  return (
    <>
      <ul>
        {data?.data.posts.map(item => (
          <li key={item._id}>
            <div onClick={goToChat} data-user={item.user}>
              USER: {item.user}
            </div>
            <div onClick={goToItem} data-item={item._id}>
              ITEM_ID{item._id}
            </div>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate('/signin')}>LogIn</button>
      {/* <button onClick={getPosts}>Get</button> */}
      <button onClick={() => navigate('/messages')}>Messages</button>
      {<h1>{status}</h1>}
    </>
  );
};

export default Home;
