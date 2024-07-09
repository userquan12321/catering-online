import { RouterProvider } from 'react-router-dom'
import router from './routers/routes.tsx'
import { Cloudinary } from '@cloudinary/url-gen'

const App = () => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dubxrgytg',
    },
  })

  return <RouterProvider router={router} />
}

export default App
