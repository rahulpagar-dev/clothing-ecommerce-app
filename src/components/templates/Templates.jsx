import "../cards/CardPrimary.css";
import {
  Card,
  Input,
  Typography,
  Divider,
  Checkbox,
  Button
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Edit } from "@mui/icons-material";
import CardContent from '@mui/material/CardContent';

export const CardTemplate = ({
  elem,
  index,
  handleEditMode,
  handleEdit,
  handleDelete,
  markDone,
}) => {
  return (
    <>
      <Card
        key={index}
        hoverable="true"
        className={elem.done ? "customCard" : "customCard-1"}
        sx={{
          marginTop:'1vh',
          marginLeft:'auto',
          marginRight:'auto',
          bgcolor: "white",
          width: '320px',       
          "&:hover": {
            boxShadow: "md",
            borderColor: "neutral.outlinedHoverBorder",
          },
        }}
      >
        {handleEditMode ? (<h2>edit</h2>):(null)}
        <CardContent>
          <Typography>
            <h2>{elem.todo}</h2>
          </Typography>
        </CardContent>
        <Divider />
        <CardContent
          sx={{
            px: 0.2,
            writingMode: "horizontal-tb",
            position: "sticky",
            fontSize: "xs2",
            fontWeight: "xl2",
            letterSpacing: "1px",
            textTransform: "uppercase",
          }}
          
        >
            <Edit
            color="primary"
              value={elem}
              className="buttons "
              onClick={() => {
                handleEdit(elem, index);
              }}
              name="edit"
              id="edit"
            ></Edit>
            <DeleteIcon
            
              color="error"
              value={elem}
              onClick={() => {
                handleDelete(index);
              }}
              name="delete"
              id="delete"
            ></DeleteIcon>
            <Checkbox
             
              size="medium"
              color="danger"
              onChange={() => {
                markDone(elem, index);
              }}
              checked={elem.done}
            ></Checkbox>
        </CardContent>
      </Card>
    </>
  );
};


export const EditTemplate = ({
  elem,
  index,
  handleEditfield,
  handleEditMode,
}) => {
  return (
    <>
      <div key={index} className="input">
        <Input
          className="input"
          name="inputString"
          onChange={handleEditfield}
          type="text"
          defaultValue={elem.todo}
          onPressEnter={() => {
            handleEditMode(elem, index);
          }}
        />
      </div>
      <Button
        className="button"
        onClick={() => {
          handleEditMode(elem, index);
        }}
        type="primary"
        style={{ backgroundColor: "red" }}
      >
        Save changes
      </Button>
    </>
  );
};
