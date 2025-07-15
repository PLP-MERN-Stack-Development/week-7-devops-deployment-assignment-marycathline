// src/pages/CreatePost.jsx

import { useNavigate } from 'react-router-dom';
import PostForm from '../components/PostForm';
import axios from 'axios';

const CreatePost = () => {
  const navigate = useNavigate();

  const handleCreate = async (formData) => {
    
    const tempPost = {
      ...formData,
      _id: Date.now(), // temp ID
      createdAt: new Date().toISOString(),
    };

  

    try {
      const res = await axios.post('/api/posts', formData);
      navigate(`/posts/${res.data.data._id}`);
    } catch (err) {
      console.error('Post creation failed:', err.message);
      
    }
  };

  return (
    <div className="mt-6">
      <h1 className="text-2xl font-bold text-center mb-4">Create New Post</h1>
      <PostForm onSubmit={handleCreate} />
    </div>
  );
};

export default CreatePost;
