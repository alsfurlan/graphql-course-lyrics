import gpl from 'graphql-tag';

export default gpl `
    mutation DeleteSong($id: ID) {
        deleteSong(id: $id) {
            id
            title
        }
    }
`