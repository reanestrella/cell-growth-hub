import { useState } from "react";
import { Users, Heart, Grid3X3, TrendingUp, UserPlus, Eye, Loader2 } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { SpiritualFunnel } from "@/components/dashboard/SpiritualFunnel";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { CellsOverview } from "@/components/dashboard/CellsOverview";
import { FinanceOverview } from "@/components/dashboard/FinanceOverview";
import { UpcomingEvents } from "@/components/dashboard/UpcomingEvents";
import { BirthdayCard } from "@/components/dashboard/BirthdayCard";
import { WeddingAnniversaryCard } from "@/components/dashboard/WeddingAnniversaryCard";
import { NetworkOverview } from "@/components/dashboard/NetworkOverview";
import { AlertsCard } from "@/components/dashboard/AlertsCard";
import { CongregationSelector } from "@/components/layout/CongregationSelector";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { useCongregations } from "@/hooks/useCongregations";

export default function Dashboard() {
  const { congregations, selectedCongregation, setSelectedCongregation } = useCongregations();
  const { stats, isLoading } = useDashboardStats(selectedCongregation);

  const statCards = [
    {
      title: "Total de Membros",
      value: stats.totalMembers.toString(),
      change: "Ativos na igreja",
      changeType: "positive" as const,
      icon: Users,
      iconColor: "bg-primary/10 text-primary",
    },
    {
      title: "Novos Convertidos",
      value: stats.totalDecididos.toString(),
      change: "Decididos",
      changeType: "positive" as const,
      icon: Heart,
      iconColor: "bg-success/10 text-success",
    },
    {
      title: "Visitantes",
      value: stats.totalVisitantes.toString(),
      change: "Em acompanhamento",
      changeType: "neutral" as const,
      icon: Eye,
      iconColor: "bg-secondary/10 text-secondary",
    },
    {
      title: "Batizados",
      value: stats.totalBaptized.toString(),
      change: "Total batizados",
      changeType: "positive" as const,
      icon: TrendingUp,
      iconColor: "bg-info/10 text-info",
    },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Bem-vindo de volta! Aqui está o resumo da sua igreja.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <CongregationSelector
              congregations={congregations}
              selectedId={selectedCongregation}
              onSelect={setSelectedCongregation}
            />
            <div className="text-sm text-muted-foreground hidden md:block">
              <span>Última atualização: </span>
              <span className="font-medium text-foreground">Agora</span>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {statCards.map((stat, index) => (
                <StatCard
                  key={stat.title}
                  {...stat}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
                />
              ))}
            </div>

            {/* Alerts Section */}
            {stats.recentAlerts.length > 0 && (
              <AlertsCard alerts={stats.recentAlerts} />
            )}

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - 2/3 width */}
              <div className="lg:col-span-2 space-y-6">
                {/* Network Overview */}
                <NetworkOverview 
                  stats={stats.networkStats} 
                  totalMembers={stats.totalMembers + stats.totalDecididos + stats.totalVisitantes} 
                />
                
                {/* Cells Overview */}
                <CellsOverview />
                
                {/* Upcoming Events */}
                <UpcomingEvents />
              </div>

              {/* Right Column - 1/3 width */}
              <div className="space-y-6">
                {/* Birthdays */}
                <BirthdayCard
                  birthdaysThisMonth={stats.birthdaysThisMonth}
                  birthdaysThisWeek={stats.birthdaysThisWeek}
                />

                {/* Wedding Anniversaries */}
                <WeddingAnniversaryCard
                  anniversariesThisMonth={stats.weddingAnniversariesThisMonth}
                  anniversariesThisWeek={stats.weddingAnniversariesThisWeek}
                />

                {/* Spiritual Funnel */}
                <SpiritualFunnel />
                
                {/* Finance Overview */}
                <FinanceOverview />
              </div>
            </div>

            {/* Recent Activity - Full Width */}
            <RecentActivity />
          </>
        )}
      </div>
    </AppLayout>
  );
}
