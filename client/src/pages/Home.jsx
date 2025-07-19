import { Link } from 'react-router-dom';
import StoryCard from '../components/StoryCard';
import Spinner from '../components/Spinner';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import MpesaBanner from '../components/MpesaBanner';
import hero from '../assets/hero.jpg'
import money from '../assets/money.jpg'
const Home = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ once: true, duration: 800 });
    axios.get(`${import.meta.env.VITE_API_URL}/stories`)
      .then(res => {
        const array = Array.isArray(res.data) ? res.data : res.data.stories || [];
        setStories(array);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-fuchsia-100 to-purple-100 dark:from-purple-950 dark:to-violet-900 text-purple-900 dark:text-white">

       {/* Hero Section */}
       <section
      className="text-center px-6 py-20 bg-gradient-to-br from-pink-50 via-purple-100 to-fuchsia-100 dark:from-purple-950 dark:to-violet-900 text-purple-900 dark:text-white"
      data-aos="fade-up"
    >
      <div className="max-w-4xl mx-auto">
        <img
          src={hero}
          alt="Children storytelling"
          className="mx-auto mb-8 rounded-xl shadow-xl w-full max-w-3xl object-cover"
        />

        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-pink-400 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent mb-4">
          Voices That Must Be Heard
        </h1>

        <p className="max-w-2xl mx-auto text-lg text-purple-800 dark:text-purple-200 opacity-90 mb-8">
          Vulnerable children deserve a space where their stories can shine. Every contribution helps us create hope, dignity, and lasting change.
        </p>

        <Link
          to="/submit"
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-medium transition shadow-md"
        >
          Submit a Story
        </Link>

        <div className="mt-10">
          <MpesaBanner /> {/* ✅ Banner promoting donation */}
        </div>
      </div>
    </section>

      {/* Featured Stories */}
      <section className="px-6 py-16 bg-gradient-to-tr from-pink-50 to-fuchsia-100 dark:from-purple-900 dark:to-violet-800" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-pink-400 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
          Featured Stories
        </h2>
        {loading ? (
          <Spinner />
        ) : Array.isArray(stories) ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.slice(0, 6).map((story, index) => (
              <div data-aos="fade-up" data-aos-delay={index * 100} key={story._id}>
                <StoryCard story={story} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-sm text-rose-500">Error loading stories. Please try again later.</p>
        )}
        <div className="text-center mt-6">
          <Link to="/stories" className="text-purple-600 hover:underline font-medium">View All Stories →</Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-16 bg-gradient-to-bl from-pink-50 via-purple-100 to-fuchsia-100 dark:from-purple-950 dark:to-violet-900" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-pink-400 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
          How It Works
        </h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          {[
            {
              img: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=600&q=80',
              title: '1. Submit a Story',
              desc: 'Anyone can share a child\'s story to raise awareness and seek help.',
            },
            {
              img: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=600&q=80',
              title: '2. Spread the Word',
              desc: 'Stories are shared publicly and emotionally connect with supporters worldwide.',
            },
            {
              img: 'https://images.unsplash.com/photo-1605902711622-cfb43c4437d3?auto=format&fit=crop&w=600&q=80',
              title: '3. Donate Securely',
              desc: 'Supporters send M-PESA contributions tracked and verified in the dashboard.',
            },
          ].map((step, i) => (
            <div key={i} data-aos="fade-up" data-aos-delay={(i + 1) * 100}>
              <img src={step.img} alt={step.title} className="mx-auto mb-4 rounded-lg shadow-md h-32 object-cover" />
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Impact Section */}
      <section className="px-6 py-16 bg-gradient-to-br from-pink-100 to-rose-200 dark:from-purple-950 dark:to-violet-900" data-aos="fade-up">
       <div className="mx-auto mb-8 w-full max-w-3xl h-48 sm:h-56 md:h-64 rounded-lg shadow-lg flex items-center justify-center px-6 text-center bg-gradient-to-br from-pink-100 via-purple-100 to-fuchsia-200 dark:from-purple-900 dark:via-fuchsia-900 dark:to-purple-950">
      <p className="text-purple-800 dark:text-white text-lg md:text-xl font-semibold leading-snug">
        Your kindness sparks real change. One story at a time, one child at a time.
      </p>
        </div>

        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-pink-400 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
          Our Impact
        </h2>
        <div className="max-w-3xl mx-auto grid gap-6 text-center">
          <p className="text-lg">🌍 Over <span className="font-bold text-pink-600 dark:text-pink-400">1,500+</span> children’s voices amplified</p>
          <p className="text-lg">💛 KES <span className="font-bold text-pink-600 dark:text-pink-400">6.2M+</span> raised via community support</p>
          <p className="text-lg">📘 Stories published in <span className="font-bold text-pink-600 dark:text-pink-400">5 countries</span></p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-16 bg-gradient-to-r from-pink-50 to-purple-100 dark:from-purple-950 dark:to-violet-900" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-pink-400 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
          Community Voices
        </h2>
        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
          {[
            { quote: '“Supporting one story made me realize I could help many.”', author: 'Amina, Donor' },
            { quote: '“VoicesUnheard helped our village get real visibility.”', author: 'James, Volunteer' },
            { quote: '“This site gave me hope when I had nowhere else to turn.”', author: 'Grace, Submitter' },
          ].map((t, i) => (
            <div key={i} className="bg-white dark:bg-violet-800 p-4 rounded shadow" data-aos="fade-up" data-aos-delay={i * 100}>
              <p className="italic mb-2">{t.quote}</p>
              <h4 className="font-semibold">— {t.author}</h4>
            </div>
          ))}
        </div>
      </section>

    {/* Newsletter CTA */}
<section className="px-6 py-20 text-center bg-gradient-to-r from-pink-50 to-purple-100 dark:from-purple-950 dark:to-violet-900" data-aos="fade-up">
  <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-400 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent mb-4">
    Stay Informed
  </h2>
  <p className="max-w-xl mx-auto text-lg opacity-90 mb-6">
    Sign up to hear about new stories, impact reports, and campaign updates delivered straight to your inbox.
  </p>
  <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 justify-center">
    <input
      type="email"
      required
      placeholder="Your email address"
      className="input flex-1 bg-white dark:bg-violet-800 border-pink-300 dark:border-purple-600 text-purple-800 dark:text-white"
    />
    <button
      type="submit"
      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded transition"
    >
      Subscribe
    </button>
  </form>
</section>
</main> ); }; 
export default Home;