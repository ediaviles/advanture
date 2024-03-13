import './tagLabel.css'

export function TagLabel({tag, color}) {
    return (
        <div className="tag">
            <span className="tag-text">{tag}</span>
      </div>
    )
}