import {CircularProgress,Box} from "@mui/material";
const Spinner = () => {
  return (
    <div style={{margin:'auto', textAlign:'center'}}>
      <Box >
        <CircularProgress />
      </Box>
    </div>
  );
};

export default Spinner;
