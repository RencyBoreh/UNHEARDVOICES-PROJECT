import { useEffect } from 'react';
import AOS from 'aos';

const About = () => {
  useEffect(() => {
    AOS.init({ once: true, duration: 800 });
  }, []);

  return (
    <section className="min-h-screen px-6 py-16 bg-gradient-to-br from-pink-100 via-fuchsia-200 to-purple-200 dark:from-violet-900 dark:via-purple-900 dark:to-fuchsia-900 text-purple-900 dark:text-white">
      <div className="max-w-4xl mx-auto space-y-6" data-aos="fade-up">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-400 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
          About VoicesUnheard
        </h2>

        <p className="text-lg">
          VoicesUnheard is a community-powered platform committed to amplifying the real-life stories of vulnerable children across Kenya and beyond. We believe storytelling can heal, unite, and inspire action.
        </p>

        <p className="text-lg" data-aos="fade-up" data-aos-delay="150">
          By collecting stories directly from caretakers and families, and giving donors direct insight into what their support enables, we build a compassionate space where dignity and empathy lead change.
        </p>

        <p className="text-lg" data-aos="fade-up" data-aos-delay="250">
          Every child’s journey deserves to be heard — and through VoicesUnheard, we turn those stories into movement, memories, and momentum.
        </p>

        <img
          src="https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1200&q=80"
          alt="Empowering Voices"
          className="rounded-lg shadow-lg w-full object-cover mt-6"
          data-aos="fade-up"
          data-aos-delay="300"
        />
      </div>
    </section>
  );
};

export default About;
