import gql from 'graphql-tag'

export const WEBINAR_DETAIL = gql`
  query Query($webinarId: String!, $webinarsListPath: String!){
    search(rootItem: $webinarId,  fieldsEqual: [
        {name: "_fullpath", value: $webinarsListPath},
        {name: "_templatename", value: "MarkupWebinarSingle"}
      ]) {
      results {
        items {
          item {
            ... on MarkupWebinarSingle {
              webinartitle {value}
              summary {value}
              coverphoto { src }
              formLink{text url}
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
            }
          }
        }
      }
    }
  }`;


  // export const WEBINAR_DETAIL = gql`
  // query Query($webinarId: String!, $webinarsListPath: String!){
  //   search(rootItem: $webinarId,  fieldsEqual: [
  //       {name: "_fullpath", value: $webinarsListPath},
  //       {name: "_templatename", value: "Document"}
  //     ]) {
  //     results {
  //       items {
  //         item {
  //           ... on WebinarSingle {
  //             title {value}
  //             description {value}
  //             doclink {text
  //               url}
  //             brandsList { targetItems{ name url} }
  //             industryList { targetItems{ name url} }
  //             techniquesList  { targetItems{ name url} }
  //           }
  //         }
  //       }
  //     }
  //   }
  // }`;
