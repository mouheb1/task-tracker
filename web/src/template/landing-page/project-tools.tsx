// -- ./src/template/landing-page/project-tools.tsx
'use client'
// import Image from "next/image"
import react from 'src/public/images/landing-page/react.png'
import next from 'src/public/images/landing-page/next.png'
import tailwind from 'src/public/images/landing-page/tailwind.png'
import radix from 'src/public/images/landing-page/radix.png'
import nextAuth from 'src/public/images/landing-page/next-auth.png'
import shadeCn from 'src/public/images/landing-page/shade-cn.png'
import swiper from 'src/public/images/landing-page/swiper.png'
import recharts from 'src/public/images/landing-page/recharts.png'
import vite from 'src/public/images/landing-page/vite.png'
import reactHookForm from 'src/public/images/landing-page/react-hook-form.png'
import zod from 'src/public/images/landing-page/zod.png'
import googleMap from 'src/public/images/landing-page/google-map-react.png'
import framerMotion from 'src/public/images/landing-page/framer-motion.png'
import axios from 'src/public/images/landing-page/axios.png'
import zustand from 'src/public/images/landing-page/zustand.png'
import reactLeaflet from 'src/public/images/landing-page/react-leaflet.png'
import nextTheme from 'src/public/images/landing-page/next-theme.png'
import emblaCarousel from 'src/public/images/landing-page/embla-carousel.png'
import vectorMap from 'src/public/images/landing-page/vector-map.png'
import unovis from 'src/public/images/landing-page/unovis.png'
import appexChart from 'src/public/images/landing-page/appex-chartpng.png'
import chart from 'src/public/images/landing-page/chart.png'
import plus from 'src/public/images/landing-page/plus.png'
import { Link } from '@redwoodjs/router'

const ProjectTools = () => {
  const data = [
    {
      logo: react,
      title: 'React 18',
      href: 'https://react.dev/',
    },
    {
      logo: tailwind,
      title: 'Tailwind CSS',
      href: 'https://tailwindcss.com/',
    },
    {
      logo: radix,
      title: 'Radix',
      href: 'https://www.radix-ui.com/',
    },
    {
      logo: shadeCn,
      title: 'Shade Cn',
      href: 'https://ui.shadcn.com/',
    },
    {
      logo: vite,
      title: 'Vite',
      href: 'https://vitejs.dev/',
    },
    {
      logo: next,
      title: 'Next 14',
      href: 'https://nextjs.org/',
    },
    {
      logo: nextTheme,
      title: 'Next Theme',
      href: 'https://www.npmjs.com/package/next-themes',
    },
    {
      logo: nextAuth,
      title: 'Next Auth',
      href: 'https://next-auth.js.org/',
    },
    {
      logo: axios,
      title: 'axios',
      href: 'https://axios-http.com/',
    },
    {
      logo: zustand,
      title: 'Zustand',
      href: 'https://zustand-demo.pmnd.rs/',
    },
    {
      logo: reactHookForm,
      title: 'React Hook Form',
      href: 'https://react-hook-form.com/',
    },
    {
      logo: zod,
      title: 'zod',
      href: 'https://zod.dev/',
    },
    {
      logo: framerMotion,
      title: 'framer motion',
      href: 'https://www.framer.com/motion/',
    },
    {
      logo: swiper,
      title: 'Swiper',
      href: 'https://swiperjs.com/',
    },
    {
      logo: emblaCarousel,
      title: 'Embla Carousel',
      href: 'https://www.embla-carousel.com/',
    },
    {
      logo: googleMap,
      title: 'Google Map',
      href: 'https://www.npmjs.com/package/google-map-react',
    },
    {
      logo: vectorMap,
      title: 'Vector Map',
      href: 'https://react-vector-maps.netlify.app/',
    },
    {
      logo: unovis,
      title: 'Unovis Map',
      href: 'https://unovis.dev/',
    },
    {
      logo: reactLeaflet,
      title: 'React Leaflet',
      href: 'https://react-leaflet.js.org/',
    },
    {
      logo: recharts,
      title: 'Recharts',
      href: 'https://recharts.org/en-US/',
    },
    {
      logo: appexChart,
      title: 'Appex Chart',
      href: '',
    },
    {
      logo: appexChart,
      title: 'Appex Chart',
      href: 'https://apexcharts.com/',
    },
    {
      logo: chart,
      title: 'Chart Js',
      href: 'https://www.chartjs.org/',
    },
  ]
  return (
    <section className="bg-default-100 py-16 2xl:py-[120px]" id="tools">
      <div className="container">
        <div className="max-w-[670px] mx-auto">
          <h2 className="text-center text-xl xl:text-3xl leading-[46px] font-semibold text-default-900 mb-3">
            Tools & <span className="text-primary">Technologies</span>
          </h2>
          <p className="text-base xl:leading-7 text-center text-default-700 ">
            Using top UI frameworks and the latest technologies, build your
            dream app with our platform, supported by regular updates. Explore
            the tech we employ.
          </p>
        </div>
        <div className="mt-14">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8  gap-y-12">
            {data.map((item, index) => (
              <Link
                href={item.href}
                key={`project-tools-${index}`}
                className="hover:-translate-y-1 transition-transform duration-300 group"
                target="_blank"
              >
                <div className="flex flex-col items-center">
                  <div className=" w-20 h-16">
                    <img
                      src={item.logo}
                      alt="project logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-sm xl:text-base font-semibold text-default-700 mt-4 text-center group-hover:text-primary">
                    {item.title}
                  </h3>
                </div>
              </Link>
            ))}
            <div className="hover:-translate-y-1 transition-transform duration-300 group">
              <div className="flex flex-col items-center">
                <div className=" w-20 h-16">
                  <img
                    src={plus}
                    alt="project logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-sm xl:text-base font-semibold text-default-700 mt-4 text-center group-hover:text-primary">
                  more
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProjectTools
