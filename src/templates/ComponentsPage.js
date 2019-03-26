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
            <td><span className="nameFancy"><b>Flavius Josephus</b></span>
            <span>(37 – c. 100 d.Hr)</span><span><i>istoric romano-evreu, sec. I</i></span></td>
            <td>
              <span><i>"Ananus...assembled the Sanhedrin of judges... 
              and brought before them the brother of Jesus who was called Christ, 
              whose name was James..." <a href="http://penelope.uchicago.edu/josephus/ant-20.html" 
              target="_blank" rel="noopener noreferrer"><u>[Antiquities XX:9-26]</u></a></i></span>
              <hr />
              <span><i>"About this time there lived Jesus...For he ... wrought surprising feats
              .... He was the Christ. When Pilate ...condemned him to be crucified. 
              <a href="https://www.quora.com/What-did-Josephus-really-write-about-Jesus-in-the-first-century" 
              target="_blank" rel="noopener noreferrer"><u>[Testimonium Flavianum]</u></a></i></span>
            </td>
          </tr>

          <tr>
            <td><span className="nameFancy"><b>Pliniu cel Tanar</b></span><span>(61 – c. 113 d.Hr)</span>
            <span><i>avocat, autor si magistrat roman, sec. I</i></span></td>
            <td>
              <span><i>"...when they sang in alternate verses a hymn to Christ, as to a god, 
                and bound themselves by a solemn oath..." <a href="http://www.vroma.org/~hwalker/Pliny/Pliny10-096-E.html" 
              target="_blank" rel="noopener noreferrer"><u>[Letter 10.96, To the Emperor Trajan]</u></a></i></span>
            </td>
          </tr>

          

          <tr>
            <td><span className="nameFancy"><b>Talmudul Babilonian</b></span>
           </td>
            <td>
              <span><i>"On the eve of the Passover Yeshu  was hanged. For forty days before the execution 
                took place, a herald went forth and cried, 'He is going forth to be stoned because he has practised 
                sorcery.... he was hanged on the eve of the Passover..." 
                <a href="http://www.come-and-hear.com/sanhedrin/sanhedrin_43.html" 
              target="_blank" rel="noopener noreferrer"><u>[Tractate Sanhedrin, Folio 43a]</u></a></i></span>
           <span className="exPlanation">*Actually, "Yeshu" (or "Yeshua") is how Jesus' name is pronounced in Hebrew. the term "hanged" 
                can function as a synonym for "crucified." For instance, Galatians 3:13 declares that Christ was "hanged", and Luke 23:39 applies this term to the criminals who were crucified with Jesus.</span>
            </td>
          </tr>

          
          <tr>
          <td><span className="nameFancy"><b>Lucian din Samosata</b></span>
          <span>(c. 125 – after 180 d.Hr)</span><span><i>retoric si satirist sirian, sec. II</i></span></td>
          
            <td>
              <span><i>"The Christians ... worship a man to this day...who introduced their novel...and was crucified on that account.
              ...they are all brothers, from the moment that they are converted, and deny the gods of Greece, and worship the crucified 
              sage, and live after his laws." 
                <a href="https://en.wikipedia.org/wiki/Passing_of_Peregrinus" 
              target="_blank" rel="noopener noreferrer"><u>[Passing_of_Peregrinus]</u></a></i></span>
            </td>
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
