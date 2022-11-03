import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { usePosts } from "../hooks/usePosts";
import { Post } from "../models/post";

export default function Home() {
  const { isLoading, posts } = usePosts();
  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      {posts.map((post: Post) => (
        <Card sx={{ minWidth: 275, border: "1px solid lightgray", margin: "1rem" }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {post.title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              author id: {post.authorId}
            </Typography>
            <Typography variant="body2">{post.description}</Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Read More</Button>
          </CardActions>
        </Card>

        // <li key={post.id}>
        //     {post.title} / {post.author} / {post.description}
        //   </li>
      ))}

      <div>
        <Link href="/about">About</Link>
      </div>
    </>
  );
}
