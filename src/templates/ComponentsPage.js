import React from 'react'
import { graphql } from 'gatsby'
import './ComponentsPage.css'
import PageHeader from '../components/PageHeader'
import Content from '../components/Content.js'
import Layout from '../components/Layout.js'
import Gallery from '../components/Gallery'

// Export Template for use in CMS preview
export const ComponentsPageTemplate = ({
  title,
  subtitle,
  featuredImage,
  section1,
  section2,
  gallery
}) => (
  <main>
    <PageHeader
      title={title}
      subtitle={subtitle}
      backgroundImage={featuredImage}
    />
        <section className="section">
      <div className="container">
        <h2 className="fundamentCrestin">Fundamentul crestin</h2>
        <Gallery images={gallery} />
      </div>
    </section>

    <section className="section">
      <div className="container">
        <h2 className="fundamentCrestin">I. Viata - A trait sau nu pe pamant?</h2>
        
          <table id="customers">
          <tr>
            <th className="nuCrestinSursa">Surse necrestine</th>
            <th className="nuCrestinReferinta">Referinte</th>
          </tr>
          <tr>
            <td>
              <span className="nameFancy"><b>Cornelius Tacitus</b></span><span>(c.56 – c.120 d.Hr)</span>
              <span><i>senator roman, considerat unul dintre cei mai mari istorici romani.</i>
                <sup><a href="#notă1" id="ref1">[1]</a></sup>
                <sup><a href="#notă2" id="ref2">[2]</a></sup>
              </span>
            </td>
            <td>
              <span><i>"...Christus, from whom the name had its origin, suffered the extreme penalty 
                during the reign of Tiberius at the hands of ... Pontius Pilatus </i><a href="https://classicalwisdom.com/latin_books/the-annals-by-tacitus-xv/10/" 
              target="_blank" rel="noopener noreferrer"><u>[Annals XV:10]</u></a></span>
  
            </td>
          </tr>

          <tr>
            <td><span className="nameFancy"><b>Flavius Josephus</b></span><span>(37 – c. 100 d.Hr)</span><span><i>istoric romano-evreu al sec. I</i></span></td>
            <td>
              <span><i>"Ananus...assembled the Sanhedrin of judges... 
              and brought before them the brother of Jesus who was called Christ, 
              whose name was James..." [<a href="http://penelope.uchicago.edu/josephus/ant-20.html" 
              target="_blank" rel="noopener noreferrer"><u>Antiquities XX:9-26</u></a>]</i></span>
              <span><i>"Ananus...assembled the Sanhedrin of judges... 
              and brought before them the brother of Jesus who was called Christ, 
              whose name was James..." [<a href="http://penelope.uchicago.edu/josephus/ant-20.html" 
              target="_blank" rel="noopener noreferrer"><u>Antiquities XX:9-26</u></a>]</i></span>
              </td>
          </tr>



          <tr>
            <td>Centro comercial</td>
            <td>Francisco Chang</td>

          </tr>
          <tr>
            <td>Ernst Handel</td>
            <td>Roland Mendel</td>
       
          </tr>
          <tr>
            <td>Island Trading</td>
            <td>Helen Bennett</td>
           
          </tr>
          <tr>
            <td>Königlich Essen</td>
            <td>Philip Cramer</td>
            
          </tr>
          <tr>
            <td>Laughing Bacchus</td>
            <td>Yoshi Tannamuri</td>
           
          </tr>
          <tr>
            <td>Magazzini Alimen</td>
            <td>Giovanni Rovelli</td>
         
          </tr>
          <tr>
            <td>North/South</td>
            <td>Simon Crowther</td>
           
          </tr>
          <tr>
            <td>Paris spécialités</td>
            <td>Marie Bertrand</td>
           
          </tr>
  </table>

        <span><sup id="notă1">1.<a href="#ref1" title="Sari inapoi."><b>^</b></a>[Van Voorst, Robert E (2000). Jesus Outside the New Testament: An Introduction to the Ancient Evidence. Eerdmans Publishing. pp. 39–42]</sup></span>
        <span><sup id="notă2">2.<a href="#ref2" title="Sari inapoi."><b>^</b></a>[Ferguson, Everett (2003). Backgrounds of Early Christianity. p. 116.]</sup></span>
        
      </div>
    </section>



    <section className="section">
      <div className="container">
        <Content source={section1} />
      </div>
    </section>



    <section className="section">
      <div className="container">
        <Content source={section2} />
      </div>
    </section>

  </main>
)

const ComponentsPage = ({ data: { page } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <ComponentsPageTemplate {...page} {...page.frontmatter} body={page.html} />
  </Layout>
)

export default ComponentsPage

export const pageQuery = graphql`
  query ComponentsPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      ...Gallery
      html
      frontmatter {
        title
        template
        subtitle
        featuredImage
        section1
        section2
      }
    }
  }
`
