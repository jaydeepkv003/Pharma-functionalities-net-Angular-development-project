import gql from 'graphql-tag'

export const DOCUMENT_COLLECTION_BY_BRANDID = gql`
  query Query($filter: [ItemSearchFieldQuery]){
    search(
      fieldsEqual: $filter
    ) {
      results {
        items {
          item {
            id
            name
            path
            url
            ... on Document {

              title {
                value
              }

              doclink {
                value
                text
                url
              }

              documentTypeList{
                targetItems{
                  id
                  displayName
                }
              }
            }
          }
        }
      }
    }
  }`;

export const MASTER_LIST_QUERY = gql`
query masterLists($documentTypeListPath: String!){
  documenttypes: item(path: $documentTypeListPath) {
      children {
        id
        ... on C__CommonReferenceTemplate {
          title {value}
        }
      }
    }
  }`;

export const FEATURE_DOCUMENT_DETAIL = gql`
  query ProductQuery($sitecoreItemID: String!) {
    search(rootItem: $sitecoreItemID, fieldsEqual: [{name: "_templatename", value: "Brand"}]) {
      results {
        items {
          item {
            id
            name
            template {
              name
            }
            ... on Brand {
              brandId {
                value
              }
              techniqueId {
                value
              }
              featuredDocuments {
                targetItems {
                  id
                  name
                  url
                  ... on Document {
                    title {
                      value
                    }
                    phrJobNumber {
                      value
                    }
                    description {
                      value
                    }
                    doclink {
                      url
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
