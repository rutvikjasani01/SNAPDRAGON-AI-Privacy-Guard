import React from 'react';
import { Cpu, Zap, Activity, ShieldCheck, Box, Network } from 'lucide-react';
import { motion } from 'framer-motion';

export const Technology: React.FC = () => {
  const architectures = [
    {
      id: 'npu',
      icon: <Zap className="w-8 h-8 text-red-500" />,
      title: 'Hexagon NPU',
      description: 'Dedicated Neural Processing Unit designed for sustained, high-performance AI inference with minimal power draw. Ideal for complex entity detection and NLP tasks.'
    },
    {
      id: 'gpu',
      icon: <Box className="w-8 h-8 text-red-500" />,
      title: 'Adreno GPU',
      description: 'High-throughput parallel processing engine utilized for visual workloads, image scaling, and rapid visual redaction rendering.'
    },
    {
      id: 'cpu',
      icon: <Cpu className="w-8 h-8 text-red-500" />,
      title: 'Kryo CPU',
      description: 'General-purpose processing core handling application logic, file orchestration, and overall system coordination.'
    }
  ];

  const features = [
    {
      icon: <Activity className="w-6 h-6 text-gray-900 dark:text-white" />,
      title: 'AI Acceleration',
      description: 'Optimized models run directly on local silicon, minimizing latency and eliminating network round-trips.'
    },
    {
      icon: <Network className="w-6 h-6 text-gray-900 dark:text-white" />,
      title: 'On-Device Inference',
      description: 'No cloud APIs means zero network dependency. Your data stays exactly where it belongs—on your device.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-gray-900 dark:text-white" />,
      title: 'Privacy-Aware Architecture',
      description: 'The entire pipeline is built around the constraint of zero external transmission, guaranteeing absolute data sovereignty.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center space-y-6 mb-24">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block"
          >
            <span className="text-red-600 dark:text-red-500 font-bold tracking-widest uppercase text-sm border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/30 px-4 py-1.5 rounded-full">
              Snapdragon Deployment Target
            </span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
            BUILT FOR THE EDGE.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">
              DESIGNED FOR PRIVATE AI.
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mt-6">
            Leveraging heterogenous computing architecture to bring powerful AI capabilities directly to your device. 
            Experience unparalleled privacy through localized processing.
          </p>
        </div>

        {/* Compute Engines Grid */}
        <div className="mb-24">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-12 uppercase tracking-wide">
            Heterogenous AI Architecture
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {architectures.map((arch, index) => (
              <motion.div 
                key={arch.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-2xl flex items-center justify-center mb-6">
                  {arch.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {arch.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {arch.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="bg-gray-900 dark:bg-black rounded-3xl p-8 md:p-16 border border-gray-800 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="space-y-4"
              >
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-bold uppercase tracking-wide">
                  {feature.title}
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12 text-sm text-gray-500">
          * Designed for Snapdragon-powered AI PCs and devices capable of local ML acceleration.
        </div>
      </div>
    </div>
  );
};
