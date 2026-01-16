const dummy = (blogs) => 1

const totalLikes = (blogs) => {
  if (!Array.isArray(blogs) || blogs.length === 0) {
    return 0
  }
  return blogs.reduce((sum, blog) => sum + (blog.likes || 0), 0)
}

const favoriteBlog = (blogs) => {
  if (!Array.isArray(blogs) || blogs.length === 0) {
    return null
  }

  let maxLikes = -1
  let favorite = null

  for (const blog of blogs) {
    if (blog.likes > maxLikes) {
      maxLikes = blog.likes
      favorite = blog
    }
  }

  return favorite
}

const mostBlogs = (blogs) => {
  if (!Array.isArray(blogs) || blogs.length === 0) {
    return null 
  }

  const authorCount = {}

  for (const blog of blogs) {
    const author = blog.author
    authorCount[author] = (authorCount[author] || 0) + 1
  }

  let maxBlogs = 0
  let topAuthor = null

  for (const author in authorCount) {
    if (authorCount[author] > maxBlogs) {
      maxBlogs = authorCount[author]
      topAuthor = author
    }
  }

  return {
    author: topAuthor,
    blogs: maxBlogs
  }
}

const mostLikes = (blogs) => {
  if (!Array.isArray(blogs) || blogs.length === 0) {
    return null // 
  }

  const likesByAuthor = {}

  for (const blog of blogs) {
    const author = blog.author
    const likes = Number(blog.likes) || 0   

    if (likesByAuthor[author]) {
      likesByAuthor[author] += likes
    } else {
      likesByAuthor[author] = likes
    }
  }

  let maxLikes = -1
  let topAuthor = null

  for (const author in likesByAuthor) {
    if (likesByAuthor[author] > maxLikes) {
      maxLikes = likesByAuthor[author]
      topAuthor = author
    }
  }

  return {
    author: topAuthor,
    likes: maxLikes
  }
}

module.exports = {
  mostLikes,
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}