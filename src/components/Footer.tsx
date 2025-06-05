"use client";

export default function Footer() {
  return (
    <footer role="contentinfo">
      <wm-copyright></wm-copyright>
      <wm-list
        type="horizontal"
        separator="pipe"
        clean
        alignment="center"
        gap="s"
      >
        <ul>
          <li>
            <a
              href="https://www.wien.gv.at/info/impressum.html"
              className="wm-h-link-clean"
            >
              <strong>Impressum</strong>
            </a>
          </li>
          <li>
            <a
              href="https://www.wien.gv.at/info/datenschutz/index.html"
              className="wm-h-link-clean"
            >
              <strong>Datenschutz</strong>
            </a>
          </li>
          <li>
            <a
              href="https://www.wien.gv.at/info/barrierefreiheit.html"
              className="wm-h-link-clean"
            >
              <strong>Barrierefreiheit</strong>
            </a>
          </li>
          <li>
            <a href="https://www.wien.gv.at/recht/" className="wm-h-link-clean">
              <strong>Medienservice</strong>
            </a>
          </li>
          <li>
            <a href="https://presse.wien.gv.at/" className="wm-h-link-clean">
              <strong>Öffentliche Verlautbarungen</strong>
            </a>
          </li>
        </ul>
      </wm-list>
      <p>
        <small>© Stadt Wien, Rathaus, A-1010 Wien</small>
      </p>
    </footer>
  );
}
