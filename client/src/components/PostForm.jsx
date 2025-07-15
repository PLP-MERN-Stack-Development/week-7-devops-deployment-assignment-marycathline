// src/components/PostForm.jsx

import { useState, useEffect } from 'react';

const PostForm = ({ onSubmit, initialData = {}, isEditing = false }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setContent(initialData.content || '');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
      <div>
        <label className="block mb-1 font-semibold">Title</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-semibold">Content</label>
        <textarea
          className="w-full border border-gray-300 rounded p-2"
          rows={6}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="bg-purple-700 text-white px-4 py-2 rounded">
        {isEditing ? 'Update Post' : 'Create Post'}
      </button>
    </form>
  );
};

export default PostForm;
