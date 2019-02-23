import React from "react"
import "./input.css"

const Input = (props) => {
    const { name, id, className, type, errors, placeholder, onChange, value, iconCode, label } = props;
    return (
        <div className="input-container">
            <div className="wrap-input100 validate-input">
                <input className=""
                    type={type}
                    name={name}
                    autoComplete="off"
                    id={id}
                    className={`input100 ${className}`}
                    placeholder={placeholder}
                    onChange={(ev) => onChange(ev)}
                    value={value}
                />
                <span className="focus-input100" data-placeholder={iconCode}></span>
            {errors.errorsObj[name] && <div className="error-wrapper">
                <p className="error text-left" >{errors.errorsObj[name].message}</p>
            </div>}
            </div>
        </div>

    )
}


const Datalist = (props) => {
    const { type, className, placeholder, iconCode, name, id, onChange, options, value, errors } = props;

    return (

        <div className="input-container">
            <div className="wrap-input100 validate-input">
                <input className=""
                    type={type}
                    name={name}
                    autoComplete="off"
                    list={name + "List"}
                    id={id}
                    className={`input100 ${className}`}
                    placeholder={placeholder}
                    onChange={(ev) => onChange(ev)}
                    value={value}
                />
                <span className="focus-input100" data-placeholder={iconCode}></span>
                {errors.errorsObj[name] && <div className="error-wrapper">
                <p className="error" >{errors.errorsObj[name].message}</p>
            </div>}
            </div>

            <datalist id={name + "List"}>
                {options.map((item, index) => {
                    return <option value={item.name} key={index}>{item.name}</option>
                })}
            </datalist>
          
        </div>
    )
}


const Select = (props) => {
    const { name, id, onChange, label, options, value, errors } = props;

    return (
        <div className="select-container">
            <div className="select-wrapper">
                <label htmlFor={id}>
                    <span className="label">{label}</span>
                    <select value={value} required={true} onChange={(ev) => onChange(ev)} name={name} id={id}>
                        {options.map((item, index) => {
                            return <option value={item.value} key={index}>{item.name}</option>
                        })}

                    </select>
                    {errors.errorsObj[name] && <div className="error-wrapper">
                        <p className="error" >{errors.errorsObj[name]}</p>
                    </div>}

                </label>
            </div>
        </div>
    )
}

export { Input, Select, Datalist };