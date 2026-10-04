import { motion } from 'framer-motion';

const skillGroups = [
  {
    title: 'AI / Machine Learning',
    skills: [
      'Machine Learning',
      'Deep Learning',
      'NLP',
      'Generative AI',
      'PyTorch',
      'NumPy',
      'Pandas',
    ],
  },
  {
    title: 'Development',
    skills: [
      'Python',
      'FastAPI',
      'Flask',
      'React',
      'REST APIs',
      'Full-Stack Development',
    ],
  },
  {
    title: 'Databases & Tools',
    skills: [
      'MySQL',
      'MongoDB',
      'Git',
      'Power BI',
      'Matplotlib',
    ],
  },
];

function Skills() {
  return (
    <section className="skills section" id="skills">
      <div className="section-container">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label">02 — SKILLS</p>

          <h2>
            Tools I use to
            <span> build things.</span>
          </h2>
        </motion.div>

        <div className="skills-grid">
          {skillGroups.map((group, index) => (
            <motion.div
              className="skill-card"
              key={group.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
              }}
            >
              <span className="skill-number">
                0{index + 1}
              </span>

              <h3>{group.title}</h3>

              <div className="skill-list">
                {group.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;