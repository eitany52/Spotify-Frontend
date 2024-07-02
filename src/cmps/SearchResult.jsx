import { useEffect } from "react"
import { useParams } from "react-router"

export const SearchResult = () => {
    const params = useParams()

    useEffect(() => {


    }, [])

    function action() {
        // const searchTerm = 'rap-song'
        // const res = await fetch(`https://www.googleapis.com/youtube/v3/search?q=${searchTerm}&part=snippet&key=AIzaSyCUE7BdmEO9uF_gWcV5yY5O3eqyINxdavo`)
        // const data = await res.json()
    }


    return (
        <div>
            {/* <RecentSearches/> */}
            {params.name &&
                <section>
                    <h2>Top result</h2>
                </section>}
            <h1>Suggestions</h1>
        </div>
    )
}
