import React from "react"
import { StaticQuery, graphql } from "gatsby"

export default () => (
  <StaticQuery
    query={graphql`
    query {
      markdownRemark(frontmatter: {
        title: {
          eq: "Despre noi"
        }
      }) {
        id
        frontmatter {
          title
          subtitle
        }
      }
    }
    `}
    render={data => (
      <header>
        <h1>{data.markdownRemark.frontmatter.title }</h1>
        <h2>{data.markdownRemark.frontmatter.subtitle}</h2>
        {/* To get body, check Content component*/}
      </header>
    )}
  />
)