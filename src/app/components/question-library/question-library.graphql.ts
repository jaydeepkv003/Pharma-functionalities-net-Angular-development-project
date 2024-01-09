import gql from 'graphql-tag';

export const QUESTIONS_LIST_QUERY = gql`
query AllLinksSearchQuery1($filterClause: [ItemSearchFieldQuery], $keyword: String!) {
    search(fieldsEqual: $filterClause, keyword: $keyword) {
        results {
            items {
                item {
                    id
                    name
                    path
                    url
                    ... on Question {
                    questionid {
                        value
                    }
                    questionstatement {
                        value
                    }
                    answer {
                        value
                    }
                    askeddate {
                        value
                    }
                    brandsList {
                      value
                      name
                      displayName
                      targetItems {
                        id
                        name
                      }
                    }
                    techniquesList {
                      targetItems {
                        id
                        name
                      }
                    }
                    separationModeList {
                      targetItems {
                        id
                        name
                      }
                    }
                    industryList {
                      targetItems{
                        id
                        name
                      }
                    }
                }
            }
        }
    }}}
  `;

export const MASTER_LIST_QUERY = gql`
query masterLists($brandListPath: String!, $industryListPath: String!, $techniqueListPath: String!, $separationModeListPath: String!){
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
    separationmodes: item(path: $separationModeListPath) {
      children {
        id
        ... on C__CommonReferenceTemplate {
          title {value}
        }
      }
    }
  }`;
