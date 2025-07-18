import { Link, useNavigate } from 'react-router-dom';

const StoryCard = ({ story }) => {
  const navigate = useNavigate();

  // 🚫 Skip card if story is not published or is archived
  if (story.visibility !== 'published' || story.archived) return null;

  return (
    <div className="rounded-lg overflow-hidden shadow-lg bg-gradient-to-tr from-pink-400 via-fuchsia-500 to-purple-600 text-white transition duration-300">
      <img
        src={story.imageUrl}
        alt={story.childName}
        className="w-full h-48 object-cover"
      />

      <div className="p-4 space-y-2">
        <h2 className="text-lg font-bold bg-gradient-to-r from-pink-400 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
          {story.childName}
        </h2>

        <p className="text-sm italic opacity-80">{story.location}</p>
        <p className="text-sm line-clamp-3">{story.summary}</p>

        <div className="flex justify-between items-center mt-3">
          <Link
            to={`/stories/${story._id}`}
            className="px-4 py-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-medium transition"
          >
            Read More →
          </Link>

          <button
            onClick={() => navigate(`/donate/${story._id}`)}
            className="px-4 py-2 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-medium transition"
          >
            Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
