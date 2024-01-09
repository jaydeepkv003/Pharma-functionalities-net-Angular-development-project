import gql from 'graphql-tag';

export const PRODUCT_FINDER_QUERY = gql`
query ProductFinder($path: String!) {
  item(path: $path) {
    id
    hasChildren
    children {
      ... on ProductFinderTabTabs {
        heading {
          value
        }
        children {
          ... on ProductFinderTabTabsSection {
            heading {
              value
            }
            cardType {
              value
            }
            sectionName {
              value
            }
            children {
              ... on ProductFinderTabTabsSectionLinks {
                link {
                  url
                  text
                  target
                  linkType
                }
                subSectionText {
                  value
                }
                subSectionLink {
                    url
                    text
                    target
                    linkType
                }
                moduleName1 {
                  value
                }
                moduleLink1 {
                    url
                    text
                    target
                    linkType
                }
                moduleDescription1 {
                  value
                }
                moduleName2 {
                  value
                }
                moduleLink2 {
                    url
                    text
                    target
                    linkType
                }
                moduleDescription2 {
                  value
                }
                technicalDocumentHeading {
                  value
                }
                techDoc1Text {
                  value
                }
                techDoc1Link {
                    url
                    text
                    target
                    linkType
                }
                techDoc2Text {
                  value
                }
                techDoc2Link {
                    url
                    text
                    target
                    linkType
                }
                techDoc3Text {
                  value
                }
                techDoc3Link {
                    url
                    text
                    target
                    linkType
                }
                techDoc4Text {
                  value
                }
                techDoc4Link {
                    url
                    text
                    target
                    linkType
                }
                techDoc5Text {
                  value
                }
                techDoc5Link {
                    url
                    text
                    target
                    linkType
                }
              }
            }
          }
        }
      }
    }
  }
}`;
