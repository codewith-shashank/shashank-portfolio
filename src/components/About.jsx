import { motion } from 'framer-motion';

function About() {
  return (
    <section className="about section" id="about">
      <div className="section-container">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label">01 — ABOUT</p>

          <h2>
            Turning ideas into
            <span> intelligent systems.</span>
          </h2>
        </motion.div>

        <motion.div
          className="about-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <p className="about-main">
            I'm Shashank G, an AI/ML engineering student focused on building
            practical intelligent applications and full-stack systems.
          </p>

          <div className="about-details">
            <p>
              My work sits at the intersection of machine learning, natural
              language processing, backend engineering, and modern web
              development.
            </p>

            <p>
              I enjoy taking complex problems, breaking them into systems,
              and turning them into reliable products that people can
              actually use.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;