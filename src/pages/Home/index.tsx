import animationData from "@/assets/vacation.json";
import Lottie from "lottie-react/build/index.es.js";
import Illustration from "./components/Illustration";
import SearchForm from "./components/SearchForm";
import useSearchForm from "./hooks/useSearchForm";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const { form, onSubmit } = useSearchForm();
  const { t } = useTranslation();

  return (
    <div className="bg-secondary w-full">
      <div className="container mx-auto px-8 pt-10">
        <h1 className="text-3xl text-secondary-foreground font-bold">
          {t("home.heading")} <span className="text-primary">{t("home.location")}</span>
        </h1>
        <p className="text-md text-secondary-foreground mt-2">
          {t("home.subtitle")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 lg:mt-12">
          <div className="h-72 sm:h-[400px] pointer-events-none">
            <Lottie
              animationData={animationData}
              autoplay
              loop
              rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
            />
          </div>

          <div className="flex flex-col justify-center">
            <SearchForm form={form} onSubmit={onSubmit} />
          </div>
        </div>
      </div>

      <Illustration />
    </div>
  );
};

export default HomePage;
