import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

interface SubmitProps {
  openState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

const Submit: React.FC<SubmitProps> = ({ openState: [open, setOpen] }) => {
  const [hole, setHole] = React.useState('');
  const [score, setScore] = React.useState('');
  const [errors, setErrors] = React.useState('');

  const handleClose = () => {
    setErrors('');
    setHole('');
    setScore('');
    setOpen(false);
  }

  const submitScore = () => {
    const id = localStorage.getItem("id");
    if (!score || !hole) {
      setErrors("Something is missing...");
    } if (parseInt(score) > 10 || parseInt(score) < -10) {
      setErrors("Score must be between 10 and -10");
    }
    else {
      const requestOptions = {
        method: 'PUT'
      };
      fetch(`${process.env.REACT_APP_API_HOST}/api/v1/scores/${id}/${hole}/${score}`, requestOptions)
        .then((resp) => {
          if (resp.ok) {
            handleClose();
            return { 'message': '' }
          } else {
            return resp.json();
          }
        })
        .then(json => setErrors(json.message))
        .catch(error => {
          console.log(error);
        });
    }
  }

  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 350,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 7,
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2" align='center' gutterBottom>
            Submit Score
          </Typography>
          {
            errors ? <Box><Alert severity="error">{errors}</Alert><br></br> </Box> : ''
          }
          <Box
            component="form"
            autoComplete="off">
            <FormControl required>
              <InputLabel id="select-hole-label">Hole</InputLabel>
              <Select
                labelId="select-hole-label"
                id="select-hole"
                value={hole}
                label="Hole"
                autoWidth
                onChange={(event: SelectChangeEvent) => {
                  setHole(event.target.value as string);
                }}
              >
                <MenuItem value={'ONE'}>One</MenuItem>
                <MenuItem value={'TWO'}>Two</MenuItem>
                <MenuItem value={'THREE'}>Three</MenuItem>
                <MenuItem value={'FOUR'}>Four</MenuItem>
                <MenuItem value={'FIVE'}>Five</MenuItem>
                <MenuItem value={'SIX'}>Six</MenuItem>
                <MenuItem value={'SEVEN'}>Seven</MenuItem>
                <MenuItem value={'EIGHT'}>Eight</MenuItem>
                <MenuItem value={'NINE'}>Nine</MenuItem>
              </Select>
              <br></br>
              <TextField
                id="outlined-number"
                label="Score"
                value={score}
                required
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setScore(event.target.value);
                }}
              />
              <br></br>
              <Button variant="contained" onClick={submitScore}>Submit</Button>
            </FormControl>
          </Box>
        </Box>
      </Modal >
    </Box >
  );
}

export default Submit;