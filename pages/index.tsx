import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>
      <div>
        <Link href="/about">About</Link>
      </div>
    </div>
  );
}
