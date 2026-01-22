import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Eye, EyeOff, Church, AlertCircle } from "lucide-react";

const registerSchema = z.object({
  full_name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

interface InvitationData {
  id: string;
  email: string;
  role: string;
  church_id: string;
  token: string;
  churches: {
    name: string;
  };
}

const roleLabels: Record<string, string> = {
  pastor: "Pastor/Administrador",
  tesoureiro: "Tesoureiro(a)",
  secretario: "Secretário(a)",
  lider_celula: "Líder de Célula",
  lider_ministerio: "Líder de Ministério",
  consolidacao: "Consolidação",
  membro: "Membro",
};

export default function Convite() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [invitation, setInvitation] = useState<InvitationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      full_name: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    const fetchInvitation = async () => {
      if (!token) {
        setError("Token de convite inválido.");
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await (supabase
          .from("invitations" as any)
          .select("*, churches(name)")
          .eq("token", token)
          .is("used_at", null)
          .gt("expires_at", new Date().toISOString())
          .single() as any);

        if (error || !data) {
          setError("Convite inválido, expirado ou já utilizado.");
          return;
        }

        setInvitation(data as unknown as InvitationData);
      } catch (err) {
        setError("Erro ao carregar convite.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvitation();
  }, [token]);

  const handleSubmit = async (data: RegisterFormData) => {
    if (!invitation) return;

    setIsSubmitting(true);
    try {
      // 1. Create user account
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: invitation.email,
        password: data.password,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });

      if (signUpError) throw signUpError;
      if (!authData.user) throw new Error("Erro ao criar conta");

      // 2. Create profile
      const { error: profileError } = await supabase
        .from("profiles")
        .insert([{
          user_id: authData.user.id,
          email: invitation.email,
          full_name: data.full_name,
          church_id: invitation.church_id,
        }]);

      if (profileError) throw profileError;

      // 3. Assign role
      const { error: roleError } = await supabase
        .from("user_roles")
        .insert([{
          user_id: authData.user.id,
          church_id: invitation.church_id,
          role: invitation.role as any,
        }]);

      if (roleError) throw roleError;

      // 4. Mark invitation as used
      await (supabase
        .from("invitations" as any)
        .update({ used_at: new Date().toISOString() })
        .eq("id", invitation.id) as any);

      toast({
        title: "Conta criada com sucesso!",
        description: "Você já pode acessar o sistema.",
      });

      navigate("/app");
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        title: "Erro no cadastro",
        description: error.message || "Não foi possível completar o cadastro.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !invitation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="w-6 h-6 text-destructive" />
            </div>
            <CardTitle>Convite Inválido</CardTitle>
            <CardDescription>
              {error || "Este convite não existe ou já foi utilizado."}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button asChild>
              <Link to="/">Ir para página inicial</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 gradient-primary rounded-full flex items-center justify-center mb-4">
            <Church className="w-6 h-6 text-primary-foreground" />
          </div>
          <CardTitle>Bem-vindo(a)!</CardTitle>
          <CardDescription>
            Você foi convidado para fazer parte de <strong>{invitation.churches.name}</strong> como <strong>{roleLabels[invitation.role]}</strong>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <div className="p-3 rounded-lg bg-muted">
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{invitation.email}</p>
              </div>

              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu nome completo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Crie sua senha"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar Senha</FormLabel>
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirme sua senha"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Criar Conta
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
