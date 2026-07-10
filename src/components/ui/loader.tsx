import Lottie from "lottie-react/build/index.es.js";
import animationData from "@/assets/loader-animation.json";

type Props = {
  size?: number;
  className?: string;
  fixed?: boolean;
};

export const Loader = ({ size = 120, fixed }: Props) => {
  const containerClass = fixed
    ? "fixed inset-0 flex items-center justify-center"
    : "";

  return (
    <div className={containerClass}>
      <Lottie
        animationData={animationData}
        autoplay
        loop
        rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
        style={{ height: size, width: size }}
      />
    </div>
  );
};
