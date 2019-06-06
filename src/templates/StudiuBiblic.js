import React from 'react'
import { Link, graphql } from 'gatsby'
import { Location } from '@reach/router'
import qs from 'qs'
import './BlogIndex.css'
import PostSection2 from '../components/PostSection2'
import PostCategoriesNav from '../components/PostCategoriesNav'
import Layout from '../components/Layout'
import FaHome from 'react-icons/lib/fa/home';
import FaBook from 'react-icons/lib/fa/book';
import FaBolt from 'react-icons/lib/fa/bolt';
import BlogSearch from '../components/BlogSearch';
import Sticky from 'react-stickynode';

const activeStyles  = {
  color: '#1E90FF'
}


/**
 * Filter posts by date. Feature dates will be fitered
 * When used, make sure you run a cronejob each day to show schaduled content. See docs
 *
 * @param {posts} object
 */
export const byDate = posts => {
  const now = Date.now()
  return posts.filter(post => Date.parse(post.date) <= now)
}

/**
 * filter posts by category.
 *
 * @param {posts} object
 * @param {title} string
 * @param {contentType} string
 */

export const byCategory = (posts, title, contentType) => {

  /* Aici adaugam folderele MetaCategoriilor pentru Toate default */
  const isCategory = contentType === 'metacategoryStudiuBiblic' 
  const byCategory = post =>
    post.categories &&
    post.categories.filter(cat => cat.category === title).length
  return isCategory ? posts.filter(byCategory) : posts
}




// Export Template for use in CMS preview
export const HomePageTemplate = ({
  title,
  posts = [],
  metacategoryStudiuBiblic = [],
  enableSearch = true,
  contentType
}) => (
  <Location>
    {({ location }) => {
      let filteredPosts =
        posts && !!posts.length
          ? byCategory(byDate(posts), title, contentType)
          : []

      let queryObj = location.search.replace('?', '')
      queryObj = qs.parse(queryObj)

      if (enableSearch && queryObj.s) {
        const searchTerm = queryObj.s.toLowerCase()
        filteredPosts = filteredPosts.filter(post =>
          post.frontmatter.title.toLowerCase().includes(searchTerm)
        )
      }

      return (
     
          
        <main className="Blog">

          <Sticky enabled={true}  innerZ={1}>
              {/* Post categories*/} 
              <nav>
                <ul className="thirdNav"> 

                    {!!metacategoryStudiuBiblic.length && (
                      <PostCategoriesNav enableSearch categories={metacategoryStudiuBiblic} />
                    )}

                </ul> 
              </nav>
            </Sticky>


          {/* Posts themselves*/}
          {!!posts.length && (
            <PostSection2 posts={filteredPosts} />
          )}



         <nav className={`SecondNav stickyNav`}>
                <ul className="Nav--Container container secondNav"> 
                <li>
                      <Link exact="true" to={`/`} activeStyle={activeStyles}>
                      <span className="metaIcon"><FaHome /></span><span className="metaTitle">Acasă</span>
                      </Link> 
                  </li>

                  <li>
                    
                    <Link exact="true" partiallyActive={true} to={`/sortare/`} activeStyle={activeStyles}>
                    <span className="metaIcon"><FaBook/></span><span className="metaTitle">MetaCat1</span>
                    </Link>
                  </li>

                  <li>
                    
                    <Link exact="true" partiallyActive={true} to={`/raspunsuri-rapide/`} activeStyle={activeStyles}>
                    <span className="metaIcon"><FaBolt/></span> <span className="metaTitle">MetaCat2</span>
                    </Link>
                  </li>

                  <li>
                    
                    <div className="staticSearchIcon"><BlogSearch/></div> 
                  
                </li>

                </ul>   
          </nav>

        </main>
      )
    }}
  </Location>
)

// Export Default StudiuBiblic for front-end
const StudiuBiblic = ({ data: { page, posts, metacategoryStudiuBiblic } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <HomePageTemplate
      {...page}
      {...page.fields}
      {...page.frontmatter}
      posts={posts.edges.map(post => ({
        ...post.node,
        ...post.node.frontmatter,
        ...post.node.fields,
      }))}
      metacategoryStudiuBiblic={metacategoryStudiuBiblic.edges.map(post => ({
        ...post.node,
        ...post.node.frontmatter,
        ...post.node.fields
      }))}
    />
  </Layout>
)

export default StudiuBiblic

export const pageQuery = graphql`
  ## Query for StudiuBiblic data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query StudiuBiblic($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      fields {
        contentType
      }
      frontmatter {
        title
        excerpt
        template
        subtitle
        featuredImage
      }
    }

    posts: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "metacat1posts" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
            readingTime {
              text
            }
          }
          frontmatter {
            title
            date
            categories {
              category
            }
            featuredImage
          }
        }
      }
    }
    metacategoryStudiuBiblic: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "metacategoryStudiuBiblic" } } }
      sort: { order: ASC, fields: [frontmatter___title] }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
