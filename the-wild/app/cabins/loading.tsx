"use client";
import {Spinner} from "@heroui/spinner";

export default function Loading() {
  return (
    <div className="justify-center items-center flex h-full">
      <Spinner color="warning" label="Loading data..." />
    </div>
  );
}
