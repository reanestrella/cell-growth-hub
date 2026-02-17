import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface AttendanceItemProps {
  memberId: string;
  memberName: string;
  isPresent: boolean;
  onToggle: (memberId: string) => void;
}

export function AttendanceItem({
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

  const handleClick = () => {
    try {
      onToggle(memberId);
    } catch (err) {
      console.error("Erro ao marcar presença:", err);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      className={`flex items-center gap-3 p-2 rounded-lg border transition-all text-left cursor-pointer select-none ${
        isPresent
          ? "bg-success/10 border-success/30 hover:bg-success/20"
          : "bg-muted/30 border-transparent hover:bg-muted/50"
      }`}
    >
      <Checkbox checked={isPresent} tabIndex={-1} className="pointer-events-none" />
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
    </div>
  );
}
