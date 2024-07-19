import AboutUs from '@/components/Home/AboutUs'
import Cuisines from '@/components/Home/Cuisines'
import Events from '@/components/Home/Events'
import HeroIntro from '@/components/Home/HeroIntro'
import RecentEvents from '@/components/Home/RecentEvents'

import '../../styles/homepage.style.css'

const HomePage = () => {
  return (
    <>
      <HeroIntro />
      <Events />
      <Cuisines />
      {/* <RecentEvents /> */}
      <AboutUs />
    </>
  )
}

export default HomePage
