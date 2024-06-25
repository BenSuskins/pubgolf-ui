import { useRouter } from 'next/router';
import { useState } from 'react';
import { Box, Button, TextField, Typography, MenuItem, FormControl, InputLabel, Select, Paper } from '@mui/material';
import { submitScore } from '../services/api';

const SubmitScorePage = () => {
    const router = useRouter();
    const [hole, setHole] = useState('');
    const [score, setScore] = useState('');
    const [error, setError] = useState(''); // For managing input errors

    const validateScore = (score: string) => {
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
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 3,
                mx: 'auto',
                my: 2,
                maxWidth: '1000px',
                backgroundColor: '#2e2e2e', // Dark background to match the theme
                borderRadius: 2,
                boxShadow: 5,   
            }}
        >
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#fff', mb: 2 }}>
                Submit Your Score
            </Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="hole-label">Hole</InputLabel>
                <Select
                    labelId="hole-label"
                    id="hole"
                    value={hole}
                    label="Hole"
                    onChange={(e) => setHole(e.target.value)}
                    sx={{ borderRadius: 1 }}
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
                sx={{ mb: 2, borderRadius: 1 }}
            />
            <Button
                type="submit"
                variant="contained"
                sx={{ mt: 1, mb: 2, bgcolor: '#4caf50', '&:hover': { bgcolor: '#45a049' }, width: '200px' }}
            >
                Submit
            </Button>
            <Button
                variant="outlined"
                onClick={handleBack}
                sx={{ mt: 1, mb: 2, borderColor: '#4caf50', '&:hover': { borderColor: '#45a049' }, width: '200px' }}
            >
                Back
            </Button>
        </Box>
    );
};

export default SubmitScorePage;