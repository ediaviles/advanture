import './tagLabel.css'

export function TagLabel({tag, color, handleRemove, idx}) {
    return (
        <div className="tag" onClick={() => handleRemove(idx)}>
            <span className="tag-text">{tag}</span>
      </div>
    )
}