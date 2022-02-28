import { useState } from 'react'
import { client } from '../../client'
import { images } from '../../constants'
import { AppWrap, MotionWrap } from '../../wrapper'
import './Footer.scss'

const FooterComponent = () => {
  const [formData, setformData] = useState({ name: '', email: '', message: '' })
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { name, email, message } = formData

  const handleChangeInput = (ev) => {
    const { name, value } = ev.target

    setformData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }))
  }

  const handleSubmit = () => {
    setIsLoading(true)

    const contact = {
      _type: 'contact',
      name,
      email,
      message,
    }

    client.create(contact).then(() => {
      setIsFormSubmitted(true)
      setIsLoading(false)
    })
  }

  return (
    <>
      <h2 className="head-text">Take a coffe & chat with me</h2>

      <div className="app__footer-cards">
        <div className="app__footer-cards-item">
          <img src={images.email} alt="email" />
          <a href="mailto:hello@micael.com" className="p-text" target="_blank">
            hello@micael.com
          </a>
        </div>

        <div className="app__footer-cards-item">
          <img src={images.mobile} alt="mobile" />
          <a href="tel:+1 (123) 456-789" className="p-text" target="_blank">
            +1 (123) 456-789
          </a>
        </div>
      </div>

      {!isFormSubmitted ? (
        <div className="app__footer-form app__flex">
          <div className="app__flex">
            <input
              type="text"
              className="p-text"
              placeholder="Your Name"
              name="name"
              value={name}
              onChange={handleChangeInput}
            />
          </div>

          <div className="app__flex">
            <input
              type="email"
              className="p-text"
              placeholder="Your Email"
              name="email"
              value={email}
              onChange={handleChangeInput}
            />
          </div>

          <div>
            <textarea
              className="p-text"
              placeholder="Your Message"
              value={message}
              name="message"
              onChange={handleChangeInput}
            ></textarea>
          </div>

          <button type="button" className="p-text" onClick={handleSubmit}>
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      ) : (
        <div>
          <h3 className="head-text">Thank you for getting in touch!</h3>
        </div>
      )}
    </>
  )
}

export const Footer = AppWrap(
  MotionWrap(FooterComponent, 'app__footer'),
  'contact',
  'app__whitebg'
)
