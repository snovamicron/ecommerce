import { useState } from "react"
import "./Search.css"
 

const Search = ({ history }) => {
    const [keyWord, setKeyWord] = useState("")
    const searchSubmitHandler = (e) => {
        e.preventDefault()
        console.log(keyWord);
        if(keyWord.trim()){
            history.push(`/products/${keyWord}`)
        }else{
            history.push("/products")
        }
    }
    return (
        <>
        <form className="searchBox" onSubmit={(e) => searchSubmitHandler(e)} >
            <input 
            type="text"
            placeholder="Search a product...." 
            onChange={(e) => setKeyWord(e.target.value)}
            />
            <input type="submit" value="search"/>
        </form>
        </>
    )
}


export default Search