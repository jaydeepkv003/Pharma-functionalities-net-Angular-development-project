import gql from 'graphql-tag'

export const WEBINAR_LIST_QUERY = gql`
  query WebinarQuery($filterCluase: [ItemSearchFieldQuery])
  {
    search(
      fieldsEqual: $filterCluase
    ) {
      results {
        items {
          item {
            id
            name
            path
            url
            ... on MarkupWebinarSingle {
              webinartitle {
                value
              }
              summary {
                value
              }
              coverphoto {
                value
                alt
                src
                title
              }
              formLink {
                value
                text
                url
              }
              techniquesList {
                targetItems {
                  id
                  name
                }
              }
              industryList {
                targetItems {
                  id
                  name
                }
              }
              brandsList {
                targetItems {
                  id,
                  name
                }
              }
            }
          }
        }
      }
    }
  }
  `;

export const MASTER_LIST_QUERY = gql`
  query masterLists($brandListPath: String!, $industryListPath: String!, $techniqueListPath: String!){
    industries: search(fieldsEqual: [{name: "_fullpath", value: $industryListPath}, {name: "_templatename", value: "Industry"}])
    {
      results {
        items {
          item {
            ... on Industry {
              id
              name
              DisplayName : heading {value}
            }
          }
        }
      }
    }
    brands: search(fieldsEqual: [{name: "_fullpath", value: $brandListPath}, {name: "_templatename", value: "Brand"}])
    {
      results {
        items {
          item {
            ... on Brand {
              id
              name
              DisplayName : heading {value}
            }
          }
        }
      }
    }
    techniques: search(fieldsEqual: [{name: "_fullpath", value: $techniqueListPath}, {name: "_templatename", value: "Technique"}])
    {
      results {
        items {
          item {
            ... on Technique {
              id
              name
              DisplayName : heading {value}
            }
          }
        }
      }
    }
  }`;
