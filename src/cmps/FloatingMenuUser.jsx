
export const FloatingMenuUser = ({ onDone }) => {

    function onLogout() {
        onDone()
    }
    return (
        <div className="floating-menu-user">
            <li onClick={onLogout}>Logout</li>
        </div>
    )
}
