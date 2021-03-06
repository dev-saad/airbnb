import Image from "next/image";

const Banner = () => {
  return (
    <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[680px] 2xl:h-[700px]">
      <Image
        src="https://links.papareact.com/0fm"
        layout="fill"
        objectFit="cover"
        objectPosition="bottom"
      />
      <div className="absolute top-1/2 w-full text-center">
        <p className="text-sm sm:text-xl font-semibold text-gray-900">
          Not sure where to go? Perfect
        </p>
        <button className="text-purple-500 bg-white px-12 py-4 shadow-md rounded-full font-bold my-5 hover:shadow-lg active:scale-95 origin-center transition-all duration-50 text-lg">
          I'm flexible
        </button>
      </div>
    </div>
  );
};

export default Banner;
