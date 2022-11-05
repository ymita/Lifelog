import { useEffect, useState } from 'react'
import { Post } from '../models/post'
import { getAuthors, getPosts } from '../services/postService'
import { PostViewModel } from '../viewmodels/postViewModel';

export type UsePostsOutput = {
  isLoading: boolean;
  postViewModels: PostViewModel[];
}

const DEFAULT_OUTPUT: UsePostsOutput = {
  isLoading: true,
  postViewModels: [],
}

export function usePosts(): UsePostsOutput {
  const [output, setOutput] = useState(DEFAULT_OUTPUT)

  useEffect(() => {
    void (async () => {
      const posts = await getPosts();
      const authors = await getAuthors();
      const postViewModels: PostViewModel[] = [];

      posts.forEach(post => {
        const authorName = authors.find(author => post.authorId === author.id)?.name as string;
        postViewModels.push({...post, authorName: authorName});
      });
  
      setOutput({ isLoading: false, postViewModels: postViewModels });
    })()
  }, [])

  return output
}