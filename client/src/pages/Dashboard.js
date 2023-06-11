import { Box} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";


import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

import GlobalLayout from "../components/GlobalLayout";
import { useEffect } from "react";
import { getAllUsers, getOneUser} from "../features/authSlice";

import Chart from "../utils/Chart";




const Dashboard = () => {
    const dispatch = useDispatch();
    const { users, oneUserByAdmin } = useSelector((store) => store.auth);

    useEffect(() => {
        dispatch(getAllUsers());
        
    }, [dispatch])

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        "&:last-child td, &:last-child th": {
            border: 0,
        },
    }));

    return (
    
            <GlobalLayout>
                <Box sx={{ flexGrow: 1, marginY: "2rem", paddingX: "2rem" }}>
                    <Chart />
                </Box>

                <Box sx={{ flexGrow: 1, marginY: "2rem", paddingX: "2rem" }}>
                    <TableContainer component={Paper}>
                        <Table
                            sx={{ minWidth: 700 }}
                            aria-label="customized table"
                        >
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>#</StyledTableCell>
                                    <StyledTableCell>Name</StyledTableCell>
                                    <StyledTableCell>Email</StyledTableCell>
                                    <StyledTableCell>
                                        # of reviews
                                    </StyledTableCell>
                                    <StyledTableCell>Actions</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((row, index) => (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell
                                            component="th"
                                            scope="row"
                                        >
                                            {index}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {row.name}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {row.email}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {oneUserByAdmin?.numOfUsersReviews}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <EditIcon
                                                color="success"
                                                sx={{
                                                    marginRight: "1rem",
                                                    cursor: "pointer",
                                                }}
                                            />
                                            <DeleteForeverIcon
                                                color="error"
                                                sx={{
                                                    cursor: "pointer",
                                                }}
                                            />
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </GlobalLayout>
        
    );
};
export default Dashboard;
