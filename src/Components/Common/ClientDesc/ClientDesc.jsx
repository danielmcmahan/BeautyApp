import React from 'react'

const ClientDesc = (props) => {
    const { writer, date, text } = props;

    return (
        <div className="desc mb-4">
            <div className="mb-3 desc-header">
                <span className="d-inline-block" dir="ltr">
                    {/* <i className="far fa-calendar ms-1"></i> */}
                    {date}
                </span>
                <span className="mx-3">|</span>
                <span>
                    {/* <i className="far fa-user-circle ms-1"></i> */}
                    {writer}
                </span>
            </div>

            <p className="text">
                {text}
            </p>
        </div>
    )
}

export default ClientDesc
