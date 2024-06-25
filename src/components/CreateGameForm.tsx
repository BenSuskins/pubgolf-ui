import { Button, Snackbar, TextField, Box, Collapse, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, IconButton } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { createGame, joinGame } from '../services/api';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CloseIcon from '@mui/icons-material/Close';

const CreateGameForm = () => {
  const [name, setName] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [gameIdentifier, setGameIdentifier] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const router = useRouter();

  const handleCreateAndJoinGame = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const game = await createGame();
      await joinGame(game.identifier, name);
      setGameIdentifier(game.identifier);
      setShowDialog(true);
    } catch (error) {
      console.error('Failed to create and join game:', error);
    }
  };

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    router.push(`/game`);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(`${window.location.protocol}//${window.location.host}?identifier=${gameIdentifier}`).then(() => {
      setOpenSnackbar(true);  // Show feedback that the identifier was copied.
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Dialog open={showDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          Game Created
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            Game created successfully! Share this link to invite others:
          </DialogContentText>
          <Typography variant="h6" sx={{ mt: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1, textAlign: 'center', wordBreak: 'break-all' }}>
            {`${gameIdentifier}`}
          </Typography>
          <Button
            onClick={handleCopyToClipboard}
            variant="outlined"
            color="primary"
            startIcon={<ContentCopyIcon />}
            sx={{ mt: 2 }}
            fullWidth
          >
            Copy link to Clipboard
          </Button>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button variant="contained" fullWidth onClick={handleCloseDialog} color="primary">
            Play!
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Game identifier copied to clipboard"
      />
      <Button
        type="submit"
        onClick={toggleFormVisibility}
        variant="contained"
        color="primary"
        sx={{ mt: 3, mb: 2, width: '200px' }}
      >
        {showForm ? 'Back' : 'Create Game'}
      </Button>
      <Collapse in={showForm}>
        <Box component="form" onSubmit={handleCreateAndJoinGame} noValidate sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
          <TextField
            margin="normal"
            required
            id="name"
            label="Your Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ borderRadius: 1, width: '300px' }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2, width: '200px' }}
          >
            Create
          </Button>
        </Box>
      </Collapse>
    </Box>
  );
};

export default CreateGameForm;