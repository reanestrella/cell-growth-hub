import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Database, Users, DollarSign, Grid3X3, Calendar, Heart, GraduationCap, Handshake, BookOpen, Home, Armchair, Bell, Loader2, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ExportTable {
  key: string;
  label: string;
  icon: React.ElementType;
  description: string;
}

const exportTables: ExportTable[] = [
  { key: "members", label: "Membros", icon: Users, description: "Todos os membros cadastrados" },
  { key: "cells", label: "Células", icon: Grid3X3, description: "Todas as células" },
  { key: "cell_members", label: "Membros de Células", icon: Grid3X3, description: "Vinculação membros/células" },
  { key: "cell_reports", label: "Relatórios de Células", icon: Grid3X3, description: "Relatórios enviados" },
  { key: "cell_visitors", label: "Visitantes de Células", icon: Grid3X3, description: "Visitantes registrados" },
  { key: "cell_prayer_requests", label: "Pedidos de Oração (Células)", icon: Grid3X3, description: "Pedidos das células" },
  { key: "cell_pastoral_care", label: "Cuidado Pastoral (Células)", icon: Grid3X3, description: "Registros de cuidado" },
  { key: "cell_leadership_development", label: "Desenvolvimento de Líderes", icon: Grid3X3, description: "Potenciais líderes" },
  { key: "ministries", label: "Ministérios", icon: Heart, description: "Todos os ministérios" },
  { key: "ministry_volunteers", label: "Voluntários", icon: Heart, description: "Voluntários dos ministérios" },
  { key: "ministry_schedules", label: "Escalas", icon: Heart, description: "Escalas dos ministérios" },
  { key: "schedule_volunteers", label: "Voluntários Escalados", icon: Heart, description: "Voluntários por escala" },
  { key: "financial_transactions", label: "Transações Financeiras", icon: DollarSign, description: "Todas as transações" },
  { key: "financial_categories", label: "Categorias Financeiras", icon: DollarSign, description: "Categorias de receita/despesa" },
  { key: "financial_accounts", label: "Contas Financeiras", icon: DollarSign, description: "Contas bancárias" },
  { key: "financial_campaigns", label: "Campanhas Financeiras", icon: DollarSign, description: "Campanhas de arrecadação" },
  { key: "events", label: "Eventos", icon: Calendar, description: "Todos os eventos" },
  { key: "event_registrations", label: "Inscrições em Eventos", icon: Calendar, description: "Inscrições registradas" },
  { key: "courses", label: "Cursos", icon: GraduationCap, description: "Todos os cursos" },
  { key: "course_students", label: "Alunos de Cursos", icon: GraduationCap, description: "Matrículas" },
  { key: "consolidation_records", label: "Consolidação", icon: Handshake, description: "Registros de consolidação" },
  { key: "discipleships", label: "Discipulados", icon: BookOpen, description: "Registros de discipulado" },
  { key: "pastoral_visits", label: "Visitas Pastorais", icon: Home, description: "Visitas realizadas" },
  { key: "pastoral_counseling", label: "Aconselhamento", icon: Armchair, description: "Sessões de aconselhamento" },
  { key: "reminders", label: "Lembretes", icon: Bell, description: "Lembretes cadastrados" },
  { key: "announcements", label: "Avisos", icon: Bell, description: "Avisos da igreja" },
  { key: "prayer_requests", label: "Pedidos de Oração", icon: Heart, description: "Pedidos gerais" },
  { key: "congregations", label: "Congregações", icon: Database, description: "Congregações cadastradas" },
  { key: "profiles", label: "Perfis de Usuário", icon: Users, description: "Perfis dos usuários" },
  { key: "user_roles", label: "Papéis de Usuário", icon: Users, description: "Roles dos usuários" },
  { key: "invitations", label: "Convites", icon: Users, description: "Convites enviados" },
  { key: "spiritual_history", label: "Histórico Espiritual", icon: Heart, description: "Eventos espirituais" },
  { key: "member_alerts", label: "Alertas de Membros", icon: Bell, description: "Alertas gerados" },
];

function convertToCSV(data: Record<string, unknown>[]): string {
  if (data.length === 0) return "";
  const headers = Object.keys(data[0]);
  const rows = data.map(row =>
    headers.map(h => {
      const val = row[h];
      const str = val === null || val === undefined ? "" : String(val);
      return `"${str.replace(/"/g, '""')}"`;
    }).join(",")
  );
  return [headers.join(","), ...rows].join("\n");
}

function downloadCSV(csv: string, filename: string) {
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function ExportarDados() {
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [done, setDone] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  const exportTable = async (tableKey: string, label: string) => {
    setLoading(prev => ({ ...prev, [tableKey]: true }));
    try {
      const { data, error } = await (supabase.from(tableKey as any).select("*") as any);
      if (error) throw error;
      if (!data || data.length === 0) {
        toast({ title: `${label}`, description: "Nenhum dado encontrado para exportar.", variant: "destructive" });
        return;
      }
      const csv = convertToCSV(data);
      downloadCSV(csv, `${tableKey}_${new Date().toISOString().slice(0, 10)}.csv`);
      setDone(prev => ({ ...prev, [tableKey]: true }));
      toast({ title: "Exportado!", description: `${label} exportado com ${data.length} registros.` });
    } catch (err: any) {
      console.error("Export error:", err);
      toast({ title: "Erro ao exportar", description: err.message || "Erro desconhecido", variant: "destructive" });
    } finally {
      setLoading(prev => ({ ...prev, [tableKey]: false }));
    }
  };

  const exportAll = async () => {
    for (const table of exportTables) {
      await exportTable(table.key, table.label);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Exportar Dados</h1>
            <p className="text-muted-foreground mt-1">Exporte todos os dados do sistema em formato CSV</p>
          </div>
          <Button onClick={exportAll} size="lg" className="gap-2">
            <Download className="w-5 h-5" />
            Exportar Tudo
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {exportTables.map((table) => {
            const Icon = table.icon;
            const isLoading = loading[table.key];
            const isDone = done[table.key];
            return (
              <Card key={table.key} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-sm">{table.label}</CardTitle>
                      <CardDescription className="text-xs truncate">{table.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button
                    variant={isDone ? "secondary" : "outline"}
                    size="sm"
                    className="w-full gap-2"
                    disabled={isLoading}
                    onClick={() => exportTable(table.key, table.label)}
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : isDone ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Download className="w-4 h-4" />
                    )}
                    {isLoading ? "Exportando..." : isDone ? "Exportado" : "Exportar CSV"}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
