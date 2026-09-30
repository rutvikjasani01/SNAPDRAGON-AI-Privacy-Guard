import React from 'react';
import { Cloud, Server, FileText, Cpu, ArrowDown, Lock, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const PrivacySimulator: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white uppercase tracking-tight">
            Privacy Architecture Simulator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Compare standard cloud-based AI processing against on-device AI execution. 
            Understanding the architectural differences helps in evaluating data sovereignty constraints.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Cloud Workflow */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="text-center mb-8 pb-6 border-b border-gray-100 dark:border-gray-800">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white uppercase tracking-wide">
                Cloud Workflow
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                Standard remote processing architecture.
              </p>
            </div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex flex-col items-center space-y-4"
            >
              <motion.div variants={itemVariants} className="w-full bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl flex flex-col items-center border border-gray-100 dark:border-gray-700">
                <FileText className="w-8 h-8 text-gray-400 mb-2" />
                <h3 className="font-semibold text-gray-900 dark:text-white">File</h3>
                <p className="text-xs text-gray-500 text-center mt-1">User selects local document.</p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <ArrowDown className="w-6 h-6 text-gray-300 dark:text-gray-600" />
              </motion.div>

              <motion.div variants={itemVariants} className="w-full bg-blue-50 dark:bg-blue-900/10 p-6 rounded-2xl flex flex-col items-center border border-blue-100 dark:border-blue-800/30">
                <Cloud className="w-8 h-8 text-blue-500 mb-2" />
                <h3 className="font-semibold text-blue-900 dark:text-blue-400">Internet</h3>
                <p className="text-xs text-blue-700/70 dark:text-blue-500/70 text-center mt-1">Data transmitted over network via TLS.</p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <ArrowDown className="w-6 h-6 text-gray-300 dark:text-gray-600" />
              </motion.div>

              <motion.div variants={itemVariants} className="w-full bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl flex flex-col items-center border border-gray-100 dark:border-gray-700">
                <Server className="w-8 h-8 text-indigo-500 mb-2" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Remote AI</h3>
                <p className="text-xs text-gray-500 text-center mt-1">Inference executed on cloud servers.</p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <ArrowDown className="w-6 h-6 text-gray-300 dark:text-gray-600" />
              </motion.div>

              <motion.div variants={itemVariants} className="w-full bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl flex flex-col items-center border border-gray-100 dark:border-gray-700">
                <CheckCircle2 className="w-8 h-8 text-gray-400 mb-2" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Result</h3>
                <p className="text-xs text-gray-500 text-center mt-1">Processed file returned over network.</p>
              </motion.div>
            </motion.div>
          </div>

          {/* On-Device Workflow */}
          <div className="bg-gray-900 dark:bg-black rounded-3xl p-8 border border-gray-800 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-600 to-red-800" />
            
            <div className="text-center mb-8 pb-6 border-b border-gray-800">
              <h2 className="text-2xl font-bold text-white uppercase tracking-wide">
                On-Device Workflow
              </h2>
              <p className="text-sm text-gray-400 mt-2">
                Snapdragon AI Privacy Guard architecture.
              </p>
            </div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex flex-col items-center space-y-4 relative z-10"
            >
              <motion.div variants={itemVariants} className="w-full bg-gray-800/50 p-6 rounded-2xl flex flex-col items-center border border-gray-700/50">
                <FileText className="w-8 h-8 text-gray-400 mb-2" />
                <h3 className="font-semibold text-white">File</h3>
                <p className="text-xs text-gray-400 text-center mt-1">User selects local document.</p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <ArrowDown className="w-6 h-6 text-gray-600" />
              </motion.div>

              <motion.div variants={itemVariants} className="w-full bg-gray-800/50 p-6 rounded-2xl flex flex-col items-center border border-gray-700/50">
                <Cpu className="w-8 h-8 text-gray-300 mb-2" />
                <h3 className="font-semibold text-white">Device</h3>
                <p className="text-xs text-gray-400 text-center mt-1">Data remains strictly in local memory.</p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <ArrowDown className="w-6 h-6 text-gray-600" />
              </motion.div>

              <motion.div variants={itemVariants} className="w-full bg-red-900/20 p-6 rounded-2xl flex flex-col items-center border border-red-500/30">
                <Lock className="w-8 h-8 text-red-500 mb-2" />
                <h3 className="font-semibold text-red-100">Local AI</h3>
                <p className="text-xs text-red-200/70 text-center mt-1">Hardware accelerators (NPU/GPU) execute inference natively.</p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <ArrowDown className="w-6 h-6 text-gray-600" />
              </motion.div>

              <motion.div variants={itemVariants} className="w-full bg-gray-800/50 p-6 rounded-2xl flex flex-col items-center border border-gray-700/50">
                <CheckCircle2 className="w-8 h-8 text-green-500 mb-2" />
                <h3 className="font-semibold text-white">Result</h3>
                <p className="text-xs text-gray-400 text-center mt-1">Instant local access to protected file.</p>
              </motion.div>
            </motion.div>
          </div>

        </div>
        
        <div className="mt-12 text-center text-sm text-gray-500 max-w-3xl mx-auto">
          Both architectures serve important purposes in modern computing. 
          Cloud processing offers highly scalable resources for massive models, 
          while on-device processing guarantees strict data sovereignty, offline availability, 
          and minimal latency by keeping data out of network transit.
        </div>
      </div>
    </div>
  );
};
