import React from 'react'

const Container = (props) => {
    return (
        <div className="container h-100">
            {props.children}
        </div>
    )
}

export default Container
