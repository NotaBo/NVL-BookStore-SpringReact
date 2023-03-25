import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TextField } from "@mui/material";
import "./ProductForm.scss";

export default function ProductForm () {
    return(
        <div className="ProductForm">
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                ADD PRODUCTS
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TextField
                             id="filled-basic" 
                             label="name" 
                             variant="filled"                            
                            >

                            </TextField>
                        </TableRow>
                        <TableRow>
                            <TextField
                                id="filled-basic" 
                                label="description" 
                                variant="filled"                            
                                >

                            </TextField>
                        </TableRow>
                        <TableRow>
                            <TextField
                                id="filled-basic" 
                                label="Price" 
                                variant="filled"                            
                                >

                            </TextField>
                        </TableRow>
                        <TableRow>
                            <TextField
                                id="filled-basic" 
                                label="Instock" 
                                variant="filled"                            
                                >

                            </TextField>
                        </TableRow>
                        <TableRow>
                            <TextField
                                id="filled-basic" 
                                label="Category" 
                                variant="filled"                            
                                >

                            </TextField>
                        </TableRow>
                        <TableRow>
                            <TextField
                                id="filled-basic" 
                                label="Author" 
                                variant="filled"                            
                                >

                            </TextField>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}