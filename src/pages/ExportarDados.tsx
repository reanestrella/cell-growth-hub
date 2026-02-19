import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Database, Users, DollarSign, Grid3X3, Calendar, Heart, GraduationCap, Handshake, BookOpen, Home, Armchair, Bell, Loader2, CheckCircle, Copy, Check, Code } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

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

const SCHEMA_SQL = `-- =============================================
-- SCHEMA COMPLETO DO SISTEMA - MIGRAÇÃO
-- =============================================

-- Enum: spiritual_status
CREATE TYPE public.spiritual_status AS ENUM (
  'visitante', 'novo_convertido', 'frequentador', 'membro', 'lider', 'pastor'
);

-- Enum: app_role
CREATE TYPE public.app_role AS ENUM (
  'pastor', 'tesoureiro', 'secretario', 'lider_celula', 'lider_ministerio', 'consolidacao', 'membro'
);

-- =============================================
-- TABELA: churches
-- =============================================
CREATE TABLE public.churches (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  cnpj TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  phone TEXT,
  email TEXT,
  logo_url TEXT,
  plan TEXT NOT NULL DEFAULT 'free',
  max_members INTEGER DEFAULT 50,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =============================================
-- TABELA: congregations
-- =============================================
CREATE TABLE public.congregations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  church_id UUID NOT NULL REFERENCES public.churches(id),
  name TEXT NOT NULL,
  address TEXT,
  city TEXT,
  state TEXT,
  is_main BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =============================================
-- TABELA: members
-- =============================================
CREATE TABLE public.members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  church_id UUID NOT NULL REFERENCES public.churches(id),
  congregation_id UUID REFERENCES public.congregations(id),
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  gender TEXT,
  marital_status TEXT,
  birth_date DATE,
  wedding_date DATE,
  spiritual_status spiritual_status NOT NULL DEFAULT 'visitante',
  baptism_date DATE,
  baptism_location TEXT,
  conversion_date DATE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  last_attendance_date DATE,
  notes TEXT,
  photo_url TEXT,
  network TEXT,
  age_group TEXT,
  pastoral_notes TEXT,
  inactivity_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =============================================
-- TABELA: profiles
-- =============================================
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  church_id UUID REFERENCES public.churches(id),
  congregation_id UUID REFERENCES public.congregations(id),
  member_id UUID REFERENCES public.members(id),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =============================================
-- TABELA: user_roles
-- =============================================
CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  church_id UUID NOT NULL REFERENCES public.churches(id),
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =============================================
-- TABELA: invitations
-- =============================================
CREATE TABLE public.invitations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  church_id UUID NOT NULL REFERENCES public.churches(id),
  congregation_id UUID REFERENCES public.congregations(id),
  member_id UUID REFERENCES public.members(id),
  email TEXT NOT NULL,
  full_name TEXT,
  role app_role NOT NULL,
  token UUID NOT NULL DEFAULT gen_random_uuid(),
  invited_by UUID NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + interval '7 days'),
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =============================================
-- TABELA: cells
-- =============================================
CREATE TABLE public.cells (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  church_id UUID NOT NULL REFERENCES public.churches(id),
  name TEXT NOT NULL,
  network TEXT,
  address TEXT,
  day_of_week TEXT,
  time TEXT,
  leader_id UUID REFERENCES public.members(id),
  supervisor_id UUID REFERENCES public.members(id),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =============================================
-- TABELA: cell_members
-- =============================================
CREATE TABLE public.cell_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  cell_id UUID NOT NULL REFERENCES public.cells(id),
  member_id UUID NOT NULL REFERENCES public.members(id),
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =============================================
-- TABELA: cell_reports
-- =============================================
CREATE TABLE public.cell_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  cell_id UUID NOT NULL REFERENCES public.cells(id),
  report_date DATE NOT NULL,
  attendance INTEGER NOT NULL DEFAULT 0,
  visitors INTEGER NOT NULL DEFAULT 0,
  conversions INTEGER NOT NULL DEFAULT 0,
  offering NUMERIC DEFAULT 0,
  notes TEXT,
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =============================================
-- TABELA: cell_visitors
-- =============================================
CREATE TABLE public.cell_visitors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  cell_id UUID NOT NULL REFERENCES public.cells(id),
  church_id UUID NOT NULL REFERENCES public.churches(id),
  full_name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  visit_date DATE NOT NULL DEFAULT CURRENT_DATE,
  invited_by UUID REFERENCES public.members(id),
  accepted_christ BOOLEAN DEFAULT false,
  follow_up_status TEXT DEFAULT 'pendente',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================
-- TABELA: cell_prayer_requests
-- =============================================
CREATE TABLE public.cell_prayer_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  cell_id UUID NOT NULL REFERENCES public.cells(id),
  church_id UUID NOT NULL REFERENCES public.churches(id),
  member_id UUID REFERENCES public.members(id),
  request TEXT NOT NULL,
  leader_notes TEXT,
  is_answered BOOLEAN DEFAULT false,
  answered_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================
-- TABELA: cell_pastoral_care
-- =============================================
CREATE TABLE public.cell_pastoral_care (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  cell_id UUID NOT NULL REFERENCES public.cells(id),
  church_id UUID NOT NULL REFERENCES public.churches(id),
  member_id UUID NOT NULL REFERENCES public.members(id),
  care_type TEXT NOT NULL,
  care_date TIMESTAMPTZ DEFAULT now(),
  notes TEXT,
  created_by UUID,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================
-- TABELA: cell_leadership_development
-- =============================================
CREATE TABLE public.cell_leadership_development (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  cell_id UUID NOT NULL REFERENCES public.cells(id),
  church_id UUID NOT NULL REFERENCES public.churches(id),
  member_id UUID NOT NULL REFERENCES public.members(id),
  potential_level TEXT DEFAULT 'identificado',
  notes TEXT,
  identified_at TIMESTAMPTZ DEFAULT now(),
  created_by UUID,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================
-- TABELA: ministries
-- =============================================
CREATE TABLE public.ministries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  church_id UUID NOT NULL REFERENCES public.churches(id),
  name TEXT NOT NULL,
  description TEXT,
  leader_id UUID REFERENCES public.members(id),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =============================================
-- TABELA: ministry_volunteers
-- =============================================
CREATE TABLE public.ministry_volunteers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ministry_id UUID NOT NULL REFERENCES public.ministries(id),
  member_id UUID NOT NULL REFERENCES public.members(id),
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =============================================
-- TABELA: ministry_schedules
-- =============================================
CREATE TABLE public.ministry_schedules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ministry_id UUID NOT NULL REFERENCES public.ministries(id),
  event_name TEXT NOT NULL,
  event_date DATE NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =============================================
-- TABELA: schedule_volunteers
-- =============================================
CREATE TABLE public.schedule_volunteers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  schedule_id UUID NOT NULL REFERENCES public.ministry_schedules(id),
  member_id UUID NOT NULL REFERENCES public.members(id),
  role TEXT,
  confirmed BOOLEAN DEFAULT false
);

-- =============================================
-- TABELA: financial_categories
-- =============================================
CREATE TABLE public.financial_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  church_id UUID NOT NULL REFERENCES public.churches(id),
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =============================================
-- TABELA: financial_accounts
-- =============================================
CREATE TABLE public.financial_accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  church_id UUID NOT NULL REFERENCES public.churches(id),
  name TEXT NOT NULL,
  account_type TEXT NOT NULL,
  bank_name TEXT,
  network TEXT,
  initial_balance NUMERIC DEFAULT 0,
  current_balance NUMERIC DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  ministry_id UUID REFERENCES public.ministries(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================
-- TABELA: financial_campaigns
-- =============================================
CREATE TABLE public.financial_campaigns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  church_id UUID NOT NULL REFERENCES public.churches(id),
  name TEXT NOT NULL,
  description TEXT,
  goal_amount NUMERIC,
  current_amount NUMERIC DEFAULT 0,
  start_date DATE,
  end_date DATE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================
-- TABELA: financial_transactions
-- =============================================
CREATE TABLE public.financial_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  church_id UUID NOT NULL REFERENCES public.churches(id),
  description TEXT NOT NULL,
  type TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  transaction_date DATE NOT NULL,
  category_id UUID REFERENCES public.financial_categories(id),
  account_id UUID REFERENCES public.financial_accounts(id),
  campaign_id UUID REFERENCES public.financial_campaigns(id),
  member_id UUID REFERENCES public.members(id),
  payment_method TEXT,
  reference_number TEXT,
  notes TEXT,
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =============================================
-- TABELA: events
-- =============================================
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  church_id UUID NOT NULL REFERENCES public.churches(id),
  title TEXT NOT NULL,
  description TEXT,
  event_date DATE NOT NULL,
  event_time TEXT,
  location TEXT,
  is_public BOOLEAN NOT NULL DEFAULT true,
  max_participants INTEGER,
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =============================================
-- TABELA: event_registrations
-- =============================================
CREATE TABLE public.event_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID NOT NULL REFERENCES public.events(id),
  member_id UUID NOT NULL REFERENCES public.members(id),
  registered_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  confirmed BOOLEAN DEFAULT false
);

-- =============================================
-- TABELA: courses
-- =============================================
CREATE TABLE public.courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  church_id UUID NOT NULL REFERENCES public.churches(id),
  name TEXT NOT NULL,
  description TEXT,
  track TEXT,
  teacher_id UUID REFERENCES public.members(id),
  start_date DATE,
  end_date DATE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =============================================
-- TABELA: course_students
-- =============================================
CREATE TABLE public.course_students (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES public.courses(id),
  member_id UUID NOT NULL REFERENCES public.members(id),
  enrolled_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ
);

-- =============================================
-- TABELA: consolidation_records
-- =============================================
CREATE TABLE public.consolidation_records (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  church_id UUID NOT NULL REFERENCES public.churches(id),
  member_id UUID NOT NULL REFERENCES public.members(id),
  consolidator_id UUID REFERENCES public.members(id),
  status TEXT DEFAULT 'contato',
  contact_date DATE,
  first_visit_date DATE,
  cell_integration_date DATE,
  notes TEXT,
  created_by UUID,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================
-- TABELA: discipleships
-- =============================================
CREATE TABLE public.discipleships (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  church_id UUID NOT NULL REFERENCES public.churches(id),
  disciple_id UUID NOT NULL REFERENCES public.members(id),
  discipler_id UUID REFERENCES public.members(id),
  status TEXT NOT NULL DEFAULT 'ativo',
  start_date DATE DEFAULT CURRENT_DATE,
  end_date DATE,
  notes TEXT,
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =============================================
-- TABELA: pastoral_visits
-- =============================================
CREATE TABLE public.pastoral_visits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  church_id UUID NOT NULL REFERENCES public.churches(id),
  member_id UUID REFERENCES public.members(id),
  visitor_id UUID REFERENCES public.members(id),
  visit_date DATE NOT NULL DEFAULT CURRENT_DATE,
  reason TEXT,
  notes TEXT,
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =============================================
-- TABELA: pastoral_counseling
-- =============================================
CREATE TABLE public.pastoral_counseling (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  church_id UUID NOT NULL REFERENCES public.churches(id),
  member_id UUID REFERENCES public.members(id),
  counselor_id UUID REFERENCES public.members(id),
  session_type TEXT NOT NULL DEFAULT 'aconselhamento',
  session_date DATE NOT NULL DEFAULT CURRENT_DATE,
  is_private BOOLEAN NOT NULL DEFAULT true,
  notes TEXT,
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =============================================
-- TABELA: reminders
-- =============================================
CREATE TABLE public.reminders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  church_id UUID NOT NULL REFERENCES public.churches(id),
  title TEXT NOT NULL,
  description TEXT,
  reminder_type TEXT NOT NULL DEFAULT 'geral',
  member_id UUID REFERENCES public.members(id),
  assigned_to UUID,
  due_date DATE,
  is_completed BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMPTZ,
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =============================================
-- TABELA: announcements
-- =============================================
CREATE TABLE public.announcements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  church_id UUID NOT NULL REFERENCES public.churches(id),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  target_roles app_role[],
  is_active BOOLEAN NOT NULL DEFAULT true,
  expires_at TIMESTAMPTZ,
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =============================================
-- TABELA: prayer_requests
-- =============================================
CREATE TABLE public.prayer_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  church_id UUID NOT NULL REFERENCES public.churches(id),
  member_id UUID REFERENCES public.members(id),
  user_id UUID,
  request TEXT NOT NULL,
  is_public BOOLEAN NOT NULL DEFAULT false,
  is_answered BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =============================================
-- TABELA: spiritual_history
-- =============================================
CREATE TABLE public.spiritual_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  member_id UUID NOT NULL REFERENCES public.members(id),
  church_id UUID NOT NULL REFERENCES public.churches(id),
  event_type TEXT NOT NULL,
  event_date DATE NOT NULL DEFAULT CURRENT_DATE,
  description TEXT,
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =============================================
-- TABELA: member_alerts
-- =============================================
CREATE TABLE public.member_alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  member_id UUID NOT NULL REFERENCES public.members(id),
  church_id UUID NOT NULL REFERENCES public.churches(id),
  alert_type TEXT NOT NULL,
  message TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
`;

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
  const [copied, setCopied] = useState(false);
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

  const copySQL = async () => {
    try {
      await navigator.clipboard.writeText(SCHEMA_SQL);
      setCopied(true);
      toast({ title: "Copiado!", description: "SQL copiado para a área de transferência." });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: "Erro", description: "Não foi possível copiar.", variant: "destructive" });
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Exportar Dados</h1>
            <p className="text-muted-foreground mt-1">Exporte dados em CSV ou copie o SQL para migração</p>
          </div>
        </div>

        <Tabs defaultValue="csv" className="w-full">
          <TabsList>
            <TabsTrigger value="csv" className="gap-2">
              <Download className="w-4 h-4" />
              Exportar CSV
            </TabsTrigger>
            <TabsTrigger value="sql" className="gap-2">
              <Code className="w-4 h-4" />
              SQL das Tabelas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="csv" className="space-y-4 mt-4">
            <div className="flex justify-end">
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
                          <CheckCircle className="w-4 h-4" />
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
          </TabsContent>

          <TabsContent value="sql" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="w-5 h-5 text-primary" />
                      SQL de Criação das Tabelas
                    </CardTitle>
                    <CardDescription>
                      Copie o SQL abaixo e execute no banco de destino para recriar toda a estrutura
                    </CardDescription>
                  </div>
                  <Button onClick={copySQL} variant="outline" className="gap-2">
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? "Copiado!" : "Copiar SQL"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  readOnly
                  value={SCHEMA_SQL}
                  className="font-mono text-xs h-[500px] resize-y bg-muted/50"
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}