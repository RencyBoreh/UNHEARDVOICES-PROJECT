import { useState, useEffect } from 'react';
import AOS from 'aos';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({ once: true, duration: 800 });
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/contact`, form);
      toast.success('✅ Message sent successfully!');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      toast.error('❌ Failed to send. Try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen px-6 py-16 bg-gradient-to-tr from-pink-50 via-purple-100 to-fuchsia-100 dark:from-purple-950 dark:to-violet-900 text-purple-900 dark:text-white">
      <Toaster position="bottom-right" reverseOrder={false} />

      <div className="max-w-2xl mx-auto space-y-8" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-pink-400 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
          Get In Touch
        </h2>
        <p className="text-center text-lg">
          We’d love to hear from you — feedback, questions, collaborations, or stories worth telling.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4" data-aos="fade-up" data-aos-delay="100">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded border border-pink-400 bg-white text-purple-900 placeholder:text-purple-500 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:bg-rose-800 dark:text-fuchsia-100 dark:placeholder:text-pink-200 dark:focus:ring-pink-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded border border-pink-400 bg-white text-purple-900 placeholder:text-purple-500 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:bg-rose-800 dark:text-fuchsia-100 dark:placeholder:text-pink-200 dark:focus:ring-pink-500"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            required
            rows={5}
            value={form.message}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded border border-fuchsia-500 bg-white text-purple-900 placeholder:text-purple-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 dark:bg-fuchsia-800 dark:text-fuchsia-100 dark:placeholder:text-pink-200 dark:focus:ring-fuchsia-500 resize-none"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full font-medium transition ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
