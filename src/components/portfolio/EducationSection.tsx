"use client";

import { Icon } from "@iconify/react";
import { education } from "@/data/content";
import { SectionHeading } from "./SectionHeading";

export function EducationSection() {
  return (
    <section className="section" id="education">
      <div className="container">
        <SectionHeading
          miniTitle={education.sectionHeading.miniTitle}
          title={education.sectionHeading.title}
        />
        <div className="row gy-4">
          {education.items.map((item, index) => (
            <div
              className="col-md-6 col-lg-4 d-flex"
              key={`${item.title}-${item.institution}`}
              data-aos="fade-up"
              data-aos-duration="1200"
              data-aos-delay={100 * index}
            >
              <div className="education-box w-100">
                <div className="education-box__icon">
                  <Icon icon={item.icon} aria-hidden="true" />
                </div>
                <span className="education-box__type">{item.type}</span>
                <h5>{item.title}</h5>
                <p className="education-box__institution">{item.institution}</p>
                <p className="education-box__duration">{item.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
