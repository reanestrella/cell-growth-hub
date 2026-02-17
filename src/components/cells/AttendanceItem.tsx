import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface AttendanceItemProps {
  memberId: string;
  memberName: string;
  isPresent: boolean;
  onToggle: (memberId: string) => void;
}

export const AttendanceItem = React.memo(function AttendanceItem({
  memberId,
  memberName,
  isPresent,
  onToggle,
}: AttendanceItemProps) {
  const initials = (memberName || "?")
    .split(" ")
    .map((n) => n?.[0] ?? "")
    .join("")
    .slice(0, 2) || "?";

  return (
    <button
      type="button"
      onClick={() => onToggle(memberId)}
      className={`flex items-center gap-3 p-2 rounded-lg border transition-all text-left ${
        isPresent
          ? "bg-success/10 border-success/30 hover:bg-success/20"
          : "bg-muted/30 border-transparent hover:bg-muted/50"
      }`}
    >
      <Checkbox checked={isPresent} className="pointer-events-none" />
      <Avatar className="w-7 h-7">
        <AvatarFallback
          className={`text-xs ${isPresent ? "bg-success text-success-foreground" : "bg-muted"}`}
        >
          {initials}
        </AvatarFallback>
      </Avatar>
      <span className={`text-sm truncate ${isPresent ? "font-medium" : ""}`}>
        {memberName}
      </span>
    </button>
  );
});
