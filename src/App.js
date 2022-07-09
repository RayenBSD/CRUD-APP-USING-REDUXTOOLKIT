import './App.css';

import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react';
import { addItem, deleteAll, deleteItem, updateItem } from './app/userSlice';

let id1 = 0;

function App() {

  let data = useSelector(state => state.user.items); 
  data = data.map (dt => JSON.parse(dt));

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [anyUser, setAnyUser] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  const dataLength = () => {
    if (data.length === 0) {
      anyUser(false);
    }
  }

  const newUser = (e) => {
    e.preventDefault();
    setAnyUser(true);

    let userData = {
      name: name,
      email: email,
      password: password,
    }
    userData = JSON.stringify(userData);

    dispatch(addItem(userData));
    setName("");
    setEmail("");
    setPassword("");
  }

  const EditUser = (id) => {
    setIsChanging(true);

    id1 = id;

    const edit = data.filter (dt => dt.id === id);

    setName (edit[0].name);
    setEmail (edit[0].email);
    setPassword (edit[0].password);
  }

  const setEdit = () => {
    console.log(id1);
    let editData = {
      id: id1,
      name: name,
      email: email,
      password: password,
    }

    editData = JSON.stringify(editData);

    dispatch (updateItem (editData));

    setIsChanging(false);
    setName("");
    setEmail("");
    setPassword("");
  }

  const deleteUser = (id) => {
    dispatch(deleteItem({id}));
    dataLength();
  }

  const generateUser = () => {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let random = 0;

    let name1 = "";
    for (let i = 0; i < 8; i++) {
      random = Math.floor(Math.random() * chars.length);
      name1 += chars[random];
    }
    setName (name1);

    let email1 = "";
    for (let i = 0; i < 8; i++) {
      random = Math.floor(Math.random() * chars.length);
      email1 += chars[random];
    }
    setEmail (`${email1}@gmail.com`)

    let password1 = "";
    for (let i = 0; i < 8; i++) {
      random = Math.floor(Math.random() * chars.length);
      password1 += chars[random];
    }
    setPassword(password1);
  }

  const deleteAllUsers = () => {
    dispatch(deleteAll());
    setAnyUser(false);
  }
  
  return (
    <main>
      <header>
        <h1>crud app using redux toolkit</h1>
      </header>

      {!isChanging && (<form className='getData' onSubmit={newUser}>
        <input placeholder='Enter your name' type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
        <input placeholder='Enter your email' type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        <input placeholder='Enter your password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        <button type='submit'>Add User</button>
      </form>)}

      {isChanging && (<form className='getData' onSubmit={setEdit}>
        <input placeholder='Enter your name' type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
        <input placeholder='Enter your email' type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        <input placeholder='Enter your password' type="text" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        <button type='submit'>Edit User</button>
      </form>)}

      <div>
        {anyUser && (<button onClick={deleteAllUsers}>Delete All</button>)}
        <button onClick={generateUser}>Generate User</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>id</th>  
            <th>name</th>  
            <th>email</th>  
            <th>password</th>  
            <th>Edit</th>
            <th>Delete</th>
          </tr>  
        </thead>
        <tbody>
            {
              data.map ( (dt, index) => (
                <tr key={index}>
                  <td>{dt.id}</td>  
                  <td>{dt.name}</td>  
                  <td>{dt.email}</td>  
                  <td>{dt.password}</td> 
                  <td onClick={() => EditUser(dt.id)} id="btn">Edit</td>
                  <td onClick={() => deleteUser(dt.id)} id="btn">Delete</td>           
                </tr>  
              ))
            }
        </tbody>
      </table>
    </main>
  );
}

export default App;