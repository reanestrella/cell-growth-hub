import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Heart,
  Music,
  Baby,
  Users,
  Megaphone,
  Handshake,
  Plus,
  Calendar,
  MoreHorizontal,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ministries = [
  {
    id: 1,
    name: "Louvor e Adoração",
    description: "Condução do louvor nos cultos e eventos",
    icon: Music,
    color: "bg-secondary/10 text-secondary",
    leader: "Ana Paula",
    volunteers: 18,
    nextScale: "21 Jan - Domingo",
    status: "active",
  },
  {
    id: 2,
    name: "Ministério Infantil",
    description: "Cuidado e ensino para crianças de 0 a 12 anos",
    icon: Baby,
    color: "bg-info/10 text-info",
    leader: "Maria Silva",
    volunteers: 25,
    nextScale: "21 Jan - EBD",
    status: "active",
  },
  {
    id: 3,
    name: "Recepção e Acolhimento",
    description: "Receber e acolher visitantes e membros",
    icon: Handshake,
    color: "bg-success/10 text-success",
    leader: "João Costa",
    volunteers: 12,
    nextScale: "21 Jan - Culto",
    status: "active",
  },
  {
    id: 4,
    name: "Intercessão",
    description: "Ministério de oração e intercessão",
    icon: Heart,
    color: "bg-primary/10 text-primary",
    leader: "Pr. Carlos",
    volunteers: 20,
    nextScale: "Toda Quarta",
    status: "active",
  },
  {
    id: 5,
    name: "Mídia e Comunicação",
    description: "Transmissão, som, imagem e redes sociais",
    icon: Megaphone,
    color: "bg-warning/10 text-warning",
    leader: "Pedro Lima",
    volunteers: 8,
    nextScale: "21 Jan - Culto",
    status: "active",
  },
  {
    id: 6,
    name: "Casais",
    description: "Fortalecimento de casamentos",
    icon: Users,
    color: "bg-destructive/10 text-destructive",
    leader: "Pr. Paulo e Pra. Lúcia",
    volunteers: 15,
    nextScale: "27 Jan - Encontro",
    status: "active",
  },
];

const upcomingScales = [
  {
    id: 1,
    ministry: "Louvor e Adoração",
    date: "21 Jan",
    time: "09:00",
    event: "Culto Domingo",
    team: ["Ana P.", "Carlos", "Maria", "João"],
  },
  {
    id: 2,
    ministry: "Mídia e Comunicação",
    date: "21 Jan",
    time: "08:30",
    event: "Culto Domingo",
    team: ["Pedro", "Lucas"],
  },
  {
    id: 3,
    ministry: "Ministério Infantil",
    date: "21 Jan",
    time: "09:00",
    event: "EBD Infantil",
    team: ["Maria", "Paula", "Rita", "Carla"],
  },
];

const stats = [
  { label: "Ministérios Ativos", value: 12 },
  { label: "Voluntários", value: 156 },
  { label: "Escalas este Mês", value: 48 },
  { label: "Presença Média", value: "92%" },
];

export default function Ministerios() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Ministérios</h1>
            <p className="text-muted-foreground">
              Gerencie os ministérios e escalas de serviço
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Ver Escalas
            </Button>
            <Button className="gradient-accent text-secondary-foreground shadow-lg hover:shadow-xl transition-all">
              <Plus className="w-4 h-4 mr-2" />
              Novo Ministério
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card">
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Ministries Grid */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold">Todos os Ministérios</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ministries.map((ministry) => (
                <Card key={ministry.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl ${ministry.color}`}>
                        <ministry.icon className="w-6 h-6" />
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="-mr-2">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                          <DropdownMenuItem>Gerenciar escala</DropdownMenuItem>
                          <DropdownMenuItem>Voluntários</DropdownMenuItem>
                          <DropdownMenuItem>Editar</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{ministry.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {ministry.description}
                    </p>
                    <div className="space-y-3 pt-3 border-t">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Líder:</span>
                        <span className="font-medium">{ministry.leader}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Voluntários:</span>
                        <Badge variant="secondary">{ministry.volunteers}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Próxima escala:</span>
                        <span className="text-secondary font-medium">
                          {ministry.nextScale}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Upcoming Scales */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Próximas Escalas</h2>
            <div className="space-y-4">
              {upcomingScales.map((scale) => (
                <Card key={scale.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex flex-col items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                        <span className="text-xs text-muted-foreground">
                          {scale.date.split(" ")[1]}
                        </span>
                        <span className="font-bold text-primary">
                          {scale.date.split(" ")[0]}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{scale.ministry}</p>
                        <p className="text-xs text-muted-foreground">
                          {scale.event} • {scale.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {scale.team.slice(0, 4).map((member, index) => (
                          <Avatar
                            key={member}
                            className="w-8 h-8 border-2 border-background"
                          >
                            <AvatarFallback className="text-xs bg-muted">
                              {member.slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      {scale.team.length > 4 && (
                        <span className="text-xs text-muted-foreground">
                          +{scale.team.length - 4}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Attendance Alert */}
            <Card className="bg-warning/5 border-warning/30">
              <CardContent className="p-4">
                <h4 className="font-semibold text-warning mb-2">⚠️ Atenção</h4>
                <p className="text-sm text-muted-foreground">
                  3 voluntários não confirmaram presença para o próximo domingo.
                </p>
                <Button variant="outline" size="sm" className="mt-3">
                  Ver Pendências
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
