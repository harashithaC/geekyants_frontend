import { TextField } from '@mui/material'
import React from 'react'

const TextFieldComponent = ({ label, name, placeholder, proId, desc, handleChange, handleBlur, touched, errors, values }) => {
    return (
        <>
            <TextField
                fullWidth
                autoComplete="off"
                variant="outlined"
                disabled={proId ? true : false}
                type="text"
                label={label}
                name={name}
                placeholder={placeholder}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values || ""}
                rows={desc ? 3 : 1}
                multiline={desc ? true : false}
                error={!!touched && !!errors}
                helperText={touched && errors}
            />
        </>
    )
}

export default TextFieldComponent