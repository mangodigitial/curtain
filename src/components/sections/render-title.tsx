import React from "react";

/**
 * Renders a title with an optional italic portion.
 * title and titleItalic are separate strings — they get concatenated with the italic part wrapped in <em>.
 */
export function renderTitle(
  title: string,
  titleItalic?: string,
  italicClass: string = "text-coral"
) {
  if (!titleItalic) return <>{title}</>;

  return (
    <>
      {title} <em className={italicClass}>{titleItalic}</em>
    </>
  );
}
