import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';

const projects = [
  {
    number: '01',
    title: 'AI-Resume Analyzer',
    description:
      'A full-stack AI-powered resume analyzer that evaluates PDF and DOCX resumes, generates ATS compatibility scores, performs keyword analysis, matches resumes against job descriptions, and provides AI-driven recommendations.',
    technologies: [
      'React',
      'FastAPI',
      'NLP',
      'LLMs',
      'Groq API',
    ],
    link: 'https://github.com/codewith-shashank/ai-resume-analyzer',
  },
  {
    number: '02',
    title: 'Automated Grading System',
    description:
      'An AI-powered grading system that evaluates handwritten answer sheets using OCR, NLP, and semantic similarity. It provides question-wise examiner-style scoring, diagram evaluation, and explainable feedback.',
    technologies: [
      'OCR',
      'NLP',
      'Semantic Similarity',
      'AI',
      'Python',
    ],
    link: 'https://github.com/codewith-shashank/AutoGradeAI',
  },
  {
    number: '03',
    title: 'FraudShield',
    description:
      'A full-stack healthcare insurance fraud detection system using Gradient Boosting and Isolation Forest to detect anomalous claims and generate real-time fraud risk scores.',
    technologies: [
      'Machine Learning',
      'Gradient Boosting',
      'Isolation Forest',
      'Flask',
      'React',
      'SQLite',
    ],
    link: 'https://github.com/codewith-shashank/FraudShield',
  },
];

function ProjectCard({ project, index }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(y, [-100, 100], [5, -5]),
    {
      stiffness: 200,
      damping: 20,
    }
  );

  const rotateY = useSpring(
    useTransform(x, [-100, 100], [-5, 5]),
    {
      stiffness: 200,
      damping: 20,
    }
  );

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const mouseX =
      event.clientX - rect.left - rect.width / 2;

    const mouseY =
      event.clientY - rect.top - rect.height / 2;

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.article
      className={`project-card ${
        index === 0 ? 'project-card-featured' : ''
      }`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
      }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="project-top">
        <span className="project-number">
          {project.number}
        </span>

        {project.link ? (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="project-arrow"
            aria-label={`View ${project.title} on GitHub`}
          >
            ↗
          </a>
        ) : (
          <span className="project-arrow project-arrow-disabled">
            —
          </span>
        )}
      </div>

      <div className="project-content">
        <h3>{project.title}</h3>

        <p>{project.description}</p>

        <div className="project-technologies">
          {project.technologies.map((technology) => (
            <span key={technology}>
              {technology}
            </span>
          ))}
        </div>

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="project-link"
          >
            View Repository ↗
          </a>
        )}
      </div>
    </motion.article>
  );
}

function Projects() {
  return (
    <section className="projects section" id="projects">
      <div className="section-container">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.7,
          }}
        >
          <p className="section-label">
            03 — PROJECTS
          </p>

          <h2>
            Things I've
            <span> built.</span>
          </h2>
        </motion.div>

        <div className="projects-list">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;