import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { client, urlFor } from '../../client'
import { AppWrap, MotionWrap } from '../../wrapper'
import './About.scss'

const AboutComponent = () => {
  const [abouts, setAbouts] = useState([])

  useEffect(() => {
    const query = '*[_type ==  "abouts"]'

    client.fetch(query).then((data) => setAbouts(data))
  }, [])

  return (
    <>
      <h2 className="head-text">
        i know that <span>good apps </span> <br />
        means<span> good business</span>
      </h2>
      <div className="app__profile">
        {abouts.map((about, idx) => (
          <motion.div
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, type: 'tween' }}
            className="app__profile-item"
            key={about.title + idx}
          >
            <img src={urlFor(about.imgUrl)} alt={about.title} />
            <h2 className="bold-text" style={{ marginTop: 20 }}>
              {about.title}
            </h2>
            <p className="p-text" style={{ marginTop: 10 }}>
              {about.description}
            </p>
          </motion.div>
        ))}
      </div>
    </>
  )
}

export const About = AppWrap(
  MotionWrap(AboutComponent, 'app__about'),
  'about',
  'app__whitebg'
)
