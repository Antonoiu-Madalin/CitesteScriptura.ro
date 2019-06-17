import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Content from "../components/Content"
import "../components/Dsp.css"

export default ( ) => (
  <StaticQuery
    query={graphql`
    query {
      markdownRemark(frontmatter: {
        title: {
          eq: "Despre noi"
        }
      }) {
        html
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

          <Content source={data.markdownRemark.html} />
    
        {/* To get body, check Content component*/}
      </header>
    )}
    
  />

) 
