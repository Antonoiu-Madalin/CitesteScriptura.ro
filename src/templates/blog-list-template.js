/*NewPostCard -> PostSectionPaginatedPaginated -> blog-list-template
// Max Posts per page is defined in gatsby-node  */

import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import PostSectionPaginated from '../components/PostSectionPaginated'


export default function BlogList (props) {


  const { currentPage, numPages } = props.pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? "/" : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString()

  const posts = props.data.allMarkdownRemark.edges



    return (
      <Layout>


                <PostSectionPaginated posts={posts} />

<div>
    {/*Previous/Next Pagination */}
    {!isFirst && (
        <Link to={"/blog/"+ prevPage+ '/'} rel="prev">
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
                paddingTop: 30,
                 paddingBottom: 30,
              }}
            >
              <Link
                to={'/blog'+ `/${i === 0 ? '' : i + 1}/`}
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
        <Link to={"/blog/"+ nextPage + '/'} rel="next">
             <span style={{ marginLeft: '0.8rem' }}>NextPage →</span>
        </Link>
      )}

</div>

      </Layout>
    )
  }



export const blogListQuery = graphql`
query blogListQuery($skip: Int!, $limit: Int!) {
  allMarkdownRemark(filter: {fields: {contentType: {in: ["metacat1posts", "metacat2posts"]}}}, sort: {fields: [frontmatter___date], order: DESC}, limit: $limit, skip: $skip) {
    edges {
      node {
        excerpt(format: PLAIN)
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