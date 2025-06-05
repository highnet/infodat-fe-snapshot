"use client";

export default function News() {
  return (
    <wm-section contentsize="text">
      <h2>Aktuelles</h2>
      <wm-card>
        <div slot="content">
          <h3>Gemeinderatssitzungen</h3>
          <wm-quicklinks cols={1}>
            <ul>
              <li>
                <wm-cta full clean>
                  <a href="#">
                    57. Sitzung des Gemeinderates vom 20.09.2024 der 21.
                    Wahlperiode
                  </a>
                </wm-cta>
              </li>
              <li>
                <wm-cta full clean>
                  <a href="#">
                    56. Sitzung des Gemeinderates vom 18.09.2024 der 21.
                    Wahlperiode
                  </a>
                </wm-cta>
              </li>
            </ul>
          </wm-quicklinks>
        </div>
        <div slot="content">
          <h3>Landtagssitzungen</h3>
          <wm-quicklinks cols={1}>
            <ul>
              <li>
                <wm-cta full clean>
                  <a href="#">
                    20. Sitzung des Landtages vom 10.09.2024 der 21. Wahlperiode
                  </a>
                </wm-cta>
              </li>
              <li>
                <wm-cta full clean>
                  <a href="#">
                    19. Sitzung des Landtages vom 08.09.2024 der 21. Wahlperiode
                  </a>
                </wm-cta>
              </li>
            </ul>
          </wm-quicklinks>
        </div>
        <div slot="postcontent">
          <div className="flex justify-between gap-4">
            <wm-tag open="false">
              <a href="#" className="block-link-unlink whitespace-nowrap!">
                Aktueller Sitzplan
              </a>
            </wm-tag>
            <wm-tag open="false">
              <a
                href="https://www.wien.gv.at/politik/gemeinderat/presse/termine.html"
                className="block-link-unlink whitespace-nowrap!"
              >
                Kommende Sitzungstermine
              </a>
            </wm-tag>
            <wm-tag open="false">
              <a
                href="https://www.wien.gv.at/video/live/grlt/index.html"
                className="block-link-unlink  whitespace-nowrap!"
              >
                Live-Übertragung
              </a>
            </wm-tag>
          </div>
        </div>
      </wm-card>
    </wm-section>
  );
}
