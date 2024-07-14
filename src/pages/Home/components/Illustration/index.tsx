import { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;

const Illustration = (props: Props) => {
  return (
    <svg
      className="transform -translate-y-[-1px] my-5"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
      {...props}
    >
      <path
        fill="#f3f3f7"
        fillOpacity="1"
        d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,122.7C960,160,1056,224,1152,245.3C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      ></path>
    </svg>
  );
};

export default Illustration;
