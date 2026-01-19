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
} from "lucide-react";

const members = [
  {
    id: 1,
    name: "Maria Silva",
    email: "maria@email.com",
    phone: "(11) 99999-1234",
    status: "member",
    cell: "Vida Nova",
    baptized: true,
    joinDate: "2023-01-15",
  },
  {
    id: 2,
    name: "João Santos",
    email: "joao@email.com",
    phone: "(11) 99999-5678",
    status: "leader",
    cell: "Renovação",
    baptized: true,
    joinDate: "2020-06-20",
  },
  {
    id: 3,
    name: "Ana Costa",
    email: "ana@email.com",
    phone: "(11) 99999-9012",
    status: "new_convert",
    cell: "Esperança",
    baptized: false,
    joinDate: "2024-01-05",
  },
  {
    id: 4,
    name: "Pedro Lima",
    email: "pedro@email.com",
    phone: "(11) 99999-3456",
    status: "visitor",
    cell: null,
    baptized: false,
    joinDate: "2024-01-10",
  },
  {
    id: 5,
    name: "Carla Oliveira",
    email: "carla@email.com",
    phone: "(11) 99999-7890",
    status: "member",
    cell: "Fé",
    baptized: true,
    joinDate: "2022-03-25",
  },
];

const statusConfig = {
  visitor: { label: "Visitante", color: "bg-muted text-muted-foreground" },
  new_convert: { label: "Novo Convertido", color: "bg-secondary/20 text-secondary-foreground" },
  member: { label: "Membro", color: "bg-primary/20 text-primary" },
  leader: { label: "Líder", color: "bg-success/20 text-success" },
};

const stats = [
  { label: "Total de Membros", value: 248, icon: Users, color: "text-primary" },
  { label: "Novos este Mês", value: 12, icon: UserPlus, color: "text-success" },
  { label: "Novos Convertidos", value: 28, icon: Heart, color: "text-secondary" },
  { label: "Batizados", value: 195, icon: Droplets, color: "text-info" },
];

export default function Secretaria() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <Button className="gradient-accent text-secondary-foreground shadow-lg hover:shadow-xl transition-all">
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Membro</TableHead>
                <TableHead className="hidden md:table-cell">Contato</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Célula</TableHead>
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
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {member.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground md:hidden">
                          {member.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div>
                      <p className="text-sm">{member.email}</p>
                      <p className="text-sm text-muted-foreground">{member.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={statusConfig[member.status as keyof typeof statusConfig].color}
                    >
                      {statusConfig[member.status as keyof typeof statusConfig].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {member.cell || "-"}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {member.baptized ? (
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
                        <DropdownMenuItem>Ver perfil</DropdownMenuItem>
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuItem>Histórico</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Remover
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination placeholder */}
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
        </div>
      </div>
    </AppLayout>
  );
}
