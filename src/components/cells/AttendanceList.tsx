import React, { useCallback } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Loader2, Users, UserCheck, UserPlus } from "lucide-react";
import { AttendanceItem } from "./AttendanceItem";

interface MemberEntry {
  id: string;
  memberId: string;
  memberName: string;
}

interface AttendanceListProps {
  members: MemberEntry[];
  loading: boolean;
  presentMemberIds: Set<string>;
  onToggle: (memberId: string) => void;
}

export const AttendanceList = React.memo(function AttendanceList({
  members,
  loading,
  presentMemberIds,
  onToggle,
}: AttendanceListProps) {
  const presentCount = presentMemberIds.size;

  const handleToggle = useCallback(
    (memberId: string) => {
      onToggle(memberId);
    },
    [onToggle]
  );

  return (
    <div className="mt-4 border rounded-lg p-4 flex-1 overflow-hidden flex flex-col min-h-0">
      <div className="flex items-center justify-between mb-3 flex-shrink-0">
        <h4 className="font-medium flex items-center gap-2">
          <Users className="w-4 h-4" />
          Lista de Presença
        </h4>
        <Badge variant="secondary" className="text-sm">
          <UserCheck className="w-3 h-3 mr-1" />
          {presentCount} presentes
        </Badge>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      ) : !Array.isArray(members) || members.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <UserPlus className="w-8 h-8 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">
            Nenhum membro cadastrado nesta célula.
          </p>
          <p className="text-xs text-muted-foreground">
            Adicione membros através do menu da célula.
          </p>
        </div>
      ) : (
        <ScrollArea className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pr-4">
            {members.map((m) => (
              <AttendanceItem
                key={m.id}
                memberId={m.memberId}
                memberName={m.memberName}
                isPresent={presentMemberIds.has(m.memberId)}
                onToggle={handleToggle}
              />
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
});
