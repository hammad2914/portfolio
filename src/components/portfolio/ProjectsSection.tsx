"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { projects, type ProjectItem } from "@/data/content";
import { SectionHeading } from "./SectionHeading";

/**
 * Projects carry the hero's visual language rather than a second, flatter one:
 * a dark band with its own light, app windows tilted in perspective and bled
 * off the edge, floating stack marks, outlined numerals. Flat light cards read
 * as a default template, which is exactly what this section is competing with.
 *
 * The band stays dark in both site themes — it is a deliberate dark stripe, not
 * a theme bug.
 *
 * pj- prefixed: card/row/tile all collide with Bootstrap.
 */

function Badges({ project }: { project: ProjectItem }) {
  return (
    <span className="pj-badges">
      {project.liveUrl ? (
        <span className="pj-badge pj-badge--live">
          <span className="pj-badge__dot" aria-hidden="true" />
          Live
        </span>
      ) : null}
      {project.inProgress ? (
        <span className="pj-badge pj-badge--wip">In progress</span>
      ) : null}
      {project.confidential ? (
        <span className="pj-badge pj-badge--nda">Private source</span>
      ) : null}
    </span>
  );
}

export function ProjectsSection() {
  const [active, setActive] = useState<ProjectItem | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const openModal = (project: ProjectItem) => {
    lastFocused.current = document.activeElement as HTMLElement | null;
    setActive(project);
  };

  const closeModal = useCallback(() => {
    setActive(null);
    lastFocused.current?.focus();
  }, []);

  // Lock body scroll, close on Escape, and trap focus while the modal is open.
  useEffect(() => {
    if (!active) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [active, closeModal]);

  const featured = projects.allProjects.filter((p) => p.featured);
  const rest = projects.allProjects.filter((p) => !p.featured);
  const num = (i: number) => String(i + 1).padStart(2, "0");

  return (
    <>
      <section className="section pj" id="project">
        <span className="pj-glow" aria-hidden="true" />
        <span className="pj-mesh" aria-hidden="true" />

        <div className="container pj-inner">
          <SectionHeading
            miniTitle={projects.sectionHeading.miniTitle}
            title={projects.sectionHeading.title}
          />
          <p className="pj-note" data-aos="fade-up" data-aos-duration="900">
            {projects.note}
          </p>

          {featured.map((project, i) => (
            <button
              key={project.title}
              type="button"
              className={`pj-row${i % 2 ? " pj-row--flip" : ""}`}
              onClick={() => openModal(project)}
              aria-label={`Case study: ${project.title} — ${project.subTitle}`}
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <span className="pj-ghost" aria-hidden="true">
                {num(i)}
              </span>

              <span className="pj-txt">
                <Badges project={project} />
                <strong className="pj-name">{project.title}</strong>
                <span className="pj-sub">{project.subTitle}</span>
                {project.oneLiner ? (
                  <span className="pj-line">{project.oneLiner}</span>
                ) : null}
                <span className="pj-meta">{project.details.technologies}</span>
                <span className="pj-cta">
                  Read the case study
                  <span className="pj-cta__rule" aria-hidden="true" />
                </span>
              </span>

              <span className="pj-stage">
                <span className="pj-win">
                  <span className="pj-bar">
                    <i />
                    <i />
                    <i />
                    <em>{project.title.toLowerCase().replace(/\s+/g, "")}.app</em>
                  </span>
                  <Image
                    src={project.thumbUrl}
                    alt={`${project.title} — ${project.subTitle}`}
                    width={1400}
                    height={1027}
                    sizes="(max-width: 991px) 100vw, 60vw"
                    className="pj-shot"
                  />
                </span>
                {(project.marks ?? []).map((icon, m) => (
                  <span className={`pj-mark pj-mark--${m + 1}`} key={icon}>
                    <Icon icon={icon} aria-hidden="true" />
                  </span>
                ))}
              </span>
            </button>
          ))}

          <div className="pj-tiles">
            {rest.map((project, i) => (
              <button
                key={project.title}
                type="button"
                className="pj-tile"
                onClick={() => openModal(project)}
                aria-label={`Case study: ${project.title} — ${project.subTitle}`}
                data-aos="fade-up"
                data-aos-duration="900"
                data-aos-delay={i * 80}
              >
                <span className="pj-tile__ghost" aria-hidden="true">
                  {num(i + featured.length)}
                </span>
                <span className="pj-tile__head">
                  <strong>{project.title}</strong>
                  <Badges project={project} />
                </span>
                <span className="pj-tile__sub">{project.subTitle}</span>
                {project.oneLiner ? (
                  <span className="pj-tile__line">{project.oneLiner}</span>
                ) : null}
                <span className="pj-tile__meta">
                  {project.details.technologies}
                </span>
                <span className="pj-tile__thumb" aria-hidden="true">
                  <Image
                    src={project.thumbUrl}
                    alt=""
                    width={700}
                    height={514}
                    sizes="320px"
                  />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {active ? (
        <div className="mfp-wrap mfp-ready" style={{ overflow: "hidden auto" }}>
          <div className="mfp-container">
            <div
              className="mfp-bg mfp-close"
              onClick={closeModal}
              role="presentation"
            />
            <div className="mfp-content">
              <button
                type="button"
                className="mfp-close pj-modal__x"
                onClick={closeModal}
                aria-label="Close case study"
              >
                ×
              </button>
              <div
                className="pj-modal"
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="project-modal-title"
                tabIndex={-1}
              >
                <header className="pj-modal__head">
                  <Badges project={active} />
                  <h4 id="project-modal-title">{active.title}</h4>
                  <p>{active.subTitle}</p>
                </header>

                <div className="pj-modal__frame">
                  <span className="pj-bar">
                    <i />
                    <i />
                    <i />
                    <em>
                      {active.title.toLowerCase().replace(/\s+/g, "")}.app
                    </em>
                  </span>
                  {(active.modalImages ?? [active.thumbUrl]).map(
                    (src, index) => (
                      <Image
                        key={src}
                        className="pj-modal__shot"
                        src={src}
                        alt={
                          index === 0
                            ? `${active.title} — ${active.subTitle}`
                            : `${active.title} screenshot ${index + 1}`
                        }
                        width={1400}
                        height={1027}
                      />
                    ),
                  )}
                </div>

                <ul className="pj-modal__impact">
                  {active.details.impact.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <div className="pj-modal__prose">
                  <section>
                    <h6>The problem</h6>
                    <p>{active.details.challenge}</p>
                  </section>
                  <section>
                    <h6>What I built</h6>
                    <p>{active.details.approach}</p>
                  </section>
                  <section className="pj-modal__why">
                    <h6>Why these calls</h6>
                    <p>{active.details.decisions}</p>
                  </section>
                </div>

                <footer className="pj-modal__foot">
                  <dl className="pj-modal__specs">
                    <div>
                      <dt>Type</dt>
                      <dd>{active.details.type}</dd>
                    </div>
                    <div>
                      <dt>Stack</dt>
                      <dd>{active.details.technologies}</dd>
                    </div>
                    <div>
                      <dt>Platform</dt>
                      <dd>{active.details.platform}</dd>
                    </div>
                  </dl>

                  {active.liveUrl || active.links?.length ? (
                    <div className="pj-modal__links">
                      {active.liveUrl ? (
                        <a
                          className="px-btn px-btn--sm"
                          href={active.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Icon icon="mdi:open-in-new" aria-hidden="true" />
                          <span>Visit live site</span>
                        </a>
                      ) : null}
                      {active.links?.map((link) => (
                        <a
                          key={link.url}
                          className="px-btn px-btn--sm"
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Icon
                            icon={link.icon ?? "mdi:github"}
                            aria-hidden="true"
                          />
                          <span>{link.label}</span>
                        </a>
                      ))}
                    </div>
                  ) : null}

                  <p className="pj-modal__privacy">
                    {active.privacyNote ?? "Source is private."}
                  </p>
                </footer>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
