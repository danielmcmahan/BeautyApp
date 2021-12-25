import React from 'react';

const Textarea = (props) => {
    const { field, change, value } = props;

    return (
        <textarea className="form-control textarea" cols="30" rows="6" name={field} value={value}
            placeholder="توضیحات اضافه خود را وارد نمایید" onChange={change}></textarea>
    )
}

export default Textarea
