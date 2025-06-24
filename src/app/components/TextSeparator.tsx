import React from "react";

const TextSeparator = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center gap-4 w-full max-w-lg mx-auto">
      <div className="h-px flex-1 bg-border" />
      <span className="text-sm text-muted-foreground">{text}</span>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
};

export default TextSeparator;
