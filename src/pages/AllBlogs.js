import Blog from "../components/Blog"
import {Link} from 'react-router-dom'

const AllBlogs = (props) => (
  <>
    <Link to='/new'>
      <button>Add a Blog</button>
    </Link>
    {props.blogs.map(
      (blog) => <Blog blog={blog} key={blog.id} deleteBlog={props.deleteBlog} />
    )}
  </>

)

export default AllBlogs