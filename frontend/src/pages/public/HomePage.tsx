import AboutUs from '@/components/Home/AboutUs'
import Events from '@/components/Home/Events'
import HeroIntro from '@/components/Home/HeroIntro'

import '../../styles/homepage.style.css'

const HomePage = () => {
  return (
    <>
      <HeroIntro />
      <Events />
      <AboutUs />
    </>
  )
}

export default HomePage
