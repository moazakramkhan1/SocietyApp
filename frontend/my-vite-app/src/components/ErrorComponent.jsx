
import "../styles/ErrorComponent.css"
function myError({ message }) {
    return <div className="error">
        <p>{message}</p>
    </div>

}

export default myError