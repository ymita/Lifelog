import { useEffect, useState } from 'react'
import { getPostViewModels, getPostViewModelsByAuthor } from '../services/postService'
import { PostViewModel } from '../models/postViewModel';

export type UsePostsOutput = {
  isLoading: boolean;
  postViewModels: PostViewModel[];
}

const DEFAULT_OUTPUT: UsePostsOutput = {
  isLoading: true,
  postViewModels: [],
}

export function usePosts(author?: string): UsePostsOutput {
  const [output, setOutput] = useState(DEFAULT_OUTPUT)

  useEffect(() => {
    void (async () => {
      const postViewModels = await (!author ? getPostViewModels() : getPostViewModelsByAuthor(author.toString()));
      setOutput({ isLoading: false, postViewModels: postViewModels });
    })()
  }, [])

  return output
}
