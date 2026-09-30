import React from 'react';
import { ShieldCheck, Cpu, ArrowDown, FileText, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center space-y-6 mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex p-4 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-500 mb-4"
          >
            <ShieldCheck className="w-12 h-12" />
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight uppercase leading-tight">
            Privacy isn't a setting.<br/>
            <span className="text-red-600 dark:text-red-500">It's the architecture.</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Traditional cloud platforms upload your sensitive documents to remote servers. 
            We use on-device AI to ensure your data never leaves your hardware.
          </p>
        </div>

        {/* Architecture Flow */}
        <div className="relative max-w-3xl mx-auto mt-16">
          <div className="flex flex-col items-center space-y-8">
            
            {/* Step 1: Your File */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-full max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-2xl shadow-sm text-center flex flex-col items-center"
            >
              <FileText className="w-10 h-10 text-gray-400 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-wide uppercase">Your File</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Remains entirely local to your machine.</p>
            </motion.div>

            <ArrowDown className="w-8 h-8 text-gray-300 dark:text-gray-700" />

            {/* Step 2: Your Device */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="w-full max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-2xl shadow-sm text-center flex flex-col items-center"
            >
              <Cpu className="w-10 h-10 text-blue-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-wide uppercase">Your Device</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Processing utilizes your local hardware resources.</p>
            </motion.div>

            <ArrowDown className="w-8 h-8 text-gray-300 dark:text-gray-700" />

            {/* Step 3: AI Inference */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="w-full max-w-md bg-gradient-to-r from-red-600 to-red-800 text-white p-6 rounded-2xl shadow-lg text-center flex flex-col items-center"
            >
              <ShieldCheck className="w-10 h-10 text-white/80 mb-4" />
              <h3 className="text-xl font-bold tracking-wide uppercase">AI Inference</h3>
              <p className="text-red-100 mt-2">Detection and redaction models run locally without internet access.</p>
            </motion.div>

            <ArrowDown className="w-8 h-8 text-gray-300 dark:text-gray-700" />

            {/* Step 4: Protected Result */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="w-full max-w-md bg-gray-900 dark:bg-black border border-gray-800 p-6 rounded-2xl shadow-2xl text-center flex flex-col items-center"
            >
              <Lock className="w-10 h-10 text-green-400 mb-4" />
              <h3 className="text-xl font-bold text-white tracking-wide uppercase">Protected Result</h3>
              <p className="text-gray-400 mt-2">A clean, secured document ready for safe sharing.</p>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
};
