"use client";
import Image from "next/image";

export default function Carousel() {
  return (
    <wm-carousel single={1200} dots label="Informationsdatenbank">
      <wm-stage class="current first active">
        <div slot="content">
          <h1>Informationsdatenbank</h1>
          <p>des Wiener Landtages und Gemeinderates</p>
        </div>
        <Image
          src="/wahlkarte-stage-1.jpg"
          slot="media"
          alt=""
          width={1200}
          height={450}
          title="copyright: Christian Jobst/PID"
        />
      </wm-stage>
      <wm-stage class="last">
        <div slot="content">
          <h1>Informationsdatenbank</h1>
          <p>des Wiener Landtages und Gemeinderates</p>
        </div>
        <Image
          src="/wahlkarte-stage-2.jpg"
          slot="media"
          alt=""
          width={1200}
          height={450}
          title="copyright: Wiener Stadt- und Landesarchiv"
        />
      </wm-stage>
    </wm-carousel>
  );
}
