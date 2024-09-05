import Layout from '../../layout/Layout'
import FaqSection from './FaqSection'
import HeaderBlogSection from './HeaderBlog'
import MiidleBlogSection from './MiddleBlog'
import Newletter from './Newletter'
import BlogSection from '../home/BlogSection'
function Blog() {
  return (
    <div>
<Layout>
    <HeaderBlogSection />
    <Newletter />
    <MiidleBlogSection />
    <FaqSection />
    <BlogSection />

</Layout>
</div>
  )
}

export default Blog