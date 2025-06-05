"use client";

import AdvancedSearchForm from "@/components/AdvancedSearchForm";

export default function AdvancedSearch() {
  return (
    <main className="flex min-h-screen flex-col justify-between">
      <div className="z-10">
        <h1>Erweitere Suche</h1>
        <p>Informationsdatenbank des Wiener Landtages und Gemeinderates</p>
        <AdvancedSearchForm />
      </div>
    </main>
  );
}
