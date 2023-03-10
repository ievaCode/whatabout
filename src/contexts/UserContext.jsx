import { createContext, useState, useEffect } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {

  
  const loggedinUserState  = sessionStorage? JSON.parse(sessionStorage.getItem('currentUser')) : null;
  const [loggedInUser, setLoggedInUser] = useState(loggedinUserState);
  const [users, setUsers] = useState();


  const fetchUsers = async () => {
    const usersReceived = await fetch('http://localhost:5000/users')
      .then(res => res.json());
    setUsers(usersReceived); 
  } 

  useEffect(() => {
    fetchUsers();
  }, [])

  // CRUD functions
  let post = (data) => {
    fetch('http://localhost:5000/users', {
      method: "POST",
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(data)
    })
  }
  let remove = (id) => {
    fetch(`http://localhost:5000/users/${id}`, {
      method: "DELETE"
    })
  }
  let updateWithPUT = (id, newUserObject) => {
    fetch(`http://localhost:5000/users/${id}`, {
      method: "PUT",
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(newUserObject)
    })
  }
  let updateWithPATCH = (id, newUser) => { 
    fetch(`http://localhost:5000/users/${id}`, {
      method: "PATCH",
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(newUser)
    })
    .then(res => res.json())
    .then(data => console.log(data));
  }

  return (
    <UserContext.Provider
      value={{
        users,
        setUsers,
        loggedInUser,
        setLoggedInUser,
        post,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider };
export default UserContext;