import { client } from '@/sanity/lib/client'

import HeroClient from './HeroClient'

const getdata = async () => {
  const query = `
    *[_type == "heroSection"][0]{
      title,
      subtitle,
      description,
      "heroImage": heroImage.asset->url
    }
  `
  return await client.fetch(query)
}

async function Hero() {
  const data = await getdata()
  if (!data || !data.heroImage) return null;

  return (
 <div>
  <HeroClient data={data}/>
 </div>
  )
}

export default Hero