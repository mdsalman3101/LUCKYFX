import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export function useSiteSettings() {
  const [settings, setSettings] = useState({ instagram_url: "" });
  const [loading, setLoading] = useState(Boolean(supabase));
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const { data, error: queryError } = await supabase
      .from("site_settings")
      .select("instagram_url")
      .eq("id", "site")
      .maybeSingle();

    if (queryError) setError(queryError.message);
    else {
      setSettings({ instagram_url: data?.instagram_url || "" });
      setError("");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { settings, loading, error, refresh };
}
