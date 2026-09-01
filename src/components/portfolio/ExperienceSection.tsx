"use client";

import parse from "html-react-parser";
import { experience } from "@/data/content";
import { SectionHeading } from "./SectionHeading";

export function ExperienceSection() {
  return (
    <section className="section gray-bg">
      <div className="container">
        <SectionHeading
          miniTitle={experience.sectionHeading.miniTitle}
          title={experience.sectionHeading.title}
        />
        <div className="row gy-3">
          {experience.allExperience.map((item, index) => (
            <div
              className="col-12"
              key={`${item.company}-${item.designation}`}
              data-aos="fade-up"
              data-aos-duration="1200"
              data-aos-delay={100 * index}
            >
              <div className="ex-box">
                <div className="row gy-4">
                  <div className="col-md-4 col-lg-3">
                    <div className="ex-left">
                      <h4>{item.designation}</h4>
                      <span>{item.company}</span>
                      <p>{item.duration}</p>
                      <label>{item.jobType}</label>
                    </div>
                  </div>
                  <div className="col-md-8 col-lg-9">
                    <div className="ex-right">
                      <h5>{item.companyTitle}</h5>
                      <p className="m-0">{parse(item.companyDescription)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
