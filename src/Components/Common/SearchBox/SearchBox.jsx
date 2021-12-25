import React from 'react';

const SearchBox = ({ InputSearchHandler, ButtonSearchHandler }) => {
    return (
        <form className="search-box" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    onChange={InputSearchHandler}
                    placeholder="جستجو کنید ...."
                />
                <button className="btn" type='button' onClick={ButtonSearchHandler}>
                    <i className="bi bi-search"></i>
                </button>
            </div>
        </form>
    )
}

export default SearchBox
