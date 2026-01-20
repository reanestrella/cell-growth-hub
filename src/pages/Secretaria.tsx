import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  Users,
  UserPlus,
  Heart,
  Droplets,
  Download,
  Loader2,
} from "lucide-react";
import { useMembers, CreateMemberData } from "@/hooks/useMembers";
import { MemberModal } from "@/components/modals/MemberModal";
import { DeleteConfirmModal } from "@/components/modals/DeleteConfirmModal";
import type { Member } from "@/hooks/useMembers";

const statusConfig = {
  visitante: { label: "Visitante", color: "bg-muted text-muted-foreground" },
  novo_convertido: { label: "Novo Convertido", color: "bg-secondary/20 text-secondary-foreground" },
  membro: { label: "Membro", color: "bg-primary/20 text-primary" },
  lider: { label: "Líder", color: "bg-success/20 text-success" },
  discipulador: { label: "Discipulador", color: "bg-info/20 text-info" },
};

// Demo church ID for now - will be replaced with real auth
const DEMO_CHURCH_ID = "00000000-0000-0000-0000-000000000001";

export default function Secretaria() {
  const [searchTerm, setSearchTerm] = useState("");
  const [memberModalOpen, setMemberModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | undefined>();
  const [deletingMember, setDeletingMember] = useState<Member | null>(null);
  
  const { members, isLoading, createMember, updateMember, deleteMember } = useMembers();

  const filteredMembers = members.filter(
    (member) =>
      member.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (member.email?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
  );

  const stats = [
    { label: "Total de Membros", value: members.length, icon: Users, color: "text-primary" },
    { label: "Novos este Mês", value: members.filter(m => {
      const thisMonth = new Date();
      thisMonth.setDate(1);
      return new Date(m.created_at) >= thisMonth;
    }).length, icon: UserPlus, color: "text-success" },
    { label: "Novos Convertidos", value: members.filter(m => m.spiritual_status === "novo_convertido").length, icon: Heart, color: "text-secondary" },
    { label: "Batizados", value: members.filter(m => m.baptism_date !== null).length, icon: Droplets, color: "text-info" },
  ];

  const handleCreateMember = async (data: CreateMemberData) => {
    return createMember({ ...data, church_id: DEMO_CHURCH_ID });
  };

  const handleUpdateMember = async (data: CreateMemberData) => {
    if (!editingMember) return { data: null, error: new Error("No member to edit") };
    return updateMember(editingMember.id, data);
  };

  const handleOpenEdit = (member: Member) => {
    setEditingMember(member);
    setMemberModalOpen(true);
  };

  const handleCloseModal = (open: boolean) => {
    setMemberModalOpen(open);
    if (!open) {
      setEditingMember(undefined);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Secretaria</h1>
            <p className="text-muted-foreground">
              Gerencie os membros e visitantes da sua igreja
            </p>
          </div>
          <Button 
            className="gradient-accent text-secondary-foreground shadow-lg hover:shadow-xl transition-all"
            onClick={() => {
              setEditingMember(undefined);
              setMemberModalOpen(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Novo Cadastro
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Table Card */}
        <div className="card-elevated">
          {/* Table Header */}
          <div className="p-4 border-b flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>

          {/* Table */}
          {isLoading ? (
            <div className="flex items-center justify-center p-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : filteredMembers.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <Users className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Nenhum membro encontrado</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? "Tente uma busca diferente." : "Comece cadastrando o primeiro membro."}
              </p>
              {!searchTerm && (
                <Button onClick={() => setMemberModalOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Cadastrar Membro
                </Button>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Membro</TableHead>
                  <TableHead className="hidden md:table-cell">Contato</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Batizado</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.map((member) => (
                  <TableRow key={member.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={member.photo_url || ""} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {member.full_name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.full_name}</p>
                          <p className="text-sm text-muted-foreground md:hidden">
                            {member.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div>
                        <p className="text-sm">{member.email || "-"}</p>
                        <p className="text-sm text-muted-foreground">{member.phone || "-"}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={statusConfig[member.spiritual_status]?.color || ""}
                      >
                        {statusConfig[member.spiritual_status]?.label || member.spiritual_status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {member.baptism_date ? (
                        <Badge variant="outline" className="bg-info/10 text-info border-info/30">
                          Sim
                        </Badge>
                      ) : (
                        <Badge variant="outline">Não</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleOpenEdit(member)}>
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem>Ver perfil</DropdownMenuItem>
                          <DropdownMenuItem>Histórico</DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={() => setDeletingMember(member)}
                          >
                            Remover
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {/* Pagination placeholder */}
          {filteredMembers.length > 0 && (
            <div className="p-4 border-t flex items-center justify-between text-sm text-muted-foreground">
              <span>Mostrando {filteredMembers.length} de {members.length} membros</span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Anterior
                </Button>
                <Button variant="outline" size="sm">
                  Próximo
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Member Modal */}
      <MemberModal
        open={memberModalOpen}
        onOpenChange={handleCloseModal}
        member={editingMember}
        onSubmit={editingMember ? handleUpdateMember : handleCreateMember}
      />

      {/* Delete Confirmation */}
      <DeleteConfirmModal
        open={!!deletingMember}
        onOpenChange={(open) => !open && setDeletingMember(null)}
        title="Remover Membro"
        description={`Tem certeza que deseja remover ${deletingMember?.full_name}? Esta ação não pode ser desfeita.`}
        onConfirm={() => deleteMember(deletingMember!.id)}
      />
    </AppLayout>
  );
}
