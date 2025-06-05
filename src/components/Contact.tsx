"use client";

export default function Contact() {
  return (
    <wm-section highlight="nebelgrau" contentsize="text" className="border-0!">
      <div className="max-w-5xl! mx-auto! px-4!">
        <wm-grid size="l" gap="m">
          <wm-card>
            <h2 slot="heading">Kontakt</h2>
            <div slot="content">
              <p>
                <strong>
                  Dr<sup>in</sup> Barbara Steininger
                </strong>
                <br />
                Leiterin Landtags- und Gemeinderatsdokumentation
              </p>
              <p>
                <a href="https://www.wien.gv.at/formularserver4/user/formular.aspx?pid=243b95371900481e9ed1335ccec6a26a&amp;pn=B2d555436411c4af58b94491f3869a470&amp;lang=de&amp;datamode=urlenc&amp;data=aoFUE49Wg6ChNhJk34BYdAfma38Q%2b6s6srp7CE76czhipP1tB7tmJnJZTw5uRtJFyhHts%2fHwhJrb2cvqNt1vDqe6CgreW9uyaOnT8Jp4NYsoCCPN4XKbcW1d2Nka2Z95Oo5rj2orZBDHik82xPBlL%2bxFGohIz0pqdE1XiKlr7S0a0LLncr9On%2f%2fULgD9GMgo">
                  Kontaktformular
                </a>
                <br /> E-Mail:
                <a
                  href="mailto:barbara.steininger@wien.gv.at"
                  className="whitespace-nowrap"
                >
                  barbara.steininger@wien.gv.at
                </a>
                <br /> Telefon:
                <a href="tel:+431400084851">01-4000-84851</a>
              </p>
            </div>
          </wm-card>
        </wm-grid>
      </div>
    </wm-section>
  );
}
