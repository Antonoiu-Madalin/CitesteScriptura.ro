import React from 'react'
import { Link, graphql } from 'gatsby'
import './BlogIndex.css'
import PostCategoriesNav from '../components/PostCategoriesNav'
import Layout from '../components/Layout'




// Export Template for use in CMS preview
export const HomePageTemplate = ({

  postCategories = [],

}) => (
 
          
        <main className="Blog">
          {!!postCategories.length && (
            <section className="section thin">
            
            {/* Post categories*/}            
            <div id="ContainerCollapse">

              <div className="container descuvraMe">
                <PostCategoriesNav enableSearch categories={postCategories} />
              </div>

              <div className="container Defaultio">
                <div class="Content ">
                <blockquote></blockquote>
                <h3>1. <Link to="quotes/quote1">Quote1</Link></h3>
           
                <h3>2. <a href="pacat">Quote2</a> (ciot)</h3>
                <h3>3. <a href="mantuire">Quote3</a> (ciot)</h3>
                </div>
              
              </div>

              </div>
            </section>


          )}

          
        </main>
      )

// Export Default VersetePage for front-end
const VersetePage = ({ data: { page, posts, postCategories } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <HomePageTemplate
      {...page}
      {...page.fields}
      {...page.frontmatter}

      postCategories={postCategories.edges.map(post => ({
        ...post.node,
        ...post.node.frontmatter,
        ...post.node.fields
      }))}
    />
  </Layout>
)

export default VersetePage

export const pageQuery = graphql`
  ## Query for VersetePage data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query VersetePage($id: String!) {
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
      filter: { fields: { contentType: { eq: "posts" } } }
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
    postCategories: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "postCategories" } } }
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
