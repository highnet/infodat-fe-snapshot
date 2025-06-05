"use client";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useEffect } from "react";
import AnimatedNotification from "./AnimatedNotification";

const searchSchema = z.object({
  searchTerm: z.string().min(1, "Bitte geben Sie einen Suchbegriff ein"),
  searchType: z.enum(["volltext", "sitzung", "protokoll"]),
});
type SearchFormValues = z.infer<typeof searchSchema>;

export default function SearchForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      searchTerm: "",
      searchType: "volltext",
    },
  });

  const onSubmit = (data: SearchFormValues) => {
    console.log("Form submitted with values:");
    console.log("Search term:", data.searchTerm);
    console.log("Search type:", data.searchType);
    console.log("Form data object:", data);
  };

  const inputRef = useRef<HTMLInputElement | null>(null);
  const latestOnChange = useRef<((value: string) => void) | undefined>(
    undefined
  );

  useEffect(() => {
    const node = inputRef.current;
    if (!node) return;
    const handler = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (latestOnChange.current) latestOnChange.current(target.value);
    };
    node.addEventListener("input", handler);
    return () => node.removeEventListener("input", handler);
  }, []);

  return (
    <wm-section
      highlight="nebelgrau"
      className="border-0! w-[100vw]! mr-[calc(-50vw+50%)]! ml-[calc(-50vw+50%)]! px-4!"
    >
      <div className="max-w-5xl! mx-auto!">
        <wm-anchor>
          <h2>Suche</h2>
        </wm-anchor>
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <div className="flex gap-4 items-center">
                <Controller
                  name="searchTerm"
                  control={control}
                  render={({ field }) => {
                    latestOnChange.current = field.onChange;
                    return (
                      <wm-input
                        ref={inputRef}
                        className="w-full [--wm-theme-input-background:var(--wm-color-weiss)]"
                        placeholder="Bitte geben Sie einen Suchbegriff ein"
                        type="text"
                        value={field.value}
                      ></wm-input>
                    );
                  }}
                />
                <wm-button>
                  <button type="submit">Suchen</button>
                </wm-button>
              </div>
              <AnimatedNotification isVisible={!!errors.searchTerm}>
                <wm-notification type="error" className="text-xs">
                  {errors.searchTerm?.message}
                </wm-notification>
              </AnimatedNotification>
              <div>
                <div>
                  <Controller
                    name="searchType"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="radio"
                        name={field.name}
                        value="volltext"
                        id="infodat_option1"
                        checked={field.value === "volltext"}
                        onChange={() => field.onChange("volltext")}
                      />
                    )}
                  />
                  <label htmlFor="infodat_option1">
                    Volltextsuche in Betreff und Beschreibung aller Vorgänge des
                    Landtages und Gemeinderates
                  </label>
                </div>
                <div>
                  <Controller
                    name="searchType"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="radio"
                        name={field.name}
                        value="sitzung"
                        id="infodat_option2"
                        checked={field.value === "sitzung"}
                        onChange={() => field.onChange("sitzung")}
                      />
                    )}
                  />
                  <label htmlFor="infodat_option2">
                    in Sitzungs- und wörtlichen Protokollen des Gemeinderates
                    und Landtages (Volltext)
                  </label>
                </div>
                <div>
                  <Controller
                    name="searchType"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="radio"
                        name={field.name}
                        value="protokoll"
                        id="infodat_option3"
                        checked={field.value === "protokoll"}
                        onChange={() => field.onChange("protokoll")}
                      />
                    )}
                  />
                  <label htmlFor="infodat_option3">
                    in Protokollen des Stadtsenats und der Landesregierung
                    (Volltext)
                  </label>
                </div>
              </div>
            </div>
            <wm-button kind="secondary">
              <a href="/advancedSearch" className="wm-e-button">
                <wm-icon iconid="search"></wm-icon>
                Erweiterte Suche
              </a>
            </wm-button>
          </div>
        </form>
      </div>
    </wm-section>
  );
}
