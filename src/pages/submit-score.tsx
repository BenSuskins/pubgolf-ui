// pages/submit-score.tsx
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Box, Button, TextField, Typography, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { submitScore } from '../services/api';

const SubmitScorePage = () => {
    const router = useRouter();
    const [hole, setHole] = useState('');
    const [score, setScore] = useState('');
    const [error, setError] = useState(''); // For managing input errors
    const [snackbarOpen, setSnackbarOpen] = useState(false); // Manage Snackbar visibility

    const validateScore = (score) => {
        const numScore = parseInt(score);
        if (numScore < -10 || numScore > 10) {
            setError('Score must be between -10 and 10.');
            return false;
        }
        setError('');
        return true;
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!validateScore(score)) {
            return; // Prevent submission if the score is invalid
        }

        try {
            await submitScore(parseInt(hole), parseInt(score));
            router.push(`/game`);
        } catch (error) {
            console.error('Failed to submit score:', error);
            setError('Failed to submit score.');
        }
    };

    const handleBack = () => {
        router.push(`/game`);
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                mt: 1,
                p: 2,  // Adds padding to the form
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',  // This will center the form elements
                maxWidth: 600,  // Limits the max width of the form
                margin: '0 auto',  // Centers the form in the page
            }}
        >
            <Typography variant="h6" sx={{ mb: 2 }}>Submit Your Score</Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="hole-label">Hole</InputLabel>
                <Select
                    labelId="hole-label"
                    id="hole"
                    value={hole}
                    label="Hole"
                    onChange={(e) => setHole(e.target.value)}
                >
                    {Array.from({ length: 9 }, (_, i) => (
                        <MenuItem key={i} value={i + 1}>Hole {i + 1}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                required
                fullWidth
                id="score"
                label="Score"
                name="score"
                type="number"
                autoComplete="score"
                margin="normal"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                error={!!error}
                helperText={error}
                sx={{ mb: 2 }}  // Adds margin below the TextField
            />
            <Button
                type="submit"
                variant="contained"
                sx={{ mt: 1, mb: 2 }}  // Additional margin adjustments
            >
                Submit
            </Button>
            <Button
                variant="outlined"
                onClick={handleBack}
                sx={{ mt: 1, mb: 2 }}  // Additional margin adjustments
            >
                Back
            </Button>
        </Box>
    );
};

export default SubmitScorePage;
