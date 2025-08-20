// src/components/ResourceList.jsx
import React from "react";
import ResourceItem from "./ResourceItem.jsx";

export default function ResourceList({ resources, onToggleBookmark, isBookmarked }) {
  if (!resources || resources.length === 0) {
    return <div className="empty">No resources found. Try another search.</div>;
  }

  return (
    <div className="resource-list">
      {resources.map((r) => (
        <ResourceItem
          key={r.id}
          resource={r}
          onToggleBookmark={onToggleBookmark}
          bookmarked={isBookmarked(r)}
        />
      ))}
    </div>
  );
}
