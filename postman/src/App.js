import {useState, useEffect} from "react";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


function App() {
    const [customers, setCustomers] = useState([]);
    const [editingCustomer, setEditingCustomer] = useState(false);
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [name, setName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newId, setNewId] = useState(null);
    const [newName, setNewName] = useState('');
    const [noResultFound, setNoResultFound] = useState(false);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchSubmitted, setSearchSubmitted] = useState(false);
    const [user, setUser] = useState({});

    const handleCallbackResponse= (response)=> {
        var userObject = jwtDecode(response.credential);
        setLoggedIn(true);
        setUser(userObject);
        document.getElementById("signInDiv").hidden = true;
    }

    const handleSignOut = (event) => {
        setUser({});
        setLoggedIn(false);
        document.getElementById("signInDiv").hidden = false;
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "955568137419-b1hsm5gmouemhhr25s1l9op6hu8b8ajj.apps.googleusercontent.com",
            callback: handleCallbackResponse
        })
        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {theme: "outline", size: "large"}
        );
        google.accounts.id.prompt();
    }, []);

    useEffect(() => {
        getCustomers();
    }, [editingCustomer, noResultFound]);

    const displayAllCustomers = () => {
        setSearchSubmitted(false);
        setSearchResults([]);
        setNoResultFound(false);
    }

    const deleteCustomer = (e, id) => {
        e.preventDefault();
        axios.delete('/delete/' + id)
            .then((res, err) => {
                console.log(res)
            })
            .catch((error) => {
                console.log(error)
            })
        setNoResultFound(false);
        setSearchSubmitted(false);
        setEditingCustomer(false);
        getCustomers();
        setSearch('');
    }
    const editCustomer = (id, name, email) => {
        setEditingCustomer(true);
        setNoResultFound(false);
        setSearchSubmitted(false);
        setName(name);
        setEmail(email);
        setId(id);
    }

    const getCustomers = () => {
        fetch('/fetchData')
            .then(response => response.json())
            // .then(data => console.log(data))
            .then(data => {
                setCustomers(data)
            })
            .catch(error => console.error(error))
    }

    const handleEditSubmit = (e) => {
        e.preventDefault();
        axios.put('/update/' + id, {name, email})
            .then((res, err) => {
                if(res.data) {
                    console.log('updated')
                } else {
                    console.log(err, 'customer not updated')
                }
            })
        setEditingCustomer(false);
        setNoResultFound(false);
        setSearchSubmitted(false);
        setSearch('');
    }

    const handleNewCustomer = (e) => {
        e.preventDefault();
        axios({
            method: 'post',
            url:'/postData',
            data:{
                name: newName,
                email: newEmail,
                id: newId
            }
        })
        getCustomers();
        setNewName('');
        setNewId(0);
        setNewEmail('');
    }

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
        const filterCustomers = customers.filter((item) => {
            if (item.id === Number(event.target.value)){
                return item;
            } else {
                return false;
            }
        });
        if(filterCustomers.length > 0){
            setSearchResults(filterCustomers[0]);
            setNoResultFound(false);
            setSearchSubmitted(true);
        } else {
            setSearchResults([]);
            setSearchSubmitted(false);
            setNoResultFound(true);
        }
    }

    const submitSearch = () => {
        setSearchSubmitted(true);
        setSearch('');
        setEditingCustomer(false);
    }

    return (
        <div className="App">
            <div id="signInDiv"></div>
            { Object.keys(user).length !== 0 &&
                <button className="sign-out-btn" onClick={(e) => handleSignOut(e)}>Sign Out</button>
            }
            { loggedIn ?
                <div>
                    <div>
                        <img alt={'Google User'} src={user.picture}></img>
                        <h3>{user.name}</h3>
                    </div>

                    <p>Search for Customer by ID</p>
                    <div>
                      <input
                        type='text'
                        value={search}
                        onChange={handleSearchChange}
                      />
                      <button
                        onClick={submitSearch}
                        style={{marginLeft:'5px', marginRight:'5px'}}
                      >Submit</button>
                        <button
                            onClick={displayAllCustomers}
                        >Display All Customers
                        </button>
                    </div>
                    <div>
                        <p>Enter New Customer</p>
                        <form onSubmit={(e) => {handleNewCustomer(e)}}>
                            <label>
                                Name:
                                <input
                                    type="text"
                                    name="name"
                                    value={newName}
                                    onChange={(e) => {setNewName(e.target.value)}}
                                    style={{marginRight: '5px', marginLeft: '5px'}}
                                />
                            </label>
                            <label>
                                Email
                                <input
                                    type='text'
                                    value={newEmail}
                                    onChange={(e) => {setNewEmail(e.target.value)}}
                                    style={{marginRight: '5px', marginLeft: '5px'}}
                                />
                            </label>
                            <label>
                                ID
                                <input
                                    type='number'
                                    value={newId}
                                    onChange={(e) => {setNewId(e.target.value)}}
                                    placeholder={''}
                                    style={{marginRight: '5px', marginLeft: '5px'}}
                                />
                            </label>
                            <input type="submit" value="Enter New Customer" />
                        </form>
                    </div>
                    <div>
                        {searchSubmitted ?
                            <p className="customer-title">Searched Customer</p>
                            :
                            <p className="customer-title" key={'customer'}>Customers</p>
                        }
                    </div>
                    <div className='result-list'>
                        { searchSubmitted && !noResultFound ?
                            <ul>
                                <li key={"name"}>Name: {searchResults.name}</li>
                                <li key={'email'}>Email: {searchResults.email}</li>
                                <li key={'id'}>ID: {searchResults.id}</li>
                                <button
                                    onClick={() => {editCustomer(searchResults.id, searchResults.name, searchResults.email)}}
                                >edit
                                </button>
                                <button
                                    onClick={(e) => {deleteCustomer(e, searchResults.id)}}
                                >delete</button>
                            </ul>
                            : noResultFound && searchSubmitted && !editingCustomer ?
                                <p>No Result Found</p>
                                : !searchSubmitted && !noResultFound &&  editingCustomer?
                                    <span>
                                        Name:
                                        <input
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                        />
                                        Email:
                                        <input
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                        />
                                        <button
                                            onClick={handleEditSubmit}
                                        >Submit Edit</button>
                                    </span>
                            : customers.map((item, index) => (
                                <ul>
                                    <li key={"name"}>Name: {item.name}</li>
                                    <li key={'email'}>Email: {item.email}</li>
                                    <li key={'id'}>ID: {item.id}</li>
                                </ul>
                            ))

                    }
                    </div>
                </div>
                : <></>
            }
        </div>
  );
}

export default App;
