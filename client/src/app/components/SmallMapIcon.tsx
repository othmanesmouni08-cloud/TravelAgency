import { useState, useEffect } from 'react';
import { Page } from '../App';

interface SmallMapIconProps {
    setCurrentPage: (page: Page) => void;
}

export function SmallMapIcon({ setCurrentPage }: SmallMapIconProps) {
    const [svgContent, setSvgContent] = useState<string>('');

    useEffect(() => {
        fetch('/images/ma.svg')
            .then(res => res.text())
            .then(data => {
                // Clean up the SVG and inject our styles
                const parser = new DOMParser();
                const doc = parser.parseFromString(data, 'image/svg+xml');
                const svg = doc.querySelector('svg');

                if (svg) {
                    // Set fixed size and preserve aspect ratio
                    svg.setAttribute('width', '500');
                    svg.setAttribute('height', '500');
                    svg.setAttribute('class', 'hover:scale-110 transition-transform duration-300 cursor-pointer drop-shadow-lg');

                    // Style all paths
                    const paths = svg.querySelectorAll('path');
                    paths.forEach((path) => {
                        if (path.id === 'MA02') {
                            // Oriental region - highlighted
                            path.setAttribute('fill', '#14b8a6');
                            path.setAttribute('fill-opacity', '0.8');
                            path.setAttribute('stroke', '#ffffff');
                            path.setAttribute('stroke-width', '1');
                        } else {
                            // Other regions - subtle
                            path.setAttribute('fill', '#cbd5e1');
                            path.setAttribute('fill-opacity', '0.5');
                            path.setAttribute('stroke', '#ffffff');
                            path.setAttribute('stroke-width', '0.5');
                        }
                    });

                    setSvgContent(svg.outerHTML);
                }
            })
            .catch(err => console.error('Error loading map:', err));
    }, []);

    const handleClick = () => {
        setCurrentPage('activities');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div
            onClick={handleClick}
            className="inline-block cursor-pointer group animate-pulse hover:animate-none"
            dangerouslySetInnerHTML={{ __html: svgContent }}
        />
    );
}
