import { BsTwitter, BsInstagram } from 'react-icons/bs'
import { FaFacebookF} from 'react-icons/fa'

export const SocialMedia = () => {
  return (
    <div className="app__social">
      <div className='app__social-icon'>
        <BsTwitter />
      </div>
      <div className='app__social-icon'>
        <FaFacebookF />
      </div>
      <div className='app__social-icon'>
        <BsInstagram />
      </div>
    </div>
  )
}
