import { motion } from 'framer-motion';

function Contact() {
  return (
    <section
      className="contact section"
      id="contact"
    >
      <div className="section-container">
        <motion.div
          className="contact-content"
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.7,
          }}
        >
          <div className="contact-glow" />

          <p className="section-label">
            06 — CONTACT
          </p>

          <h2>
            Let's build something
            <span> meaningful.</span>
          </h2>

          <p className="contact-description">
            Have an idea, opportunity, or project worth
            discussing? Feel free to reach out.
          </p>

          <motion.a
            href="mailto:shashankg1808@gmail.com"
            className="contact-email"
            whileHover={{ y: -3 }}
            transition={{
              duration: 0.2,
            }}
          >
            shashankg1808@gmail.com
            <span>↗</span>
          </motion.a>

          <div className="contact-links">
            <motion.a
              href="https://github.com/codewith-shashank"
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
            >
              GitHub
              <span>↗</span>
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/shashank-g-02096a3a5/"
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
            >
              LinkedIn
              <span>↗</span>
            </motion.a>

            <motion.a
              href="https://leetcode.com/u/shaky_codes/"
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
            >
              LeetCode
              <span>↗</span>
            </motion.a>
          </div>
        </motion.div>

        <div className="contact-footer">
          <span>© 2026 Shashank G</span>

          <span>
            Built with React & Framer Motion
          </span>
        </div>
      </div>
    </section>
  );
}

export default Contact;