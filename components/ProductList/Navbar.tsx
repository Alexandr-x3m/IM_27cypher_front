import React, { ReactNode, useState } from 'react'
import Link from 'next/link'
import { connect } from 'react-redux'
import { Select, MenuItem, InputLabel, TextField, Button  } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

import s from '../../styles/ProductList/Navbar.module.sass'
import { StoreType } from '../../interfaces/ReduxStates'

interface NavBar {
    categories: {name: string, id: string}[],
    categoryID: string,
    setCategoryID: Function,
    search: string, 
    setSearch: Function,
    store: StoreType['userSettingsReducer'],
}

const NavBar: React.FC<NavBar> = ({categories, search, setSearch, categoryID, setCategoryID, ...props}) => {

    //const { categories, search, setSearch, categoryID, setCategoryID } = props
    debugger

    const categorySelectHandler = (e: React.ChangeEvent<{value: unknown}>) => {
        setCategoryID(e.target.value as string)
    }

    return (
        <div className={s.container} >
            <div className={s.block_1}>
                <div>
                    <InputLabel htmlFor="category_select" >Категория</InputLabel>
                    <Select 
                        id='category_select' 
                        labelId='category_select' 
                        value={categoryID} 
                        onChange={(e: React.ChangeEvent<{value: unknown}>) => categorySelectHandler(e)} 
                        className={s.select}
                    >
                        {categories.map(el => <MenuItem key={'category_' + el.id} value={el.id} >{el.name}</MenuItem>)}
                    </Select >
                </div>
                <div>
                    <TextField 
                        value={search}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                        id="outlined-basic" 
                        label='поиск'
                    />
                </div>
            </div>
            {props.store.user_active && props.store.role === 'admin'
                ? (<Link href="/add-new-product" ><a>
                    <Button 
                        variant="contained"
                        className={s.btn_visible} 
                        onClick={() => console.log('Добавить товар')} 
                        startIcon={<AddIcon />}
                    >
                        Добавить товар
                    </Button>
                </a></Link>)
                : null
            }

        </div>
    )
}

const MapStateToProps = (state: StoreType) => ({
    store: state.userSettingsReducer
})


export default connect(MapStateToProps, null)(NavBar)