import { useEffect, useState } from 'react'
import { getPostViewModels } from '../services/postService'
import { PostViewModel } from '../models/postViewModel';

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
      const postViewModels = await getPostViewModels();
      setOutput({ isLoading: false, postViewModels: postViewModels });
    })()
  }, [])

  return output
}
