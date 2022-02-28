import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { client, urlFor } from '../../client'
import { AppWrap, MotionWrap } from '../../wrapper'
import './Testimonial.scss'

const TestimonialComponent = () => {
  const [brands, setBrands] = useState([])
  const [testimonials, setTestimonials] = useState<any>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const testimonialsQuery = '*[_type == "testimonials"]'
    const brandsQuery = '*[_type == "brands"]'

    client.fetch(testimonialsQuery).then((data) => {
      setTestimonials(data)
    })
    client.fetch(brandsQuery).then((data) => {
      setBrands(data)
    })
  }, [])

  const handleClick = (index: number) => {
    setCurrentIndex(index)
  }

  const testimonial = testimonials[currentIndex]

  return (
    <>
      {testimonials.length && (
        <>
          <div className="app__testimonial-item app__flex">
            <img src={urlFor(testimonial.imageurl)} alt="testimonial" />

            <div className="app__testimonial-content">
              <p className="p-text">{testimonial.feedback}</p>

              <div>
                <h4 className="bold-text">{testimonial.name}</h4>
                <h5 className="p-text">{testimonial.company}</h5>
              </div>
            </div>
          </div>

          <div className="app__testimonial-btns app__flex">
            <div
              className="app__flex"
              onClick={() =>
                handleClick(
                  currentIndex === 0
                    ? testimonials.length - 1
                    : currentIndex - 1
                )
              }
            >
              <HiChevronLeft />
            </div>

            <div
              className="app__flex"
              onClick={() =>
                handleClick(
                  currentIndex === testimonials.length - 1
                    ? 0
                    : currentIndex + 1
                )
              }
            >
              <HiChevronRight />
            </div>
          </div>
        </>
      )}

      <div className="app__testimonial-brands app__flex">
        {brands.map((brand) => (
          <motion.div
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.5, type: 'tween' }}
            key={brand._id}
          >
            <img src={urlFor(brand.imgUrl)} alt={brand.name} />
          </motion.div>
        ))}
      </div>
    </>
  )
}

export const Testimonial = AppWrap(
  MotionWrap(TestimonialComponent, 'app__testimonial'),
  'testimonial',
  'app__primarybg'
)
