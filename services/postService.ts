import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { Author } from "../models/author";
import { Post } from "../models/post";
import { app } from "../utils/firebase/init";
import { PostViewModel } from "../models/postViewModel";

const getAuthor = async (name: string): Promise<Author> => {
  const db = getFirestore(app);
  const authorsRef = collection(db, "/authors");
  const queryOfAuthor = query(authorsRef, where("name", "==", name));
  const authorSnapshot = await getDocs(queryOfAuthor);
  const author = (authorSnapshot.docs.map((doc) => doc.data()) as Author[])[0];
  console.log(author);
  return author;
}

// TODO: getAllAuthors() にする。
const getAuthors = async (): Promise<Author[]> => {
  const db = getFirestore(app);
  const authorsSnapshot = await getDocs(collection(db, "/authors"));
  const authors = authorsSnapshot.docs.map((doc) => doc.data()) as Author[];
  return authors;
};

// TODO: getAllPosts() にする。
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

export const getPostViewModelsByAuthor = async (name: string): Promise<PostViewModel[]> => {
  const db = getFirestore(app);
  const authorsRef = collection(db, "/authors");
  const postsRef = collection(db, "/posts");

  // Create a query against the collection.
  //TODO: getAuthor() として切り出す。
  const author = await getAuthor(name);

  //TODO: getPostsByAuthor() として切り出す。
  const queryOfPosts = query(postsRef, where("authorId", "==", author.id));
  const postsSnapshot = await getDocs(queryOfPosts);
  const postsByAuthor = postsSnapshot.docs.map((doc) => doc.data()) as Post[];

  const postViewModels: PostViewModel[] = [];
  postsByAuthor.forEach((post) => {
    postViewModels.push({ ...post, authorName: author.name });
  });

  return postViewModels;
};
