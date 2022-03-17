import "./Card.css"
const Card = ({ title, stats }) => {
    return (
        <div className="card">
            <h1 className="card-title">{title}</h1>
            <p className="card-stats">{stats}</p>
        </div>
    )
}

export default Card