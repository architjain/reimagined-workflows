import { WorkflowStepInfo } from "./steps/WorkflowStep";
import { PromptStepInfo } from "./steps/PromptStep";
import { InferenceStepInfo } from "./steps/InferenceStep";
import { PlanExecutionStepInfo } from "./steps/PlanExecutionStep";
import { PlanGenStepInfo } from "./steps/PlanGenStep";

export interface WorkflowStepBaseInfo {
  stepType: "atomic" | "workflow";
  stepCategory: "Inference" | "PromptConstruction" | "PlanGenearation" | "PlanExecution";
  categoryDisplayOverride?: string;
  stepTitle?: string;
  stepDescription?: string;
  backgroundOverride?: string;
  additionalNotes?: string[];
}

export interface StepProps<T> {
  stepInfo: T;
  indices: number[];
  iterationNumber: number;
  addSiblingsBeforeMe?: (stepInfos: StepInfo[]) => void;
  addSiblingsAfterMe?: (stepInfos: StepInfo[]) => void;
  addSiblingsAtEnd?: (stepInfos: StepInfo[]) => void;
  deleteStep: () => void;
  updateStep: (stepInfo: T) => void;
}

export type StepInfo =
  | WorkflowStepInfo
  | PromptStepInfo
  | PlanGenStepInfo
  | InferenceStepInfo
  | PlanExecutionStepInfo;
