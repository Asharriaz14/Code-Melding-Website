import Layout from '../../layout/Layout'
import BrandSections from './BrandSection'
import DiscoverMore from './DiscoverMore'
import Hero from './HeroSection'
import CtaSection from './CtaSection'
import ServiceSection from './ServiceSection'
import Companies from './Companies'
import Contact from './Contact'
import Calculator from './Calcutor'
import CaseStudies from './CaseStudies'
import TestimonialSection from './Testimonal'
import BlogSection from './BlogSection'

function Home() {
  return (
    <div>
<Layout>
<Hero />
<BrandSections />
<DiscoverMore />  
<CtaSection />
<ServiceSection />
<Companies />
<CaseStudies />
<Calculator />
<TestimonialSection />
<BlogSection />
<Contact />
</Layout >
    </div>
  )
}

export default Home