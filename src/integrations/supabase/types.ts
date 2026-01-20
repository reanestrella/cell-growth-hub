export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      announcements: {
        Row: {
          church_id: string
          content: string
          created_at: string
          created_by: string | null
          expires_at: string | null
          id: string
          is_active: boolean
          target_roles: Database["public"]["Enums"]["app_role"][] | null
          title: string
        }
        Insert: {
          church_id: string
          content: string
          created_at?: string
          created_by?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean
          target_roles?: Database["public"]["Enums"]["app_role"][] | null
          title: string
        }
        Update: {
          church_id?: string
          content?: string
          created_at?: string
          created_by?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean
          target_roles?: Database["public"]["Enums"]["app_role"][] | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "announcements_church_id_fkey"
            columns: ["church_id"]
            isOneToOne: false
            referencedRelation: "churches"
            referencedColumns: ["id"]
          },
        ]
      }
      cell_members: {
        Row: {
          cell_id: string
          id: string
          joined_at: string
          member_id: string
        }
        Insert: {
          cell_id: string
          id?: string
          joined_at?: string
          member_id: string
        }
        Update: {
          cell_id?: string
          id?: string
          joined_at?: string
          member_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cell_members_cell_id_fkey"
            columns: ["cell_id"]
            isOneToOne: false
            referencedRelation: "cells"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cell_members_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      cell_reports: {
        Row: {
          attendance: number
          cell_id: string
          conversions: number
          created_at: string
          created_by: string | null
          id: string
          notes: string | null
          offering: number | null
          report_date: string
          visitors: number
        }
        Insert: {
          attendance?: number
          cell_id: string
          conversions?: number
          created_at?: string
          created_by?: string | null
          id?: string
          notes?: string | null
          offering?: number | null
          report_date: string
          visitors?: number
        }
        Update: {
          attendance?: number
          cell_id?: string
          conversions?: number
          created_at?: string
          created_by?: string | null
          id?: string
          notes?: string | null
          offering?: number | null
          report_date?: string
          visitors?: number
        }
        Relationships: [
          {
            foreignKeyName: "cell_reports_cell_id_fkey"
            columns: ["cell_id"]
            isOneToOne: false
            referencedRelation: "cells"
            referencedColumns: ["id"]
          },
        ]
      }
      cells: {
        Row: {
          address: string | null
          church_id: string
          created_at: string
          day_of_week: string | null
          id: string
          is_active: boolean
          leader_id: string | null
          name: string
          network: string | null
          supervisor_id: string | null
          time: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          church_id: string
          created_at?: string
          day_of_week?: string | null
          id?: string
          is_active?: boolean
          leader_id?: string | null
          name: string
          network?: string | null
          supervisor_id?: string | null
          time?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          church_id?: string
          created_at?: string
          day_of_week?: string | null
          id?: string
          is_active?: boolean
          leader_id?: string | null
          name?: string
          network?: string | null
          supervisor_id?: string | null
          time?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cells_church_id_fkey"
            columns: ["church_id"]
            isOneToOne: false
            referencedRelation: "churches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cells_leader_id_fkey"
            columns: ["leader_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cells_supervisor_id_fkey"
            columns: ["supervisor_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      churches: {
        Row: {
          address: string | null
          city: string | null
          cnpj: string | null
          created_at: string
          email: string | null
          id: string
          logo_url: string | null
          max_members: number | null
          name: string
          phone: string | null
          plan: string
          state: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          city?: string | null
          cnpj?: string | null
          created_at?: string
          email?: string | null
          id?: string
          logo_url?: string | null
          max_members?: number | null
          name: string
          phone?: string | null
          plan?: string
          state?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          city?: string | null
          cnpj?: string | null
          created_at?: string
          email?: string | null
          id?: string
          logo_url?: string | null
          max_members?: number | null
          name?: string
          phone?: string | null
          plan?: string
          state?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      course_students: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          course_id: string
          enrolled_at: string
          id: string
          member_id: string
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          course_id: string
          enrolled_at?: string
          id?: string
          member_id: string
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          course_id?: string
          enrolled_at?: string
          id?: string
          member_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_students_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_students_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          church_id: string
          created_at: string
          description: string | null
          end_date: string | null
          id: string
          is_active: boolean
          name: string
          start_date: string | null
          teacher_id: string | null
          track: string | null
        }
        Insert: {
          church_id: string
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean
          name: string
          start_date?: string | null
          teacher_id?: string | null
          track?: string | null
        }
        Update: {
          church_id?: string
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean
          name?: string
          start_date?: string | null
          teacher_id?: string | null
          track?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "courses_church_id_fkey"
            columns: ["church_id"]
            isOneToOne: false
            referencedRelation: "churches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "courses_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      event_registrations: {
        Row: {
          confirmed: boolean | null
          event_id: string
          id: string
          member_id: string
          registered_at: string
        }
        Insert: {
          confirmed?: boolean | null
          event_id: string
          id?: string
          member_id: string
          registered_at?: string
        }
        Update: {
          confirmed?: boolean | null
          event_id?: string
          id?: string
          member_id?: string
          registered_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_registrations_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          church_id: string
          created_at: string
          created_by: string | null
          description: string | null
          event_date: string
          event_time: string | null
          id: string
          is_public: boolean
          location: string | null
          max_participants: number | null
          title: string
        }
        Insert: {
          church_id: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          event_date: string
          event_time?: string | null
          id?: string
          is_public?: boolean
          location?: string | null
          max_participants?: number | null
          title: string
        }
        Update: {
          church_id?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          event_date?: string
          event_time?: string | null
          id?: string
          is_public?: boolean
          location?: string | null
          max_participants?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_church_id_fkey"
            columns: ["church_id"]
            isOneToOne: false
            referencedRelation: "churches"
            referencedColumns: ["id"]
          },
        ]
      }
      financial_categories: {
        Row: {
          church_id: string
          created_at: string
          id: string
          is_active: boolean
          name: string
          type: string
        }
        Insert: {
          church_id: string
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          type: string
        }
        Update: {
          church_id?: string
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "financial_categories_church_id_fkey"
            columns: ["church_id"]
            isOneToOne: false
            referencedRelation: "churches"
            referencedColumns: ["id"]
          },
        ]
      }
      financial_transactions: {
        Row: {
          amount: number
          category_id: string | null
          church_id: string
          created_at: string
          created_by: string | null
          description: string
          id: string
          member_id: string | null
          notes: string | null
          payment_method: string | null
          reference_number: string | null
          transaction_date: string
          type: string
        }
        Insert: {
          amount: number
          category_id?: string | null
          church_id: string
          created_at?: string
          created_by?: string | null
          description: string
          id?: string
          member_id?: string | null
          notes?: string | null
          payment_method?: string | null
          reference_number?: string | null
          transaction_date: string
          type: string
        }
        Update: {
          amount?: number
          category_id?: string | null
          church_id?: string
          created_at?: string
          created_by?: string | null
          description?: string
          id?: string
          member_id?: string | null
          notes?: string | null
          payment_method?: string | null
          reference_number?: string | null
          transaction_date?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "financial_transactions_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "financial_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "financial_transactions_church_id_fkey"
            columns: ["church_id"]
            isOneToOne: false
            referencedRelation: "churches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "financial_transactions_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      members: {
        Row: {
          address: string | null
          baptism_date: string | null
          baptism_location: string | null
          birth_date: string | null
          church_id: string
          city: string | null
          conversion_date: string | null
          created_at: string
          email: string | null
          full_name: string
          gender: string | null
          id: string
          is_active: boolean
          marital_status: string | null
          notes: string | null
          phone: string | null
          photo_url: string | null
          spiritual_status: Database["public"]["Enums"]["spiritual_status"]
          state: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          baptism_date?: string | null
          baptism_location?: string | null
          birth_date?: string | null
          church_id: string
          city?: string | null
          conversion_date?: string | null
          created_at?: string
          email?: string | null
          full_name: string
          gender?: string | null
          id?: string
          is_active?: boolean
          marital_status?: string | null
          notes?: string | null
          phone?: string | null
          photo_url?: string | null
          spiritual_status?: Database["public"]["Enums"]["spiritual_status"]
          state?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          baptism_date?: string | null
          baptism_location?: string | null
          birth_date?: string | null
          church_id?: string
          city?: string | null
          conversion_date?: string | null
          created_at?: string
          email?: string | null
          full_name?: string
          gender?: string | null
          id?: string
          is_active?: boolean
          marital_status?: string | null
          notes?: string | null
          phone?: string | null
          photo_url?: string | null
          spiritual_status?: Database["public"]["Enums"]["spiritual_status"]
          state?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "members_church_id_fkey"
            columns: ["church_id"]
            isOneToOne: false
            referencedRelation: "churches"
            referencedColumns: ["id"]
          },
        ]
      }
      ministries: {
        Row: {
          church_id: string
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          leader_id: string | null
          name: string
        }
        Insert: {
          church_id: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          leader_id?: string | null
          name: string
        }
        Update: {
          church_id?: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          leader_id?: string | null
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "ministries_church_id_fkey"
            columns: ["church_id"]
            isOneToOne: false
            referencedRelation: "churches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ministries_leader_id_fkey"
            columns: ["leader_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      ministry_schedules: {
        Row: {
          created_at: string
          event_date: string
          event_name: string
          id: string
          ministry_id: string
          notes: string | null
        }
        Insert: {
          created_at?: string
          event_date: string
          event_name: string
          id?: string
          ministry_id: string
          notes?: string | null
        }
        Update: {
          created_at?: string
          event_date?: string
          event_name?: string
          id?: string
          ministry_id?: string
          notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ministry_schedules_ministry_id_fkey"
            columns: ["ministry_id"]
            isOneToOne: false
            referencedRelation: "ministries"
            referencedColumns: ["id"]
          },
        ]
      }
      ministry_volunteers: {
        Row: {
          id: string
          joined_at: string
          member_id: string
          ministry_id: string
        }
        Insert: {
          id?: string
          joined_at?: string
          member_id: string
          ministry_id: string
        }
        Update: {
          id?: string
          joined_at?: string
          member_id?: string
          ministry_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ministry_volunteers_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ministry_volunteers_ministry_id_fkey"
            columns: ["ministry_id"]
            isOneToOne: false
            referencedRelation: "ministries"
            referencedColumns: ["id"]
          },
        ]
      }
      prayer_requests: {
        Row: {
          church_id: string
          created_at: string
          id: string
          is_answered: boolean
          is_public: boolean
          member_id: string | null
          request: string
          user_id: string | null
        }
        Insert: {
          church_id: string
          created_at?: string
          id?: string
          is_answered?: boolean
          is_public?: boolean
          member_id?: string | null
          request: string
          user_id?: string | null
        }
        Update: {
          church_id?: string
          created_at?: string
          id?: string
          is_answered?: boolean
          is_public?: boolean
          member_id?: string | null
          request?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "prayer_requests_church_id_fkey"
            columns: ["church_id"]
            isOneToOne: false
            referencedRelation: "churches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prayer_requests_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          church_id: string | null
          created_at: string
          email: string
          full_name: string
          id: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          church_id?: string | null
          created_at?: string
          email: string
          full_name: string
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          church_id?: string | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_church_id_fkey"
            columns: ["church_id"]
            isOneToOne: false
            referencedRelation: "churches"
            referencedColumns: ["id"]
          },
        ]
      }
      schedule_volunteers: {
        Row: {
          confirmed: boolean | null
          id: string
          member_id: string
          role: string | null
          schedule_id: string
        }
        Insert: {
          confirmed?: boolean | null
          id?: string
          member_id: string
          role?: string | null
          schedule_id: string
        }
        Update: {
          confirmed?: boolean | null
          id?: string
          member_id?: string
          role?: string | null
          schedule_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "schedule_volunteers_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schedule_volunteers_schedule_id_fkey"
            columns: ["schedule_id"]
            isOneToOne: false
            referencedRelation: "ministry_schedules"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          church_id: string
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          church_id: string
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          church_id?: string
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_church_id_fkey"
            columns: ["church_id"]
            isOneToOne: false
            referencedRelation: "churches"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_church_id: { Args: { _user_id: string }; Returns: string }
      has_role: {
        Args: {
          _church_id: string
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_church_admin: {
        Args: { _church_id: string; _user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role:
        | "pastor"
        | "tesoureiro"
        | "secretario"
        | "lider_celula"
        | "lider_ministerio"
        | "consolidacao"
        | "membro"
      spiritual_status:
        | "visitante"
        | "novo_convertido"
        | "membro"
        | "lider"
        | "discipulador"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "pastor",
        "tesoureiro",
        "secretario",
        "lider_celula",
        "lider_ministerio",
        "consolidacao",
        "membro",
      ],
      spiritual_status: [
        "visitante",
        "novo_convertido",
        "membro",
        "lider",
        "discipulador",
      ],
    },
  },
} as const
