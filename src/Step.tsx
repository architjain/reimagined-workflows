import { StepProps, StepInfo } from "./StepTypes";
import InferenceStep, {
  EmptyInferenceStepInfo,
  InferenceStepInfo,
} from "./steps/InferenceStep";
import PlanExecutionStep, {
  EmptyPlanExecutionStepInfo,
  PlanExecutionStepInfo,
} from "./steps/PlanExecutionStep";
import PlanGenStep, {
  EmptyPlanGenStepInfo,
  PlanGenStepInfo,
} from "./steps/PlanGenStep";
import PromptStep, {
  EmptyPromptStepInfo,
  PromptStepInfo,
} from "./steps/PromptStep";
import WorkflowStep, {
  EmptyWorkflowStepInfo,
  StepTypes,
  WorkflowStepInfo,
} from "./steps/WorkflowStep";
import Button from "@cloudscape-design/components/button";
import {
  ButtonDropdown,
  Container,
  Header,
  SpaceBetween,
} from "@cloudscape-design/components";

type AStepProps = StepProps<StepInfo>;

const Step: React.FunctionComponent<AStepProps> = (props) => {
  const { stepInfo } = props;

  if (stepInfo.stepType === "workflow") {
    return <WorkflowStep {...props} stepInfo={stepInfo as WorkflowStepInfo} />;
  }
  switch (stepInfo.stepCategory) {
    case "Inference":
      return (
        <InferenceStep {...props} stepInfo={stepInfo as InferenceStepInfo} />
      );
    case "PlanExecution":
      return (
        <PlanExecutionStep
          {...props}
          stepInfo={stepInfo as PlanExecutionStepInfo}
        />
      );
    case "PlanGenearation":
      return <PlanGenStep {...props} stepInfo={stepInfo as PlanGenStepInfo} />;
    case "PromptConstruction":
      return <PromptStep {...props} stepInfo={stepInfo as PromptStepInfo} />;
  }
  return <>"Unknow step</>;
};
function genStepInfo(indices: number[], stepInfo: StepInfo) {
  return `${indices.map((i) => String(i + 1)).join(".")}: ${
    stepInfo.categoryDisplayOverride || stepInfo.stepCategory
  }`;
}

const createWorkflowStep = (id: StepTypes): StepInfo => {
  let newSubStep: StepInfo;
  switch (id) {
    case "Inference":
      newSubStep = structuredClone(EmptyInferenceStepInfo);
      break;
    case "PromptConstruction":
      newSubStep = structuredClone(EmptyPromptStepInfo);
      break;
    case "PlanGenearation":
      newSubStep = structuredClone(EmptyPlanGenStepInfo);
      break;
    case "PlanExecution":
      newSubStep = structuredClone(EmptyPlanExecutionStepInfo);
      break;
    case "workflow":
      newSubStep = structuredClone(EmptyWorkflowStepInfo);
      break;
    default:
      throw new Error("Unknown step type");
  }
  return newSubStep;
};

const createInferenceSteps = (): StepInfo[] => {
  const InferenceSteps = [
    structuredClone(EmptyPromptStepInfo),
    structuredClone(EmptyInferenceStepInfo),
    structuredClone(EmptyPlanGenStepInfo),
    structuredClone(EmptyPlanExecutionStepInfo),
  ];
  return InferenceSteps;
};

type StepContainerProps = StepProps<StepInfo> & {};
const StepContainer: React.FunctionComponent<StepContainerProps> = (props) => {
  const {
    addSiblingsAtEnd,
    addSiblingsBeforeMe,
    indices,
    stepInfo,
    iterationNumber,
    deleteStep,
    updateStep,
  } = props;
  const deleteMe = (): void => {
    deleteStep();
  };

  const stepView = <Step {...props} />;
  const isTopMost = indices.length === 0;
  return (
    <Container
      data-step={"step"}
      data-step-type={stepInfo.stepType}
      data-step-category={stepInfo.stepCategory}
      data-step-level={indices.length}
      header={
        <Header
          data-step={"step:header"}
          data-step-type={stepInfo.stepType}
          data-step-category={stepInfo.stepCategory}
          data-step-level={indices.length}
          variant="h3"
          info={stepInfo.stepDescription}
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              {stepInfo.stepCategory === "PlanExecution" &&
              stepInfo.stepType === "atomic" && iterationNumber > 0 ? (
                <Button
                  variant="primary"
                  onClick={() =>
                    updateStep(structuredClone(EmptyWorkflowStepInfo))
                  }
                >
                  Replace With Sub Node (LLM Iteration)
                </Button>
              ) : (
                <></>
              )}

              {!isTopMost &&
              stepInfo.stepCategory === "PlanExecution" &&
              stepInfo.stepType === "workflow" && iterationNumber > 0 ? (
                <Button
                  variant="primary"
                  onClick={() =>
                    updateStep(structuredClone(EmptyPlanExecutionStepInfo))
                  }
                >
                  Replace With API Invocation
                </Button>
              ) : (
                <></>
              )}

              {addSiblingsBeforeMe && (
                <ButtonDropdown
                  items={[
                    { text: "Inference", id: "Inference" },
                    { text: "Prompt Gen", id: "PromptConstruction" },
                    { text: "Plan Gen", id: "PlanGenearation" },
                    { text: "Plan Execution", id: "PlanExecution" },
                    { text: "Workflow", id: "workflow" },
                  ]}
                  variant="primary"
                  onItemClick={({ detail: { id } }) => {
                    const workflowStep = createWorkflowStep(id as StepTypes);
                    addSiblingsBeforeMe([workflowStep]);
                  }}
                >
                  Create Step Above
                </ButtonDropdown>
              )}

              {addSiblingsAtEnd &&
                stepInfo.stepCategory === "PlanExecution" &&
                stepInfo.stepType === "workflow" && (
                  <Button
                    variant="primary"
                    onClick={() => {
                      addSiblingsAtEnd(createInferenceSteps());
                    }}
                  >
                    Add Another LLM Iteration
                  </Button>
                )}

              {!isTopMost && (
                <Button variant="primary" onClick={deleteMe}>
                  Delete
                </Button>
              )}
            </SpaceBetween>
          }
        >
          {!isTopMost && (
            <>
              {genStepInfo(indices, stepInfo)}
              {stepInfo.stepTitle ? " - " + stepInfo.stepTitle : ""}
              {":"}
              {`Pass-${iterationNumber}`}
            </>
          )}
        </Header>
      }
    >
      {stepView}
    </Container>
  );
};

export default StepContainer;
