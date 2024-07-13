import Lottie from "react-lottie";
import animationData from "public/no-data-animation.json";
import { cn } from "@/utils/tailwind";
import { Button } from "./button";

type Props = {
  size?: number;
  className?: string;
  onClick?: () => void;
  buttonLabel?: string;
};

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const NoData = ({ size, className, onClick, buttonLabel }: Props) => {
  return (
    <div
      className={cn(
        "mx-auto flex flex-col items-center mt-10 max-w-full w-[450px]",
        className
      )}
    >
      <h1 className="text-3xl font-bold text-secondary text-center">
        Sorry, we couldn't find any available property
      </h1>

      <div className="pointer-events-none">
        <Lottie
          options={defaultOptions}
          height={size}
          width={size}
          isClickToPauseDisabled
        />
      </div>

      <Button variant="secondary" onClick={onClick} className="text-xl">
        {buttonLabel}
      </Button>
    </div>
  );
};

export default NoData;
