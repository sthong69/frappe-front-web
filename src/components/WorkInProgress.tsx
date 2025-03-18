import { Construction } from "lucide-react";

const WorkInProgress = () => {
  return (
    <div className="flex flex-col items-center justify-center px-4 pt-6 text-center">
      <div className="relative mb-4">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary via-blue-500 to-blue-900 opacity-75 blur-sm"></div>
        <div className="relative rounded-full bg-background p-4">
          <Construction className="h-16 w-16 text-primary" />
        </div>
      </div>

      <h2 className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-3xl font-bold text-transparent">
        Fonctionnalité en cours de développement
      </h2>
    </div>
  );
};

export default WorkInProgress;
