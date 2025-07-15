// src/pages/PostDetail.jsx
import useFetch from '../hooks/useFetch';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`/api/posts/${id}`)
      .then((res) => setPost(res.data.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!post) return <p className="text-center mt-10 text-gray-500">Loading post...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-6">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-600 text-sm mb-4">{new Date(post.createdAt).toLocaleString()}</p>
      <div className="text-lg text-gray-800 whitespace-pre-line">{post.content}</div>
    </div>
  );
};

export default PostDetail;
