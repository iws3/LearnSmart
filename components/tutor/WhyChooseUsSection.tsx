import { Brain, Clock, Globe, Lightbulb, Shield, Target } from "lucide-react";
import FeatureCard from "./FeatureCard";

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

const pageFeatures: Feature[] = [
    { icon: Brain, title: 'Adaptive Teaching', description: 'Each tutor adapts their teaching style to match your learning preferences', color: 'from-purple-500 to-pink-500' },
    { icon: Clock, title: '24/7 Availability', description: 'Our AI tutors are available whenever you need them, day or night', color: 'from-blue-500 to-cyan-500' },
    { icon: Target, title: 'Personalized Learning', description: 'Customized curriculum and pace tailored to your individual needs', color: 'from-green-500 to-emerald-500' },
    { icon: Globe, title: 'Multi-Language Support', description: 'Learn in your preferred language with native-speaking AI tutors', color: 'from-orange-500 to-red-500' },
    { icon: Shield, title: 'Safe Environment', description: 'Judgment-free learning space where you can make mistakes and grow', color: 'from-indigo-500 to-purple-500' },
    { icon: Lightbulb, title: 'Interactive Sessions', description:  'Engaging conversations with real-time feedback and explanations', color: 'from-yellow-500 to-orange-500' }
];



const WhyChooseUsSection = () => (
  <section className="relative py-24 bg-slate-800/20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Why Choose Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">AI Tutors</span>?
        </h2>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
          Experience personalized learning with our world-class AI teaching staff.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pageFeatures.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUsSection