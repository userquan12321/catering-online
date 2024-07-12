import { RouterProvider } from 'react-router-dom'
import { Cloudinary } from '@cloudinary/url-gen'

import router from './routers/routes.tsx'

const App = () => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dubxrgytg',
    },
  })

  return <RouterProvider router={router} />
}

export default App
