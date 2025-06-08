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
      bookings: {
        Row: {
          booking_date: string
          customer_name: string
          email: string
          id: string
          mobile_number: string
          notes: string | null
          number_of_people: number
          status: string
          tour_id: string
        }
        Insert: {
          booking_date?: string
          customer_name: string
          email: string
          id?: string
          mobile_number: string
          notes?: string | null
          number_of_people?: number
          status?: string
          tour_id: string
        }
        Update: {
          booking_date?: string
          customer_name?: string
          email?: string
          id?: string
          mobile_number?: string
          notes?: string | null
          number_of_people?: number
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
      tours: {
        Row: {
          accommodation: Json | null
          cost: number
          cost_details: string | null
          created_at: string
          departure_date: string
          description: string | null
          destinations: string
          draft: boolean | null
          duration: string
          exclusions: Json | null
          highlights: Json | null
          id: string
          image_url: string | null
          inclusions: Json | null
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
          draft?: boolean | null
          duration: string
          exclusions?: Json | null
          highlights?: Json | null
          id?: string
          image_url?: string | null
          inclusions?: Json | null
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
          draft?: boolean | null
          duration?: string
          exclusions?: Json | null
          highlights?: Json | null
          id?: string
          image_url?: string | null
          inclusions?: Json | null
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
