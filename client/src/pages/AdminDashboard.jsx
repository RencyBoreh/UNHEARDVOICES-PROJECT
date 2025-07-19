import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [pendingStories, setPendingStories] = useState([]);
  const [publishedStories, setPublishedStories] = useState([]);
  const [archivedStories, setArchivedStories] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // 🔁 Reusable fetches
  const fetchPublishedStories = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/stories`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPublishedStories(res.data);
    } catch (err) {
      console.error('Published stories not fetched:', err);
    }
  };

  const fetchArchivedStories = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/archived`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setArchivedStories(res.data);
    } catch (err) {
      console.error('Archived stories not fetched:', err);
    }
  };

  useEffect(() => {
    if (!token) return navigate('/admin/login');

    const fetchStats = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
      } catch (err) {
        console.error(err);
        setError('Session expired or unauthorized.');
        localStorage.removeItem('token');
        navigate('/admin/login');
      }
    };

    const fetchPendingStories = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/stories/pending`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPendingStories(res.data);
      } catch (err) {
        console.error('Pending stories not fetched:', err);
      }
    };

    fetchStats();
    fetchPendingStories();
    fetchPublishedStories();
    fetchArchivedStories();
  }, [navigate, token]);

  const handlePublish = async (id) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/stories/${id}/publish`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPendingStories(prev => prev.filter(s => s._id !== id));
      fetchPublishedStories();
    } catch (err) {
      console.error('Publish failed:', err);
    }
  };

  const handleDelete = async (id, childName, listSetter) => {
    const confirm = window.confirm(`Are you sure you want to permanently delete the story for "${childName}"?`);
    if (!confirm) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/stories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      listSetter(prev => prev.filter(s => s._id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleArchive = async (id) => {
    const confirm = window.confirm('Archive this story? It will be hidden from public view.');
    if (!confirm) return;

    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/stories/${id}/archive`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPublishedStories(prev => prev.filter(s => s._id !== id));
      fetchArchivedStories();
    } catch (err) {
      console.error('Archive failed:', err);
    }
  };

  const handleReactivate = async (id) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/stories/${id}/reactivate`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setArchivedStories(prev => prev.filter(s => s._id !== id));
      fetchPublishedStories();
    } catch (err) {
      console.error('Reactivation failed:', err);
    }
  };

  if (error || !stats) {
    return (
      <section className="min-h-screen flex justify-center items-center bg-gradient-to-br from-pink-50 via-purple-50 to-fuchsia-100 dark:from-purple-950 dark:to-violet-900 text-purple-900 dark:text-white">
        <p>{error || 'Loading dashboard...'}</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen px-6 py-10 bg-gradient-to-br from-pink-50 via-purple-50 to-fuchsia-100 dark:from-purple-950 dark:to-violet-900 text-purple-900 dark:text-white">
      <h2 className="text-3xl font-bold text-center mb-10 bg-gradient-to-r from-pink-400 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
        Admin Dashboard
      </h2>

      {/* 🔢 Stats */}
      <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
        <div className="bg-white dark:bg-violet-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Total Stories</h3>
          <p className="text-3xl font-bold">{stats.totalStories ?? 0}</p>
        </div>
        <div className="bg-white dark:bg-violet-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Awaiting Help</h3>
          <p className="text-3xl font-bold">{stats.awaitingHelp ?? 0}</p>
        </div>
        <div className="bg-white dark:bg-violet-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Total Donations</h3>
          <p className="text-3xl font-bold">KES {(stats.totalDonations ?? 0).toLocaleString()}</p>
        </div>
        <div className="bg-white dark:bg-violet-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Unique Supporters</h3>
          <p className="text-3xl font-bold">{stats.uniqueDonors ?? 0}</p>
        </div>
      </div>

      {/* ⏳ Pending Stories */}
      <h3 className="text-2xl font-bold mb-4 text-center">Pending Stories</h3>
      <div className="space-y-6 max-w-4xl mx-auto">
        {pendingStories.length === 0 ? (
          <p className="text-center">🎉 No pending stories!</p>
        ) : (
          pendingStories.map(story => (
            <div key={story._id} className="bg-white dark:bg-violet-800 shadow rounded-lg p-4">
              <h4 className="text-lg font-bold">{story.childName}</h4>
              <p className="text-sm mb-1">📍 {story.location}</p>
              <p className="text-sm mb-4 text-purple-700 dark:text-fuchsia-100">{story.summary}</p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => handlePublish(story._id)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition"
                >
                  Publish
                </button>
                <button
                  onClick={() => handleDelete(story._id, story.childName, setPendingStories)}
                  className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ✅ Published Stories */}
      <h3 className="text-2xl font-bold mt-12 mb-4 text-center">Published Stories</h3>
      <div className="space-y-6 max-w-4xl mx-auto">
        {publishedStories.length === 0 ? (
          <p className="text-center">No published stories found.</p>
        ) : (
          publishedStories.map(story => (
            <div key={story._id} className="bg-white dark:bg-violet-800 shadow rounded-lg p-4">
              <h4 className="text-lg font-bold">{story.childName}</h4>
              <p className="text-sm italic mb-1">Status: {story.status}</p>
              <p className="text-sm mb-1">📍 {story.location}</p>
              <p className="text-sm mb-4 text-purple-700 dark:text-fuchsia-100">{story.summary}</p>

             <div className="flex gap-3 justify-end">
               <button onClick={() => handleArchive(story._id)} className="bg-fuchsia-500 hover:bg-fuchsia-600 text-white px-4 py-2 rounded transition" > Archive </button>
              <button onClick={() => handleDelete(story._id, story.childName, setPublishedStories)} className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded transition" > Delete </button> 
             </div> 
             </div> )) )}
       </div>

{/* 🗂️ Archived Stories */}
 <h3 className="text-2xl font-bold mt-12 mb-4 text-center">Archived Stories</h3>
  <div className="space-y-6 max-w-4xl mx-auto"> {archivedStories.length === 0 ? ( 
    <p className="text-center">No archived stories available.</p> ) : ( archivedStories.map(story => ( <div key={story._id} className="bg-gray-100 dark:bg-violet-900 shadow rounded-lg p-4"> <h4 className="text-lg font-bold">{story.childName}</h4> <p className="text-sm italic mb-1">Status: {story.status}</p> <p className="text-sm mb-1">📍 {story.location}</p> <p className="text-sm mb-4 text-purple-700 dark:text-fuchsia-100">{story.summary}</p> <div className="flex gap-3 justify-end"> <button onClick={() => handleReactivate(story._id)} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition" > Reactivate </button> <button onClick={() => handleDelete(story._id, story.childName, setArchivedStories)} className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded transition" > Delete </button> </div> </div> )) )} </div> </section> ); };

export default AdminDashboard;