import {useRef, useState} from 'react'
import { Phone, Mail } from "lucide-react"
import Navigation from '../components/Navigation'
import Footer from '../components/Footer.jsx'
import { ArrowRight } from "lucide-react"
import Advertisement from '../section/Advertisement'
import Reviews from '../section/Reviews.jsx'
import emailjs from '@emailjs/browser'
import { toast } from 'react-toastify'
import { Element } from 'react-scroll'

const Contact = () => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      emailjs
        .sendForm(import.meta.env.VITE_SERVICE_ID, import.meta.env.VITE_TEMPLATE_ID, form.current, {
          publicKey: import.meta.env.VITE_PUBLIC_KEY,
        })
        .then(
          () => {
            console.log('SUCCESS!');
            toast.success("Email sent successfully");
            form.current.reset();
            setIsSubmitting(false);
          },
          (error) => {
            console.log('FAILED...', error);
            toast.error("Email not sent!");
            setIsSubmitting(false);
          },
        );
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Element name='contact' className='relative w-screen px-4 md:px-12 lg:px-20 pb-8 bg-black overflow-hidden flex flex-col justify-between gap-16'>
        <Navigation />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 text-white">
          <div className='flex flex-col gap-8'>
            <h2 className='text-5xl md:text-6xl font-semibold'>Let's get in touch</h2>
            <p className='text-justify'>Whether you have a question, a project in mind, or just want to say hello, we’d love to hear from you. 
            Our team is always ready to discuss new opportunities, provide support, and explore how we can work together to bring your ideas to life. Feel free to reach out through the form or the contact details below.</p>
            <hr className='text-white/50'/>
            <p className='flex items-center gap-3'><Phone className='w-5 h-5'/>+91 8595994381, +91 9311201990</p>
            <p className='flex items-center gap-3'><Mail className='w-5 h-5'/>codeweave1327@gmail.com</p>
          </div>

          <form className='bg-neutral-900 p-8 rounded-2xl space-y-4' ref={form} onSubmit={sendEmail}>
            <div>
              <label className='block mb-2'>Name</label>
              <input type="text" placeholder='Jane Smith' className='w-full p-3 rounded-lg bg-neutral-800 text-white focus:outline-none focus:ring-1 focus:ring-white' name='user_name' required/>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label className='block mb-2'>Email</label>
                <input type="email" placeholder='example@example.com' className='w-full p-3 rounded-lg bg-neutral-800 text-white focus:outline-none focus:ring-1 focus:ring-white' name='user_email' required/>
              </div>
              <div>
                <label className='block mb-2'>Phone (optional)</label>
                <input type="tel" placeholder='+123456789' className='w-full p-3 rounded-lg bg-neutral-800 text-white focus:outline-none focus:ring-1 focus:ring-white' name='user_phone'/>
              </div>
            </div>

            <div>
              <label className="block mb-2">Message</label>
              <textarea placeholder="I need..." rows="3" className="w-full p-3 rounded-lg bg-neutral-800 text-white focus:outline-none focus:ring-1 focus:ring-white" name='message' required/>
            </div>

            <button className={`flex items-center justify-between p-1 rounded-full font-semibold w-full ${isSubmitting ? 'bg-gray-400 !cursor-not-allowed' : 'bg-white hover:bg-gray-200 group'}`}>
              <p className='text-black px-3 mx-auto'>{isSubmitting ? 'Sending...' : 'Submit'}</p>
              <ArrowRight size={40} className='bg-black text-white rounded-full p-2 -rotate-45 group-hover:rotate-0 transition duration-300 ease-in-out'/>
            </button>
          </form>
        </div>
      </Element>

      <Reviews />
      <Advertisement />
      <Footer />
    </>
  )
}

export default Contact