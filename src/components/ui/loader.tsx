import { cn } from "@/utils/tailwind";

type Props = React.SVGProps<SVGSVGElement> & {
  size?: number;
  className?: string;
  fixed?: boolean;
};

export const Loader = ({ className, size = 48, fixed }: Props) => {
  const containerClass = fixed
    ? "fixed inset-0 flex items-center justify-center"
    : "";

  return (
    <div className={containerClass}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("animate-spin", "text-secondary", className)}
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>{" "}
    </div>
  );
};
