import gql from 'graphql-tag'

export const PRESS_RELEASE_LIST_QUERY = gql`
query AllLinksSearchQuery($filterCluase: [ItemSearchFieldQuery]) {
  search(fieldsEqual: $filterCluase) {
    results {
      items {
        item {
          ... on PressReleaseSingle {
            heading {
              value
            }
            imageOne {
              src
            }
            articlePublishedDate {
              formattedDateValue(format: "MMMM dd, yyyy")
            }
            parent {
              name
            }
            pageLink {
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
  `;
