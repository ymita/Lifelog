import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import { Author } from "../models/author";
import { Post } from "../models/post";
import { app } from "../utils/firebase/init";
import { PostViewModel } from "../models/postViewModel";

const getAuthors = async (): Promise<Author[]> => {
  const db = getFirestore(app);
  const authorsSnapshot = await getDocs(collection(db, "/authors"));
  const authors = authorsSnapshot.docs.map((doc) => doc.data()) as Author[];
  return authors;
};

const getPosts = async (): Promise<Post[]> => {
  const db = getFirestore(app);
  const postsSnapshot = await getDocs(collection(db, "/posts"));
  const posts = postsSnapshot.docs.map((doc) => doc.data()) as Post[];
  return posts;
};

export const getPostViewModels = async (): Promise<PostViewModel[]> => {
  const posts = await getPosts();
  const authors = await getAuthors();
  const postViewModels: PostViewModel[] = [];

  posts.forEach((post) => {
    const authorName = 
      authors.find((author) => post.authorId === author.id)?.name as string;
    postViewModels.push({ ...post, authorName: authorName });
  });

  return postViewModels;
};
