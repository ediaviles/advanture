import './IslandInfo.css'

export function IslandInfo({ island, handleCloseIslandInfo }) {
    return (
        <div className="island-info-container">
            <div className="island-info-header">
                <h1>{island.islandName}</h1>
                <div className="island-tags">
                    {island.tags.map((tag, index) => (
                        <span key={index} className="island-tag">{tag}</span>
                    ))}
                </div>
            </div>
            <div className="islandinfo-image-container">
                {island.images.map((image, index) => {
                    return(
                    <img key={index} src={image} alt={`${island.islandName}`} className="islandinfo-image" />)
                })}
            </div>
            <p className="island-description">{island.description}</p>
            <div className="island-close-button" onClick={handleCloseIslandInfo}>✕</div>
        </div>
    );
}
