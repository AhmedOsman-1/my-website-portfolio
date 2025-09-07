import Link from 'next/link'
import React from 'react'

const Button = ({ href, text }) => {
  return (
   <Link href={href} className="absolute bottom-[-135px] md:bottom-[-30px] left-1/2 -translate-x-1/2 btn-primary w-56 sm:w-48 md:w-60 animate-slideUp delay-200 flex items-center justify-center gap-3 px-6 py-3 z-30">
            {text}
          </Link>
  )
}

export default Button