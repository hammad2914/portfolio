"use client";

import { Icon } from "@iconify/react";
import { services } from "@/data/content";
import { SectionHeading } from "./SectionHeading";

export function ServicesSection() {
  return (
    <section className="section" id="services">
      <div className="container">
        <SectionHeading
          miniTitle={services.sectionHeading.miniTitle}
          title={services.sectionHeading.title}
        />
        <div className="row gy-5 services-row">
          {services.allService.map((service, index) => (
            <div className="col-sm-6 col-lg-3 d-flex" key={service.title}>
              <div
                className="services-box w-100"
                style={{ backgroundImage: `url(${service.imgUrl})` }}
                data-aos="fade-left"
                data-aos-duration="1200"
                data-aos-delay={100 * index}
              >
                <div className="services-body">
                  <div className="icon">
                    <Icon icon={service.icon} />
                  </div>
                  <h5>{service.title}</h5>
                  <p className="services-desc">{service.subTitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
