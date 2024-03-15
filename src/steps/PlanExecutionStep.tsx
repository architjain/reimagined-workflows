import TextStep from "./TextBasedStep";
import { StepProps, WorkflowStepBaseInfo } from "../StepTypes";

type PlanExecutionStepProps = StepProps<PlanExecutionStepInfo>;

export type PlanExecutionStepInfo = WorkflowStepBaseInfo & {
    stepType: 'atomic';
    stepCategory: 'PlanExecution';
    stepContent: { executionresult: string; }
};


export const EmptyPlanExecutionStepInfo:PlanExecutionStepInfo = {
  stepType: "atomic",
  stepCategory: "PlanExecution",
  stepContent: { executionresult: "" },
};


const PlanExecutionStep: React.FunctionComponent<PlanExecutionStepProps> = (props) => {
    return (
      <TextStep
        {...props}
        getVal={(stepInfo: PlanExecutionStepInfo) => stepInfo.stepContent.executionresult}
        setVal={(value: string, stepInfo: PlanExecutionStepInfo) => {
          stepInfo.stepContent.executionresult = value;
          return stepInfo;
        }}
      />
    );
  };
  
  export default PlanExecutionStep;
  