import Lottie from "react-lottie";
import animationData from "public/loader-animation.json";

type Props = {
  size?: number;
  className?: string;
  fixed?: boolean;
};

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export const Loader = ({ size = 120, fixed }: Props) => {
  const containerClass = fixed
    ? "fixed inset-0 flex items-center justify-center"
    : "";

  return (
    <div className={containerClass}>
      <Lottie
        options={defaultOptions}
        height={size}
        width={size}
        isClickToPauseDisabled
      />
    </div>
  );
};
