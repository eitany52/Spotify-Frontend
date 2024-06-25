import { useEffect, useState } from "react"
import { Link, Outlet, useLocation, useParams } from "react-router-dom"
import { AppSearch } from "../cmps/AppSearch"

export const StationIndex = () => {

    const params = useParams()
    const location = useLocation()
    const [isSearchDisplayed, setIsSearchDisplayed] = useState(false)

    useEffect(() => {
        getLocation()
        console.log(location);

    }, [location])

    function getLocation() {
        if (location.pathname.includes('search')) {
            setIsSearchDisplayed(true)
        }
        else {
            setIsSearchDisplayed(false)
        }

    }


    return (
        <div className="station-index">
            <header>
                {isSearchDisplayed && <AppSearch />}
                <button>Back</button>
                <button>Forward</button>
                <div>
                    <button>Settings</button>
                    <button>More</button>
                    {/* <UserPreview/> */}
                </div>
            </header>
            <aside>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/search">Search</Link>
                </nav>
                <section className="library">
                </section>
            </aside>
            <main>
                <Outlet />
            </main>
            <footer>
                {/* <AppPlayer/> */}
            </footer>
        </div>
    )
}
