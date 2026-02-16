import React, { useState } from "react";
import { Input } from "@/components/ui/input";

interface EditableLinkProps {
  label: string;
  href: string;
  onUpdate?: (label: string, href: string) => void;
  onDelete?: () => void;
  inline?: boolean;
  isSelected?: boolean;
}

export const EditableLink: React.FC<EditableLinkProps> = ({
  label,
  href,
  onUpdate,
  inline = true,
  isSelected = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editLabel, setEditLabel] = useState(label);
  const [editHref, setEditHref] = useState(href);

  const handleSave = () => {
    if (onUpdate) {
      onUpdate(editLabel, editHref);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditLabel(label);
    setEditHref(href);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="flex flex-col gap-2 w-40 bg-white p-2 rounded border border-valasys-orange shadow-lg z-50">
        <Input
          placeholder="Text"
          value={editLabel}
          onChange={(e) => setEditLabel(e.target.value)}
          size="sm"
          className="text-xs h-6"
          autoFocus
        />
        <Input
          placeholder="URL"
          value={editHref}
          onChange={(e) => setEditHref(e.target.value)}
          size="sm"
          className="text-xs h-6"
        />
        <div className="flex gap-1">
          <button
            onClick={handleSave}
            className="flex-1 text-xs px-2 py-1 bg-valasys-orange text-white rounded hover:bg-orange-600"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="flex-1 text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setIsEditing(true);
      }}
      className={`cursor-pointer hover:opacity-70 transition-all ${
        isSelected ? "font-semibold text-valasys-orange" : ""
      }`}
      title="Click to edit"
    >
      {inline ? <span>{label}</span> : <a href={href}>{label}</a>}
    </div>
  );
};
