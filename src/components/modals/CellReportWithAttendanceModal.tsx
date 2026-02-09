import { useState, useEffect } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Users, UserCheck, UserPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Cell, CellReport, CreateCellReportData } from "@/hooks/useCells";

const reportSchema = z.object({
  cell_id: z.string().min(1, "Selecione uma célula"),
  report_date: z.string().min(1, "Data é obrigatória"),
  visitors: z.string().min(1, "Visitantes é obrigatório"),
  conversions: z.string().min(1, "Decisões é obrigatório"),
  offering: z.string().optional().or(z.literal("")),
  notes: z.string().max(500).optional().or(z.literal("")),
});

type ReportFormData = z.infer<typeof reportSchema>;

interface CellMemberWithDetails {
  id: string;
  cell_id: string;
  member_id: string;
  member: {
    id: string;
    full_name: string;
    phone: string | null;
  } | null;
}

interface CellReportWithAttendanceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cells: Cell[];
  defaultCellId?: string;
  onSubmit: (data: CreateCellReportData) => Promise<{ data: CellReport | null; error: any }>;
}

export function CellReportWithAttendanceModal({
  open,
  onOpenChange,
  cells,
  defaultCellId,
  onSubmit,
}: CellReportWithAttendanceModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cellMembers, setCellMembers] = useState<CellMemberWithDetails[]>([]);
  const [loadingMembers, setLoadingMembers] = useState(false);
  const [presentMemberIds, setPresentMemberIds] = useState<Set<string>>(new Set());

  const form = useForm<ReportFormData>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      cell_id: defaultCellId || "",
      report_date: new Date().toISOString().split("T")[0],
      visitors: "0",
      conversions: "0",
      offering: "",
      notes: "",
    },
  });

  const selectedCellId = form.watch("cell_id");

  // Fetch cell members when cell is selected
  useEffect(() => {
    if (selectedCellId) {
      fetchCellMembers(selectedCellId);
    } else {
      setCellMembers([]);
      setPresentMemberIds(new Set());
    }
  }, [selectedCellId]);

  const fetchCellMembers = async (cellId: string) => {
    try {
      setLoadingMembers(true);
      const { data, error } = await supabase
        .from("cell_members")
        .select(`
          id,
          cell_id,
          member_id,
          member:members(id, full_name, phone)
        `)
        .eq("cell_id", cellId);

      if (error) throw error;
      setCellMembers((data as CellMemberWithDetails[]) || []);
      // Reset attendance
      setPresentMemberIds(new Set());
    } catch (error) {
      console.error("Error fetching cell members:", error);
    } finally {
      setLoadingMembers(false);
    }
  };

  const toggleMemberAttendance = (memberId: string) => {
    setPresentMemberIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(memberId)) {
        newSet.delete(memberId);
      } else {
        newSet.add(memberId);
      }
      return newSet;
    });
  };

  const handleSubmit = async (data: ReportFormData) => {
    setIsSubmitting(true);
    try {
      const cleanedData: CreateCellReportData = {
        cell_id: data.cell_id,
        report_date: data.report_date,
        attendance: presentMemberIds.size + parseInt(data.visitors, 10), // members + visitors
        visitors: parseInt(data.visitors, 10),
        conversions: parseInt(data.conversions, 10),
        offering: data.offering ? parseFloat(data.offering) : undefined,
        notes: data.notes || undefined,
      };

      const result = await onSubmit(cleanedData);
      if (!result.error) {
        form.reset();
        setPresentMemberIds(new Set());
        onOpenChange(false);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeCells = cells.filter((c) => c.is_active);
  const presentCount = presentMemberIds.size;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Relatório Semanal da Célula</DialogTitle>
          <DialogDescription>
            Marque os membros presentes e preencha as informações da reunião.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col flex-1 overflow-hidden">
            <div className="space-y-4 flex-shrink-0">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="cell_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Célula *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a célula" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {activeCells.map((cell) => (
                            <SelectItem key={cell.id} value={cell.id}>
                              {cell.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="report_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data da Reunião *</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Attendance Section */}
            {selectedCellId && (
              <div className="mt-4 border rounded-lg p-4 flex-1 overflow-hidden flex flex-col min-h-0">
                <div className="flex items-center justify-between mb-3 flex-shrink-0">
                  <h4 className="font-medium flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Lista de Presença
                  </h4>
                  <Badge variant="secondary" className="text-sm">
                    <UserCheck className="w-3 h-3 mr-1" />
                    {presentCount} presentes
                  </Badge>
                </div>

                {loadingMembers ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  </div>
                ) : cellMembers.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <UserPlus className="w-8 h-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Nenhum membro cadastrado nesta célula.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Adicione membros através do menu da célula.
                    </p>
                  </div>
                ) : (
                  <ScrollArea className="flex-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pr-4">
                      {cellMembers.map((cm) => {
                        if (!cm || !cm.member_id) return null;
                        const member = Array.isArray(cm.member) ? cm.member[0] : cm.member;
                        const memberName = member?.full_name || "Membro";
                        const isPresent = presentMemberIds.has(cm.member_id);
                        return (
                          <button
                            key={cm.id}
                            type="button"
                            onClick={() => toggleMemberAttendance(cm.member_id)}
                            className={`flex items-center gap-3 p-2 rounded-lg border transition-all text-left ${
                              isPresent
                                ? "bg-success/10 border-success/30 hover:bg-success/20"
                                : "bg-muted/30 border-transparent hover:bg-muted/50"
                            }`}
                          >
                            <Checkbox
                              checked={isPresent}
                              className="pointer-events-none"
                            />
                            <Avatar className="w-7 h-7">
                              <AvatarFallback className={`text-xs ${isPresent ? "bg-success text-success-foreground" : "bg-muted"}`}>
                                {memberName.split(" ").map((n: string) => n[0]).join("").slice(0, 2) || "?"}
                              </AvatarFallback>
                            </Avatar>
                            <span className={`text-sm truncate ${isPresent ? "font-medium" : ""}`}>
                              {memberName}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </ScrollArea>
                )}
              </div>
            )}

            <div className="space-y-4 mt-4 flex-shrink-0">
              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="visitors"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Visitantes *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="0"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="conversions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Decisões *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="0"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="offering"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Oferta (R$)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder="0,00"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observações</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Observações sobre a reunião, pedidos de oração, testemunhos..."
                        className="resize-none"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="mt-4 flex-shrink-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Enviar Relatório
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
