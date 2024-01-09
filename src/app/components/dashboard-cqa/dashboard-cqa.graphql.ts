import gql from 'graphql-tag'

export const DOCUMENT_LIST_QUERY = gql`
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

            title {value}
            description {value}

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
  query Query($brandID: String!, $techniqueID: String!) {
    brand: search(rootItem: "$productsPath", fieldsEqual: [{name: "_templatename", value: "Brand"}, {name: "brandId", value: $brandID}]) {
      results {
        items {
          id
        }
      }
    }
    technique: search(rootItem: "$productsPath", fieldsEqual: [{name: "_templatename", value: "Technique"}, {name: "techniqueID", value: $techniqueID}]) {
      results {
        items{
          id
        }
      }
    }
  }`;
