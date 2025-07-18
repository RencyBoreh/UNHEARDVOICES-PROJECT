import { useEffect, useState } from 'react';
import axios from 'axios';
import MpesaBanner from '../components/MpesaBanner';

const ExplorePage = () => {
  const [stories, setStories] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterLocation, setFilterLocation] = useState('');

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/stories`);
        setStories(res.data);
        setFiltered(res.data); // default view
      } catch (err) {
        console.error('Failed to fetch stories:', err);
      }
    };
    fetchStories();
  }, []);

  useEffect(() => {
    let result = [...stories];
    if (filterStatus) {
      result = result.filter(story => story.status === filterStatus);
    }
    if (filterLocation) {
      result = result.filter(story =>
        story.location.toLowerCase().includes(filterLocation.toLowerCase())
      );
    }
    setFiltered(result);
  }, [filterStatus, filterLocation, stories]);

  return (
    <section className="min-h-screen px-6 py-10 bg-gradient-to-br from-pink-50 via-purple-100 to-fuchsia-100 dark:from-purple-950 dark:to-violet-900 text-purple-900 dark:text-white">
      <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-pink-400 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
        Explore Stories
      </h2>

      <p className="max-w-2xl mx-auto text-center text-lg mb-8">
        Discover real stories from children across Kenya. Filter by location or support status and help make a difference 💖
      </p>

      <div className="max-w-3xl mx-auto mb-10">
        <MpesaBanner />
      </div>

      {/* 🔍 Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="bg-white dark:bg-violet-800 border rounded px-4 py-2 text-sm"
        >
          <option value="">All Statuses</option>
          <option value="Awaiting Help">Awaiting Help</option>
          <option value="Funded">Funded</option>
          <option value="Archived">Archived</option>
        </select>

        <input
          type="text"
          value={filterLocation}
          onChange={e => setFilterLocation(e.target.value)}
          placeholder="Filter by location"
          className="bg-white dark:bg-violet-800 border rounded px-4 py-2 text-sm"
        />
      </div>

      {/* 📚 Story Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {filtered.length === 0 ? (
          <p className="text-center col-span-full text-purple-700 dark:text-fuchsia-200">
            No stories match your filters.
          </p>
        ) : (
          filtered.map(story => (
            <div key={story._id} className="bg-white dark:bg-violet-800 rounded-lg shadow p-5 flex flex-col justify-between">
              <div>
                <img
                  src={story.image}
                  alt={story.childName}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-bold">{story.childName}</h3>
                <p className="text-sm italic">{story.location}</p>
                <p className="text-sm text-purple-700 dark:text-fuchsia-100 mb-2">{story.summary}</p>

                <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                  story.status === 'Awaiting Help'
                    ? 'bg-pink-200 text-pink-800 dark:bg-pink-600 dark:text-white'
                    : story.status === 'Funded'
                    ? 'bg-green-200 text-green-800 dark:bg-green-600 dark:text-white'
                    : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white'
                }`}>
                  {story.status}
                </span>
              </div>

              <div className="mt-4 flex justify-end">
                <a
                  href={`/donate/${story._id}`}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm transition"
                >
                  Support This Child
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default ExplorePage;
