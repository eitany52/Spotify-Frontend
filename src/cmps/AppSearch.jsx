import searchRes from './../../data/serch.json'


export const AppSearch = () => {


    console.log(searchRes);


    async function onSearch(ev) {
        ev.preventDefault()
        console.log(searchRes);
        // const searchTerm = 'rap-song'
        // const res = await fetch(`https://www.googleapis.com/youtube/v3/search?q=${searchTerm}&part=snippet&key=AIzaSyCUE7BdmEO9uF_gWcV5yY5O3eqyINxdavo`)
        // const data = await res.json()
        // console.log(data);
    }

    return (
        <div>
            <header>
                <form className="search-form" onSubmit={onSearch}>
                    <label className="icon-search"></label>
                    <input
                        type="text"
                        placeholder="What do you want to play?" />
                </form>
            </header>
            {/* <RecentSearches/> */}
            {/* Browse all */}
        </div>
    )
}
