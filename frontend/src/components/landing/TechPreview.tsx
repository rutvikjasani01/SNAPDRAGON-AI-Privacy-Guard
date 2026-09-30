import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Cpu, Zap, Brain } from 'lucide-react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';

export function TechPreview() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const lineVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 1, transition: { duration: 1.5, ease: "easeInOut" } }
  };

  return (
    <Section className="bg-[#0a0a0a] border-t border-surfaceBorder overflow-hidden py-24">
      <Container>
        <motion.div 
          className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-4 mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            Designed for Snapdragon-powered AI PCs.
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-text-secondary">
            Our architecture is built to leverage modern heterogeneous computing edge environments, processing your sensitive data locally.
          </motion.p>
        </motion.div>

        {/* Technical Diagram */}
        <motion.div 
          className="relative max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {/* CPU Node */}
            <motion.div variants={itemVariants} className="glass-panel p-6 rounded-2xl flex flex-col items-center text-center space-y-4 border-t-2 border-t-blue-500/50 hover:border-t-blue-500 transition-colors">
              <div className="p-4 bg-blue-500/10 rounded-full text-blue-400">
                <Cpu className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white tracking-wide">CPU</h4>
                <p className="text-sm text-text-secondary mt-1">General orchestration and lightweight document parsing tasks.</p>
              </div>
            </motion.div>

            {/* GPU Node */}
            <motion.div variants={itemVariants} className="glass-panel p-6 rounded-2xl flex flex-col items-center text-center space-y-4 border-t-2 border-t-green-500/50 hover:border-t-green-500 transition-colors">
              <div className="p-4 bg-green-500/10 rounded-full text-green-400">
                <Zap className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white tracking-wide">GPU</h4>
                <p className="text-sm text-text-secondary mt-1">Parallel processing for complex image OCR and masking rendering.</p>
              </div>
            </motion.div>

            {/* NPU Node */}
            <motion.div variants={itemVariants} className="glass-panel p-6 rounded-2xl flex flex-col items-center text-center space-y-4 border-t-2 border-t-primary/50 hover:border-t-primary transition-colors relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/5 opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="p-4 bg-primary/10 rounded-full text-primary">
                <Brain className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white tracking-wide">NPU</h4>
                <p className="text-sm text-text-secondary mt-1">Targeted hardware acceleration for intensive local LLM inference.</p>
              </div>
            </motion.div>
          </div>

          {/* Convergence arrows (desktop only) */}
          <div className="hidden md:flex justify-center mt-8 mb-8 relative h-16">
            <svg className="absolute w-full h-full text-surfaceBorder overflow-visible" fill="none" stroke="currentColor" strokeWidth="2">
              <motion.path variants={lineVariants} d="M150,0 C150,40 400,20 400,60" className="text-blue-500/30" />
              <motion.path variants={lineVariants} d="M450,0 C450,40 450,20 450,60" className="text-green-500/30" />
              <motion.path variants={lineVariants} d="M750,0 C750,40 500,20 500,60" className="text-primary/30" />
            </svg>
          </div>

          {/* Target Node */}
          <motion.div variants={itemVariants} className="mt-8 md:mt-0 flex justify-center relative z-10">
            <div className="glass-panel px-12 py-6 rounded-2xl border border-primary/40 shadow-glow flex flex-col items-center bg-surfaceHover">
              <h3 className="text-2xl font-black text-white tracking-widest uppercase mb-1">On-Device AI</h3>
              <p className="text-primary text-sm font-medium">Fast. Private. Secure.</p>
            </div>
          </motion.div>

        </motion.div>
      </Container>
    </Section>
  );
}
