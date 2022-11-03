import Link from "next/link";
import { usePosts } from "../hooks/usePosts";
import { Post } from "../models/post";

export default function Home() {
  const { isLoading, posts } = usePosts();
  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <ul>
        {posts.map((post: Post) => (
          <li key={post.id}>
            {post.title} / {post.author} / {post.description}
          </li>
        ))}
      </ul>
      <div>
        <Link href="/about">About</Link>
      </div>
    </>
  );
}
