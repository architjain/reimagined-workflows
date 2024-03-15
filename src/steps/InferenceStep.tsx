import TextStep from "./TextBasedStep";
import { StepProps, WorkflowStepBaseInfo } from "../StepTypes";

type InferenceStepProps = StepProps<InferenceStepInfo>;

export type InferenceStepInfo = WorkflowStepBaseInfo & {
    stepType: 'atomic';
    stepCategory: 'Inference';
    stepContent: { InferenceOutput: string; }
};

export const EmptyInferenceStepInfo:InferenceStepInfo = {
  stepType: "atomic",
  stepCategory: "Inference",
  stepContent: { InferenceOutput: "" },
};



const InferenceStep: React.FunctionComponent<InferenceStepProps> = (props) => {
    return (
      <TextStep
        {...props}
        getVal={(stepInfo: InferenceStepInfo) => stepInfo.stepContent.InferenceOutput}
        setVal={(value: string, stepInfo: InferenceStepInfo) => {
          stepInfo.stepContent.InferenceOutput = value;
          return stepInfo;
        }}
      />
    );
  };
  
  export default InferenceStep;
  