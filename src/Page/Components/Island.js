import './Island.css'
export function Island({isCentered, isUserIsland, island, island_image, idx=-1, displayIsland={}}) {
    //island -> {id, island_image, island_tag}
    const island_class = isUserIsland|isCentered ? "centered_island" : "island"
    return(
        <div className={`image-container ${island_class}`} onClick={() => {displayIsland(idx)}}>
            <img src={require(`${island_image}`)}/>
        </div>
    )
}