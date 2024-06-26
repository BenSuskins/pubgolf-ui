import { Button, TextField, Box, Collapse } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { joinGame } from '@/services/api';
import { routes } from '@/utils/constants';

const JoinGameForm: React.FC<JoinGameFormProps> = ({ gameIdentifier }) => {
  const [identifier, setIdentifier] = useState('');
  const [name, setName] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [gameError, setGameError] = useState('');
  const [nameError, setNameError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (gameIdentifier) {
      setIdentifier(gameIdentifier);
      setShowForm(true)
    }
  }, [gameIdentifier]);

  const handleJoinGame = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (!validateName(name)) {
        return;
      }
      await joinGame(identifier, name);
      router.push(routes.GAME);
    } catch (error) {
      console.error('Failed to join game:', error);
      setGameError('Failed to join game. Please check the identifier and try again.');
    }
  };

  const validateName = (name: string) => {
    if (name.length < 2) {
      setNameError('Name must be greater than 2 characters.');
      return false;
    }
    setNameError('');
    return true;
  };

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  return (
    <Box sx={{ mt: -1 }}>
      <Button
        onClick={toggleFormVisibility}
        type="submit"
        variant={showForm ? 'outlined' : 'contained'}
        color="primary"
        sx={{ mt: 3, width: '200px' }}
      >
        {showForm ? 'Back' : 'Join Game'}
      </Button>
      <Collapse in={showForm}>
        <Box component="form" onSubmit={handleJoinGame} noValidate sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
          <TextField
            margin="normal"
            required
            id="name"
            label="Your Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ borderRadius: 1, width: '300px' }}
            error={!!nameError}
            helperText={nameError}
          />
          <TextField
            margin="normal"
            required
            id="identifier"
            label="Game Identifier"
            name="identifier"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            sx={{ borderRadius: 1, width: '300px' }}
            error={!!gameError}
            helperText={gameError}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2, width: '200px' }}
          >
            Join
          </Button>
        </Box>
      </Collapse>
    </Box>
  );
};

export default JoinGameForm;