import type { FC } from "react";
import { Info } from "lucide-react";

interface InfoDialogueProps {
  text: string;
}

const InfoDialogue: FC<InfoDialogueProps> = ({ text }) => {
  return (
    <div className="group relative">
      <Info className="text-n2 hover:text-p2 h-4 w-4" />
      <div className="bg-n3 absolute bottom-6 left-1/2 z-10 hidden w-48 -translate-x-1/2 rounded-md p-2.5 text-sm leading-tight font-medium shadow-xl group-hover:block">
        {text}
      </div>
    </div>
  );
};

export default InfoDialogue;
