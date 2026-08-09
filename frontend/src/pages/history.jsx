import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/authContext.jsx'
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import { IconButton } from '@mui/material';

export default function History() {

    const { getHistoryOfUser } = useContext(AuthContext);
    const [meetings, setMeetings] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const routeTo = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await getHistoryOfUser();
                // API may return a single object or an array — normalize to array
                if (Array.isArray(history)) {
                    setMeetings(history);
                } else if (history && history._id) {
                    setMeetings([history]);
                } else {
                    setMeetings([]);
                }
            } catch (err) {
                console.error(err);
                setError('Failed to load meeting history. Please try again.');
            } finally {
                setLoading(false);
            }
        }
        fetchHistory();
    }, [])

    let formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    return (
        <div style={{ padding: '16px' }}>

            <IconButton onClick={() => routeTo("/home")}>
                <HomeIcon />
            </IconButton>

            {loading && <p>Loading history...</p>}

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {!loading && !error && meetings.length === 0 && (
                <p>No meetings found in your history.</p>
            )}

            {meetings.map((e, i) => (
                <Card key={e._id || i} variant="outlined" style={{ marginBottom: '12px' }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Meeting Code: {e.meetingCode}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Date: {formatDate(e.date)}
                        </Typography>
                    </CardContent>
                </Card>
            ))}

        </div>
    )
}