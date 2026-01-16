const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')



  const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    },
    {
      _id: "5a422232bc61b54a555676567698234d17fc",
      title: "Banana Split",
      author: "Gorilla Banana",
      url: "http://blog.banaaSplit.com/Spongebob/Banana.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "1122224222sdfg54a5556733474334343",
      title: "Banana Split PART 2",
      author: "Gorilla Banana",
      url: "http://blog.banaaSplit.com/Spongebob/Banana2.html",
      likes: 11,
      __v: 0
    },
    {
      _id: "11222290asasasasasgfhgf4334343",
      title: "Banana Split PART 3",
      author: "Gorilla Banana",
      url: "http://blog.banaaSplit.com/Spongebob/Banana3.html",
      likes: 10,
      __v: 0
    },
    {
      _id: "11222222220asasasasasgfhgf4334343",
      title: "Banana Split PART 4",
      author: "Gorilla Banana",
      url: "http://blog.banaaSplit.com/Spongebob/Banana4.html",
      likes: 10,
      __v: 0
    }     
  ]
  
describe('favorite blog', () => {
  
  test('when list is empty, should return null', () => {
    const emptyList = []
    const result = listHelper.favoriteBlog(emptyList)
    assert.strictEqual(result, null)

    console.log('\n\x1b[33m%s\x1b[0m', 'EMPTY LIST:', result, '\n')
  })

  test('when there is only one blog, it should be the favorite', () => {
    const oneBlog = [blogs[0]]  // only "React patterns" (7 likes)
    
    const result = listHelper.favoriteBlog(oneBlog)
    
    assert.deepStrictEqual(result, {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    })

    console.log('\n\x1b[33m%s\x1b[0m', 'ONE BLOG:', result, '\n')
  })

  test('when there are many blogs, returns the one with most likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    
    assert.deepStrictEqual(result, {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    })

    console.log('\n\x1b[33m%s\x1b[0m', 'MANY BLOGS, PICK WITH MOST LIKES:', result, '\n')
  })

  test('returns the author with most blogs', () => {
    const result = listHelper.mostBlogs(blogs)

    assert.deepStrictEqual(
        result,
        { author: "Gorilla Banana", blogs: 4 }
    )

    console.log('\n\x1b[33m%s\x1b[0m', 'AUTHOR WITH MOST BLOGS:', result, '\n')
  })


  test('if two blogs have the same highest number of likes, either one is fine', () => {
    const equalLikesBlogs = [
    blogs[2],
    blogs[0],
    blogs[6]
    ]

    const result = listHelper.favoriteBlog(equalLikesBlogs)
    
    assert.ok(result.likes === 12)
    assert.ok(
      result.title === "Banana Split" || 
      result.title === "Canonical string reduction"
    )

    console.log('\n\x1b[33m%s\x1b[0m', 'TWO BLOGS WITH EQUAL HIGHEST LIKES, EITHER ONE IS FINE:', result, '\n')

    
  })

  test('returns the author with most total likes', () => {
    const result = listHelper.mostLikes(blogs)

    assert.strictEqual(result.likes, 43)
    assert.strictEqual(result.author, "Gorilla Banana")

    console.log('\n\x1b[33m%s\x1b[0m', 'AUTHOR WITH MOST LIKES COUNTING ALL BLOGS:', result, '\n')
    console.log('\n\x1b[34m%s\x1b[0m', 'TEST RESULTS BELOW', '\n')
  })

})