import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';

export function Storytelling() {
  const textVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <>
      <Section className="bg-surface relative overflow-hidden" id="how-it-works">
        {/* Subtle background element */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

        <Container className="relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col items-center text-center space-y-16 py-12"
          >
            <motion.h2 
              variants={textVariants}
              className="text-2xl md:text-3xl font-medium text-text-secondary tracking-widest uppercase"
            >
              AI That Protects What Matters
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-24 w-full">
              <motion.div variants={textVariants} className="space-y-4">
                <h3 className="text-5xl md:text-7xl font-bold text-white tracking-tighter">LOCAL.</h3>
                <p className="text-xl text-text-secondary">Your data never leaves your device. Everything runs exactly where it lives.</p>
              </motion.div>

              <motion.div variants={textVariants} className="space-y-4">
                <h3 className="text-5xl md:text-7xl font-bold text-primary tracking-tighter">PRIVATE.</h3>
                <p className="text-xl text-text-secondary">No cloud APIs. No external servers. Complete peace of mind by design.</p>
              </motion.div>

              <motion.div variants={textVariants} className="space-y-4">
                <h3 className="text-5xl md:text-7xl font-bold text-white tracking-tighter">FAST.</h3>
                <p className="text-xl text-text-secondary">Accelerated hardware means instant redaction without the network latency.</p>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </Section>

      <Section className="bg-background py-32">
        <Container>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col space-y-24 max-w-4xl mx-auto"
          >
            <motion.div variants={textVariants} className="flex flex-col md:flex-row md:items-end gap-6 md:gap-12">
              <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter">DETECT.</h2>
              <p className="text-2xl text-text-secondary md:pb-3 max-w-md">Our on-device models instantly scan your files to locate PII, financial records, and confidential secrets.</p>
            </motion.div>

            <motion.div variants={textVariants} className="flex flex-col md:flex-row md:items-end gap-6 md:gap-12 md:pl-24">
              <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter">UNDERSTAND.</h2>
              <p className="text-2xl text-text-secondary md:pb-3 max-w-md">Context-aware NLP assigns risk levels to detections, ensuring you know exactly why something is sensitive.</p>
            </motion.div>

            <motion.div variants={textVariants} className="flex flex-col md:flex-row md:items-end gap-6 md:gap-12 md:pl-48">
              <h2 className="text-6xl md:text-8xl font-black text-primary tracking-tighter">PROTECT.</h2>
              <p className="text-2xl text-text-secondary md:pb-3 max-w-md">Apply intelligent redaction, blurring, or masking to secure the document before it ever leaves your machine.</p>
            </motion.div>
          </motion.div>
        </Container>
      </Section>
    </>
  );
}
