import Image from "next/image";

export default function Services() {
  const services = [
    {
      title: "Web Development",
      description:
        "Custom, fast, and responsive websites built to impress and perform.",
      icon: "/icons/web.svg",
    },
    {
      title: "UI/UX Design",
      description:
        "Beautiful interfaces with intuitive user experiences for your users.",
      icon: "/icons/design.svg",
    },
    {
      title: "SEO Optimization",
      description:
        "Improve your search ranking and attract the right audience effortlessly.",
      icon: "/icons/seo.svg",
    },
    {
      title: "E-commerce Solutions",
      description:
        "End-to-end e-commerce platforms that convert visitors into customers.",
      icon: "/icons/shop.svg",
    },
  ];

  return (
    <section className="bg-white py-20 mt-20 rounded-t-[80px] rounded-b-[80px]">
      <div className="container mx-auto px-4 text-center ">
        {/* Page Headline */}
        <h2 className="fade-down text-4xl sm:text-5xl font-extrabold font-Bebas mb-12">
          Our Services
        </h2>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`fade-up bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center text-center transition-transform duration-300 hover:scale-105`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="w-20 h-20 mb-6">
                <Image
                  src={service.icon}
                  width={80}
                  height={80}
                  alt={service.title}
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-neutral-600 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
