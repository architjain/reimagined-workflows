import TextStep from "./TextBasedStep";
import { StepProps, WorkflowStepBaseInfo } from "../StepTypes";

type PromptStepProps = StepProps<PromptStepInfo>;

export type PromptStepInfo = WorkflowStepBaseInfo & {
  stepType: "atomic";
  stepCategory: "PromptConstruction";
  stepContent: { prompt: string };
};

export const EmptyPromptStepInfo:PromptStepInfo = {
  stepType: "atomic",
  stepCategory: "PromptConstruction",
  stepContent: { prompt: "" },
};


const PromptStep: React.FunctionComponent<PromptStepProps> = (props) => {
  return (
    <TextStep
      {...props}
      getVal={(stepInfo: PromptStepInfo) => stepInfo.stepContent.prompt}
      setVal={(value: string, stepInfo: PromptStepInfo) => {
        stepInfo.stepContent.prompt = value;
        return stepInfo;
      }}
    />
  );
};

export default PromptStep;
