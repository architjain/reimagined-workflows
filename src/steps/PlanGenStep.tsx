import TextStep from "./TextBasedStep";
import { StepProps, WorkflowStepBaseInfo } from "../StepTypes";

type PlanGenStepProps = StepProps<PlanGenStepInfo>;


export type PlanGenStepInfo = WorkflowStepBaseInfo & {
    stepType: 'atomic';
    stepCategory: 'PlanGenearation';
    stepContent: { plan: string; }
};

export const EmptyPlanGenStepInfo:PlanGenStepInfo = {
  stepType: "atomic",
  stepCategory: "PlanGenearation",
  stepContent: { plan: "" },
};



const PlanGenStep: React.FunctionComponent<PlanGenStepProps> = (props) => {
    return (
      <TextStep
        {...props}
        getVal={(stepInfo: PlanGenStepInfo) => stepInfo.stepContent.plan}
        setVal={(value: string, stepInfo: PlanGenStepInfo) => {
          stepInfo.stepContent.plan = value;
          return stepInfo;
        }}
      />
    );
  };
  
  export default PlanGenStep;
  