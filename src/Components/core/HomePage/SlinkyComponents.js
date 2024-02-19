import React from 'react';
import './Css/Slinky.css';
import './Css/style2.scss';

function MyComponent() {
    return (
        <div className="shadow">
            <div className="triangle-wrapper">
                <div className="triangle">
                    <p>Todrick</p>
                </div>
            </div> 
        </div>
    );
}

function GlowEffect() {
    return (
        <div>
            <div className="glow"></div>
            <div className="particles">
                <div className="rotate">
                    <div className="angle">
                        <div className="size">
                            <div className="position">
                                <div className="pulse">
                                    <div className="particle"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="angle">
                        <div className="size">
                            <div className="position">
                                <div className="pulse">
                                    <div className="particle"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="angle">
                        <div className="size">
                            <div className="position">
                                <div className="pulse">
                                    <div className="particle"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { MyComponent, GlowEffect }; // Exporting components individually
