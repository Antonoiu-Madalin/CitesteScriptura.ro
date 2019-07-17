import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import NewPostSection from '../components/NewPostSection'


export default function BlogList (props) {


  const { currentPage, numPages } = props.pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? "/" : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString()

  const posts = props.data.allMarkdownRemark.edges



    return (
      <Layout>

    {/*Shows title and puts links to them */}
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          const featuredImage = node.frontmatter.featuredImage
          return <div><Link to={node.fields.slug}>{title}</Link></div>
        })}


              {!!posts && (
            /* Posts */
                <NewPostSection posts={posts} />
          )}


    {/*Previous/Next Pagination */}
    {!isFirst && (
        <Link to={"/blog/"+ prevPage} rel="prev">
          ← PreviousPage
        </Link>
      )}

  {/*Numbering*/}
        {Array.from({ length: numPages }, (_, i) => (
            <div
              key={`pagination-number${i + 1}`}
              style={{
                margin: 0,
                height: 20,
                display: 'inline-block',
                marginTop: 150,
              }}
            >
              <Link
                to={'/blog'+ `/${i === 0 ? '' : i + 1}`}
                style={{
                  paddingLeft: 10,
                   paddingRight: 10,
                display: 'inline-block',

                  textDecoration: 'none',
                  color: i + 1 === currentPage ? '#ffffff' : '',
                  background: i + 1 === currentPage ? '#007acc' : '',
                }}
              >
                {i+1}
              </Link>
            </div>
          ))}


      {!isLast && (
        <Link to={"/blog/"+ nextPage} rel="next">
             <span style={{ marginLeft: '0.8rem' }}>NextPage →</span>
        </Link>
      )}

      </Layout>
    )
  }



export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
    filter: { fields: { contentType: { in: ["metacat1posts", "metacat2posts" ] } } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          fields {
            slug
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
  }
`