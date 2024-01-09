import gql from 'graphql-tag';

export const DOCUMENT_DETAIL = gql`
  query Query($docId: String!) {
    search(
      rootItem: $docId
      fieldsEqual: [{ name: "_templatename", value: "Document" }]
    ) {
      results {
        items {
          item {
            ... on Document {
              title {
                value
              }
              description {
                value
              }
              doclink {
                text
                url
              }
              documentTypeList {
                targetItems {
                  name
                }
              }
              brandsList {
                targetItems {
                  name
                  url
                  ... on Brand {
                    heading {
                      value
                    }
                  }
                }
              }
              techniquesList {
                targetItems {
                  name
                  url
                  ... on Technique {
                    heading {
                      value
                    }
                  }
                }
              }
              industryList {
                targetItems {
                  name
                  url
                  ... on Industry {
                    heading {
                      value
                    }
                  }
                }
              }
              separationModeList {
                targetItems {
                  name
                  url
                }
              }
              phaseList {
                targetItems {
                  name
                  url
                  ... on PhaseDetail {
                    heading {
                      value
                    }
                  }
                }
              }
              associatedProducts {
                value
              }
            }
          }
        }
      }
    }
  }
`;
