import { motion } from 'framer-motion'
import { Zap, Shield, Users, Award, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import GlassCard from '@/components/ui/GlassCard'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import ParticleBackground from '@/components/ui/ParticleBackground'

const team = [
  { name: 'Marcus Chen', role: 'Founder & CEO', bio: 'Former Intel engineer with 15 years of hardware expertise.', initials: 'MC', color: 'bg-heat-100' },
  { name: 'Sarah Kim', role: 'Head of Engineering', bio: 'Ex-NVIDIA engineer, GPU architecture specialist.', initials: 'SK', color: 'bg-accent-bluetron' },
  { name: 'Alex Rodriguez', role: 'Lead Builder', bio: '12,000+ custom builds completed. Zero failures.', initials: 'AR', color: 'bg-accent-amethyst' },
  { name: 'Jordan Park', role: 'Community Manager', bio: 'Pro gamer turned advocate. Discord community of 50K+.', initials: 'JP', color: 'bg-accent-crimson' },
]

export default function About() {
  return (
    <div className="min-h-screen bg-void">
      <Navbar />
      <div className="pt-24 relative overflow-hidden">
        <ParticleBackground count={30} className="opacity-30" />
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />

        {/* Hero */}
        <section className="section-padding relative">
          <div className="container-max text-center max-w-4xl mx-auto">
            <motion.div className="section-label mx-auto mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Zap className="w-3 h-3" />
              OUR STORY
            </motion.div>
            <motion.h1
              className="font-display text-5xl sm:text-title-h2 font-black text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              WE'RE NOT JUST<br /><span className="gradient-text">PC BUILDERS.</span><br />WE'RE GAMERS.
            </motion.h1>
            <motion.p
              className="text-white/60 text-lg leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Founded in 2016 by a group of frustrated gamers who couldn't find a single company that truly understood what performance meant. Today, we've built over 47,000 systems for players who refuse to settle for anything less than extraordinary.
            </motion.p>
          </div>
        </section>

        {/* Stats */}
        <section className="section-padding relative">
          <div className="container-max">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'PCs Built', value: 47000, suffix: '+', color: 'text-heat-100' },
                { label: 'Years Active', value: 8, suffix: '+', color: 'text-accent-bluetron' },
                { label: 'Team Members', value: 47, suffix: '', color: 'text-accent-amethyst' },
                { label: 'Avg Build Score', value: 94, suffix: '/100', color: 'text-accent-forest' },
              ].map(({ label, value, suffix, color }, i) => (
                <GlassCard key={label} delay={i * 0.08} className="p-6 text-center rounded-12">
                  <div className={`font-display font-black text-4xl ${color}`}>
                    <AnimatedCounter end={value} suffix={suffix} />
                  </div>
                  <div className="text-white/40 text-sm font-body mt-2">{label}</div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section-padding">
          <div className="container-max">
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl font-black text-white">OUR <span className="gradient-text">VALUES</span></h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Shield, title: 'Zero Compromise', desc: 'Every component is selected for performance, not margin. We use what we\'d put in our own rigs.', color: 'text-heat-100' },
                { icon: Users, title: 'Community First', desc: 'We\'re gamers serving gamers. Every decision is filtered through one question: would this satisfy us?', color: 'text-accent-bluetron' },
                { icon: Award, title: 'Excellence Always', desc: 'Our QC process is more rigorous than any other custom builder. 100+ point checklist before shipping.', color: 'text-accent-amethyst' },
              ].map(({ icon: Icon, title, desc, color }, i) => (
                <GlassCard key={title} delay={i * 0.1} className="p-7 space-y-4 rounded-12">
                  <Icon className={`w-8 h-8 ${color}`} />
                  <h3 className="font-heading font-bold text-xl text-white">{title}</h3>
                  <p className="text-white/50 leading-relaxed">{desc}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="section-padding">
          <div className="container-max">
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl font-black text-white">MEET THE <span className="gradient-text">TEAM</span></h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {team.map((member, i) => (
                <GlassCard key={member.name} delay={i * 0.08} className="p-5 text-center space-y-3 rounded-12">
                  <div className={`w-16 h-16 rounded-12 ${member.color} flex items-center justify-center font-display font-bold text-xl mx-auto`}>
                    {member.initials}
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-white">{member.name}</h4>
                    <p className="text-xs text-heat-100 font-mono">{member.role}</p>
                  </div>
                  <p className="text-white/40 text-xs leading-relaxed">{member.bio}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding">
          <div className="container-max text-center">
            <h2 className="font-display text-4xl font-black text-white mb-6">READY TO <span className="gradient-text">JOIN US?</span></h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/build" className="btn-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100"><Zap className="w-4 h-4" />Start Your Build</Link>
              <Link to="/contact" className="btn-ghost focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100">Contact Us <ChevronRight className="w-4 h-4" /></Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}
