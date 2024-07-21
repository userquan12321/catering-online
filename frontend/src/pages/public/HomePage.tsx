import AboutUs from '@/components/Home/AboutUs'
import Cuisines from '@/components/Home/Cuisines'
import Events from '@/components/Home/Events'
import HeroIntro from '@/components/Home/HeroIntro'

const HomePage = () => {
  return (
    <>
      <HeroIntro />
      <Events />
      <Cuisines />
      <AboutUs />
    </>
  )
}

export default HomePage
