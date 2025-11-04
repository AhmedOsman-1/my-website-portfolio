import Image from "next/image";
import Button from "./Button";

export default function Header() {
  return (
    <header className="relative bg-white text-neutral-900 overflow-visible rounded-b-[800px]">
      <div className="container mx-auto px-4 pt-40 pb-36 md:pt-10 md:pb-12 text-center relative z-10">

        {/* Headline */}
        <h1 className="fade-down text-5xl sm:text-5xl md:text-7xl lg:text-9xl font-extrabold leading-tight tracking-tight font-Bebas relative md:mt-16 -mt-12 z-20">
          MEET THE<br />KING OF<br />FRONT END
        </h1>

        {/* Trusted By (Mobile) */}
        <div className="md:hidden absolute left-1/2 -translate-x-1/2 w-64 mt-4 flex justify-center z-30">
          <Image
            src="/TrustedBy.png"
            width={400}
            height={100}
            alt="Trusted By Logos (Mobile)"
          />
        </div>

        {/* Image + Button */}
        <div className="relative mx-auto md:mt-[-4rem] w-[22rem] h-44 sm:w-64 sm:h-64 md:w-[36rem] md:h-[18rem] z-20">
          {/* My Photo (Static) */}
          <Image
            src="/Me.png"
            alt="King of Front End"
            width={1000}
            height={1000}
            priority
            className="absolute top-[26px] md:top-[-45px] left-1/2 -translate-x-1/2 w-[22rem] sm:w-64 sm:h-64 md:w-[28rem] md:h-[24rem] object-cover z-20 rounded-b-[30px]"
          />

          {/* Book Appointment Button (Slide Up) */}
          <Button href="/contact" text={"Book Appointment"} />
        </div>

        {/* Quotes Section (Desktop Only) */}
        <div className="hidden md:grid grid-cols-2 gap-8 absolute bottom-10 w-full px-10 text-neutral-700 z-30">
          {/* Left quote */}
          <div className="fade-left text-left max-w-xs">
            <p className="text-lg italic font-light">
              &quot;Helping you stand out with sleek &amp; powerful websites!&quot;
            </p>
            <div className="mb-6 mt-4">
              <Image
                src="/TrustedBy.png"
                width={1000}
                height={1000}
                alt="Trusted By Logos (Desktop)"
              />
              <span className="block text-base font-normal text-neutral-600 mb-8 mt-4">
                I will show you why you should hire Me.
              </span>
            </div>
          </div>

          {/* Right quote with stars */}
          <div className="fade-right text-right max-w-xs">
            <div className="flex justify-end text-yellow-400 text-2xl">★★★★</div>
            <p className="text-lg italic font-light font-Bebas mt-2">
              &quot;A landing page isn&apos;t about showing everything you do. It&apos;s about showing just enough to make someone act.&quot;
            </p>
            <p className="text-sm font-medium mt-1">- Osman Goni, Front-End Expert</p>
          </div>
        </div>
      </div>
    </header>
  );
}
