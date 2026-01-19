import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Plus,
  Grid3X3,
  Users,
  MapPin,
  Calendar,
  TrendingUp,
  Heart,
  Clock,
  MoreHorizontal,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const cells = [
  {
    id: 1,
    name: "Célula Vida Nova",
    leader: "João Silva",
    leaderAvatar: "",
    supervisor: "Pr. Carlos",
    network: "Rede Norte",
    members: 12,
    maxMembers: 15,
    location: "Rua das Flores, 123 - Zona Norte",
    day: "Quarta-feira",
    time: "19:30",
    visitors: 3,
    decisions: 2,
    growth: 15,
    lastReport: "2024-01-15",
    status: "active",
  },
  {
    id: 2,
    name: "Célula Renovação",
    leader: "Maria Santos",
    leaderAvatar: "",
    supervisor: "Pr. Carlos",
    network: "Rede Centro",
    members: 10,
    maxMembers: 15,
    location: "Av. Central, 456 - Centro",
    day: "Quinta-feira",
    time: "20:00",
    visitors: 1,
    decisions: 0,
    growth: 8,
    lastReport: "2024-01-14",
    status: "active",
  },
  {
    id: 3,
    name: "Célula Esperança",
    leader: "Pedro Costa",
    leaderAvatar: "",
    supervisor: "Pra. Ana",
    network: "Rede Sul",
    members: 14,
    maxMembers: 15,
    location: "Rua da Paz, 789 - Zona Sul",
    day: "Terça-feira",
    time: "19:00",
    visitors: 2,
    decisions: 1,
    growth: 20,
    lastReport: "2024-01-16",
    status: "multiplying",
  },
  {
    id: 4,
    name: "Célula Fé",
    leader: "Ana Lima",
    leaderAvatar: "",
    supervisor: "Pra. Ana",
    network: "Rede Leste",
    members: 8,
    maxMembers: 15,
    location: "Rua Nova, 321 - Zona Leste",
    day: "Sexta-feira",
    time: "19:30",
    visitors: 4,
    decisions: 3,
    growth: 25,
    lastReport: "2024-01-13",
    status: "active",
  },
  {
    id: 5,
    name: "Célula Graça",
    leader: "Roberto Dias",
    leaderAvatar: "",
    supervisor: "Pr. Carlos",
    network: "Rede Norte",
    members: 6,
    maxMembers: 15,
    location: "Rua Alegria, 654 - Zona Norte",
    day: "Quarta-feira",
    time: "20:00",
    visitors: 2,
    decisions: 1,
    growth: 10,
    lastReport: "2024-01-15",
    status: "new",
  },
];

const statusConfig = {
  active: { label: "Ativa", color: "bg-success/20 text-success" },
  multiplying: { label: "Multiplicando", color: "bg-secondary/20 text-secondary" },
  new: { label: "Nova", color: "bg-info/20 text-info" },
  inactive: { label: "Inativa", color: "bg-muted text-muted-foreground" },
};

const stats = [
  { label: "Células Ativas", value: 18, icon: Grid3X3, color: "text-success" },
  { label: "Total de Membros", value: 186, icon: Users, color: "text-primary" },
  { label: "Visitantes Semana", value: 12, icon: Heart, color: "text-secondary" },
  { label: "Decisões Mês", value: 8, icon: TrendingUp, color: "text-info" },
];

export default function Celulas() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Células</h1>
            <p className="text-muted-foreground">
              Gerencie as células e grupos familiares da sua igreja
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              Ver Relatórios
            </Button>
            <Button className="gradient-accent text-secondary-foreground shadow-lg hover:shadow-xl transition-all">
              <Plus className="w-4 h-4 mr-2" />
              Nova Célula
            </Button>
          </div>
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

        {/* Cells Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cells.map((cell) => (
            <div
              key={cell.id}
              className="card-elevated p-5 hover:shadow-lg transition-all duration-300 animate-fade-in"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-lg">{cell.name}</h3>
                    <Badge
                      variant="secondary"
                      className={statusConfig[cell.status as keyof typeof statusConfig].color}
                    >
                      {statusConfig[cell.status as keyof typeof statusConfig].label}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{cell.network}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="-mr-2">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                    <DropdownMenuItem>Enviar relatório</DropdownMenuItem>
                    <DropdownMenuItem>Editar</DropdownMenuItem>
                    <DropdownMenuItem>Histórico</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Leader */}
              <div className="flex items-center gap-3 mb-4 p-3 rounded-lg bg-muted/50">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={cell.leaderAvatar} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {cell.leader.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{cell.leader}</p>
                  <p className="text-xs text-muted-foreground">
                    Supervisor: {cell.supervisor}
                  </p>
                </div>
              </div>

              {/* Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span className="truncate">{cell.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{cell.day}</span>
                  <Clock className="w-4 h-4 ml-2" />
                  <span>{cell.time}</span>
                </div>
              </div>

              {/* Members Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Membros</span>
                  <span className="font-medium">
                    {cell.members}/{cell.maxMembers}
                  </span>
                </div>
                <Progress value={(cell.members / cell.maxMembers) * 100} className="h-2" />
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t">
                <div className="text-center">
                  <p className="text-lg font-bold text-success">+{cell.growth}%</p>
                  <p className="text-xs text-muted-foreground">Crescimento</p>
                </div>
                <div className="text-center border-x">
                  <p className="text-lg font-bold text-secondary">{cell.visitors}</p>
                  <p className="text-xs text-muted-foreground">Visitantes</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-info">{cell.decisions}</p>
                  <p className="text-xs text-muted-foreground">Decisões</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
