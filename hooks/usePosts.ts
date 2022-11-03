import { useEffect, useState } from 'react'
import { Post } from '../models/post'
import { getPosts } from '../services/postService'

export type UsePostsOutput = {
  isLoading: boolean
  posts: Post[]
}

const DEFAULT_OUTPUT: UsePostsOutput = {
  isLoading: true,
  posts: [],
}

export function usePosts(): UsePostsOutput {
  const [output, setOutput] = useState(DEFAULT_OUTPUT)

  useEffect(() => {
    void (async () => {
      const posts = await getPosts()
      setOutput({ isLoading: false, posts: posts })
    })()
  }, [])

  return output
}