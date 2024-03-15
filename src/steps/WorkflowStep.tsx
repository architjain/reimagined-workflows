import {
  SpaceBetween,
} from "@cloudscape-design/components";
import { WorkflowStepBaseInfo, StepInfo } from "../StepTypes";
import Step from "../Step";
import { StepProps } from "../StepTypes";
import { EmptyInferenceStepInfo } from "./InferenceStep";
import { EmptyPromptStepInfo } from "./PromptStep";
import { EmptyPlanGenStepInfo } from "./PlanGenStep";
import { EmptyPlanExecutionStepInfo } from "./PlanExecutionStep";

type WorkflowStepProps = StepProps<WorkflowStepInfo>;

export type WorkflowStepInfo = WorkflowStepBaseInfo & {
  stepType: "workflow";
  stepCategory: "PlanExecution";
  stepContent: { substeps: StepInfo[] };
};

export const EmptyWorkflowStepInfo: WorkflowStepInfo = {
  stepType: "workflow",
  stepCategory: "PlanExecution",
  stepContent: {
    substeps: [
      structuredClone({
        ...EmptyPlanGenStepInfo,
        categoryDisplayOverride: "InitalActionPlanGen",
      }),
      structuredClone({
        ...EmptyPlanExecutionStepInfo,
        categoryDisplayOverride: "InitalActionPlanExecution",
      }),
      structuredClone(EmptyPromptStepInfo),
      structuredClone(EmptyInferenceStepInfo),
      structuredClone(EmptyPlanGenStepInfo),
      structuredClone(EmptyPlanExecutionStepInfo),
    ],
  },
};

export type StepTypes =
  | "Inference"
  | "PromptConstruction"
  | "PlanGenearation"
  | "PlanExecution"
  | "workflow";

const WorkflowStep: React.FunctionComponent<WorkflowStepProps> = ({
  stepInfo,
  indices,
  updateStep,
  deleteStep,
}) => {
  const setSubSteps = (substeps: StepInfo[]): void => {
    updateStep({
      ...stepInfo,
      stepContent: {
        substeps: substeps,
      },
    });
  };

  const deleteSubStep = (idx: number): void => {
    const clonedSteps = [...stepInfo.stepContent.substeps];
    clonedSteps.splice(idx, 1);
    setSubSteps(clonedSteps);
  };

  const updateSubStep = (subStepInfo: StepInfo, idx: number): void => {
    const clonedSteps = [...stepInfo.stepContent.substeps];
    clonedSteps.splice(idx, 1, subStepInfo);
    setSubSteps(clonedSteps);
  };

  function addSiblingsBeforeMe(idx: number, newStepInfos: StepInfo[]): void {
    const clonedSteps = [...stepInfo.stepContent.substeps];
    clonedSteps.splice(idx, 0, ...newStepInfos);
    setSubSteps(clonedSteps);
  }

  function addSiblingsAfterMe(idx: number, newStepInfos: StepInfo[]): void {
    const clonedSteps = [...stepInfo.stepContent.substeps];
    clonedSteps.splice(idx+1, 0, ...newStepInfos);
    setSubSteps(clonedSteps);
  }

  function addSiblingsAtEnd(idx: number, newStepInfos: StepInfo[]): void {
    const newSteps = [...stepInfo.stepContent.substeps, ...newStepInfos];
    setSubSteps(newSteps);
  }

  return (
    <SpaceBetween size="xxs">
      {stepInfo.stepContent.substeps.map((step, idx, allSteps) => (
        <Step
          addSiblingsBeforeMe={(newStepInfos) =>
            addSiblingsBeforeMe(idx, newStepInfos)
          }
          addSiblingsAfterMe={(newStepInfos) =>
            addSiblingsAfterMe(idx, newStepInfos)
          }
          addSiblingsAtEnd={(newStepInfos) =>
            addSiblingsAtEnd(idx, newStepInfos)
          }
          iterationNumber={
            allSteps
              .slice(0, idx + 1)
              .filter((step) => step.stepCategory === "PromptConstruction").length
          }
          indices={[...indices, idx]}
          stepInfo={step}
          key={idx}
          deleteStep={() => deleteSubStep(idx)}
          updateStep={(subStepInfo: StepInfo) =>
            updateSubStep(subStepInfo, idx)
          }
        />
      ))}
    </SpaceBetween>
  );
};

export default WorkflowStep;
