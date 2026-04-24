import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { EXPERIMENTS_LIST } from '../data/experiments';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            className="absolute top-10 left-10 w-32 h-32 border border-museum-accent rounded-full opacity-10"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-48 h-48 border border-museum-accent rounded-full opacity-10"
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl"
        >
          {/* Main Title */}
          <motion.div variants={itemVariants} className="mb-6">
            <div className="text-6xl md:text-7xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-museum-accent via-museum-highlight to-museum-accent mb-4">
              思想实验
            </div>
            <div className="text-3xl md:text-4xl font-serif font-light text-museum-text">
              Museum of Thought Experiments
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg text-museum-muted mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            踏入一场思想的旅程。每一个经典悖论都是一扇窗口，窥探人类理性、伦理与存在的边界。
            不仅仅是阅读，而是与伟大的思想进行对话。
          </motion.p>

          {/* CTA Button */}
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('exhibitions')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 text-lg font-medium rounded-lg bg-gradient-to-r from-museum-accent to-museum-highlight text-white shadow-museum hover:shadow-lg transition-all duration-300"
          >
            进入博物馆 →
          </motion.button>
        </motion.div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6 my-20">
        <div className="h-px bg-gradient-to-r from-transparent via-museum-border to-transparent" />
      </div>

      {/* Exhibition Grid */}
      <section id="exhibitions" className="max-w-6xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="heading-2 text-center mb-4">展厅导览</h2>
          <p className="subheading text-center">选择一个实验，开始您的探索</p>
        </motion.div>

        {/* Exhibition Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {EXPERIMENTS_LIST.map((experiment) => (
            <motion.button
              key={experiment.id}
              variants={itemVariants}
              whileHover={{ translateY: -8, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.2)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(`/${experiment.id}`)}
              className="group relative overflow-hidden museum-card p-6 text-left hover:border-museum-accent transition-all duration-300 min-h-[280px] flex flex-col"
            >
              {/* Background gradient on hover */}
              <div
                className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300 -z-10"
                style={{ background: `linear-gradient(135deg, ${experiment.color}20, transparent)` }}
              />

              {/* Icon */}
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {experiment.icon}
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="heading-3 mb-2 group-hover:text-museum-accent transition-colors">
                  {experiment.title}
                </h3>
                <p className="text-sm text-museum-muted mb-3 font-medium uppercase tracking-wider">
                  {experiment.subtitle}
                </p>
                <p className="body-small text-museum-muted line-clamp-2">
                  {experiment.description}
                </p>
              </div>

              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-museum-border/50 flex items-center text-museum-accent group-hover:text-museum-highlight transition-colors">
                <span className="text-sm font-medium">开始探索</span>
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </section>

      {/* Footer */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="h-px bg-gradient-to-r from-transparent via-museum-border to-transparent mb-8" />
          <p className="text-museum-muted text-sm">
            《思想实验博物馆》| 在对话与思考中，我们接近真理
          </p>
          <p className="text-museum-muted/50 text-xs mt-4">
            Each experiment is a gateway to understanding philosophy, ethics, and the nature of reality.
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
