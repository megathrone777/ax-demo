import React from "react";

import { useDestinations, useStore } from "@/hooks";
import { attachDestinations } from "@/store";
import { Icon } from "@/ui";

import { labelClass, inputClass, iconClass } from "./UploadWaypoints.css";

import type { Position } from "geojson";

const UploadWaypoints: React.FC = () => {
  const { id } = useDestinations();
  const { dispatch } = useStore();

  const handleFileUpload = ({ currentTarget }: React.SyntheticEvent<HTMLInputElement>): void => {
    if (currentTarget.files) {
      const fileReader: FileReader = new FileReader();
      const currentFile: File = currentTarget.files[0]!;

      if (currentFile.type !== "text/plain") {
        alert("Unsupported file format!");

        return;
      }

      fileReader.readAsText(currentFile, "utf-8");
      fileReader.onload = ({ target }: ProgressEvent<FileReader>): void => {
        const fileContents = (target && target.result) || "";

        if (fileContents && typeof fileContents === "string") {
          const coordinates: Position[] = [];
          const lines: string[] = fileContents.split("\n");

          if (!/\d+(\.\d+)?[-+]?\d+(\.\d+)$/m.test(fileContents)) {
            alert("Wrong file contents!");

            return;
          }

          for (const line of lines) {
            if (line.trim().length === 0) continue;
            if (line.includes("|")) {
              const currentLine: string[][] = line.split("|").map((part) => part.trim().split(" "));
              const [lat, lon]: [string, string] = [currentLine[1]![1]!, currentLine[1]![0]!];

              coordinates.push([+lat, +lon]);
              continue;
            }

            const currentLine: string[] = line.split(" ").map((part) => part.trim());
            const [lat, lon]: [string, string] = [currentLine[1]!, currentLine[0]!];

            coordinates.push([+lat, +lon]);
          }

          dispatch(
            attachDestinations({
              coordinates,
              id,
            }),
          );
        }
      };
    }
  };

  return (
    <label
      className={labelClass}
      htmlFor="uploadWaypoints"
    >
      <input
        accept=".txt"
        className={inputClass}
        id="uploadWaypoints"
        onChange={handleFileUpload}
        type="file"
      />

      <Icon
        className={iconClass}
        id="upload"
      />
    </label>
  );
};

export { UploadWaypoints };
