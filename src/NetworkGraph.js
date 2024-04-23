import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ForceGraph2D } from 'react-force-graph';
import * as apiService from './services/apiService'

export function NetworkGraph() {
    const [graphData, setGraphData] = useState({ nodes: [], links: [] });


    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch all usernames
                const usernames = await apiService.getAllUsers()
                const nodes = usernames.map(username => ({ id: username, name: username }));

                // Prepare to fetch links
                let links = [];

                // Fetch links (who follows whose islands)
                for (const username of usernames) {
                    const islandsRes = await apiService.getUsersFromUsername({username: username});
                    console.log(islandsRes, username)
                    if (islandsRes !== null && islandsRes.length >= 1) {
                        islandsRes.forEach(owner => {
                            if (owner !== username) { // Avoid self-links
                                links.push({ source: username, target: owner });
                            }
                        });
                    }
                }

                setGraphData({ nodes, links });

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    const nodeCanvasObject = (node, ctx, globalScale) => {
        const label = node.name;
        const fontSize = 12 / globalScale;
        ctx.font = `${fontSize}px Sans-Serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = node.color;

        // Draw a circle for the node
        ctx.beginPath();
        ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI, false);
        ctx.fill();

        // Only draw the label when zoomed in to avoid clutter
        if (fontSize > 5) {
            ctx.fillText(label, node.x, node.y + 8);
        }
    };

    const handleNodeHover = node => {
        // Display a tooltip or highlight node connections
    };

    return (
        <div style={{ width: '100%', height: '600px' }}>
            <ForceGraph2D
                graphData={graphData}
                nodeAutoColorBy="group"
                nodeCanvasObject={nodeCanvasObject}
                onNodeHover={handleNodeHover}
                linkDirectionalParticles={2}
                linkDirectionalParticleSpeed={d => d.value * 0.001}
                linkDirectionalParticleWidth={2}
                linkColor={() => 'rgba(50,50,50,0.2)'}
            />
        </div>
    );
}
