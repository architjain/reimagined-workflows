import React from "react";
import Header from "@cloudscape-design/components/header";
import Container from "@cloudscape-design/components/container";
import SpaceBetween from "@cloudscape-design/components/space-between";
import { useState } from "react";
import "@cloudscape-design/global-styles/index.css";

import "./App.css";

import { EmptyWorkflowStepInfo } from "./steps/WorkflowStep";
import Step from "./Step";
import { StepInfo } from "./StepTypes";
import { Button, FileUpload } from "@cloudscape-design/components";

const App: React.FunctionComponent<{}> = () => {
  const [workflow, setWorkflow] = useState<StepInfo>(
    structuredClone(EmptyWorkflowStepInfo)
  );
  const [loading, setLoading] = useState<boolean>(false);

  const downloadTxtFile = ({
    data,
    fileName = "data.json",
    type = "text/plain",
  }: {
    data: string;
    fileName?: string;
    type?: string;
  }) => {
    const element = document.createElement("a");
    const file = new Blob([data], { type: type });
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element);
  };
  function loadFile(file: File) {
    setLoading(true);
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onloadend = function(){
      setWorkflow(JSON.parse(reader.result as string) as StepInfo);
      setLoading(false);
    }
  }

  return (
    <div className="App">
      <Container>
        <SpaceBetween size="m">
          <Header
            variant="h1"
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <Button
                  variant="primary"
                  onClick={() =>
                    downloadTxtFile({ data: JSON.stringify(workflow, null, 2) })
                  }
                >
                  Download Workflow
                </Button>
                <Button
                  variant="primary"
                  onClick={() =>setWorkflow(structuredClone(EmptyWorkflowStepInfo))}
                >
                  Clear Workflow
                </Button>
                <FileUpload
                  onChange={({ detail }) => {
                    console.log(detail);
                    if (detail.value && detail.value.length > 0) {
                      loadFile(detail.value[0]);
                    }
                  }
                  }
                  value={[]}
                  i18nStrings={{
                    uploadButtonText: (e) =>
                      e ? "Choose files" : "Load from file",
                    dropzoneText: (e) =>
                      e ? "Drop files to upload" : "Drop file to upload",
                    removeFileAriaLabel: (e) => `Remove file ${e + 1}`,
                    limitShowFewer: "Show fewer files",
                    limitShowMore: "Show more files",
                    errorIconAriaLabel: "Error",
                  }}
                  showFileLastModified
                  showFileSize
                  showFileThumbnail
                  tokenLimit={1}
                />
              </SpaceBetween>
            }
          >
            Request Workflow
          </Header>

          {!loading && <Container>
            <Step
              iterationNumber={0}
              indices={[]}
              stepInfo={workflow}
              updateStep={(data: StepInfo) => setWorkflow(data)}
              deleteStep={() => {}}
            />
          </Container>}
        </SpaceBetween>
      </Container>
    </div>
  );
};

export default App;
