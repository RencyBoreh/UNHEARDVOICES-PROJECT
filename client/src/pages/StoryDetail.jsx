import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';

const StoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/stories/${id}`)
      .then(res => {
        const s = res.data;

        if (!s || s.visibility !== 'published' || s.archived) {
          navigate('/stories', { replace: true });
        } else {
          setStory(s);
        }
      })
      .catch(() => navigate('/stories', { replace: true }))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading || !story) return <Spinner />;

  return (
    <section className="min-h-screen px-6 py-10 bg-gradient-to-bl from-pink-100 via-fuchsia-100 to-purple-200 dark:from-purple-950 dark:to-violet-900 text-purple-900 dark:text-white">
      <div className="max-w-3xl mx-auto space-y-6">
        <img src={story.imageUrl} alt={story.childName} className="w-full h-64 object-cover rounded shadow-lg" />

        <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-400 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
          {story.childName}
        </h2>
        <p className="italic">{story.location}</p>
        <p className="text-sm">{story.summary}</p>
        <p className="mt-4 whitespace-pre-wrap">{story.story}</p>

        <button
          onClick={() => navigate(`/donate/${story._id}`)}
          className="mt-6 px-6 py-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-medium transition"
        >
          Support This Story
        </button>
      </div>
    </section>
  );
};

export default StoryDetail;
