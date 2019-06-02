import React from 'react';

const Loader = () =>{
    return (
        <div className="main-loader">
            <div className="preloader-wrapper small active">
                <div className="spinner-layer spinner-green-only">
                <div className="circle-clipper left">
                    <div className="circle"></div>
                </div><div className="gap-patch">
                    <div className="circle"></div>
                </div><div className="circle-clipper right">
                    <div className="circle"></div>
                </div>
                </div>
            </div>
            <div className = "loading-text" >Loading Please wait....</div>
        </div>
        
    )
}

export default Loader;