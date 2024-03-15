import { SpaceBetween } from "@cloudscape-design/components";
import { StepProps, WorkflowStepBaseInfo } from "../StepTypes";
import EditableTextView from "./EditableTextView";

interface DataFn<T> {
  getVal: (stepInfo: T) => string;
  setVal: (val: string, stepInfo: T) => T;
}

const TextStep = <T extends WorkflowStepBaseInfo>({
  stepInfo,
  updateStep,
  getVal,
  setVal,
}: StepProps<T> & DataFn<T>) => {
  const updateText = (value: string): void => {
    updateStep(setVal(value, stepInfo));
  };

  return (
    <SpaceBetween size="xxs">
      <EditableTextView
        onChange={({ detail }) => updateText(detail.value)}
        value={getVal(stepInfo)}
        placeholder="This is a placeholder"
      />
    </SpaceBetween>
  );
};

export default TextStep;
