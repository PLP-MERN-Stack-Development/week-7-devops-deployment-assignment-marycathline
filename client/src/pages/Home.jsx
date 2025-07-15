
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import PostList from '../components/PostList';
import axios from 'axios';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('/api/posts')
      .then((res) => setPosts(res.data.data || []))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Latest Posts</h1>
      <PostList posts={posts} />
    </div>
  );
};

export default Home;
