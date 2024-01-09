import gql from 'graphql-tag';

export const VALIDATION_MESSAGES = gql`query Query($itemPath: String!){
  search(rootItem: $itemPath) {
  results {
  items
  {
  item{
  name
  Key: field(name : "Key") {
  value
  }
  Phrase: field(name : "Phrase") {
  value
  }
  }
  }
  }
  }
  }
`;
