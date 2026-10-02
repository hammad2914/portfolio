"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { projects, type ProjectItem } from "@/data/content";
import { SectionHeading } from "./SectionHeading";

/**
 * Two headline builds get a large card; the rest are compact rows. A uniform
 * grid said everything mattered equally, which told a visitor nothing about
 * where to look.
 *
 * pj- prefixed: project-collage-* was the old grid, and card/list/row collide
 * with Bootstrap.
 */

function Badges({ project }: { project: ProjectItem }) {
  return (
    <span className="pj-badges">
      {project.liveUrl ? (
        <span className="pj-badge pj-badge--live">
          <span className="pj-dot" aria-hidden="true" />
          Live
        </span>
      ) : null}
      {project.inProgress ? (
        <span className="pj-badge pj-badge--wip">In progress</span>
      ) : null}
      {project.confidential ? (
        <span className="pj-badge pj-badge--nda">
          <Icon icon="mdi:lock-outline" aria-hidden="true" />
          Private source
        </span>
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

  return (
    <>
      <section className="project-section section gray-bg" id="project">
        <div className="container">
          <SectionHeading
            miniTitle={projects.sectionHeading.miniTitle}
            title={projects.sectionHeading.title}
          />
          <p className="pj-note" data-aos="fade-up" data-aos-duration="1000">
            {projects.note}
          </p>

          <div className="pj-featured" data-aos="fade-up" data-aos-duration="1000">
            {featured.map((project) => (
              <button
                key={project.title}
                type="button"
                className="pj-card"
                onClick={() => openModal(project)}
                aria-label={`Case study: ${project.title} — ${project.subTitle}`}
              >
                <span className="pj-shot">
                  <Image
                    src={project.thumbUrl}
                    alt={`${project.title} — ${project.subTitle}`}
                    fill
                    sizes="(max-width: 991px) 100vw, 50vw"
                    className="pj-img"
                  />
                </span>
                <span className="pj-body">
                  <Badges project={project} />
                  <strong className="pj-title">{project.title}</strong>
                  <span className="pj-sub">{project.subTitle}</span>
                  <span className="pj-stack">{project.details.technologies}</span>
                  <span className="pj-cta">
                    Read the case study
                    <Icon icon="mdi:arrow-right" aria-hidden="true" />
                  </span>
                </span>
              </button>
            ))}
          </div>

          <ul className="pj-list" data-aos="fade-up" data-aos-duration="1000">
            {rest.map((project) => (
              <li key={project.title}>
                <button
                  type="button"
                  className="pj-row"
                  onClick={() => openModal(project)}
                  aria-label={`Case study: ${project.title} — ${project.subTitle}`}
                >
                  <span className="pj-row__head">
                    <strong>{project.title}</strong>
                    <em>{project.subTitle}</em>
                    <Badges project={project} />
                  </span>
                  {project.oneLiner ? (
                    <span className="pj-row__line">{project.oneLiner}</span>
                  ) : null}
                  <span className="pj-row__stack">
                    {project.details.technologies}
                  </span>
                  <Icon
                    className="pj-row__go"
                    icon="mdi:arrow-top-right"
                    aria-hidden="true"
                  />
                </button>
              </li>
            ))}
          </ul>
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
                className="mfp-close"
                onClick={closeModal}
                aria-label="Close case study"
              >
                ×
              </button>
              <div
                className="px-modal pj-modal"
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

                {(active.modalImages ?? [active.thumbUrl]).map((src, index) => (
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
                ))}

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
                  <dl className="pj-modal__meta">
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
