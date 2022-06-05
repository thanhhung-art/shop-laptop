import React from 'react'
import { Box, List, ListItem, ListItemText } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const Sidebar = () => {
  return (
    <Box sx={{height: "100vh", width: "80vw"}} role="presentation">
      <List>
        <ListItem>
          <ListItemText>
            <CloseIcon />
          </ListItemText>
        </ListItem>
      </List>
    </Box>
  )
}

export default Sidebar