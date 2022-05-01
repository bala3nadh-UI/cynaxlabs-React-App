import React, { useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import * as productService from "../../services/productService";

const initialFValues = {
    id: 0,
    product: '',
    typeId: '',
    quantity: 0,
    unitPrice: 0
}

export default function ProductForm(props) {
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('product' in fieldValues)
            temp.product = fieldValues.product ? "" : "This field is required."
        if ('typeId' in fieldValues)
            temp.typeId = fieldValues.typeId.length !== 0 ? "" : "This field is required."
        if ('quantity' in fieldValues)
            temp.quantity = fieldValues.quantity > 0 ? "" : "Should be greater than Zero"
        if ('unitPrice' in fieldValues)
            temp.unitPrice = fieldValues.unitPrice > 0 ? "" : "Should be greater than Zero"
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            addOrEdit(values, resetForm);
        }
    }

    useEffect(() => {
        if (recordForEdit !== null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit, setValues])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name="product"
                        label="Product"
                        value={values.product}
                        onChange={handleInputChange}
                        error={errors.product}
                    />
                    <Controls.Input
                        name="quantity"
                        label="Quantity"
                        value={values.quantity}
                        onChange={handleInputChange}
                        error={errors.quantity}
                    />
                    <Controls.Input
                        name="unitPrice"
                        label="unit price"
                        value={values.unitPrice}
                        onChange={handleInputChange}
                        error={errors.unitPrice}
                    />
                    <Controls.Select
                        name="typeId"
                        label="Type"
                        value={values.typeId}
                        onChange={handleInputChange}
                        options={productService.getTypesCollection()}
                        error={errors.typeId}
                    />
                </Grid>
                <Grid item xs={6}>
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}
