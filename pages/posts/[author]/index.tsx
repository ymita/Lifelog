import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { usePosts } from "../../../hooks/usePosts";
import { PostViewModel } from "../../../models/postViewModel";

export default function Home() {
  const router = useRouter();
  const { author } = router.query;

  //TODO: string cast を、よりスマートな表記に修正する。
  const { isLoading, postViewModels } = usePosts(author as string);
  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      {postViewModels.map((postViewModel: PostViewModel) => (
        <Card
          key={postViewModel.id}
          sx={{ minWidth: 275, border: "1px solid lightgray", margin: "1rem" }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {postViewModel.title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              author: {postViewModel.authorName}
            </Typography>
            <Typography variant="body2">{postViewModel.description}</Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Read More</Button>
          </CardActions>
        </Card>
      ))}

      <div>
        <Link href="/about">About</Link>
      </div>
    </>
  );
}
