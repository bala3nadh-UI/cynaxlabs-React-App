import React, { useState } from 'react'
import ProductForm from "./ProductForm";
import PageHeader from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from "../../components/useTable";
import * as productService from "../../services/productService";
import Controls from "../../components/controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import Popup from "../../components/Popup";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Slider from '@material-ui/core/Slider';
import Slide from "@material-ui/core/Slide";

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }
}))


const headCells = [
    { id: 'product', label: 'Product' },
    { id: 'type', label: 'Type' },
    { id: 'quantity', label: 'Quantity' },
    { id: 'unitPrice', label: 'Unit Price' },
]

export default function Products(props) {

    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState(props.items)
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [transitionId, setTransitionId] = useState('')

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x.product.toLowerCase().includes(target.value))
            }
        })
    }

    const addOrEdit = (product, resetForm) => {
        if (product.id === 0)
            productService.insertProduct(product)
        else
            productService.updateProduct(product)
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        setRecords(productService.getAllProducts())
        setTransitionId(product.id);
    }

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
        setTransitionId(item.id);
    }

    const removeProduct = item => {
        productService.removeProduct(item);
        setRecords(productService.getAllProducts());
        setTransitionId(item.id);
    }

    const sliderElement = () =>
        <Slider
            aria-label="Temperature"
            defaultValue={30}
            color="secondary"
        />

    return (
        <>
            <PageHeader
                title="Adverse effect & contraindications"
                subTitle={`546 ${sliderElement}`}
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>

                <Toolbar>
                    <Controls.Input
                        label="Search Products"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                    <Controls.Button
                        text="Add New"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item =>
                                !openPopup && (transitionId === item.id) ? (<Slide
                                    in={true}
                                    timeout={1000}
                                    direction="right"
                                    key={item.id}
                                >
                                    <TableRow key={item.id}>
                                        <TableCell>{item.product}</TableCell>
                                        <TableCell>{item.type}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>{item.unitPrice}</TableCell>
                                        <TableCell>
                                            <Controls.ActionButton
                                                color="primary"
                                                onClick={() => { openInPopup(item) }}>
                                                <EditOutlinedIcon fontSize="small" />
                                            </Controls.ActionButton>
                                            <Controls.ActionButton
                                                color="secondary"
                                                onClick={() => { removeProduct(item) }}>
                                                <CloseIcon fontSize="small" />
                                            </Controls.ActionButton>
                                        </TableCell>
                                    </TableRow>
                                </Slide>) : (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.product}</TableCell>
                                        <TableCell>{item.type}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>{item.unitPrice}</TableCell>
                                        <TableCell>
                                            <Controls.ActionButton
                                                color="primary"
                                                onClick={() => { openInPopup(item) }}>
                                                <EditOutlinedIcon fontSize="small" />
                                            </Controls.ActionButton>
                                            <Controls.ActionButton
                                                color="secondary"
                                                onClick={() => { removeProduct(item) }}>
                                                <CloseIcon fontSize="small" />
                                            </Controls.ActionButton>
                                        </TableCell>
                                    </TableRow>
                                )
                            )
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
            <Popup
                title="Product Form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <ProductForm
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} />
            </Popup>
        </>
    )
}
