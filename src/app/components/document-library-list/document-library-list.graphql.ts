import gql from 'graphql-tag'

export const DOCUMENT_LIST_QUERY = gql`
  query AllLinksSearchQuery1($filterCluase: [ItemSearchFieldQuery], $keyword: String!)
  {
    search(fieldsEqual: $filterCluase, keyword: $keyword) {
    results {items {item {id
    name
    path
    url
    ... on Document {
    title {value}
    doclink {value
      text
      url}
    documentTypeList{
      targetItems{
        id
        displayName
      }
    }
    techniquesList {
      targetItems {
        id
        displayName
      }
    }
    industryList{
      targetItems {
        id
        displayName
      }
    }
    separationModeList{
      targetItems {
        id
        displayName
      }
    }
    brandsList{
      targetItems {
        id
        displayName
      }
    }
}}}}}}
  `;

export const MASTER_LIST_QUERY = gql`
query masterLists($brandListPath: String!, $industryListPath: String!, $techniqueListPath: String!,
  $separationModeListPath: String!, $documentTypeListPath: String!, $phaseListPath: String!){
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
    brands: search(fieldsEqual: [{name: "_fullpath", value: $brandListPath}, {name: "_templatename", value: "Brand"}]) {
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
    documenttypes: item(path: $documentTypeListPath) {
      children {
        id
        ... on C__CommonReferenceTemplate {
          title {value}
        }
      }
    }
    phaseList: search(fieldsEqual: [{name: "_fullpath", value: $phaseListPath }, {name: "_templatename", value: "PhaseDetail"}])
    {
      results {
        items {
          item {
            ... on PhaseDetail {
							id
              name
              DisplayName : heading {value}
            }
          }
        }
      }
    }
  }`;
