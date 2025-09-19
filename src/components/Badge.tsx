// Badge Component
type BadgeProps = {
  badgeText: string;
};

export const Badge = ({ badgeText }: BadgeProps) => (
  <div className="relative inline-block mb-[6.1875rem]">
    <div className="absolute z-0 top-0 left-0 bg-[#555555] w-full h-full rounded-md transform translate-x-2 translate-y-2" />
    <div className="relative z-10 inline-block bg-yellow-400 font-spaceMono text-black sm:text-sm md:text-base lg:text-xl xl:text-[1.4125rem] 2xl:text-[1.9013rem] font-normal pt-[13px] pb-[14px] ps-[72px] pe-[90px] rounded-md shadow-lg hover:bg-yellow-500 transition-colors duration-200">
      {badgeText}
    </div>
  </div>
);
