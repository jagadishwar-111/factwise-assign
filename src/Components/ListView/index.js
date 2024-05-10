import React, { useState, useEffect } from 'react';
import { TailSpin } from 'react-loader-spinner';
import UserCard from "../UserCard";
import AddData from "../AddData"
import "./index.css";

const ListView = () => {
    const [searchValue, setSearchValue] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [celebritiesData, setCelebritiesData] = useState([]);
    const [showAddData,setShowAddData] = useState(false)

    const handleSearchInput = (e) => {
        setSearchValue(e.target.value);
        
    };

    const handleSearch = () => {
        getSearchData()
    }

    const handleAddData = async (obj) => {
        if (Object.entries(obj).length === 0){
            setShowAddData(false)
            
        }
        else{
            
            const url = `http://localhost:3001/celebrities/add`
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(obj)
            }
            const response = await fetch(url,options)
            const data = await response.json()
            alert(data)
            setShowAddData(false)
            getCelebritiesData()
        }
    }



    const getSearchData = async () => {
       
        const url = `http://localhost:3001/celebrities?search_q=${searchValue}`
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(url,options)
        const data = await response.json()
        const {rows} = data
        setCelebritiesData([...rows])
       
        
    }

    const onDeleteItem = async (id) => {
        const url = `http://localhost:3001/celebrities/${id}`
        const options = {
            method:"DELETE",
            headers:{
                'Content-Type':'application/json'
            }
        }

        const response = await fetch(url,options)
        const data = await response.json()
        alert(data)
        getCelebritiesData()
    };

    const onEditItem = async (obj) => {
        const {id} = obj
        const url = `http://localhost:3001/celebrities/${id}`
        const options = {
            method:"PUT",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(obj)
        }

        const response = await fetch(url,options)
        const data = await response.json()
        alert(data)
        getCelebritiesData()
    };

    const getCelebritiesData = async () => {
        try {
            const url = "http://localhost:3001";
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const response = await fetch(url, options);
            const data = await response.json();
            const { rows } = data;
            setCelebritiesData([...rows]);
            setIsLoading(false);
            
        } catch (error) {
            console.error("Error fetching data:", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getCelebritiesData();
        
        getSearchData()
      
    }, [searchValue]);

    return (
        <div className="home-container">
            <h2 className="main-heading">Celebrities Data</h2>
            <div className="search-card">
                <input
                    type="text"
                    placeholder="Search..."
                    onChange={handleSearchInput}
                    className="search-input"
                    value={searchValue}
                />
                <button onClick={handleSearch} className="search-button">Search</button>
            </div>
            {isLoading ? (
    <div className="tailspin-loader">
        <TailSpin color="rgb(230, 61, 61)" height={25} width={25} />
    </div>
) : (
    celebritiesData.length === 0 ? (
        <h3 className="no-res-found">No Results Found</h3>
    ) : (
        <ul className="list-container">
            {celebritiesData.map((eachCelebrityDetails) => (
                <UserCard
                    key={eachCelebrityDetails.id}
                    onEditItem={onEditItem}
                    onDeleteItem={onDeleteItem}
                    eachCelebrityDetails={eachCelebrityDetails}
                />
            ))}
        </ul>
    )
)}

    <button onClick={() => setShowAddData(!showAddData)} type="button" className="add-button">Add Celebrity</button>
    {showAddData && (<AddData handleAddData={handleAddData} showAddData ={showAddData}/>)}

        </div>
    );
}

export default ListView;
