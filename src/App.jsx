import './App.css'
import Login from './component/signIn_Page'
import Forgot from './component/forgot_ps'
import Resetpassword from './component/resetpassword'
import Dashboard from './component/dashboard'
import NewAdd from './component/NewAdd'
import ViewStudent from './component/viewStudentprofile'
import GetStartedPage from './component/getstart'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<GetStartedPage />} />
          <Route path='/signIn_Page' element={<Login />} />
          {/* <Login/> */}
          <Route path="/forgot_ps" element={<Forgot/>}/>
          <Route path="/resetpassword" element={<Resetpassword />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/NewAdd" element={<NewAdd />}/>
          <Route path="/viewStudentprofile" element={<ViewStudent/>}/>
          

        </Routes>
      </BrowserRouter>
    </>

  )
}
 export default App
// import React, { useEffect, useState } from "react";
// import { collection, addDoc, getDocs, onSnapshot, updateDoc, deleteDoc, doc } from "firebase/firestore";
// import { db } from "./component/firebase";

// // npm install firebase 
// function App() {
//   const [users, setUsers] = useState([]);

//   // Realtime listener (auto updates like WebSocket)
//   useEffect(() => {
//     const unsub = onSnapshot(collection(db, "users"), (snapshot) => {
//       console.log(snapshot.docs);

//       setUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
//     });


//     // const fetchUsers = async () => {
//     //   const querySnapshot = await getDocs(collection(db, "users"));
//     //   const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     //   console.log(users);
//     // };
//     // fetchUsers()
//     return () => unsub();
//   }, []);

//   console.log(users);

//   // Add user
//  const addUser = async () => {
//   await addDoc(collection(db, "users"), {
//     name: "Arshad",
//     email: "arshad@gmail.com",
//     age: 23
//   });
// };


//   // Update user
//   const updateUser = async (id) => {
//     const userRef = doc(db, "users", id);
//     const ok = { name: "Updated Name" }
//     await updateDoc(userRef, ok);
//   };

//   // Delete user
//   const deleteUser = async (id) => {
//     await deleteDoc(doc(db, "users", id));
//   };


//   return (
//     <div>
//       <h1>Users (Realtime)</h1>
//       <button onClick={addUser}>Add User</button>
//       <ul>
//         {users.map(user => (
//           <li key={user.id}>
//             {user.name} ({user.email}) - {user.age}
//             <button onClick={() => updateUser(user.id)}>Update</button>
//             <button onClick={() => deleteUser(user.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;
