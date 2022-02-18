import {Button, Popover, PopoverPosition, Typography} from "@mui/material";
import * as React from "react";
import useStyles from "./styles";

export type PropsPopoverLinkHTML = {
    readonly id?: string
    readonly positionPopup: PopoverPosition
    readonly onClose: () => void
    readonly onOpen: () => void

}
const PopoverLinkHTML = ({positionPopup,onClose, id, onOpen}:PropsPopoverLinkHTML) => {
    const classes = useStyles();

    return (
      <Popover anchorReference="anchorPosition"
               anchorPosition={{ top: positionPopup.top, left: positionPopup.left }}
               anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
               transformOrigin={{ vertical: 'top', horizontal: 'left' }}
               onClose={onClose} id={id} open={Boolean(id)}>
          <Typography variant="body2"  className={classes.PopoverTitle}>Open the link in a new tab?</Typography>
          <Button onClick={onClose} size={'small'}>No</Button>
          <Button onClick={onOpen} size={'small'}>Yes</Button>
      </Popover>
  )
}
export default PopoverLinkHTML;