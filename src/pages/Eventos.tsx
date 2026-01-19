import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Plus,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";

const events = [
  {
    id: 1,
    title: "Culto de Domingo",
    date: "2024-01-21",
    time: "09:00",
    endTime: "11:30",
    location: "Templo Principal",
    type: "worship",
    recurring: true,
    attendees: 150,
    confirmed: 120,
  },
  {
    id: 2,
    title: "Reunião de Líderes",
    date: "2024-01-22",
    time: "19:30",
    endTime: "21:00",
    location: "Sala de Reuniões",
    type: "meeting",
    recurring: false,
    attendees: 30,
    confirmed: 25,
  },
  {
    id: 3,
    title: "Encontro de Casais",
    date: "2024-01-27",
    time: "18:00",
    endTime: "21:00",
    location: "Salão Social",
    type: "event",
    recurring: false,
    attendees: 50,
    confirmed: 42,
  },
  {
    id: 4,
    title: "Escola Bíblica Dominical",
    date: "2024-01-28",
    time: "09:00",
    endTime: "10:30",
    location: "Salas de Aula",
    type: "education",
    recurring: true,
    attendees: 100,
    confirmed: 85,
  },
  {
    id: 5,
    title: "Culto de Oração",
    date: "2024-01-24",
    time: "19:30",
    endTime: "21:00",
    location: "Templo Principal",
    type: "worship",
    recurring: true,
    attendees: 80,
    confirmed: 0,
  },
];

const typeConfig = {
  worship: { label: "Culto", color: "bg-secondary/20 text-secondary border-secondary/30" },
  meeting: { label: "Reunião", color: "bg-primary/20 text-primary border-primary/30" },
  event: { label: "Evento", color: "bg-info/20 text-info border-info/30" },
  education: { label: "Ensino", color: "bg-success/20 text-success border-success/30" },
};

const calendarDays = [
  { day: 21, events: 2, isToday: true },
  { day: 22, events: 1, isToday: false },
  { day: 23, events: 0, isToday: false },
  { day: 24, events: 1, isToday: false },
  { day: 25, events: 0, isToday: false },
  { day: 26, events: 0, isToday: false },
  { day: 27, events: 1, isToday: false },
];

export default function Eventos() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Eventos & Calendário</h1>
            <p className="text-muted-foreground">
              Gerencie eventos, inscrições e comunicados
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filtrar
            </Button>
            <Button className="gradient-accent text-secondary-foreground shadow-lg hover:shadow-xl transition-all">
              <Plus className="w-4 h-4 mr-2" />
              Novo Evento
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">Janeiro 2024</CardTitle>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 mb-2">
                {["D", "S", "T", "Q", "Q", "S", "S"].map((day, i) => (
                  <div
                    key={i}
                    className="text-center text-xs font-medium text-muted-foreground py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {/* Previous month days */}
                {[null, null, null, null, null, null, null].map((_, i) => (
                  <div key={`prev-${i}`} className="aspect-square" />
                ))}
                {/* Current week */}
                {calendarDays.map((item) => (
                  <button
                    key={item.day}
                    className={`aspect-square rounded-lg flex flex-col items-center justify-center text-sm transition-colors ${
                      item.isToday
                        ? "bg-primary text-primary-foreground"
                        : item.events > 0
                        ? "hover:bg-muted"
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <span className="font-medium">{item.day}</span>
                    {item.events > 0 && (
                      <div className="flex gap-0.5 mt-0.5">
                        {Array.from({ length: Math.min(item.events, 3) }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-1 h-1 rounded-full ${
                              item.isToday ? "bg-primary-foreground" : "bg-secondary"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t">
                {Object.entries(typeConfig).map(([key, config]) => (
                  <div key={key} className="flex items-center gap-1.5">
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${config.color.split(" ")[0]}`}
                    />
                    <span className="text-xs text-muted-foreground">{config.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Events List */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold">Próximos Eventos</h2>
            <div className="space-y-4">
              {events.map((event) => (
                <Card key={event.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center justify-center min-w-[60px] p-3 rounded-xl bg-primary/5">
                        <span className="text-xs text-muted-foreground uppercase">
                          {new Date(event.date).toLocaleDateString("pt-BR", {
                            month: "short",
                          })}
                        </span>
                        <span className="text-2xl font-bold text-primary">
                          {new Date(event.date).getDate()}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(event.date).toLocaleDateString("pt-BR", {
                            weekday: "short",
                          })}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-lg">{event.title}</h3>
                              {event.recurring && (
                                <Badge variant="outline" className="text-xs">
                                  Recorrente
                                </Badge>
                              )}
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className={
                              typeConfig[event.type as keyof typeof typeConfig].color
                            }
                          >
                            {typeConfig[event.type as keyof typeof typeConfig].label}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            {event.time} - {event.endTime}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4" />
                            {event.location}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Users className="w-4 h-4" />
                            {event.confirmed > 0
                              ? `${event.confirmed}/${event.attendees} confirmados`
                              : `${event.attendees} esperados`}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            Ver Detalhes
                          </Button>
                          {event.confirmed < event.attendees && (
                            <Button size="sm">Gerenciar Inscrições</Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
