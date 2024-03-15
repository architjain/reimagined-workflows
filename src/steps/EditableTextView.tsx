import * as CloudScapeComponents from "@cloudscape-design/components";
import Box from "@cloudscape-design/components/box";
import { BaseChangeDetail } from "@cloudscape-design/components/input/interfaces";
import { NonCancelableEventHandler } from "@cloudscape-design/components/internal/events";
import "@cloudscape-design/global-styles/index.css";
import { useState } from "react";



type EditableTextViewProps = {
    placeholder?: string;
    value: string;
    onChange: NonCancelableEventHandler<BaseChangeDetail>;
};
function EditableTextView({ placeholder, value, onChange }:EditableTextViewProps) {
  const [editing, setEditing] = useState(false);


  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    switch (e.detail) {
      case 1:
        console.log("click");
        break;
      case 2:
        setEditing(true);
        console.log("double click");
        break;
      case 3:
        setEditing(true);
        console.log("triple click");
        break;
      default:
        console.log(e.detail + " click");
        break;
    }
  };


  return editing ? (
    <CloudScapeComponents.Textarea
      onChange={onChange}
      onBlur={({ detail }) => {
        setEditing(false);
      }}
      autoFocus={true}
      value={value}
      placeholder={placeholder}
    />
  ) : (
    <div onClick={handleClick}>
      <Box variant="p">
        {value ? (
          <pre>{value}</pre>
        ) : (
          <i> Double click here to add.</i>
        )}
      </Box>
    </div>
  );
}

export default EditableTextView;
