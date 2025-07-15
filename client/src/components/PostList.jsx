// components/PostList.jsx

import { Link } from 'react-router-dom';

const PostList = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return <p className="text-center mt-8 text-gray-500">No blog posts available.</p>;
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {posts.map((post) => (
        <div
          key={post._id}
          className="bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition-all duration-200"
        >
          <h2 className="text-xl font-bold mb-2">{post.title}</h2>
          <p className="text-gray-600 text-sm mb-4">
            {post.excerpt || post.content?.substring(0, 100) + '...'}
          </p>
          <Link
            to={`/posts/${post._id}`}
            className="text-purple-700 font-semibold hover:underline"
          >
            Read More →
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PostList;
