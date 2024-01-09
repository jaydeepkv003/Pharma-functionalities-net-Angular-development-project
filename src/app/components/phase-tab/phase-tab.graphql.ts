import gql from 'graphql-tag'

export const PHASE_COLLECTION_BY_PHASEID =gql`
  query Query($productsPath: String!,$phaseId: String!){
    search(rootItem: $productsPath, language:"*", fieldsEqual: [{name: "phaseId", value: $phaseId}, {name: "_templatename", value: "PhaseDetail"}]) {
    results {
      items {
        path
        id
        name
      }
    }
  }
}`;



