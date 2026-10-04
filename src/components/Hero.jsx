import { motion } from 'framer-motion';

function Hero() {
  return (
    <section
      className="hero"
      id="home"
      onMouseMove={(event) => {
        const rect =
          event.currentTarget.getBoundingClientRect();

        const x =
          ((event.clientX - rect.left) / rect.width) * 100;

        const y =
          ((event.clientY - rect.top) / rect.height) * 100;

        event.currentTarget.style.setProperty(
          '--mouse-x',
          `${x}%`
        );

        event.currentTarget.style.setProperty(
          '--mouse-y',
          `${y}%`
        );
      }}
    >
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.p
          className="hero-eyebrow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.3,
            duration: 0.6,
          }}
        >
          AI/ML ENGINEER · FULL-STACK DEVELOPER
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.4,
            duration: 0.7,
          }}
        >
          Engineering intelligent
          <span> systems that matter.</span>
        </motion.h1>

        <motion.p
          className="hero-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.6,
            duration: 0.7,
          }}
        >
          I build AI-powered applications and full-stack
          systems, combining machine learning with modern
          web technologies to solve practical problems.
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.8,
            duration: 0.7,
          }}
        >
          <a
            href="#projects"
            className="primary-button"
          >
            View Projects
          </a>

          <a
            href="/resume.pdf"
            download
            className="secondary-button"
          >
            Download Resume
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-orb"
        animate={{
          y: [0, -15, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div className="orb-inner" />
      </motion.div>

      <motion.div
        className="hero-scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 1.5,
          duration: 0.8,
        }}
      >
        <span>SCROLL TO EXPLORE</span>

        <motion.div
          className="scroll-line"
          animate={{
            scaleY: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </section>
  );
}

export default Hero;