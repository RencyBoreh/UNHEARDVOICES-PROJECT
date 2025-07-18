import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useForm from '../hooks/useForm';
import { submitDonation } from '../services/donationService';
import axios from 'axios';
import MpesaBanner from '../components/MpesaBanner'; // ✅ Import banner

const Donate = () => {
  const { id } = useParams();
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);
  const { register, handleSubmit, onSubmit, loading, message } = useForm(submitDonation);

  useEffect(() => {
    const fetch = async () => {
      const url = id
        ? `${import.meta.env.VITE_API_URL}/stories/${id}`
        : `${import.meta.env.VITE_API_URL}/stories`;
      try {
        const res = await axios.get(url);
        id ? setSelectedStory(res.data) : setStories(res.data);
      } catch (err) {
        console.error('Failed to fetch stories:', err);
      }
    };
    fetch();
  }, [id]);

  return (
    <section className="min-h-screen px-6 py-10 bg-gradient-to-tr from-pink-50 via-purple-100 to-fuchsia-100 dark:from-purple-950 dark:to-violet-900 text-purple-900 dark:text-white">
      <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-pink-400 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
        Support a Story
      </h2>

      <MpesaBanner /> {/* ✅ Banner placed above form */}

      {selectedStory && (
        <div className="max-w-xl mx-auto mb-6 p-4 bg-white dark:bg-violet-800 rounded shadow">
          <img src={selectedStory.image} alt={selectedStory.childName} className="w-full h-48 object-cover rounded mb-4" />
          <h3 className="text-xl font-bold">{selectedStory.childName}</h3>
          <p className="italic text-sm">{selectedStory.location}</p>
          <p className="text-sm mt-2">{selectedStory.summary}</p>
        </div>
      )}
<form
  onSubmit={handleSubmit(onSubmit)}
  className="max-w-xl mx-auto space-y-4"
  encType="multipart/form-data"
>
  {!id && (
    <>
      <label className="block text-sm font-medium mb-1">Select a Story</label>
      <select
        {...register('storyId')}
        required
        className="w-full px-4 py-2 rounded border border-pink-400 bg-white text-purple-900 placeholder:text-purple-500 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:bg-rose-800 dark:text-fuchsia-100 dark:placeholder:text-pink-200 dark:focus:ring-pink-500"
      >
        <option value="">Choose from published stories</option>
        {stories.map(s => (
          <option key={s._id} value={s._id}>
            {s.childName} — {s.location}
          </option>
        ))}
      </select>
      <p className="text-sm mt-1">
        Need help choosing?{' '}
        <Link to="/stories" className="text-purple-600 underline hover:text-purple-700 dark:text-pink-300 dark:hover:text-pink-400">
          Browse Stories
        </Link>
      </p>
    </>
  )}

  {id && (
    <input
      {...register('storyId')}
      type="hidden"
      value={id}
      readOnly
    />
  )}

  <input
    {...register('amount')}
    required
    placeholder="Amount (KES)"
    className="w-full px-4 py-2 rounded border border-pink-400 bg-white text-purple-900 placeholder:text-purple-500 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:bg-rose-800 dark:text-fuchsia-100 dark:placeholder:text-pink-200 dark:focus:ring-pink-500"
  />

  <input
    {...register('mpesaCode')}
    required
    placeholder="M-PESA Code"
    className="w-full px-4 py-2 rounded border border-pink-400 bg-white text-purple-900 placeholder:text-purple-500 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:bg-rose-800 dark:text-fuchsia-100 dark:placeholder:text-pink-200 dark:focus:ring-pink-500"
  />

  <div>
    <label className="block text-sm font-medium mb-1">Proof of Payment (Image)</label>
    <input
      {...register('proofImage')}
      type="file"
      accept="image/*"
      required
      className="w-full px-4 py-2 rounded border border-pink-400 bg-white text-purple-900 file:text-purple-900 file:bg-pink-100 dark:file:text-white dark:file:bg-pink-700 dark:text-fuchsia-100 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:bg-rose-800 dark:focus:ring-pink-500"
    />
  </div>

  <button
    type="submit"
    disabled={loading}
    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded transition"
  >
    {loading ? 'Submitting...' : 'Submit Donation'}
  </button>

  {message && (
    <p className="text-sm text-green-600 dark:text-green-400">{message}</p>
  )}
</form>

    </section>
  );
};

export default Donate;
