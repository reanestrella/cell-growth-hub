import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  GraduationCap,
  BookOpen,
  Users,
  Trophy,
  Plus,
  Clock,
  Calendar,
  ChevronRight,
  Star,
} from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Fundamentos da Fé",
    description: "Curso básico para novos convertidos",
    instructor: "Pr. Carlos Silva",
    students: 25,
    lessons: 12,
    completedLessons: 8,
    status: "active",
    category: "Novo Convertido",
    duration: "6 semanas",
  },
  {
    id: 2,
    title: "Discipulado Nível 1",
    description: "Formação de discípulos comprometidos",
    instructor: "Pra. Maria Santos",
    students: 18,
    lessons: 16,
    completedLessons: 5,
    status: "active",
    category: "Discipulado",
    duration: "8 semanas",
  },
  {
    id: 3,
    title: "Escola de Líderes",
    description: "Formação de novos líderes de células",
    instructor: "Pr. João Costa",
    students: 12,
    lessons: 20,
    completedLessons: 20,
    status: "completed",
    category: "Liderança",
    duration: "10 semanas",
  },
  {
    id: 4,
    title: "EBD - Adultos",
    description: "Escola Bíblica Dominical para adultos",
    instructor: "Diác. Pedro Lima",
    students: 45,
    lessons: 52,
    completedLessons: 3,
    status: "active",
    category: "EBD",
    duration: "Anual",
  },
];

const spiritualTracks = [
  {
    name: "Trilha Novo Convertido",
    steps: ["Boas-vindas", "Fundamentos", "Batismo", "Integração"],
    color: "bg-info",
    students: 28,
  },
  {
    name: "Trilha Discipulado",
    steps: ["Nível 1", "Nível 2", "Nível 3", "Formação"],
    color: "bg-secondary",
    students: 45,
  },
  {
    name: "Trilha Liderança",
    steps: ["Escola Líderes", "Mentoria", "Prática", "Multiplicação"],
    color: "bg-success",
    students: 18,
  },
];

const stats = [
  { label: "Cursos Ativos", value: 8, icon: BookOpen, color: "text-primary" },
  { label: "Alunos Matriculados", value: 156, icon: Users, color: "text-success" },
  { label: "Formados 2024", value: 42, icon: Trophy, color: "text-secondary" },
  { label: "Professores", value: 12, icon: GraduationCap, color: "text-info" },
];

const categoryColors = {
  "Novo Convertido": "bg-info/20 text-info",
  "Discipulado": "bg-secondary/20 text-secondary",
  "Liderança": "bg-success/20 text-success",
  "EBD": "bg-primary/20 text-primary",
};

export default function Ensino() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Ensino & Discipulado</h1>
            <p className="text-muted-foreground">
              Gerencie cursos, EBD e trilhas espirituais
            </p>
          </div>
          <Button className="gradient-accent text-secondary-foreground shadow-lg hover:shadow-xl transition-all">
            <Plus className="w-4 h-4 mr-2" />
            Novo Curso
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Courses */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Cursos em Andamento</h2>
              <Button variant="ghost" size="sm">
                Ver todos
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="grid gap-4">
              {courses.map((course) => (
                <Card key={course.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <h3 className="font-semibold">{course.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {course.description}
                            </p>
                          </div>
                          <Badge
                            variant="secondary"
                            className={categoryColors[course.category as keyof typeof categoryColors]}
                          >
                            {course.category}
                          </Badge>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {course.students} alunos
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {course.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {course.lessons} aulas
                          </span>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Progresso</span>
                            <span className="font-medium">
                              {course.completedLessons}/{course.lessons} aulas
                            </span>
                          </div>
                          <Progress
                            value={(course.completedLessons / course.lessons) * 100}
                            className="h-2"
                          />
                        </div>

                        <div className="flex items-center gap-2 mt-3 pt-3 border-t">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="text-xs bg-muted">
                              {course.instructor.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-muted-foreground">
                            {course.instructor}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Spiritual Tracks */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Trilhas Espirituais</h2>
            <div className="space-y-4">
              {spiritualTracks.map((track) => (
                <Card key={track.name} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">{track.name}</h3>
                      <Badge variant="outline">
                        {track.students} alunos
                      </Badge>
                    </div>
                    <div className="space-y-3">
                      {track.steps.map((step, index) => (
                        <div key={step} className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${track.color} text-white`}
                          >
                            {index + 1}
                          </div>
                          <span className="text-sm">{step}</span>
                          {index < track.steps.length - 1 && (
                            <div className="flex-1 h-px bg-border" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Featured Material */}
            <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-secondary/30">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-5 h-5 text-secondary" />
                  <span className="font-semibold">Material em Destaque</span>
                </div>
                <h4 className="font-medium mb-2">Apostila: Princípios do Reino</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Material completo para o curso de discipulado nível 1
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Baixar Material
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
