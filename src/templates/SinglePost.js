import React, { Fragment } from 'react'
import _get from 'lodash/get'
import _format from 'date-fns/format'
import { Link, graphql } from 'gatsby'
import Content from '../components/Content'
import Layout from '../components/LayoutMobile'
import './SinglePost.css'
import { Location } from '@reach/router'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import NavNoSearch from '../components/NavNoSearch'
import IoLink from 'react-icons/lib/io/link';
import FaHome from 'react-icons/lib/fa/home';
import FaShareSquareO from 'react-icons/lib/fa/share-square-o';


const activeStyles  = {
  color: '#1E90FF'
}

/*  eslint-disable  */ 
const roLocale = require('date-fns/locale/ro');

export const SinglePostTemplate = ({
  title,
  date,
  body,
  nextPostURL,
  prevPostURL,
  categories = [],
}) => (
 
  <main>

      <nav className="noSearchNav">
        <NavNoSearch className="NavNoSearchSelect"/>
      </nav>

    <article
      className="SinglePost section light"
      itemScope
      itemType="http://schema.org/BlogPosting"
    >
    
      <div className="degeaba1">
    
       {/* NU MAI E NEVOIE  Aici imi tot da eroare esLint dar nu am alternativa viabila acum // eslint-disable 
        <a className="napoiButton" href="javascript:history.back()"> <ArrowLeft/> înapoi</a> */}
        
        {/* NO LONGER NEEDED - ClipboardShareURL Si uite asa iei locatia (URL) location.pathname sau href daca vrei full
        <Location>
          {({ location }) => {
            
            return <p>Share me: {location.href}</p>
                }}
        </Location>
          */}
        <div className="SinglePost--Content container">
                  
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
            <Link to= {cat.category.split(" ").join("-").toLowerCase().replace("ă","a") + "/"} >
            NOT WORKING YET*/
            
            /* Working now :) */
            <Link to= {cat.category.split("/")[0].split(" ").join("-").toLowerCase().replace("ă","a")  + "/" + cat.category.split("/")[1].split(" ").join("").toLowerCase().replace("ă","a") + "/" }>

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

        </div>
        
      </div>

      
    </article>

    <nav className={`SecondNav stickyNav`}>
          <ul className="Nav--Container container secondNav"> 
            <li>
                <Link exact="true" to={`/`} activeStyle={activeStyles}>
                <span className="metaIcon"><FaHome /></span><span className="metaTitle">Acasă</span>
                </Link> 
            </li>

            <li tabindex="4">
              {/* Copy URL to Clipboard */}
              <Location>
                {({ location }) => {
                  
                  return  <CopyToClipboard text={location.href} style={{cursor:'pointer'}}>
                            <a className="aFocus" tabindex="2">
                            <span className="metaIcon noselect" ><FaShareSquareO/></span>
                            <span className="metaTitle noselect" >Partajeaza</span>
                            </a>
                          </CopyToClipboard>
                      }}
              </Location>
            </li>


            <li tabindex="1">
                      {/* Copy URL to Clipboard */}
          <Location>
            {({ location }) => {
              
              return  <CopyToClipboard text={location.href} style={{cursor:'pointer'}}>
                        <a className="aFocus" tabindex="2">
                        <span className="metaIcon noselect" ><IoLink/></span>
                        <span className="metaTitle noselect" >Copiaza link</span>
                        </a>
                      </CopyToClipboard>
                  }}
          </Location>
            </li>

          </ul> 
        </nav>



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
