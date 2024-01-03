import gql from 'graphql-tag';

export default gql`
  mutation UpdateSong($id: ID, $title: String) {
    updateSong(id: $id, title: $title) {
      id
      title
    }
  }
`;
