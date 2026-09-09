import { useCallback, useEffect, useState } from "react";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

export const DEFAULT_CATEGORIES = [
  "Reels",
  "Real Estate",
  "Motion Graphics",
  "Wedding",
  "Documentary",
  "Commercial",
];

export function usePortfolio({ includeHidden = false } = {}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    if (!supabase) {
      setItems([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      let query = supabase
        .from("projects")
        .select("*")
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: false });

      if (!includeHidden) {
        query = query.eq("published", true);
      }

      const { data, error: queryError } = await query;

      if (queryError) {
        console.error("Portfolio fetch error:", queryError);
        setError(queryError.message);
        return;
      }

      setItems(data || []);
      setError("");
    } catch (err) {
      console.error("Portfolio error:", err);
      setError(err?.message || "Unable to load portfolio.");
    } finally {
      setLoading(false);
    }
  }, [includeHidden]);

  useEffect(() => {
    if (!supabase) {
      refresh();
      return;
    }

    refresh();

    const channelName = `portfolio-changes-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}`;

    const channel = supabase
      .channel(channelName)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "projects",
        },
        () => {
          refresh();
        }
      )
      .subscribe((status) => {
        if (status === "CHANNEL_ERROR") {
          console.error("Portfolio realtime channel error");
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refresh]);

  return {
    items,
    loading,
    error,
    refresh,
  };
}