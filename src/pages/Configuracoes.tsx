import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Church,
  User,
  Bell,
  Shield,
  CreditCard,
  Users,
  Crown,
  Check,
  Smartphone,
} from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "Grátis",
    current: true,
    features: [
      "Até 50 membros",
      "1 célula",
      "Secretaria básica",
      "Meu App básico",
    ],
    limitations: [
      "Sem relatórios avançados",
      "Sem financeiro completo",
      "Suporte por email",
    ],
  },
  {
    name: "Igreja Pequena",
    price: "R$ 49/mês",
    current: false,
    recommended: true,
    features: [
      "Membros ilimitados",
      "Células ilimitadas",
      "Financeiro completo",
      "Ensino & Discipulado",
      "Relatórios completos",
      "Suporte prioritário",
    ],
  },
  {
    name: "Igreja Média",
    price: "R$ 99/mês",
    current: false,
    features: [
      "Tudo do plano anterior",
      "Relatórios avançados",
      "Indicadores espirituais",
      "Múltiplos líderes",
      "API de integração",
      "Suporte dedicado",
    ],
  },
];

export default function Configuracoes() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Configurações</h1>
          <p className="text-muted-foreground">
            Gerencie sua igreja e preferências do sistema
          </p>
        </div>

        <Tabs defaultValue="church">
          <TabsList className="w-full md:w-auto flex-wrap h-auto gap-1">
            <TabsTrigger value="church" className="gap-2">
              <Church className="w-4 h-4" />
              <span className="hidden sm:inline">Igreja</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Usuários</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">Notificações</span>
            </TabsTrigger>
            <TabsTrigger value="plan" className="gap-2">
              <Crown className="w-4 h-4" />
              <span className="hidden sm:inline">Plano</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="church" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações da Igreja</CardTitle>
                <CardDescription>
                  Dados principais da sua igreja
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="churchName">Nome da Igreja</Label>
                    <Input id="churchName" defaultValue="Igreja Evangélica Vida Nova" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cnpj">CNPJ</Label>
                    <Input id="cnpj" defaultValue="12.345.678/0001-90" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="contato@igrejavn.com.br" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input id="phone" defaultValue="(11) 3456-7890" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Endereço</Label>
                    <Input id="address" defaultValue="Rua da Paz, 123 - Centro - São Paulo/SP" />
                  </div>
                </div>
                <Button>Salvar Alterações</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5" />
                  Configurações PWA
                </CardTitle>
                <CardDescription>
                  Configure o aplicativo móvel da sua igreja
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Habilitar PWA</p>
                    <p className="text-sm text-muted-foreground">
                      Permitir instalação do app na tela inicial
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Notificações Push</p>
                    <p className="text-sm text-muted-foreground">
                      Enviar notificações para dispositivos móveis
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciamento de Usuários</CardTitle>
                <CardDescription>
                  Controle de acesso e permissões
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
                        PS
                      </div>
                      <div>
                        <p className="font-medium">Pastor Silva</p>
                        <p className="text-sm text-muted-foreground">pastor@igrejavn.com.br</p>
                      </div>
                    </div>
                    <Badge>Administrador</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-medium">
                        MS
                      </div>
                      <div>
                        <p className="font-medium">Maria Santos</p>
                        <p className="text-sm text-muted-foreground">maria@igrejavn.com.br</p>
                      </div>
                    </div>
                    <Badge variant="outline">Secretaria</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-success flex items-center justify-center text-success-foreground font-medium">
                        JC
                      </div>
                      <div>
                        <p className="font-medium">João Costa</p>
                        <p className="text-sm text-muted-foreground">joao@igrejavn.com.br</p>
                      </div>
                    </div>
                    <Badge variant="outline">Tesouraria</Badge>
                  </div>
                </div>
                <Button className="mt-4">
                  <User className="w-4 h-4 mr-2" />
                  Adicionar Usuário
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Funções e Permissões
                </CardTitle>
                <CardDescription>
                  Configure as permissões por função
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    "Administrador Geral",
                    "Pastor",
                    "Secretaria",
                    "Tesouraria",
                    "Líder de Célula",
                    "Supervisor",
                    "Professor",
                    "Membro",
                  ].map((role) => (
                    <div
                      key={role}
                      className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <span>{role}</span>
                      <Button variant="ghost" size="sm">
                        Editar
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Preferências de Notificação</CardTitle>
                <CardDescription>
                  Configure como você deseja receber alertas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Novos membros</p>
                    <p className="text-sm text-muted-foreground">
                      Notificar quando novos membros forem cadastrados
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Relatórios de célula</p>
                    <p className="text-sm text-muted-foreground">
                      Notificar quando células enviarem relatórios
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Movimentações financeiras</p>
                    <p className="text-sm text-muted-foreground">
                      Alertas sobre dízimos e ofertas
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Eventos e escalas</p>
                    <p className="text-sm text-muted-foreground">
                      Lembretes de eventos e escalas de serviço
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Pedidos de oração</p>
                    <p className="text-sm text-muted-foreground">
                      Novos pedidos de oração da comunidade
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="plan" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <Card
                  key={plan.name}
                  className={`relative ${
                    plan.recommended
                      ? "border-secondary shadow-lg"
                      : plan.current
                      ? "border-primary"
                      : ""
                  }`}
                >
                  {plan.recommended && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-secondary text-secondary-foreground">
                        Recomendado
                      </Badge>
                    </div>
                  )}
                  {plan.current && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge>Plano Atual</Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pt-8">
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <div className="text-3xl font-bold mt-2">{plan.price}</div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-success" />
                          {feature}
                        </li>
                      ))}
                      {plan.limitations?.map((limitation) => (
                        <li
                          key={limitation}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <span className="w-4 h-4 flex items-center justify-center">-</span>
                          {limitation}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full mt-6 ${
                        plan.recommended ? "gradient-accent text-secondary-foreground" : ""
                      }`}
                      variant={plan.current ? "outline" : "default"}
                      disabled={plan.current}
                    >
                      {plan.current ? "Plano Atual" : "Fazer Upgrade"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Faturamento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Você está no plano gratuito. Faça upgrade para desbloquear recursos avançados.
                </p>
                <Button variant="outline">
                  Gerenciar Pagamento
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
