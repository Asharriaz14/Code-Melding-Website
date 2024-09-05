import Layout from '../../layout/Layout'
import HeaderBlogSection from './HeaderBlog'
import MiidleBlogSection from './MiddleBlog'
import Newletter from './Newletter'
function Blog() {
  return (
    <div>
<Layout>
    <HeaderBlogSection />
    <Newletter />
    <MiidleBlogSection />

</Layout>
</div>
  )
}

export default Blog