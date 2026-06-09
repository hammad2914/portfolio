"use client";

import Image from "next/image";
import parse from "html-react-parser";
import { useState } from "react";
import { projects, type ProjectItem } from "@/data/jenna";
import { SectionHeading } from "./SectionHeading";

const COLLAGE_ORDER = [
  "Integra",
  "Cortex",
  "Oculas Vendor Portal",
  "Taskify",
  "MiCar",
  "Seasons Heritage",
  "Gioia Bakers",
];

function getCollageProjects(): ProjectItem[] {
  return COLLAGE_ORDER.map(
    (title) => projects.allProjects.find((p) => p.title === title)!,
  );
}

export function ProjectsSection() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<ProjectItem | null>(null);

  const openModal = (project: ProjectItem) => {
    setActive(project);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setActive(null);
  };

  const collageProjects = getCollageProjects();

  return (
    <>
      <section className="project-section section gray-bg" id="project">
        <div className="container">
          <SectionHeading
            miniTitle={projects.sectionHeading.miniTitle}
            title={projects.sectionHeading.title}
          />
          <div
            className="project-collage"
            data-aos="fade-up"
            data-aos-duration="1200"
            data-aos-delay="400"
          >
            {collageProjects.map((project) => (
              <button
                key={project.title}
                type="button"
                className={`project-collage__item project-collage__item--${project.collageSize}`}
                onClick={() => openModal(project)}
                aria-label={`View ${project.title}`}
              >
                <div className="project-collage__media">
                  <Image
                    src={project.thumbUrl}
                    alt={project.title}
                    fill
                    sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
                    className={`project-collage__img${project.collageSize === "portrait" ? " project-collage__img--portrait" : ""}`}
                  />
                  <div className="project-collage__overlay">
                    <span className="project-collage__tag">
                      {project.details.type}
                    </span>
                    <div className="project-collage__copy">
                      <h5>{project.title}</h5>
                      <p>{project.subTitle}</p>
                    </div>
                    <span className="project-collage__cta">
                      View project
                      <span aria-hidden="true">+</span>
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {open && active ? (
        <div className="mfp-wrap mfp-ready" style={{ overflow: "hidden auto" }}>
          <div className="mfp-container">
            <div
              className="mfp-bg mfp-close"
              onClick={closeModal}
              role="presentation"
            />
            <div className="mfp-content">
              <button type="button" className="mfp-close" onClick={closeModal}>
                ×
              </button>
              <div className="px-modal">
                <div className="single-project-box">
                  <div className="row align-items-start">
                    <div
                      className={`col-lg-7 project-modal__media${active.collageSize === "portrait" ? " project-modal__media--portrait" : ""}`}
                    >
                      {(active.modalImages ?? [active.thumbUrl]).map(
                        (src, index) => (
                          <Image
                            key={src}
                            className="border img-fluid project-modal__img"
                            src={src}
                            alt={
                              index === 0
                                ? active.title
                                : `${active.title} screenshot ${index + 1}`
                            }
                            width={700}
                            height={460}
                          />
                        ),
                      )}
                    </div>
                    <div className="col-lg-5 pt-4 pt-lg-0">
                      <h4>{parse(active.details.title)}</h4>
                      <p>{parse(active.details.description)}</p>
                      <div className="about-content">
                        <ul>
                          <li className="d-flex">
                            <span className="col-4 col-lg-3">Type:</span>
                            <span>{active.details.type}</span>
                          </li>
                          <li className="d-flex">
                            <span className="col-4 col-lg-3">Technologies:</span>
                            <span>{active.details.technologies}</span>
                          </li>
                          <li className="d-flex">
                            <span className="col-4 col-lg-3">Platform:</span>
                            <span>{active.details.platform}</span>
                          </li>
                        </ul>
                      </div>
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
