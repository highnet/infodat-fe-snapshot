"use client";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useEffect, useState } from "react";
import AnimatedNotification from "./AnimatedNotification";

const advancedSearchSchema = z.object({
  searchTerm: z.string().min(1, "Bitte geben Sie einen Suchbegriff ein"),
  wahlperiode: z.string().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  year: z.number().min(1983).max(2024).optional(),
  gremium: z.array(z.string()),
  landesgesetzblatt: z.string().optional(),
  aktenzahl: z.string().optional(),
  sitzungsnummer: z.string().optional(),
  bezirk: z.string().optional(),
  vorgangTyp: z.string().optional(),
  erledigung: z.string().optional(),
  abstimmungsverhalten: z.enum(["zustimmung", "ablehnung"]).optional(),
  klub: z.string().optional(),
  person: z.string().optional(),
  fraktion: z.string().optional(),
  funktion: z.string().optional(),
  rolle: z.string().optional(),
  schlagwoerter: z.array(z.string()),
  themen: z.array(z.string()),
});

type AdvancedSearchFormValues = z.infer<typeof advancedSearchSchema>;

export default function AdvancedSearchForm() {
  const [helpVisible, setHelpVisible] = useState<{ [key: string]: boolean }>(
    {}
  );

  const toggleHelp = (fieldName: string) => {
    setHelpVisible((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AdvancedSearchFormValues>({
    resolver: zodResolver(advancedSearchSchema),
    defaultValues: {
      searchTerm: "",
      wahlperiode: "",
      dateFrom: "",
      dateTo: "",
      gremium: ["1", "2"],
      landesgesetzblatt: "",
      aktenzahl: "",
      sitzungsnummer: "",
      bezirk: "",
      vorgangTyp: "",
      erledigung: "",
      klub: "",
      person: "",
      fraktion: "",
      funktion: "",
      rolle: "",
      schlagwoerter: [],
      themen: [],
    },
  });
  const inputRefs = useRef<{
    [key: string]: HTMLInputElement | HTMLSelectElement | null;
  }>({});
  const latestOnChange = useRef<{
    [key: string]: ((value: string) => void) | undefined;
  }>({});
  useEffect(() => {
    Object.entries(inputRefs.current).forEach(([key, node]) => {
      if (!node) return;
      const handler = (e: Event) => {
        const target = e.target as HTMLInputElement | HTMLSelectElement;
        const onChange = latestOnChange.current[key];
        if (onChange) onChange(target.value);
      };
      node.addEventListener("input", handler);
      return () => node.removeEventListener("input", handler);
    });
  }, []);

  const onSubmit = (data: AdvancedSearchFormValues) => {
    console.log("Advanced search form submitted with values:", data);
  };

  return (
    <wm-section
      highlight="nebelgrau"
      contentsize="full"
      className="border-0! w-[100vw]! mr-[calc(-50vw+50%)]! ml-[calc(-50vw+50%)]! px-4! mb-4!"
    >
      <div className="max-w-5xl! mx-auto!">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="bg-white p-4 w-full flex-13">
              <div className="mb-4">
                <div className="relative">
                  <label htmlFor="searchTerm">Suchbegriff</label>
                  <wm-icon
                    iconid="info"
                    className="z-100 absolute top-4 -right-2 cursor-pointer bg-[#75CDE3] border-2 border-[#75CDE3] rounded-full hover:bg-white focus:bg-white"
                    width={28}
                    tabIndex={0}
                    onClick={() => toggleHelp("searchTerm")}
                  ></wm-icon>
                </div>
                <Controller
                  name="searchTerm"
                  control={control}
                  render={({ field }) => {
                    latestOnChange.current["searchTerm"] = field.onChange;
                    return (
                      <wm-input
                        ref={(el: HTMLInputElement | null) => {
                          inputRefs.current["searchTerm"] = el;
                        }}
                        id="searchTerm"
                        type="text"
                        value={field.value || ""}
                      />
                    );
                  }}
                />
                <AnimatedNotification isVisible={helpVisible.searchTerm}>
                  <wm-notification type="info" className="text-xs">
                    Gefunden werden alle Vorgänge, deren Betreff oder
                    Beschreibung den eingegebenen Text beinhaltet.
                    Groß-Kleinschreibung ist dabei unerheblich.
                  </wm-notification>
                </AnimatedNotification>
                <AnimatedNotification isVisible={!!errors.searchTerm}>
                  <wm-notification type="error" className="text-xs">
                    {errors.searchTerm?.message}
                  </wm-notification>
                </AnimatedNotification>
              </div>
              <div>
                <div className="relative">
                  <label htmlFor="wahlperiode">Wahlperiode</label>
                  <wm-icon
                    iconid="info"
                    className="z-100 absolute top-4 -right-2 cursor-pointer bg-[#75CDE3] border-2 border-[#75CDE3] rounded-full hover:bg-white focus:bg-white"
                    width={28}
                    tabIndex={0}
                    onClick={() => toggleHelp("wahlperiode")}
                  ></wm-icon>
                </div>
                <Controller
                  name="wahlperiode"
                  control={control}
                  render={({ field }) => {
                    latestOnChange.current["wahlperiode"] = field.onChange;
                    return (
                      <wm-select
                        ref={(el: HTMLSelectElement | null) => {
                          inputRefs.current["wahlperiode"] = el;
                        }}
                        id="wahlperiode"
                        size="6"
                        value={field.value || ""}
                      >
                        <option value="">keine bestimmte Wahlperiode</option>
                        <option value="1">
                          21. Periode (24.11.2020 - derzeit)
                        </option>
                        <option value="2">
                          20. Periode (24.11.2015 - 24.11.2020) (vollständig)
                        </option>
                        <option value="3">
                          19. Periode (25.11.2010 - 24.11.2015) (vollständig)
                        </option>
                        <option value="4">
                          18. Periode (18.11.2005 - 25.11.2010) (vollständig)
                        </option>
                        <option value="5">
                          17. Periode (27.04.2001 - 18.11.2005) (vollständig)
                        </option>
                        <option value="6">
                          16. Periode (29.11.1996 - 27.04.2001) (vollständig)
                        </option>
                        <option value="7">
                          15. Periode (09.12.1991 - 29.11.1996) (vollständig)
                        </option>
                        <option value="8">
                          14. Periode (09.11.1987 - 09.12.1991) (vollständig)
                        </option>
                        <option value="9">
                          13. Periode (27.05.1983 - 09.12.1987) (in Bearbeitung)
                        </option>
                      </wm-select>
                    );
                  }}
                />
                <AnimatedNotification isVisible={helpVisible.wahlperiode}>
                  <wm-notification type="info" className="text-xs">
                    Eine Wahlperiode ist die Zeitspanne zwischen zwei
                    aufeinanderfolgenden Gemeinderatswahlen.
                  </wm-notification>
                </AnimatedNotification>
              </div>
              <div className="mt-4!">
                <fieldset className="no-border">
                  <legend>zeitliche Eingrenzung</legend>
                  <div className="flex flex-col gap-4">
                    <div>
                      <label htmlFor="dateFrom">von</label>
                      <Controller
                        name="dateFrom"
                        control={control}
                        render={({ field }) => {
                          latestOnChange.current["dateFrom"] = field.onChange;
                          return (
                            <wm-input
                              ref={(el: HTMLInputElement | null) => {
                                inputRefs.current["dateFrom"] = el;
                              }}
                              id="dateFrom"
                              type="date"
                              value={field.value || ""}
                            />
                          );
                        }}
                      />
                    </div>
                    <div className="flex gap-4 mt-4!">
                      <div className="flex-[1.55]">
                        <label htmlFor="dateTo">bis</label>
                        <Controller
                          name="dateTo"
                          control={control}
                          render={({ field }) => {
                            latestOnChange.current["dateTo"] = field.onChange;
                            return (
                              <wm-input
                                ref={(el: HTMLInputElement | null) => {
                                  inputRefs.current["dateTo"] = el;
                                }}
                                id="dateTo"
                                type="date"
                                value={field.value || ""}
                              />
                            );
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <label htmlFor="jahr">oder Jahr</label>
                        <Controller
                          name="year"
                          control={control}
                          render={({ field }) => (
                            <wm-input
                              id="jahr"
                              type="number"
                              value={field.value?.toString() || ""}
                              ref={(el: HTMLInputElement | null) => {
                                inputRefs.current["year"] = el;
                              }}
                            />
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>

            <div className="bg-white p-4 w-full flex-7">
              <div>
                <fieldset>
                  <legend>Gremium</legend>
                  <div className="flex gap-4">
                    <div>
                      <Controller
                        name="gremium"
                        control={control}
                        render={({ field }) => (
                          <input
                            id="gemeinderat"
                            type="checkbox"
                            value="1"
                            checked={field.value.includes("1")}
                            onChange={(e) => {
                              if (e.target.checked) {
                                field.onChange([...field.value, "1"]);
                              } else {
                                field.onChange(
                                  field.value.filter((v) => v !== "1")
                                );
                              }
                            }}
                          />
                        )}
                      />
                      <label htmlFor="gemeinderat">Gemeinderat</label>
                    </div>
                    <div>
                      <Controller
                        name="gremium"
                        control={control}
                        render={({ field }) => (
                          <input
                            id="landtag"
                            type="checkbox"
                            value="2"
                            checked={field.value.includes("2")}
                            onChange={(e) => {
                              if (e.target.checked) {
                                field.onChange([...field.value, "2"]);
                              } else {
                                field.onChange(
                                  field.value.filter((v) => v !== "2")
                                );
                              }
                            }}
                          />
                        )}
                      />
                      <label htmlFor="landtag">Landtag</label>
                    </div>
                  </div>
                </fieldset>
                <div className="mt-4!">
                  <div className="relative">
                    <label htmlFor="landesgesetzblatt">Landesgesetzblatt</label>
                    <wm-icon
                      iconid="info"
                      className="z-100 absolute top-4 -right-2 cursor-pointer bg-[#75CDE3] border-2 border-[#75CDE3] rounded-full hover:bg-white focus:bg-white"
                      width={28}
                      tabIndex={0}
                      onClick={() => toggleHelp("landesgesetzblatt")}
                    ></wm-icon>
                  </div>
                  <Controller
                    name="landesgesetzblatt"
                    control={control}
                    render={({ field }) => {
                      latestOnChange.current["landesgesetzblatt"] =
                        field.onChange;
                      return (
                        <wm-input
                          ref={(el: HTMLInputElement | null) => {
                            inputRefs.current["landesgesetzblatt"] = el;
                          }}
                          id="landesgesetzblatt"
                          placeholder="nn/JJJJ"
                          type="text"
                          value={field.value || ""}
                        />
                      );
                    }}
                  />
                  <AnimatedNotification
                    isVisible={helpVisible.landesgesetzblatt}
                  >
                    <wm-notification type="info" className="text-xs">
                      Gefunden werden alle Vorgänge, deren Betreff oder
                      Beschreibung den eingegebenen Text beinhaltet. Der Text
                      ist im Format nnn/jjjj einzugeben.
                    </wm-notification>
                  </AnimatedNotification>
                </div>
                <div className="mt-4!">
                  <div className="relative">
                    <label htmlFor="aktenzahl">Aktenzahl</label>
                    <wm-icon
                      iconid="info"
                      className="z-100 absolute top-4 -right-2 cursor-pointer bg-[#75CDE3] border-2 border-[#75CDE3] rounded-full hover:bg-white focus:bg-white"
                      width={28}
                      tabIndex={0}
                      onClick={() => toggleHelp("aktenzahl")}
                    ></wm-icon>
                  </div>
                  <Controller
                    name="aktenzahl"
                    control={control}
                    render={({ field }) => {
                      latestOnChange.current["aktenzahl"] = field.onChange;
                      return (
                        <wm-input
                          ref={(el: HTMLInputElement | null) => {
                            inputRefs.current["aktenzahl"] = el;
                          }}
                          id="aktenzahl"
                          type="text"
                          value={field.value || ""}
                        />
                      );
                    }}
                  />
                  <AnimatedNotification isVisible={helpVisible.aktenzahl}>
                    <wm-notification type="info" className="text-xs">
                      Mit der Aktenzahl gelangen Sie direkt zum gesuchten
                      Vorgang. Sie muss nicht vollständig eingegeben werden.
                    </wm-notification>
                  </AnimatedNotification>
                </div>
                <div className="mt-4!">
                  <label htmlFor="sitzungsnummer">Sitzungsnummer</label>
                  <Controller
                    name="sitzungsnummer"
                    control={control}
                    render={({ field }) => {
                      latestOnChange.current["sitzungsnummer"] = field.onChange;
                      return (
                        <wm-select
                          ref={(el: HTMLSelectElement | null) => {
                            inputRefs.current["sitzungsnummer"] = el;
                          }}
                          id="sitzungsnummer"
                          value={field.value || ""}
                        >
                          <option value="">keine bestimmte Nummer</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </wm-select>
                      );
                    }}
                  />
                </div>
                <div className="mt-4!">
                  <label htmlFor="bezirk">Bezirk</label>
                  <Controller
                    name="bezirk"
                    control={control}
                    render={({ field }) => {
                      latestOnChange.current["bezirk"] = field.onChange;
                      return (
                        <wm-select
                          ref={(el: HTMLSelectElement | null) => {
                            inputRefs.current["bezirk"] = el;
                          }}
                          id="bezirk"
                          value={field.value || ""}
                        >
                          <option value="">kein bestimmter Bezirk</option>
                          {Array.from({ length: 23 }, (_, i) => (
                            <option key={i + 1} value={String(i + 1)}>
                              {i + 1}
                            </option>
                          ))}
                        </wm-select>
                      );
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <wm-accordion>
            <wm-accordion-heading id="heading-0">
              <h3>Vorgänge / Dokumente / Abstimmungen</h3>
            </wm-accordion-heading>
            <wm-accordion-content>
              <div>
                <div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label htmlFor="vorgangTyp">Vorgänge und Dokumente</label>
                      <Controller
                        name="vorgangTyp"
                        control={control}
                        render={({ field }) => {
                          latestOnChange.current["vorgangTyp"] = field.onChange;
                          return (
                            <wm-select
                              ref={(el: HTMLSelectElement | null) => {
                                inputRefs.current["vorgangTyp"] = el;
                              }}
                              id="vorgangTyp"
                              value={field.value || ""}
                            >
                              <option value="">keine bestimmten</option>
                              <option value="1">Antrag</option>
                              <option value="2">Bericht</option>
                              <option value="3">Erklärung</option>
                              <option value="4">Gegenantrag</option>
                            </wm-select>
                          );
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="relative">
                        <label htmlFor="erledigung">
                          Erledigung (Abstimmungsergebnis)
                        </label>
                        <wm-icon
                          iconid="info"
                          className="z-100 absolute top-4 -right-2 cursor-pointer bg-[#75CDE3] border-2 border-[#75CDE3] rounded-full hover:bg-white focus:bg-white"
                          width={28}
                          tabIndex={0}
                          onClick={() => toggleHelp("erledigung")}
                        ></wm-icon>
                      </div>
                      <Controller
                        name="erledigung"
                        control={control}
                        render={({ field }) => {
                          latestOnChange.current["erledigung"] = field.onChange;
                          return (
                            <wm-select
                              ref={(el: HTMLSelectElement | null) => {
                                inputRefs.current["erledigung"] = el;
                              }}
                              id="erledigung"
                              value={field.value || ""}
                            >
                              <option value="">
                                keine bestimmte Erledigung
                              </option>
                              <option value="1">abgelehnt</option>
                              <option value="2">einstimmig angenommen</option>
                              <option value="3">mündlich zurückgezogen</option>
                              <option value="4">vertagt</option>
                            </wm-select>
                          );
                        }}
                      />
                      <AnimatedNotification isVisible={helpVisible.erledigung}>
                        <wm-notification type="info" className="text-xs">
                          Vorgänge können, müssen aber nicht, mit einem
                          Erledigungsvermerk versehen sein.
                        </wm-notification>
                      </AnimatedNotification>
                    </div>
                  </div>
                </div>
                <fieldset className="no-border mt-4!">
                  <legend>Abstimmungsverhalten der Klubs</legend>
                  <div className="flex gap-4 items-end">
                    <div className="flex-1 min-w-[200px] flex items-center gap-2">
                      <div>
                        <Controller
                          name="abstimmungsverhalten"
                          control={control}
                          render={({ field }) => (
                            <input
                              type="radio"
                              id="zustimmung"
                              value="zustimmung"
                              checked={field.value === "zustimmung"}
                              onChange={() => field.onChange("zustimmung")}
                            />
                          )}
                        />
                        <label htmlFor="zustimmung">Zustimmung</label>
                      </div>
                      <div>
                        <Controller
                          name="abstimmungsverhalten"
                          control={control}
                          render={({ field }) => (
                            <input
                              type="radio"
                              id="ablehnung"
                              value="ablehnung"
                              checked={field.value === "ablehnung"}
                              onChange={() => field.onChange("ablehnung")}
                            />
                          )}
                        />
                        <label htmlFor="ablehnung">Ablehnung</label>
                      </div>
                    </div>
                    <div className="flex-1 min-w-[200px]">
                      <div className="relative">
                        <wm-icon
                          iconid="info"
                          className="z-100 absolute -top-2 -right-2 cursor-pointer bg-[#75CDE3] border-2 border-[#75CDE3] rounded-full hover:bg-white focus:bg-white"
                          width={28}
                          tabIndex={0}
                          onClick={() => toggleHelp("klub")}
                        ></wm-icon>
                      </div>
                      <Controller
                        name="klub"
                        control={control}
                        render={({ field }) => {
                          latestOnChange.current["klub"] = field.onChange;
                          return (
                            <wm-select
                              ref={(el: HTMLSelectElement | null) => {
                                inputRefs.current["klub"] = el;
                              }}
                              id="klub"
                              value={field.value || ""}
                            >
                              <option value="">kein bestimmter Klub</option>
                              <option value="1">
                                Die Allianz für Österreich
                              </option>
                              <option value="2">Grüner Klub im Rathaus</option>
                              <option value="3">
                                Klub der Wiener Freiheitlichen
                              </option>
                              <option value="4">NEOS</option>
                            </wm-select>
                          );
                        }}
                      />
                      <AnimatedNotification isVisible={helpVisible.klub}>
                        <wm-notification type="info" className="text-xs">
                          Wählen Sie einen Klub und &apos;Zustimmung&apos; oder
                          &apos;Ablehnung&apos; um die Vorgänge zu erhalten.
                        </wm-notification>
                      </AnimatedNotification>
                    </div>
                  </div>
                </fieldset>
              </div>
            </wm-accordion-content>
            <wm-accordion-heading id="heading-1">
              <h3>Person / Partei / Funktion / Rolle</h3>
            </wm-accordion-heading>
            <wm-accordion-content className="bg-white! border-2! border-transparent!">
              <div>
                <div>
                  <div className="w-full flex flex-row items-end gap-4">
                    <div className="flex-1 flex flex-col gap-2">
                      <label htmlFor="person">Person</label>
                      <Controller
                        name="person"
                        control={control}
                        render={({ field }) => {
                          latestOnChange.current["person"] = field.onChange;
                          return (
                            <wm-select
                              ref={(el: HTMLSelectElement | null) => {
                                inputRefs.current["person"] = el;
                              }}
                              id="person"
                              value={field.value || ""}
                            >
                              <option value="">keine bestimmte Person</option>
                              <option value="1">Max Mustermann</option>
                              <option value="2">Erika Musterfrau</option>
                              <option value="3">Franz Beispiel</option>
                            </wm-select>
                          );
                        }}
                      />
                    </div>
                    <wm-button kind="secondary">
                      <button type="button" className="whitespace-nowrap">
                        zur Biografie
                      </button>
                    </wm-button>
                  </div>
                  <div className="mt-4!" />
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <label htmlFor="fraktion">Fraktion / Partei</label>
                        <wm-icon
                          iconid="info"
                          className="z-100 absolute top-4 -right-2 cursor-pointer bg-[#75CDE3] border-2 border-[#75CDE3] rounded-full hover:bg-white focus:bg-white"
                          width={28}
                          tabIndex={0}
                          onClick={() => toggleHelp("fraktion")}
                        ></wm-icon>
                      </div>
                      <Controller
                        name="fraktion"
                        control={control}
                        render={({ field }) => {
                          latestOnChange.current["fraktion"] = field.onChange;
                          return (
                            <wm-select
                              ref={(el: HTMLSelectElement | null) => {
                                inputRefs.current["fraktion"] = el;
                              }}
                              id="fraktion"
                              value={field.value || ""}
                            >
                              <option value="">keine bestimmte Fraktion</option>
                              <option value="1">SPÖ</option>
                              <option value="2">ÖVP</option>
                              <option value="3">FPÖ</option>
                              <option value="4">GRÜNE</option>
                              <option value="5">NEOS</option>
                            </wm-select>
                          );
                        }}
                      />
                      <AnimatedNotification isVisible={helpVisible.fraktion}>
                        <wm-notification type="info" className="text-xs">
                          Die Liste umfasst alle Fraktionen/Parteien, die im
                          Erfassungszeitraum im Gemeinderat/Landtag vertreten
                          sind bzw. waren.
                        </wm-notification>
                      </AnimatedNotification>
                    </div>
                    <div className="flex-1">
                      <div className="relative">
                        <label htmlFor="funktion">Funktion</label>
                        <wm-icon
                          iconid="info"
                          className="z-100 absolute top-4 -right-2 cursor-pointer bg-[#75CDE3] border-2 border-[#75CDE3] rounded-full hover:bg-white focus:bg-white"
                          width={28}
                          tabIndex={0}
                          onClick={() => toggleHelp("funktion")}
                        ></wm-icon>
                      </div>
                      <Controller
                        name="funktion"
                        control={control}
                        render={({ field }) => {
                          latestOnChange.current["funktion"] = field.onChange;
                          return (
                            <wm-select
                              ref={(el: HTMLSelectElement | null) => {
                                inputRefs.current["funktion"] = el;
                              }}
                              id="funktion"
                              value={field.value || ""}
                            >
                              <option value="">keine bestimmte Funktion</option>
                              <option value="1">Abgeordneter</option>
                              <option value="2">Vorsitzender</option>
                              <option value="3">Stellvertreter</option>
                              <option value="4">Mitglied</option>
                            </wm-select>
                          );
                        }}
                      />
                      <AnimatedNotification isVisible={helpVisible.funktion}>
                        <wm-notification type="info" className="text-xs">
                          Eine Person ist einem Vorgang immer in einer
                          bestimmten Funktion zugeordnet.
                        </wm-notification>
                      </AnimatedNotification>
                    </div>
                    <div className="flex-1">
                      <div className="relative">
                        <label htmlFor="rolle">Rolle</label>
                        <wm-icon
                          iconid="info"
                          className="z-100 absolute top-4 -right-2 cursor-pointer bg-[#75CDE3] border-2 border-[#75CDE3] rounded-full hover:bg-white focus:bg-white"
                          width={28}
                          tabIndex={0}
                          onClick={() => toggleHelp("rolle")}
                        ></wm-icon>
                      </div>
                      <Controller
                        name="rolle"
                        control={control}
                        render={({ field }) => {
                          latestOnChange.current["rolle"] = field.onChange;
                          return (
                            <wm-select
                              ref={(el: HTMLSelectElement | null) => {
                                inputRefs.current["rolle"] = el;
                              }}
                              id="rolle"
                              value={field.value || ""}
                            >
                              <option value="">keine bestimmte Rolle</option>
                              <option value="1">Berichterstatter</option>
                              <option value="2">Antragsteller</option>
                              <option value="3">Redner</option>
                              <option value="4">Abstimmender</option>
                            </wm-select>
                          );
                        }}
                      />
                      <AnimatedNotification isVisible={helpVisible.rolle}>
                        <wm-notification type="info" className="text-xs">
                          Eine Person ist einem Vorgang immer in einer
                          bestimmten Rolle zugeordnet.
                        </wm-notification>
                      </AnimatedNotification>
                    </div>
                  </div>
                </div>
              </div>
            </wm-accordion-content>
            <wm-accordion-heading id="heading-2">
              <h3>Schlagwörter</h3>
            </wm-accordion-heading>
            <wm-accordion-content>
              <div className="pb-4">
                <div>
                  <div className="relative">
                    <label htmlFor="schlagwoerter">Schlagwörter</label>
                    <wm-icon
                      iconid="info"
                      className="z-100 absolute top-4 -right-2 cursor-pointer bg-[#75CDE3] border-2 border-[#75CDE3] rounded-full hover:bg-white focus:bg-white"
                      width={28}
                      tabIndex={0}
                      onClick={() => toggleHelp("schlagwoerter")}
                    ></wm-icon>
                  </div>
                  <Controller
                    name="schlagwoerter"
                    control={control}
                    render={({ field }) => {
                      const handleChange = (value: string) => {
                        field.onChange(
                          value
                            .split(",")
                            .map((s: string) => s.trim())
                            .filter(Boolean)
                        );
                      };
                      latestOnChange.current["schlagwoerter"] = handleChange;
                      return (
                        <wm-input
                          ref={(el: HTMLInputElement | null) => {
                            inputRefs.current["schlagwoerter"] = el;
                          }}
                          id="schlagwoerter"
                          type="text"
                          value={
                            Array.isArray(field.value)
                              ? field.value.join(", ")
                              : ""
                          }
                        />
                      );
                    }}
                  />
                  <AnimatedNotification isVisible={helpVisible.schlagwoerter}>
                    <wm-notification type="info" className="text-xs">
                      Geben Sie Schlagwörter durch Kommas getrennt ein
                    </wm-notification>
                  </AnimatedNotification>
                </div>
              </div>
            </wm-accordion-content>
            <wm-accordion-heading id="heading-3">
              <h3>Themen / Thesaurus</h3>
            </wm-accordion-heading>
            <wm-accordion-content>
              <div className="pb-4">
                <fieldset className="no-border">
                  <legend>Natur und Umwelt</legend>
                  <div>
                    <Controller
                      name="themen"
                      control={control}
                      render={({ field }) => (
                        <input
                          id="natur1"
                          type="checkbox"
                          value="natur1"
                          checked={field.value.includes("natur1")}
                          onChange={(e) => {
                            if (e.target.checked) {
                              field.onChange([...field.value, "natur1"]);
                            } else {
                              field.onChange(
                                field.value.filter((v) => v !== "natur1")
                              );
                            }
                          }}
                        />
                      )}
                    />
                    <label htmlFor="natur1">Naturräume, Naturschutz</label>
                  </div>
                  <div>
                    <Controller
                      name="themen"
                      control={control}
                      render={({ field }) => (
                        <input
                          id="natur2"
                          type="checkbox"
                          value="natur2"
                          checked={field.value.includes("natur2")}
                          onChange={(e) => {
                            if (e.target.checked) {
                              field.onChange([...field.value, "natur2"]);
                            } else {
                              field.onChange(
                                field.value.filter((v) => v !== "natur2")
                              );
                            }
                          }}
                        />
                      )}
                    />
                    <label htmlFor="natur2">Tierhaltung, Tierschutz</label>
                  </div>
                  <div>
                    <Controller
                      name="themen"
                      control={control}
                      render={({ field }) => (
                        <input
                          id="natur3"
                          type="checkbox"
                          value="natur3"
                          checked={field.value.includes("natur3")}
                          onChange={(e) => {
                            if (e.target.checked) {
                              field.onChange([...field.value, "natur3"]);
                            } else {
                              field.onChange(
                                field.value.filter((v) => v !== "natur3")
                              );
                            }
                          }}
                        />
                      )}
                    />
                    <label htmlFor="natur3">
                      Umweltschutz, Umweltbelastung
                    </label>
                  </div>
                </fieldset>
                <div className="mt-4!" />
                <fieldset className="no-border">
                  <legend>Wien Holding</legend>
                  <div>
                    <Controller
                      name="themen"
                      control={control}
                      render={({ field }) => (
                        <input
                          id="wh1"
                          type="checkbox"
                          value="wh1"
                          checked={field.value.includes("wh1")}
                          onChange={(e) => {
                            if (e.target.checked) {
                              field.onChange([...field.value, "wh1"]);
                            } else {
                              field.onChange(
                                field.value.filter((v) => v !== "wh1")
                              );
                            }
                          }}
                        />
                      )}
                    />
                    <label htmlFor="wh1">Urban Innovation Vienna GmbH</label>
                  </div>
                  <div>
                    <Controller
                      name="themen"
                      control={control}
                      render={({ field }) => (
                        <input
                          id="wh2"
                          type="checkbox"
                          value="wh2"
                          checked={field.value.includes("wh2")}
                          onChange={(e) => {
                            if (e.target.checked) {
                              field.onChange([...field.value, "wh2"]);
                            } else {
                              field.onChange(
                                field.value.filter((v) => v !== "wh2")
                              );
                            }
                          }}
                        />
                      )}
                    />
                    <label htmlFor="wh2">Wien Museum</label>
                  </div>
                  <div>
                    <Controller
                      name="themen"
                      control={control}
                      render={({ field }) => (
                        <input
                          id="wh3"
                          type="checkbox"
                          value="wh3"
                          checked={field.value.includes("wh3")}
                          onChange={(e) => {
                            if (e.target.checked) {
                              field.onChange([...field.value, "wh3"]);
                            } else {
                              field.onChange(
                                field.value.filter((v) => v !== "wh3")
                              );
                            }
                          }}
                        />
                      )}
                    />
                    <label htmlFor="wh3">Wiener Hafen</label>
                  </div>
                </fieldset>
              </div>
            </wm-accordion-content>
          </wm-accordion>
          <div>
            <wm-button>
              <button type="submit">Suchen</button>
            </wm-button>
          </div>
        </form>
      </div>
    </wm-section>
  );
}
