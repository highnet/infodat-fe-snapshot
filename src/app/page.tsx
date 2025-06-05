"use client";

import Carousel from "@/components/Carousel";
import News from "@/components/News";
import SearchForm from "@/components/SearchForm";
import Info from "@/components/Info";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between">
      <div className="z-10">
        <Carousel />
        <SearchForm />
        <News />
        <Info />
      </div>
    </main>
  );
}
