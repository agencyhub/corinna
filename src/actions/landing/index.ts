'use server'
import axios from 'axios'

export const onGetBlogPosts = async () => {
  try {
    const postArray: {
      id: string
      title: string
      image: string
      content: string
      createdAt: Date
    }[] = []
    
    const postsUrl = process.env.CLOUDWAYS_POSTS_URL
    const featuredImages = process.env.CLOUDWAYS_FEATURED_IMAGES_URL
    
    // Return empty array if URLs are not configured
    if (!postsUrl || !featuredImages) {
      console.log('Blog URLs not configured, returning empty array')
      return []
    }

    const posts = await axios.get(postsUrl)
    
    if (!posts.data || !Array.isArray(posts.data)) {
      console.log('No posts data available')
      return []
    }

    let i = 0
    while (i < posts.data.length) {
      try {
        const image = await axios.get(
          `${featuredImages}/${posts.data[i].featured_media}`
        )
        if (image && image.data && image.data.media_details) {
          const post: {
            id: string
            title: string
            image: string
            content: string
            createdAt: Date
          } = {
            id: posts.data[i].id,
            title: posts.data[i].title.rendered,
            image: image.data.media_details.file,
            content: posts.data[i].content.rendered,
            createdAt: new Date(posts.data[i].date),
          }
          postArray.push(post)
        }
      } catch (imageError) {
        console.log('Error fetching image for post:', posts.data[i].id, imageError)
        // Continue with next post even if image fails
      }
      i++
    }

    return postArray
  } catch (error) {
    console.log('Error fetching blog posts:', error)
    return []
  }
}

export const onGetBlogPost = async (id: string) => {
  try {
    const postUrl = process.env.CLOUDWAYS_POSTS_URL
    if (!postUrl) return
    const post = await axios.get(`${postUrl}/${id}`)
    if (post.data) {
      const authorUrl = process.env.CLOUDWAYS_USERS_URL
      if (!authorUrl) return
      const author = await axios.get(`${authorUrl}${post.data.author}`)
      if (author.data) {
        return {
          id: post.data.id,
          title: post.data.title.rendered,
          content: post.data.content.rendered,
          createdAt: new Date(post.data.date),
          author: author.data.name,
        }
      }
    }
  } catch (error) {
    console.log(error)
  }
}
