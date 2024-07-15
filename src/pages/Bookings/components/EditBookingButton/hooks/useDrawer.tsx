import { useState } from "react";

const useDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  return {
    isOpen,
    setIsOpen,
  };
};

export default useDrawer;
