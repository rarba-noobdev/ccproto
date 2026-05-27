import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/home/HeroSection'
import FeaturedPCs from '@/components/home/FeaturedPCs'
import BenchmarkSection from '@/components/home/BenchmarkSection'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import Testimonials from '@/components/home/Testimonials'
import RGBShowcase from '@/components/home/RGBShowcase'
import BuildCTASection from '@/components/home/BuildCTASection'
import FAQSection from '@/components/home/FAQSection'

export default function Home() {
  return (
    <div className="min-h-screen bg-void">
      <Navbar />
      <HeroSection />
      <FeaturedPCs />
      <BenchmarkSection />
      <RGBShowcase />
      <WhyChooseUs />
      <Testimonials />
      <BuildCTASection />
      <FAQSection />
      <Footer />
    </div>
  )
}
