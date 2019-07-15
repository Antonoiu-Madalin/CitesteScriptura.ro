import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"

export default class BlogList extends React.Component {
  render() {


  const { currentPage, numPages } = this.props.pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? "/" : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString()

  const posts = this.props.data.allMarkdownRemark.edges

    return (
      <Layout>

    {/*Shows title and puts links to them */}
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return <div><Link to={node.fields.slug}>{title}</Link></div>
        })}


    {/*Previous/Next Pagination */}
    {!isFirst && (
        <Link to={"/blog/"+ prevPage} rel="prev">
          ← PreviousPage
        </Link>
      )}

      {!isLast && (
        <Link to={"/blog/"+ nextPage} rel="next">
             <span style={{ marginLeft: '0.8rem' }}>NextPage →</span>
        </Link>
      )}


      </Layout>
    )
  }
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
          }
        }
      }
    }
  }
`