import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="about" className="py-20 bg-white">
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
              About <span className="gradient-text">Me</span>
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              I'm a passionate full-stack developer with a love for creating 
              exceptional digital experiences.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants} className="space-y-6">
              <p className="text-lg text-secondary-600 leading-relaxed">
                With over 3 years of experience in web development, I specialize in 
                building modern, scalable applications using React, Node.js, and cloud technologies. 
                I'm passionate about clean code, user experience, and continuous learning.
              </p>
              <p className="text-lg text-secondary-600 leading-relaxed">
                When I'm not coding, you can find me exploring new technologies, 
                contributing to open-source projects, or sharing knowledge with the 
                developer community through blog posts and mentoring.
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary"
                >
                  View Resume
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary"
                >
                  Contact Me
                </motion.button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="relative">
              <div className="bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl p-8">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-2xl font-bold text-secondary-900 mb-4">
                    What I Do
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center text-secondary-700">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                      Full-Stack Web Development
                    </li>
                    <li className="flex items-center text-secondary-700">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                      UI/UX Design & Prototyping
                    </li>
                    <li className="flex items-center text-secondary-700">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                      Cloud Architecture & Deployment
                    </li>
                    <li className="flex items-center text-secondary-700">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                      Database Design & Optimization
                    </li>
                    <li className="flex items-center text-secondary-700">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                      API Development & Integration
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
