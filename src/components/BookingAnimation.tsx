import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type BookingStatus = "loading" | "success" | "error";

interface BookingAnimationProps {
  status?: BookingStatus;
  message?: string;
  onReset?: () => void;
}

export default function BookingAnimation({
  status = "loading",
  message = "",
  onReset = () => {},
}: BookingAnimationProps) {
  const [currentStatus, setCurrentStatus] = useState<BookingStatus>(status);

  // Update the status when the prop changes
  useEffect(() => {
    setCurrentStatus(status);
  }, [status]);

  const statusMessages = {
    loading: "Proposition de rendez-vous en cours...",
    success: message || "Votre rendez-vous a été proposé avec succès !",
    error:
      message ||
      "Une erreur est survenue lors de la réservation du rendez-vous. Veuillez réessayer.",
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 p-8">
      <div className="relative flex h-32 w-32 items-center justify-center">
        <AnimatePresence mode="wait">
          {currentStatus === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="h-16 w-16 rounded-full border-4 border-primary border-t-transparent"
              />
              <Loader2 className="absolute h-8 w-8 animate-spin text-primary" />
            </motion.div>
          )}

          {currentStatus === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.1,
                }}
                className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100"
              >
                <motion.div
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Check className="h-12 w-12 text-green-600" strokeWidth={3} />
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {currentStatus === "error" && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.1,
                }}
                className="flex h-24 w-24 items-center justify-center rounded-full bg-red-100"
              >
                <motion.div
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <X className="h-12 w-12 text-red-600" strokeWidth={3} />
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        key={currentStatus}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center"
      >
        <h3
          className={`text-xl font-semibold ${currentStatus === "loading" ? "text-primary" : currentStatus === "success" ? "text-green-600" : "text-red-600"}`}
        >
          {statusMessages[currentStatus]}
        </h3>

        {(currentStatus === "success" || currentStatus === "error") && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4"
          >
            <Button
              onClick={onReset}
              variant={currentStatus === "error" ? "destructive" : "default"}
              className="mt-2 w-full font-semibold text-black sm:w-auto sm:min-w-[16rem] md:w-full lg:w-96"
            >
              {currentStatus === "success"
                ? "Revenir à l'accueil"
                : "Réessayer"}
            </Button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
