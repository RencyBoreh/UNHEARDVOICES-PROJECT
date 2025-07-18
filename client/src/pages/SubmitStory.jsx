import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import { createStory } from '../services/storyService';

const SubmitStory = () => {
  const { register, handleSubmit, reset, watch } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);
  const imageFile = watch('image');

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage('');

    try {
      let imageUrl = '';
      if (data.image[0]) {
        setUploading(true);
        const formData = new FormData();
        formData.append('image', data.image[0]);

        const uploadRes = await axios.post(`${import.meta.env.VITE_API_URL}/upload`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        imageUrl = uploadRes.data.url;
        setUploading(false);
      }

      const payload = {
        childName: data.childName,
        location: data.location,
        summary: data.summary,
        story: data.story,
        imageUrl,
        submittedBy: data.submittedBy || 'Anonymous',
        volunteerContact: data.volunteerContact || '',
      };

      await createStory(payload);
      reset();
      setMessage('🎉 Story submitted successfully!');
    } catch (error) {
      console.error(error);
      setMessage('❌ Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen px-6 py-10 bg-gradient-to-br from-pink-50 via-purple-100 to-fuchsia-100 dark:from-purple-950 dark:to-violet-900 text-purple-900 dark:text-white">
      <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-pink-400 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
        Submit a Story
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto space-y-4">
        <input {...register('childName')} required placeholder="Child's Name" className="input" />
        <input {...register('location')} required placeholder="Location" className="input" />
        <textarea {...register('summary')} maxLength={280} required placeholder="Short Summary" className="textarea" />
        <textarea {...register('story')} required placeholder="Full Story" className="textarea" />
        <input {...register('submittedBy')} placeholder="Submitted By (optional)" className="input" />
        <input {...register('volunteerContact')} placeholder="Volunteer Contact (optional)" className="input" />
        <input type="file" accept="image/*" {...register('image')} className="input" />

        {imageFile?.[0] && (
          <img
            src={URL.createObjectURL(imageFile[0])}
            alt="Preview"
            className="w-full h-auto rounded shadow object-cover"
          />
        )}

        <button type="submit" disabled={loading || uploading}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded transition">
          {loading ? 'Submitting...' : uploading ? 'Uploading Image...' : 'Submit Story'}
        </button>

        {message && <p className="text-sm text-green-600 dark:text-green-400">{message}</p>}
      </form>
    </section>
  );
};

export default SubmitStory;
