import { Users, Heart, Grid3X3, DollarSign, TrendingUp, BookOpen } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { SpiritualFunnel } from "@/components/dashboard/SpiritualFunnel";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { CellsOverview } from "@/components/dashboard/CellsOverview";
import { FinanceOverview } from "@/components/dashboard/FinanceOverview";
import { UpcomingEvents } from "@/components/dashboard/UpcomingEvents";

const stats = [
  {
    title: "Total de Membros",
    value: "248",
    change: "+12 este mês",
    changeType: "positive" as const,
    icon: Users,
    iconColor: "bg-primary/10 text-primary",
  },
  {
    title: "Células Ativas",
    value: "18",
    change: "+2 este mês",
    changeType: "positive" as const,
    icon: Grid3X3,
    iconColor: "bg-success/10 text-success",
  },
  {
    title: "Novos Convertidos",
    value: "28",
    change: "+8 este mês",
    changeType: "positive" as const,
    icon: Heart,
    iconColor: "bg-secondary/10 text-secondary",
  },
  {
    title: "Batismos",
    value: "15",
    change: "Este trimestre",
    changeType: "neutral" as const,
    icon: TrendingUp,
    iconColor: "bg-info/10 text-info",
  },
];

export default function Dashboard() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Bem-vindo de volta, Pastor Silva. Aqui está o resumo da sua igreja.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Última atualização:</span>
            <span className="font-medium text-foreground">Há 5 minutos</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.title}
              {...stat}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
            />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <CellsOverview />
            <UpcomingEvents />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <SpiritualFunnel />
            <FinanceOverview />
          </div>
        </div>

        {/* Recent Activity - Full Width */}
        <RecentActivity />
      </div>
    </AppLayout>
  );
}
