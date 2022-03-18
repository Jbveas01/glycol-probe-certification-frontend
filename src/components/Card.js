import "./Card.css"
const Card = ({ title, stats, className }) => {
    return (
        <div className={className}>
            <h1 className="card-title">{title}</h1>
            <p className="card-stats">{stats}</p>
        </div>
    )
}

export default Card