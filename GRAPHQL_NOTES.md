### Writing Mutations
```
type Comment {
   id: ID! 
   comment: String!
   author: String!
   talkId: Long!
}

# Input type for a new Comment
input InputComment {
    comment: String!
    author: String!
    talkId: Long!
}

type Mutation {
    # Add a new comment
    addComment(comment: InputComment!): Comment
}

##Then query should be
mutation {
  addComment(comment: {comment: "test comment", author: "Sample name", talkId: 123}) {
    id,
    comment,
    author,
    talkId
  }
}
```

### variables
```
{
  "passwordLoginInput": {
  	"username":"Joe", 
  	"password":"12345"
  }
}
```

### mutation
```
mutation login($passwordLoginInput: PasswordLoginInput!) {
  login(passwordLoginInput: $passwordLoginInput) {
    access_token
  }
}

```

### query
```
query {
  getAllUsers {
    name
    email
    password
  }
}
```

UNUSED
```
mutation {
  createUser(
    createUserData: { name: "Joe", password: "12345", email: "joe@joe.com" }
  ) {
    name
    email
    password
  }
}

mutation {
  login(passwordLoginInput: {name:"Joe", password:"12345"}) {
    name
  }
}
```