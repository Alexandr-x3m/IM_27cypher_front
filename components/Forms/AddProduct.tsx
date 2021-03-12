import React, { useEffect, useState } from 'react'
import axios from 'axios'

import s from '../../styles/Forms/Form.module.sass'
import { Select, MenuItem, TextField, Button, Input, InputLabel } from '@material-ui/core'


const AddProduct: React.FC = () => {

    const [name, setName] = useState<string>('')
    const [desc, setDesc] = useState<string>('')
    const [price, setPrice] = useState<string>('')
    const [categoryID, setCategoryID] = useState<string>('1')
    const [manufactureID, setManufactureID] = useState<string>('1')
    const [allCategories, setAllCategories] = useState<{ id: string, name: string }[]>([])
    const [allManufactures, setAllManufactures] = useState<{ id: string, name: string }[]>([])

    useEffect(() => {

        if (allCategories.length === 0 || allManufactures.length === 0) {
            axios({
                method: 'post',
                url: 'https://awesome-web-shop.hasura.app/v1/graphql',
                headers: {
                    'x-hasura-admin-secret': 'kitesurfing'
                },
                data: {
                    query: `
                        query {
                            categories {
                                id
                                name
                            }
                            manufactures {
                                id
                                name
                            }
                        }
                    `
                }
            })
                .then(res => {
                    debugger
                    let categories = res.data.data.categories
                    let manufactures = res.data.data.manufactures

                    setAllCategories(categories)
                    setCategoryID(categories[0].id)
                    setAllManufactures(manufactures)
                    setManufactureID(manufactures[0].id)
                })
                .catch(err => console.log(err.message))
        }

    }, [allCategories, allManufactures])


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('Товар добавлен')

        let formData = new FormData()

        formData.append('name', name)
        formData.append('desc', desc)
        formData.append('price', price)
        formData.append('category_id', categoryID)
        formData.append('manufacture_id', manufactureID)


        axios({
            method: 'post',
            url: 'http://localhost:3001/addNewProduct',
            headers: {
                'x-hasura-admin-secret': 'kitesurfing'
            },
            data: formData
        })
            .then(res => {
                if (res.status === 200) {
                    console.log('Добавлен товар')
                }
            })
            .catch(err => console.log(err))
    }

    const categorySelectHandler = (e: React.ChangeEvent<{value: unknown}>) => {
        setCategoryID(e.target.value as string)
    }

    return (
        <form
            //className={s.main_container}
            onSubmit={handleSubmit}
        >
            <div className={s.hor_block}>
                <TextField
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    label='Название'
                    classes={{ root: s.textfield_label }}
                    required={true}
                    autoFocus={true}
                    variant={'outlined'}
                //error={true}
                //helperText={"Some important text"}
                />
                <TextField
                    value={price}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)}
                    label='Стоимость'
                    classes={{ root: s.textfield_label }}
                    required={true}
                    autoFocus={true}
                    variant={'outlined'}
                //error={true}
                //helperText={"Some important text"}
                />
            </div>

            <TextField
                value={desc}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDesc(e.target.value)}
                label='Описание'
                classes={{ root: s.textfield_label }}
                required={true}
                autoFocus={true}
                variant={'outlined'}
            //error={true}
            //helperText={"Some important text"}
            />
            <div className={s.hor_block} >
                <div style={{display: 'flex'}}>
                    <div className={s.select_container} >
                        <InputLabel htmlFor="category_select" >Категория</InputLabel>
                        <Select
                            id='category_select'
                            labelId='category_select'
                            value={categoryID}
                            onChange={(e: React.ChangeEvent<{value: unknown}>) => categorySelectHandler(e)}
                            className={s.select}
                            required={true}
                        >
                            {allCategories.map(el => (
                                <MenuItem key={'category_' + el.id} value={el.id} >
                                    {el.name}
                                </MenuItem>
                            ))}
                        </Select >
                    </div>
                    <div className={s.select_container} >
                        <InputLabel htmlFor="manufacture_select" >Производитель</InputLabel>
                        <Select
                            id='manufacture_select'
                            labelId='manufacture_select'
                            value={manufactureID}
                            onChange={(e: React.ChangeEvent<{value: unknown}>) => setManufactureID(e.target.value as string)}
                            className={s.select}
                            required={true}
                        >
                            {allManufactures.map(el => (
                                <MenuItem key={'manufacture' + el.id} value={el.id} >
                                    {el.name}
                                </MenuItem>
                            ))}
                        </Select >
                    </div>
                </div>
                <div className={s.submit_container} >
                    <Button
                        variant="contained"
                        className={s.submit}
                        fullWidth={true}
                        type='submit'
                    >
                        Добавить товар
                    </Button>
                </div>
            </div>
        </form>
    )
}

export default AddProduct