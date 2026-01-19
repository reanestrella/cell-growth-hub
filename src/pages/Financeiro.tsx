import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Plus,
  Download,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  PiggyBank,
  Target,
  Calendar,
} from "lucide-react";

const transactions = [
  { id: 1, type: "income", category: "Dízimos", description: "Dízimos Domingo", amount: 2500, date: "2024-01-15", member: "Geral" },
  { id: 2, type: "income", category: "Ofertas", description: "Ofertas Culto Domingo", amount: 850, date: "2024-01-15", member: "Geral" },
  { id: 3, type: "expense", category: "Utilidades", description: "Energia Elétrica", amount: 450, date: "2024-01-14", member: "-" },
  { id: 4, type: "income", category: "Campanhas", description: "Campanha Missões", amount: 1200, date: "2024-01-12", member: "Geral" },
  { id: 5, type: "expense", category: "Manutenção", description: "Conserto Ar Condicionado", amount: 800, date: "2024-01-10", member: "-" },
  { id: 6, type: "income", category: "Dízimos", description: "Dízimos Quarta", amount: 1800, date: "2024-01-10", member: "Geral" },
  { id: 7, type: "expense", category: "Materiais", description: "Material de Limpeza", amount: 150, date: "2024-01-08", member: "-" },
  { id: 8, type: "income", category: "Ofertas", description: "Ofertas Especiais", amount: 500, date: "2024-01-07", member: "Geral" },
];

const stats = [
  {
    title: "Saldo Atual",
    value: "R$ 15.420,50",
    change: "+12% vs mês anterior",
    changeType: "positive",
    icon: PiggyBank,
    color: "bg-primary/10 text-primary",
  },
  {
    title: "Entradas (Mês)",
    value: "R$ 8.500,00",
    change: "+8% vs mês anterior",
    changeType: "positive",
    icon: TrendingUp,
    color: "bg-success/10 text-success",
  },
  {
    title: "Saídas (Mês)",
    value: "R$ 3.200,00",
    change: "-5% vs mês anterior",
    changeType: "positive",
    icon: TrendingDown,
    color: "bg-destructive/10 text-destructive",
  },
  {
    title: "Dízimos (Mês)",
    value: "R$ 6.800,00",
    change: "+15% vs mês anterior",
    changeType: "positive",
    icon: Target,
    color: "bg-secondary/10 text-secondary",
  },
];

const campaigns = [
  { name: "Missões 2024", goal: 10000, current: 4500, deadline: "Dez 2024" },
  { name: "Reforma Templo", goal: 50000, current: 32000, deadline: "Jun 2024" },
  { name: "Ação Social", goal: 5000, current: 5000, deadline: "Jan 2024" },
];

export default function Financeiro() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Financeiro</h1>
            <p className="text-muted-foreground">
              Gestão financeira transparente da sua igreja
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Relatório
            </Button>
            <Button className="gradient-accent text-secondary-foreground shadow-lg hover:shadow-xl transition-all">
              <Plus className="w-4 h-4 mr-2" />
              Nova Entrada
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.title} className="stat-card">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <p className="text-xs text-success mt-1">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-xl ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="transactions">Movimentações</TabsTrigger>
            <TabsTrigger value="campaigns">Campanhas</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Transactions */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Últimas Movimentações</CardTitle>
                  <Button variant="ghost" size="sm">Ver todas</Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactions.slice(0, 5).map((tx) => (
                      <div
                        key={tx.id}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-lg ${
                              tx.type === "income"
                                ? "bg-success/10 text-success"
                                : "bg-destructive/10 text-destructive"
                            }`}
                          >
                            {tx.type === "income" ? (
                              <ArrowUpRight className="w-4 h-4" />
                            ) : (
                              <ArrowDownRight className="w-4 h-4" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{tx.description}</p>
                            <p className="text-xs text-muted-foreground">
                              {tx.category} • {new Date(tx.date).toLocaleDateString("pt-BR")}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`font-semibold ${
                            tx.type === "income" ? "text-success" : "text-destructive"
                          }`}
                        >
                          {tx.type === "income" ? "+" : "-"}R$ {tx.amount.toLocaleString("pt-BR")}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Campaigns Progress */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Campanhas Ativas</CardTitle>
                  <Button variant="ghost" size="sm">Ver todas</Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {campaigns.map((campaign) => (
                      <div key={campaign.name} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{campaign.name}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>{campaign.deadline}</span>
                            </div>
                          </div>
                          <Badge
                            variant={campaign.current >= campaign.goal ? "default" : "secondary"}
                            className={
                              campaign.current >= campaign.goal
                                ? "bg-success text-success-foreground"
                                : ""
                            }
                          >
                            {Math.round((campaign.current / campaign.goal) * 100)}%
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          <div className="h-3 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-secondary to-warning rounded-full transition-all duration-500"
                              style={{
                                width: `${Math.min((campaign.current / campaign.goal) * 100, 100)}%`,
                              }}
                            />
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              Arrecadado: R$ {campaign.current.toLocaleString("pt-BR")}
                            </span>
                            <span className="font-medium">
                              Meta: R$ {campaign.goal.toLocaleString("pt-BR")}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Todas as Movimentações</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtrar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((tx) => (
                      <TableRow key={tx.id}>
                        <TableCell>
                          {new Date(tx.date).toLocaleDateString("pt-BR")}
                        </TableCell>
                        <TableCell className="font-medium">{tx.description}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{tx.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={
                              tx.type === "income"
                                ? "bg-success/20 text-success"
                                : "bg-destructive/20 text-destructive"
                            }
                          >
                            {tx.type === "income" ? "Entrada" : "Saída"}
                          </Badge>
                        </TableCell>
                        <TableCell
                          className={`text-right font-semibold ${
                            tx.type === "income" ? "text-success" : "text-destructive"
                          }`}
                        >
                          {tx.type === "income" ? "+" : "-"}R$ {tx.amount.toLocaleString("pt-BR")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="campaigns" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {campaigns.map((campaign) => (
                <Card key={campaign.name}>
                  <CardContent className="pt-6">
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-bold">{campaign.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Prazo: {campaign.deadline}
                      </p>
                    </div>
                    <div className="relative h-32 w-32 mx-auto mb-4">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="currentColor"
                          strokeWidth="12"
                          fill="none"
                          className="text-muted"
                        />
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="currentColor"
                          strokeWidth="12"
                          fill="none"
                          strokeDasharray={`${(campaign.current / campaign.goal) * 352} 352`}
                          className="text-secondary"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold">
                          {Math.round((campaign.current / campaign.goal) * 100)}%
                        </span>
                      </div>
                    </div>
                    <div className="text-center space-y-1">
                      <p className="text-sm text-muted-foreground">
                        Arrecadado:{" "}
                        <span className="font-semibold text-foreground">
                          R$ {campaign.current.toLocaleString("pt-BR")}
                        </span>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Meta:{" "}
                        <span className="font-semibold text-foreground">
                          R$ {campaign.goal.toLocaleString("pt-BR")}
                        </span>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
