import React from 'react'
import { Link, graphql } from 'gatsby'
import { Location } from '@reach/router'
import qs from 'qs'
import './BlogIndex.css'
import PostSection from '../components/PostSection'
import PostCategoriesNav from '../components/PostCategoriesNav'
import Layout from '../components/Layout'
import FaHome from 'react-icons/lib/fa/home';


const activeStyles  = {
  color: 'white',
  background:'#459c98',
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
  /* Urmatoarea linie e responsabila cu impartirea efectiva a postarilor pe categorii!
  Replace metacategoryRaspunsuri peste tot in pagina daca duplici */
  const isCategory = contentType === 'metacategoryRaspunsuri' 
  const byCategory = post =>
    post.categories &&
    post.categories.filter(cat => cat.category === title).length
  return isCategory ? posts.filter(byCategory) : posts
}




// Export Template for use in CMS preview
export const HomePageTemplate = ({
  title,
  posts = [],
  metacategoryRaspunsuri = [],
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

        <div className="PostMetaCategoriesNav">
        {/* making All posts main default */}
        
    
          <Link className="NavLinkMetaCategory"  exact="true" to={`/`} activeStyle={activeStyles}>
          <FaHome />
          </Link> 

          <Link className="NavLinkMetaCategory" exact="true" partiallyActive={true} to={`/studiu-biblic/`} activeStyle={activeStyles}>
            MetaCat1
          </Link>

          <Link className="NavLinkMetaCategory" exact="true" partiallyActive={true} to={`/raspunsuri-rapide/`} activeStyle={activeStyles}>
            MetaCat2
          </Link>

          <Link className="NavLinkMetaCategory" exact="true" partiallyActive={true} to={`/versete/`} activeStyle={activeStyles}>
            MetaCat3
          </Link>

        </div>


          {/* Post categories*/}   
          {!!metacategoryRaspunsuri.length && (
            <section className="section thin">
            
                     
            <div id="ContainerCollapse">

              <div className="container descuvraMe">
                <PostCategoriesNav enableSearch categories={metacategoryRaspunsuri} />
              </div>
              
              </div>
            </section>
          )}

          {/* Posts themselves*/}
          {!!posts.length && (
            <section className="section aici">
            
              <div className="container">
                <PostSection posts={filteredPosts} />
              </div>
              
            </section>
          )}
        </main>
      )
    }}
  </Location>
)

// Export Default RaspunsuriCat for front-end
const RaspunsuriCat = ({ data: { page, posts, metacategoryRaspunsuri } }) => (
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
      metacategoryRaspunsuri={metacategoryRaspunsuri.edges.map(post => ({
        ...post.node,
        ...post.node.frontmatter,
        ...post.node.fields
      }))}
    />
  </Layout>
)

export default RaspunsuriCat

export const pageQuery = graphql`
  ## Query for RaspunsuriCat data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query RaspunsuriCat($id: String!) {
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
      filter: { fields: { contentType: { in: "metacat2posts" } } }
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
    metacategoryRaspunsuri: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "metacategoryRaspunsuri" } } }
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
