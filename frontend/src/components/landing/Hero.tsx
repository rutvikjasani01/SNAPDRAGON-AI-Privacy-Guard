import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ArrowRight, ShieldCheck, FileText, Cpu, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';

export function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };


  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10" />
      
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy */}
          <motion.div 
            className="flex flex-col space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 bg-surface border border-surfaceBorder rounded-full px-4 py-1.5 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-sm font-medium text-text-secondary uppercase tracking-wider">On-Device AI Ready</span>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]">
                <span className="block">YOUR DATA.</span>
                <span className="block">YOUR DEVICE.</span>
                <span className="block text-primary">YOUR PRIVACY.</span>
              </h1>
            </motion.div>

            <motion.p variants={itemVariants} className="text-xl text-text-secondary max-w-lg leading-relaxed">
              AI-powered sensitive-data detection and redaction designed for private, on-device processing.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/scan">
                <Button variant="primary" size="lg" className="w-full sm:w-auto group">
                  START PRIVACY SCAN
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/technology">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  EXPLORE THE TECHNOLOGY
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column: Original Animation */}
          <motion.div 
            className="relative h-[400px] w-full flex items-center justify-center lg:justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="relative w-full max-w-md h-full flex flex-col items-center justify-between py-8">
              {/* Connection Line */}
              <div className="absolute top-16 bottom-16 w-0.5 bg-surfaceBorder left-1/2 -translate-x-1/2 -z-10" />
              
              {/* Document Node */}
              <motion.div 
                className="relative glass-panel rounded-2xl p-4 flex items-center space-x-4 w-64 shadow-glass"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <div className="p-3 bg-surfaceHover rounded-xl">
                  <FileText className="w-6 h-6 text-text-secondary" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">DOCUMENT</div>
                  <div className="text-xs text-text-secondary">Raw Data</div>
                </div>
              </motion.div>

              {/* Local AI Node */}
              <motion.div 
                className="relative glass-panel rounded-2xl p-4 flex items-center justify-between w-72 shadow-glow border-primary/30 z-10"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-primary/20 rounded-xl border border-primary/30 text-primary">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white tracking-wide">LOCAL AI</div>
                    <div className="text-xs text-primary">Inference Engine</div>
                  </div>
                </div>
                
                {/* Processing Indicator */}
                <div className="flex space-x-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 bg-primary rounded-full"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Protected Document Node */}
              <motion.div 
                className="relative glass-panel rounded-2xl p-4 flex items-center space-x-4 w-64 shadow-glass"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.6, duration: 0.6 }}
              >
                <div className="p-3 bg-green-500/20 rounded-xl border border-green-500/30 text-green-400">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">PROTECTED</div>
                  <div className="text-xs text-green-400">Redacted Safe</div>
                </div>
                <ShieldCheck className="absolute -right-3 -top-3 w-8 h-8 text-green-500 bg-background rounded-full" />
              </motion.div>

              {/* Animated Particles travelling down the line */}
              <motion.div 
                className="absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rounded-full shadow-glow z-0"
                animate={{ top: ['20%', '80%'], opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: 2 }}
              />
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
