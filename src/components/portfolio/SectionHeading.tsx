import parse from "html-react-parser";

export function SectionHeading({
  miniTitle,
  title,
  variant,
}: {
  miniTitle?: string;
  title?: string;
  variant?: string;
}) {
  return (
    <div className={`section-heading ${variant || ""}`}>
      {miniTitle ? (
        <h6
          data-aos={variant === "text-center" ? "fade-up" : "fade-right"}
          data-aos-duration="1200"
          data-aos-delay="200"
        >
          {/* the rule is decorative; the kicker reads on its own */}
          <i aria-hidden="true" />
          <span>{miniTitle}</span>
        </h6>
      ) : null}
      {title ? <h2>{parse(title)}</h2> : null}
    </div>
  );
}
