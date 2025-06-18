export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          password_hash: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
          password_hash: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          password_hash?: string
        }
        Relationships: []
      }
      booking_notes: {
        Row: {
          booking_id: string | null
          created_at: string | null
          created_by: string | null
          id: string
          note: string
          note_type: string | null
        }
        Insert: {
          booking_id?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          note: string
          note_type?: string | null
        }
        Update: {
          booking_id?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          note?: string
          note_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "booking_notes_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      booking_payments: {
        Row: {
          amount: number
          booking_id: string | null
          created_at: string | null
          id: string
          notes: string | null
          payment_date: string | null
          payment_method: string | null
          reference_number: string | null
        }
        Insert: {
          amount: number
          booking_id?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          payment_date?: string | null
          payment_method?: string | null
          reference_number?: string | null
        }
        Update: {
          amount?: number
          booking_id?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          payment_date?: string | null
          payment_method?: string | null
          reference_number?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "booking_payments_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          booking_date: string
          booking_source: string | null
          customer_name: string
          dietary_requirements: string | null
          discount_amount: number | null
          email: string
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          id: string
          internal_notes: string | null
          last_modified_at: string | null
          last_modified_by: string | null
          mobile_number: string
          notes: string | null
          number_of_people: number
          payment_amount: number | null
          payment_status: string | null
          special_requests: string | null
          status: string
          tour_id: string
        }
        Insert: {
          booking_date?: string
          booking_source?: string | null
          customer_name: string
          dietary_requirements?: string | null
          discount_amount?: number | null
          email: string
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          id?: string
          internal_notes?: string | null
          last_modified_at?: string | null
          last_modified_by?: string | null
          mobile_number: string
          notes?: string | null
          number_of_people?: number
          payment_amount?: number | null
          payment_status?: string | null
          special_requests?: string | null
          status?: string
          tour_id: string
        }
        Update: {
          booking_date?: string
          booking_source?: string | null
          customer_name?: string
          dietary_requirements?: string | null
          discount_amount?: number | null
          email?: string
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          id?: string
          internal_notes?: string | null
          last_modified_at?: string | null
          last_modified_by?: string | null
          mobile_number?: string
          notes?: string | null
          number_of_people?: number
          payment_amount?: number | null
          payment_status?: string | null
          special_requests?: string | null
          status?: string
          tour_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_tour_id_fkey"
            columns: ["tour_id"]
            isOneToOne: false
            referencedRelation: "tours"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter_subscriptions: {
        Row: {
          created_at: string
          email: string
          id: string
          is_active: boolean
          subscribed_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_active?: boolean
          subscribed_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_active?: boolean
          subscribed_at?: string
        }
        Relationships: []
      }
      tours: {
        Row: {
          accommodation: Json | null
          cost: number
          cost_details: string | null
          created_at: string
          departure_date: string
          description: string | null
          destinations: string
          duration: string
          exclusions: Json | null
          gallery: Json | null
          highlights: Json | null
          id: string
          image_url: string | null
          inclusions: Json | null
          isDraft: boolean | null
          itinerary: Json | null
          meals: Json | null
          name: string
          next_departure: string | null
          pilgrims_count: number | null
          pricing: Json | null
          rating: number | null
          slug: string | null
          spiritual_arrangements: Json | null
          transport: Json | null
          transport_mode: string
          updated_at: string
        }
        Insert: {
          accommodation?: Json | null
          cost: number
          cost_details?: string | null
          created_at?: string
          departure_date: string
          description?: string | null
          destinations: string
          duration: string
          exclusions?: Json | null
          gallery?: Json | null
          highlights?: Json | null
          id?: string
          image_url?: string | null
          inclusions?: Json | null
          isDraft?: boolean | null
          itinerary?: Json | null
          meals?: Json | null
          name: string
          next_departure?: string | null
          pilgrims_count?: number | null
          pricing?: Json | null
          rating?: number | null
          slug?: string | null
          spiritual_arrangements?: Json | null
          transport?: Json | null
          transport_mode: string
          updated_at?: string
        }
        Update: {
          accommodation?: Json | null
          cost?: number
          cost_details?: string | null
          created_at?: string
          departure_date?: string
          description?: string | null
          destinations?: string
          duration?: string
          exclusions?: Json | null
          gallery?: Json | null
          highlights?: Json | null
          id?: string
          image_url?: string | null
          inclusions?: Json | null
          isDraft?: boolean | null
          itinerary?: Json | null
          meals?: Json | null
          name?: string
          next_departure?: string | null
          pilgrims_count?: number | null
          pricing?: Json | null
          rating?: number | null
          slug?: string | null
          spiritual_arrangements?: Json | null
          transport?: Json | null
          transport_mode?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
