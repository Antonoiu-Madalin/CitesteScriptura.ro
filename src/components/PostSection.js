import React from 'react'
import PostCard from '../components/PostCard'
import './PostSection.css'

class PostSection extends React.Component {
  static defaultProps = {
    posts: [],
    title: '',
    limit: 12,
    showLoadMore: true,
    className: 'ButtonulMeu',
    loadMoreTitle: 'Mai multe articole',
    perPageLimit: 12
  }

  state = {
    limit: this.props.limit
  }

  increaseLimit = () =>
    this.setState(prevState => ({
      limit: prevState.limit + this.props.perPageLimit
    }))

  render() {
    const { posts, title, showLoadMore, loadMoreTitle } = this.props,
      { limit } = this.state,
      visiblePosts = posts.slice(0, limit || posts.length)

    return (
      
      <div className="PostSection">
      
        {title && <h2 className="PostSection--Title">{title}</h2>}
        {!!visiblePosts.length && (
          <div className="PostSection--Grid">
            {visiblePosts.map((post, index) => (
              <PostCard key={post.title + index} {...post} />
            ))}
          </div>
        )}
        {showLoadMore && visiblePosts.length < posts.length && (
          <div className="taCenter">
            <button className="buttonulMorePosts" onClick={this.increaseLimit}>
              {loadMoreTitle}
            </button>
          </div>
        )}
        </div>
      
    )
  }
}

export default PostSection

/*import React,{ useState } from 'react'
import PostCard from '../components/PostCard'
import './PostSection.css'

export default function PostSection (props) {

  const {
    posts= [], // here im putting all posts inside an array
    title= '',
    limit= 12, //This does work, changes how many posts appear per page
    showLoadMore= true,
    className= 'ButtonulMeu',
    loadMoreTitle= 'Mai multe articole',
    perPageLimit= 11,

    } = props;

// This is the part i need help with
const increaseLimit = () => {
   const listState = useState( limit );
   listState(prevState => ({limit: prevState.limit + perPageLimit}))
} // This is the part i need help with


const  visiblePosts  = posts.slice(0, limit || posts.length) //slicing to display only limit array Posts


    return (

      <div className="PostSection">

        {title && <h2 className="PostSection--Title">{title}</h2>}
        {!!visiblePosts.length && (
          <div className="PostSection--Grid">
            {visiblePosts.map((post, index) => (
              <PostCard key={post.title + index} {...post} />
            ))}
          </div>
        )}
        {showLoadMore && visiblePosts.length < posts.length && (
          <div className="taCenter">
            <button className="buttonulMorePosts" onClick={increaseLimit/*So when i click this i want to show few more posts on page}>
              {loadMoreTitle}
            </button>
          </div>
        )}
        </div>

    )
  }

*/