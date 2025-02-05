import { useEffect, useState } from "react";
import BounceLoader from "react-spinners/BounceLoader";

interface LoadingSpinnerProps {
  color?: string;
  waitingText?: string;
}

const LoadingSpinner = (props: LoadingSpinnerProps) => {
  const [dots, setDots] = useState<string>("");

  useEffect(() => {
    if (!props.waitingText) {
      return;
    }

    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="m-16 flex flex-col items-center gap-6">
      <BounceLoader color="#38b6ff" />
      {props.waitingText && (
        <p className="text-center text-lg font-semibold text-primary">
          {props.waitingText}
          <span>{dots}</span>
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
