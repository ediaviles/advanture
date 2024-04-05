export function IslandInfo({island, handleCloseIslandInfo}) {
    return (
        <div>
            <p>{island.islandName}</p>
            <p>{island.owner_id}</p>
            <p>{island.description}</p>
            <ul>
                {island.tags.map((tag) => {
                    return(
                        <li>
                            {tag}
                        </li>
                    )
                })}
            </ul>
            <p onClick={() => {handleCloseIslandInfo()}}>close</p>
        </div>
    )
}