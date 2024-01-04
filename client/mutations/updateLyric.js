import gql from 'graphql-tag';

export default gql`
  mutation UpdateLyric($id: ID!, $content: String, $likes: Int) {
    updateLyric(id: $id, content: $content, likes: $likes) {
      id
      content
      likes
      song {
        id
        title
      }
    }
  }
`;
