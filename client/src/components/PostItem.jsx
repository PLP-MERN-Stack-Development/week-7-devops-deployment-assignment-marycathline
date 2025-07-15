// src/components/PostItem.jsx
import { Link } from 'react-router-dom';

const PostItem = ({ post }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition">
      <h2 className="text-xl font-bold mb-2">{post.title}</h2>
      <p className="text-gray-600 text-sm mb-4">
        {post.excerpt || post.content?.substring(0, 100) + '...'}
      </p>
      <Link to={`/posts/${post._id}`} className="text-purple-700 font-semibold hover:underline">
        Read More →
      </Link>
    </div>
  );
};

export default PostItem;
