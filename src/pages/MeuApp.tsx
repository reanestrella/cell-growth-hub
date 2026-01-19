import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Users,
  Bell,
  Calendar,
  BookOpen,
  Heart,
  MessageSquare,
  Settings,
  ChevronRight,
  Sparkles,
  Clock,
  MapPin,
  Plus,
} from "lucide-react";

const userProfile = {
  name: "João Silva",
  email: "joao.silva@email.com",
  phone: "(11) 99999-1234",
  cell: "Célula Vida Nova",
  leader: "Pedro Costa",
  status: "Membro",
  baptized: true,
  memberSince: "2023-01-15",
};

const announcements = [
  {
    id: 1,
    title: "Culto Especial de Ano Novo",
    description: "Convocamos toda a igreja para um momento especial de gratidão",
    date: "21 Jan",
    priority: "high",
  },
  {
    id: 2,
    title: "Reunião de Células",
    description: "Encontro mensal de líderes de células",
    date: "25 Jan",
    priority: "normal",
  },
  {
    id: 3,
    title: "Campanha de Missões",
    description: "Participe da nossa campanha missionária 2024",
    date: "Até Dez",
    priority: "normal",
  },
];

const mySchedule = [
  {
    id: 1,
    title: "Culto Domingo",
    date: "21 Jan",
    time: "09:00",
    location: "Templo Principal",
    confirmed: true,
  },
  {
    id: 2,
    title: "Célula Vida Nova",
    date: "22 Jan",
    time: "19:30",
    location: "Casa do Líder",
    confirmed: true,
  },
  {
    id: 3,
    title: "Escola Bíblica",
    date: "28 Jan",
    time: "09:00",
    location: "Salas de Aula",
    confirmed: false,
  },
];

const devotional = {
  title: "O Poder da Oração",
  verse: "Orai sem cessar. - 1 Tessalonicenses 5:17",
  content:
    "A oração é a nossa comunicação direta com Deus. Através dela, expressamos nossa gratidão, nossas necessidades e fortalecemos nossa fé...",
  date: "19 de Janeiro, 2024",
};

const prayerRequests = [
  { id: 1, request: "Cura para minha mãe", author: "Anônimo", date: "Hoje" },
  { id: 2, request: "Emprego para meu filho", author: "Maria S.", date: "Ontem" },
  { id: 3, request: "Paz na família", author: "Anônimo", date: "2 dias" },
];

export default function MeuApp() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Profile Header */}
        <Card className="gradient-hero text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <Avatar className="w-20 h-20 border-4 border-primary-foreground/20">
                <AvatarImage src="" />
                <AvatarFallback className="text-2xl bg-primary-foreground/20 text-primary-foreground">
                  JS
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold">{userProfile.name}</h1>
                  <Badge className="bg-primary-foreground/20 text-primary-foreground border-0">
                    {userProfile.status}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-4 text-sm opacity-90">
                  <span>{userProfile.email}</span>
                  <span>•</span>
                  <span>{userProfile.cell}</span>
                </div>
              </div>
              <Button variant="secondary" className="self-start">
                <Settings className="w-4 h-4 mr-2" />
                Editar Perfil
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview">
          <TabsList className="w-full md:w-auto">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="schedule">Minha Agenda</TabsTrigger>
            <TabsTrigger value="devotional">Devocional</TabsTrigger>
            <TabsTrigger value="prayer">Oração</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Announcements */}
              <Card className="md:col-span-2 lg:col-span-1">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Bell className="w-5 h-5 text-secondary" />
                    Avisos
                  </CardTitle>
                  <Badge variant="secondary">3 novos</Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {announcements.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                      >
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="font-medium text-sm">{item.title}</h4>
                          {item.priority === "high" && (
                            <Badge className="bg-destructive/20 text-destructive text-xs">
                              Importante
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                          {item.description}
                        </p>
                        <span className="text-xs text-muted-foreground">{item.date}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Next Events */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-secondary" />
                    Próximos Compromissos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mySchedule.map((event) => (
                      <div
                        key={event.id}
                        className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                      >
                        <div className="flex flex-col items-center justify-center w-12 h-12 rounded-lg bg-background">
                          <span className="text-xs text-muted-foreground">
                            {event.date.split(" ")[1]}
                          </span>
                          <span className="font-bold">{event.date.split(" ")[0]}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{event.title}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            <span>{event.time}</span>
                          </div>
                        </div>
                        {event.confirmed ? (
                          <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                            Confirmado
                          </Badge>
                        ) : (
                          <Button size="sm" variant="outline">
                            Confirmar
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Daily Devotional Preview */}
              <Card className="bg-gradient-to-br from-secondary/5 to-accent border-secondary/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-secondary" />
                    Devocional do Dia
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold mb-2">{devotional.title}</h4>
                  <blockquote className="text-sm italic text-muted-foreground border-l-2 border-secondary pl-3 mb-3">
                    {devotional.verse}
                  </blockquote>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                    {devotional.content}
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Ler Completo
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Heart className="w-6 h-6 text-secondary" />
                <span className="text-sm">Pedido de Oração</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <MessageSquare className="w-6 h-6 text-info" />
                <span className="text-sm">Testemunho</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <BookOpen className="w-6 h-6 text-success" />
                <span className="text-sm">Meus Cursos</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Calendar className="w-6 h-6 text-primary" />
                <span className="text-sm">Inscrições</span>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Minha Agenda</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mySchedule.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex flex-col items-center justify-center w-16 h-16 rounded-xl bg-primary/10">
                        <span className="text-xs text-muted-foreground uppercase">
                          {event.date.split(" ")[1]}
                        </span>
                        <span className="text-2xl font-bold text-primary">
                          {event.date.split(" ")[0]}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{event.title}</h4>
                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {event.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {event.location}
                          </span>
                        </div>
                      </div>
                      {event.confirmed ? (
                        <Badge className="bg-success/20 text-success border-0">
                          Presença Confirmada
                        </Badge>
                      ) : (
                        <Button>Confirmar Presença</Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="devotional" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-secondary" />
                  {devotional.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{devotional.date}</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <blockquote className="text-lg italic border-l-4 border-secondary pl-4 py-2 bg-secondary/5 rounded-r-lg">
                  {devotional.verse}
                </blockquote>
                <p className="text-muted-foreground leading-relaxed">
                  {devotional.content}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Quando oramos, não estamos apenas pedindo coisas a Deus, mas estamos
                  construindo um relacionamento profundo com Ele. A oração nos transforma,
                  nos aproxima do coração do Pai e nos dá forças para enfrentar os desafios
                  do dia a dia.
                </p>
                <div className="flex gap-3">
                  <Button variant="outline">
                    <Heart className="w-4 h-4 mr-2" />
                    Marcar como Lido
                  </Button>
                  <Button variant="outline">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Compartilhar Reflexão
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prayer" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-secondary" />
                    Meus Pedidos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button className="w-full mb-4 gradient-accent text-secondary-foreground">
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Pedido de Oração
                  </Button>
                  <p className="text-center text-muted-foreground py-8">
                    Você ainda não tem pedidos de oração cadastrados.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-secondary" />
                    Pedidos da Comunidade
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {prayerRequests.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <p className="font-medium text-sm mb-2">{item.request}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{item.author}</span>
                          <span>{item.date}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full mt-2 text-secondary hover:text-secondary"
                        >
                          <Heart className="w-4 h-4 mr-1" />
                          Orar por este pedido
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
