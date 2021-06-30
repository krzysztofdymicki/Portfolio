
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const length = blogs.length

  if(length === 0){
    return 0
  }else if(length === 1){
    return blogs[0].likes
  }else{
    return blogs.reduce((a,b) => a + b.likes, 0)
  }
}

const favouriteBlog = (blogs) => {
  const length = blogs.length

  if(length === 0){
    return {}
  }else if(length ===1){
    return blogs[0]
  }else{
    return blogs.sort((a,b) => b.likes - a.likes )[0]
  }

}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}