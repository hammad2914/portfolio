import Link from "next/link";

export default function NotFound() {
  return (
    <main className="notfound">
      <div className="container">
        <p className="notfound__code">404</p>
        <h1>This page doesn&apos;t exist</h1>
        <p className="notfound__text">
          The link may be broken or the page may have moved.
        </p>
        <Link className="px-btn" href="/">
          <span>Back to home</span>
        </Link>
      </div>
    </main>
  );
}
