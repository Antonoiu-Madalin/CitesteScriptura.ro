import React, { Fragment } from 'react'
import _get from 'lodash/get'
import _format from 'date-fns/format'
import { Link, graphql } from 'gatsby'
import { ChevronLeft, ChevronRight } from 'react-feather'
import Content from '../components/Content'
import Layout from '../components/Layout'
import './SinglePost.css'


/*  eslint-disable */ 
const roLocale = require('date-fns/locale/ro');

export const SinglePostTemplate = ({
  title,
  date,
  body,
  nextPostURL,
  prevPostURL,
  location,
  categories = [],
}) => (
 
  <main>
    <article
      className="SinglePost section light"
      itemScope
      itemType="http://schema.org/BlogPosting"
    >
      <div className="container skinny manyMan">
        {/* No longer needed 
        <Link className="SinglePost--InapoiButton" to="/">
          <ChevronLeft /> înapoi
        </Link>
        */}
        
     
       {/* Aici imi tot da eroare esLint dar nu am alternativa viabila acum // eslint-disable */}
        <a href="javascript:history.back()"> <ChevronLeft /> înapoi</a> 
       

        <div className="SinglePost--Content relative">
          
          <div className="SinglePost--Meta">
          
            {date && (
              <time
                className="SinglePost--Meta--DateFx"
                itemProp="dateCreated pubdate datePublished"
                date={date}
              >
                
                {_format(date, 'Do MMMM, YYYY', { locale: roLocale })  
                }
              </time>
            )}
            {categories && (
              <Fragment>
                <span>| </span>

                {categories.map((cat, index) => (

            /* THIS IS IT. Ia prima parte +/ + a doua parte + din slug url si merge - PENTRU POSTARI ;) 
            <Link to= {window.location.pathname.split("/")[1] + "/" + window.location.pathname.split("/")[2] + "/"} > 
            
            NOT WORKING YET*/

            <Link to= {cat.category} >

                    <span
                      key={cat.category}
                      className="SinglePost--Meta--Category"
                    >
                      {cat.category}
                      {/* Add a comma on all but last category */}
                      {index !== categories.length - 1 ? ',' : ''}
                    </span>
              </Link>

                ))}
              </Fragment>
            )}
          </div>

          {title && (
            <h1 className="SinglePost--Title" itemProp="title">
              {title}
            </h1>
          )}

          <div className="SinglePost--InnerContent">
            <Content source={body} />
          </div>

          <div className="SinglePost--Pagination">
             
            {prevPostURL && (
              <Link
                className="SinglePost--BackButton"
                to={prevPostURL}
              >
              <ChevronLeft /> 
                Articolul anterior
              </Link>
            )}
             


            {nextPostURL && (
              <Link
                className="SinglePost--NextButton"
                to={nextPostURL}
              >
                Articolul următor  <ChevronRight /> 
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  </main>
)

// Export Default SinglePost for front-end
const SinglePost = ({ data: { post, allPosts } }) => {
  const thisEdge = allPosts.edges.find(edge => edge.node.id === post.id)
  return (
    <Layout
      meta={post.frontmatter.meta || false}
      title={post.frontmatter.title || false}
    >
      <SinglePostTemplate
        {...post}
        {...post.frontmatter}
        body={post.html}
        nextPostURL={_get(thisEdge, 'next.fields.slug')}
        prevPostURL={_get(thisEdge, 'previous.fields.slug')}
      />
    </Layout>
  )
}

export default SinglePost

export const pageQuery = graphql`
  ## Query for SinglePost data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query SinglePost($id: String!) {
    post: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      id
      frontmatter {
        title
        template
        subtitle
        date
        categories {
          category
        }
      }
    }

    allPosts: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "posts" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
        }
        next {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
        previous {
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
