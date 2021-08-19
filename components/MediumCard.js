import { XIcon } from "@heroicons/react/outline";
import {
  AnimatePresence,
  AnimateSharedLayout,
  motion,
  MotionConfig,
} from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const MediumCard = ({ img, title, id }) => {
  const [selectedId, setSelectedId] = useState(null);
  return (
    <AnimateSharedLayout type="crossfade">
      <div>
        <motion.div
          className="cursor-pointer hover:scale-105 transform transition duration-300 ease-out !origin-center"
          layoutId={id}
          onClick={() => {
            setSelectedId(id);
          }}
        >
          <motion.div className="relative h-80 w-80">
            <Image src={img} layout="fill" className="rounded-xl" />
          </motion.div>
        </motion.div>
        <motion.h3 className="text-2xl mt-3">{title}</motion.h3>
      </div>
      <AnimatePresence>
        {selectedId && (
          <motion.div
            layoutId={selectedId}
            className="fixed z-10 overflow-hidden w-full h-[91vh] flex justify-center items-center -left-3 top-[84px]"
            transition={{ duration: 0.2, delay: 0.2 }}
          >
            <motion.div className="relative w-[500px] h-[500px] sm:w-[600px] sm:h-[600px] lg:w-[800px] lg:h-[800px]  ring-[100vw] ring-red-600 ring-opacity-50 rounded-xl">
              <Image src={img} layout="fill" className="rounded-xl" />
              <motion.button onClick={() => setSelectedId(null)}>
                <XIcon className="h-10 w-10 absolute top-8 right-8 p-2 bg-red-200 bg-opacity-100 rounded-full text-red-400 hover:scale-110 active:scale-75 transition-transform duration-300" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimateSharedLayout>
    // <div className="cursor-pointer hover:scale-105 transform transition duration-300 ease-out">
    //   <div className="relative h-80 w-80">
    //     <Image src={img} layout="fill" className="rounded-xl" />
    //   </div>
    //   <h3 className="text-2xl mt-3">{title}</h3>
    // </div>
  );
};

export default MediumCard;
