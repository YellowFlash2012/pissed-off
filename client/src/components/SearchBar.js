
import axios from "axios";
import { useEffect, useState } from "react";

const SearchBar = () => {
    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    const fetchData = async () => {
        const res = await axios.get("https://jsonplaceholder.typicode.com/users")

        setUsers(res.data)
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (query) {
            setSearchResult(users.filter(user => (
                Object.values(user).join("").toLowerCase().includes(query.toLowerCase())
            )))
        } else {
            setUsers(users)
        }
    },[users,query])

    return <div>
        SearchBar

        {query.length > 0 ? (
            searchResult.map(data => (
                <>
                <h2>{ data.name}</h2>
                </>
            ))
        ) : (users.map(user => (
            <h2>{ user.name}</h2>
        )))}
    </div>;
};
export default SearchBar;
