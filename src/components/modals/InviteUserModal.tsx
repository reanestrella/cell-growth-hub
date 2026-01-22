import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Copy, Check } from "lucide-react";
import type { CreateInvitationData, Invitation } from "@/hooks/useInvitations";

const inviteSchema = z.object({
  email: z.string().email("Email inválido"),
  role: z.enum(["tesoureiro", "secretario", "lider_celula", "lider_ministerio", "consolidacao", "membro"]),
});

type InviteFormData = z.infer<typeof inviteSchema>;

const roleLabels: Record<string, string> = {
  tesoureiro: "Tesoureiro(a)",
  secretario: "Secretário(a)",
  lider_celula: "Líder de Célula",
  lider_ministerio: "Líder de Ministério",
  consolidacao: "Consolidação",
  membro: "Membro",
};

interface InviteUserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateInvitationData) => Promise<{ data: Invitation | null; error: any }>;
  getInviteLink: (token: string) => string;
}

export function InviteUserModal({ open, onOpenChange, onSubmit, getInviteLink }: InviteUserModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  
  const form = useForm<InviteFormData>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      email: "",
      role: "membro",
    },
  });

  const handleSubmit = async (data: InviteFormData) => {
    setIsSubmitting(true);
    try {
      const submitData: CreateInvitationData = {
        email: data.email,
        role: data.role,
      };
      const result = await onSubmit(submitData);
      if (!result.error && result.data) {
        setGeneratedLink(getInviteLink(result.data.token));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopy = async () => {
    if (generatedLink) {
      await navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      form.reset();
      setGeneratedLink(null);
      setCopied(false);
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Convidar Novo Usuário</DialogTitle>
          <DialogDescription>
            {generatedLink 
              ? "Copie o link e envie para o usuário se cadastrar."
              : "Gere um link de convite com a função desejada."}
          </DialogDescription>
        </DialogHeader>

        {generatedLink ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Input 
                value={generatedLink} 
                readOnly 
                className="font-mono text-sm"
              />
              <Button size="icon" variant="outline" onClick={handleCopy}>
                {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Este link expira em 7 dias e só pode ser usado uma vez.
            </p>
            <DialogFooter>
              <Button onClick={() => handleClose(false)}>Fechar</Button>
            </DialogFooter>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email do convidado</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="email@exemplo.com" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Função</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a função" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(roleLabels).map(([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => handleClose(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Gerar Link
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
