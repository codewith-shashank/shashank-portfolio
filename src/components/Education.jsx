import { motion } from 'framer-motion';

const education = [
  {
    period: '2023 — 2027',
    degree: 'Bachelor of Technology in AI/ML',
    institution: 'Sri Krishna Institute of Technology',
    location: 'Bengaluru, India',
    detail: 'CGPA: 7.66',
  },
  {
    period: '2021-2023',
    degree: 'Senior Secondary — CBSE PCMB',
    institution: 'Kendriya Vidyalaya No. 2',
    location: 'Bengaluru, India',
    detail: '71.2%',
  },
  {
    period: '2011 — 2021',
    degree: 'School Education - CBSE',
    institution: 'Kendriya Vidyalaya No. 2',
    location: 'Bengaluru, India',
    detail: '85.2%',
  },
];

function Education() {
  return (
    <section
      className="education section"
      id="education"
    >
      <div className="section-container">
        <motion.div
          className="section-heading"
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
          <p className="section-label">
            05 — EDUCATION
          </p>

          <h2>
            Where I learned
            <span> to build.</span>
          </h2>
        </motion.div>

        <div className="education-timeline">
          <div className="education-line" />

          <div className="education-list">
            {education.map((item, index) => (
              <motion.article
                className="education-item"
                key={`${item.degree}-${item.period}`}
                initial={{
                  opacity: 0,
                  x: -30,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                }}
              >
                <div className="education-marker">
                  <span />
                </div>

                <div className="education-period">
                  {item.period}
                </div>

                <div className="education-content">
                  <h3>{item.degree}</h3>

                  <p className="education-institution">
                    {item.institution}
                  </p>

                  <p className="education-location">
                    {item.location}
                    <span> · </span>
                    {item.detail}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Education;