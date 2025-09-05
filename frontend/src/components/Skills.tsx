import React from 'react';
import { motion } from 'framer-motion';

const Skills: React.FC = () => {
  const skills = [
    {
      category: 'Frontend',
      technologies: [
        { name: 'React', level: 95 },
        { name: 'TypeScript', level: 90 },
        { name: 'Next.js', level: 85 },
        { name: 'Tailwind CSS', level: 95 },
        { name: 'Framer Motion', level: 80 },
        { name: 'Redux', level: 75 },
      ]
    },
    {
      category: 'Backend',
      technologies: [
        { name: 'Node.js', level: 90 },
        { name: 'Express.js', level: 85 },
        { name: 'Python', level: 80 },
        { name: 'Django', level: 75 },
        { name: 'PostgreSQL', level: 85 },
        { name: 'MongoDB', level: 80 },
      ]
    },
    {
      category: 'Tools & Others',
      technologies: [
        { name: 'Git', level: 90 },
        { name: 'Docker', level: 75 },
        { name: 'AWS', level: 70 },
        { name: 'Figma', level: 85 },
        { name: 'Jest', level: 80 },
        { name: 'Webpack', level: 75 },
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="skills" className="py-20 bg-secondary-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
              My <span className="gradient-text">Skills</span>
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Here are the technologies and tools I work with to bring ideas to life.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((skillCategory, index) => (
              <motion.div
                key={skillCategory.category}
                variants={itemVariants}
                className="card"
              >
                <h3 className="text-2xl font-bold text-secondary-900 mb-6 text-center">
                  {skillCategory.category}
                </h3>
                <div className="space-y-4">
                  {skillCategory.technologies.map((tech) => (
                    <div key={tech.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-secondary-700 font-medium">
                          {tech.name}
                        </span>
                        <span className="text-secondary-500 text-sm">
                          {tech.level}%
                        </span>
                      </div>
                      <div className="w-full bg-secondary-200 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${tech.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
