import animationData from "public/vacation.json";
import Lottie from "react-lottie";
import Illustration from "./components/Illustration";
import SearchForm from "./components/SearchForm";
import useSearchForm from "./hooks/useSearchForm";

const HomePage = () => {
  const { form, onSubmit } = useSearchForm();

  return (
    <div className="bg-secondary w-full">
      <div className="container mx-auto px-8 pt-10">
        <h1 className="text-3xl text-secondary-foreground font-bold">
          Find your next stay at{" "}
          <span className="text-primary">California</span>
        </h1>
        <p className="text-md text-secondary-foreground mt-2">
          Search deals on hotels, homes, and much more...
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 lg:mt-12">
          <div className="h-72 sm:h-[400px] pointer-events-none">
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData,
                rendererSettings: {
                  preserveAspectRatio: "xMidYMid slice",
                },
              }}
              isClickToPauseDisabled
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
