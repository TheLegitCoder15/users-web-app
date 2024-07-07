import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import PrivateRoute from "../../util/PrivateRoute";
import { Table, TableCell, TableRow, TableHead, TableBody } from "@mui/material";
import { useFirestoreContext } from "../../context/FirestoreContext";

const Users = () => {
  // AUTH CONTEXT
  const { currentUser } = useAuthContext();
  const { FIRESTORE_GET } = useFirestoreContext();

  // TABLE HOOKS & CONSTANTS
  const [users, setUsers] = useState([]);
  const tableHeaders = ["First Name", "Last Name", "Email"];

  useEffect(() => {
    // GET ALL USERS ON MOUNT
    FIRESTORE_GET()
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => console.error(error));
  }, [currentUser]);
  return (
    <PrivateRoute>
      <Table>
        <TableHead>
          <TableRow>
            {tableHeaders.map((head) => (
              <TableCell key={head} sx={{ fontWeight: "bold" }}>
                {head}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={`table-data-${index}`}>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </PrivateRoute>
  );
};

export default Users;
