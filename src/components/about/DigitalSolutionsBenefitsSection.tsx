import React from 'react';
import { ChartNoAxesColumnIncreasing, ChartPie, Lightbulb, Settings, Wallet } from 'lucide-react';
import benefitsBg from '../../assets/benefits/benefits-bg.optimized.webp';

const benefitsData = [
  {
    title: 'Creative',
    description:
      'Regardless of the job we get, our creativity makes the outcome more productive and result-driven.',
    icon: Lightbulb,
    iconColor: 'text-amber-700',
  },
  {
    title: 'Futuristic',
    description:
      'We think about tomorrow. Thus, our futuristic solution follows current trends and technologies.',
    icon: Settings,
    iconColor: 'text-sky-700',
  },
  {
    title: 'Result-Driven',
    description:
      'Our solutions are designed to succeed. We ensure that our solution brings you the preferred result.',
    icon: ChartPie,
    iconColor: 'text-rose-700',
  },
  {
    title: 'Scalable',
    description:
      'We know your business will grow. Our solutions are scalable enough to match your growing requirements.',
    icon: ChartNoAxesColumnIncreasing,
    iconColor: 'text-teal-700',
  },
  {
    title: 'Affordable',
    description:
      'Charging a skyrocketing amount and fooling clients have never been our forte. Our solutions are pocket-friendly.',
    icon: Wallet,
    iconColor: 'text-blue-700',
  },
];

export const DigitalSolutionsBenefitsSection: React.FC = () => (
  <section aria-labelledby="benefits-title" className="relative w-full bg-white select-text font-sans">
    <div className="relative w-full bg-[#E41C26] pt-12 sm:pt-14 md:pt-16 pb-20 sm:pb-24 md:pb-28 px-4 sm:px-6 overflow-hidden text-center text-white">
      <img
        decoding="async"
        src={benefitsBg}
        alt=""
        width={1024}
        height={341}
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
      />
      <div className="relative z-10 max-w-5xl mx-auto">
        <p className="text-xs sm:text-[13px] font-bold tracking-[0.25em] uppercase mb-2 sm:mb-2.5">
          BENEFITS
        </p>
        <h3 id="benefits-title" className="text-2xl sm:text-3xl md:text-[36px] lg:text-[40px] font-bold tracking-tight leading-tight">
          5 Qualities of Our Digital Solutions
        </h3>
        <div aria-hidden="true" className="w-12 sm:w-14 h-1 sm:h-1.5 bg-[#FFD020] rounded-full mx-auto my-3 sm:my-3.5" />
        <p className="text-sm md:text-base font-medium max-w-4xl mx-auto leading-relaxed">
          Whatever we do, quality remains constant. That&apos;s how we have been able to offer the best web design in Coimbatore.
        </p>
      </div>
    </div>

    <div className="relative w-full pb-16 sm:pb-24">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
        <div className="-mt-14 sm:-mt-16 md:-mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4 xl:gap-5 items-stretch">
          {benefitsData.map(({ title, description, icon: Icon, iconColor }) => (
            <div
              key={title}
              className="group relative z-10 bg-white rounded-[12px] pt-7 pb-8 px-4 sm:px-5 flex flex-col items-center text-center border border-neutral-200 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-lg transition-shadow duration-200"
            >
              <Icon
                aria-hidden="true"
                strokeWidth={1.75}
                className={`w-16 h-16 sm:w-[72px] sm:h-[72px] mb-3 sm:mb-4 ${iconColor}`}
              />
              <h4 className="text-lg md:text-[19px] font-bold text-[#111111] tracking-tight mb-2 group-hover:text-[#E41C26] transition-colors duration-200">
                {title}
              </h4>
              <p className="text-sm text-neutral-700 leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default DigitalSolutionsBenefitsSection;
