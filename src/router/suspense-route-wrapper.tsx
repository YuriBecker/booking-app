import { Loader } from "@/components/ui/loader";
import { Suspense } from "react";

type Props = {
  children: React.ReactNode;
};

const SuspenseRouteWrapper = ({ children }: Props) => {
  return <Suspense fallback={<Loader fixed />}>{children}</Suspense>;
};

export default SuspenseRouteWrapper;
