import { useGetCuisinesQuery } from '@/apis/cuisine-type.api'

const Cuisines = () => {
  const { data, isLoading } = useGetCuisinesQuery({ num: 3 })

  if (isLoading) return <div>Loading...</div>

  console.log(data)

  return <div id="cuisines">Cuisines</div>
}

export default Cuisines
