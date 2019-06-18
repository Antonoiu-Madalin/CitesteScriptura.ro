import React from "react"
import { StaticQuery, graphql } from "gatsby"
import "../components/Dsp.css"
import PropTypes from 'prop-types';

const Header = ({ data }) => (
  <header>
    
    {data.allMarkdownRemark.edges.map(({ node }) => (
        <div key={node.id}>
          <h3>
            {node.frontmatter.title} <span>— {node.frontmatter.date}</span>
            <span> {node.fields.slug} </span>
          </h3>
        </div>
      ))}
    
   





  </header>
)


export default props => (
  <StaticQuery
    query={graphql`
    query{
      allMarkdownRemark(filter: {fields: {contentType: {eq: "AllPosts"}}}, sort: {order: DESC, fields: [frontmatter___date]}) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              date
            }
          }
        }
      }
    }
    `}
    render={data => <Header data={data} {...props} />}
    
  />

) 

Header.propTypes = {
  data: PropTypes.shape({
    allPosts: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
}