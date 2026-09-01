"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { projects, type ProjectItem } from "@/data/content";
import { SectionHeading } from "./SectionHeading";

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

  return (
    <>
      <section className="project-section section gray-bg" id="project">
        <div className="container">
          <SectionHeading
            miniTitle={projects.sectionHeading.miniTitle}
            title={projects.sectionHeading.title}
          />
          <p
            className="project-note"
            data-aos="fade-up"
            data-aos-duration="1200"
            data-aos-delay="200"
          >
            {projects.note}
          </p>
          <div
            className="project-collage"
            data-aos="fade-up"
            data-aos-duration="1200"
            data-aos-delay="400"
          >
            {projects.allProjects.map((project) => (
              <button
                key={project.title}
                type="button"
                className={`project-collage__item project-collage__item--${project.collageSize}`}
                onClick={() => openModal(project)}
                aria-label={`View case study: ${project.title} — ${project.subTitle}`}
              >
                <div className="project-collage__media">
                  <Image
                    src={project.thumbUrl}
                    alt={`${project.title} — ${project.subTitle}`}
                    fill
                    sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
                    className={`project-collage__img${project.collageSize === "portrait" ? " project-collage__img--portrait" : ""}`}
                  />
                  <div className="project-collage__overlay">
                    <span className="project-collage__tags">
                      <span className="project-collage__tag">
                        {project.details.type}
                      </span>
                      {project.liveUrl ? (
                        <span className="project-collage__tag project-collage__tag--live">
                          <span
                            className="project-collage__live-dot"
                            aria-hidden="true"
                          />
                          Live
                        </span>
                      ) : null}
                      {project.inProgress ? (
                        <span className="project-collage__tag project-collage__tag--wip">
                          In progress
                        </span>
                      ) : null}
                      {project.confidential ? (
                        <span className="project-collage__tag project-collage__tag--nda">
                          <Icon icon="mdi:lock-outline" aria-hidden="true" />
                          {project.privacyNote ? "Private" : "NDA"}
                        </span>
                      ) : null}
                      {project.links?.length ? (
                        <span className="project-collage__tag project-collage__tag--repo">
                          <Icon icon="mdi:github" aria-hidden="true" />
                          Source
                        </span>
                      ) : null}
                    </span>
                    <div className="project-collage__copy">
                      <h5>{project.title}</h5>
                      <p>{project.subTitle}</p>
                    </div>
                    <span className="project-collage__cta">
                      Read case study
                      <span aria-hidden="true">+</span>
                    </span>
                  </div>
                </div>
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
                className="mfp-close"
                onClick={closeModal}
                aria-label="Close case study"
              >
                ×
              </button>
              <div
                className="px-modal"
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="project-modal-title"
                tabIndex={-1}
              >
                <div className="single-project-box">
                  <div className="row align-items-start">
                    <div
                      className={`col-lg-6 project-modal__media${active.collageSize === "portrait" ? " project-modal__media--portrait" : ""}`}
                    >
                      {(active.modalImages ?? [active.thumbUrl]).map(
                        (src, index) => (
                          <Image
                            key={src}
                            className="border img-fluid project-modal__img"
                            src={src}
                            alt={
                              index === 0
                                ? `${active.title} — ${active.subTitle}`
                                : `${active.title} screenshot ${index + 1}`
                            }
                            width={700}
                            height={460}
                          />
                        ),
                      )}
                    </div>
                    <div className="col-lg-6 pt-4 pt-lg-0">
                      <h4 id="project-modal-title">{active.details.title}</h4>

                      {active.inProgress ? (
                        <p className="project-modal__wip">
                          <Icon icon="mdi:progress-wrench" aria-hidden="true" />
                          <span>
                            This project is in active development — the outcomes
                            below are what it is being built to deliver.
                          </span>
                        </p>
                      ) : null}
                      {active.confidential ? (
                        <p className="project-modal__nda">
                          <Icon icon="mdi:lock-outline" aria-hidden="true" />
                          <span>
                            {active.privacyNote ??
                              "Proprietary client system — source is not public."}{" "}
                            Happy to walk through the architecture on a call.
                          </span>
                        </p>
                      ) : null}

                      <div className="project-modal__block">
                        <h6>The problem</h6>
                        <p>{active.details.challenge}</p>
                      </div>
                      <div className="project-modal__block">
                        <h6>What I built</h6>
                        <p>{active.details.approach}</p>
                      </div>
                      <div className="project-modal__block">
                        <h6>Why these choices</h6>
                        <p>{active.details.decisions}</p>
                      </div>
                      <div className="project-modal__block">
                        <h6>
                          {active.inProgress ? "Intended impact" : "Impact"}
                        </h6>
                        <ul className="project-modal__impact">
                          {active.details.impact.map((item) => (
                            <li key={item}>
                              <Icon
                                icon="mdi:check-circle-outline"
                                aria-hidden="true"
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="about-content">
                        <ul>
                          <li className="d-flex">
                            <span className="col-4 col-lg-4">Type:</span>
                            <span>{active.details.type}</span>
                          </li>
                          <li className="d-flex">
                            <span className="col-4 col-lg-4">Stack:</span>
                            <span>{active.details.technologies}</span>
                          </li>
                          <li className="d-flex">
                            <span className="col-4 col-lg-4">Platform:</span>
                            <span>{active.details.platform}</span>
                          </li>
                        </ul>
                      </div>

                      {active.liveUrl || active.links?.length ? (
                        <div className="project-modal__links">
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
                              <Icon icon="mdi:github" aria-hidden="true" />
                              <span>{link.label}</span>
                            </a>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
