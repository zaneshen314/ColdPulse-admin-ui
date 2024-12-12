import React, { useEffect, useState } from 'react';
import ConcertControlPanel from './ConcertControlPanel';
import TicketList from './TicketList';
import TicketStrategyControlPanel from "./TicketStrategyControlPanel";
import { Box, CircularProgress } from "@mui/material";
import { getAllConcertTickets } from '../../api/tickets';

const TicketManagementWrapper = () => {
    const [selectedConcert, setSelectedConcert] = useState(null);
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTickets = async () => {
            setLoading(true);
            try {
                const data = await getAllConcertTickets();
                setTickets(data.data);
            } catch (error) {
                console.error('Error fetching tickets:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, []);

    const shouldShowStrategyPanel = selectedConcert && (!selectedConcert.ticketRelease || selectedConcert.ticketRelease && selectedConcert.ticketRelease.repeatCount!==-1);

    return (
        <div>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <Box sx={{
                        boxShadow: '3px 3px 10px rgba(0, 0, 0, 0.2), -3px -3px 10px rgba(0, 0, 0, 0.2)',
                        padding: 2,
                        borderRadius: 1
                    }}>
                        <ConcertControlPanel concerts={tickets} setSelectedConcert={setSelectedConcert}/>
                        {selectedConcert && <TicketList concert={selectedConcert}/>}
                    </Box>
                    {shouldShowStrategyPanel && <TicketStrategyControlPanel selectedConcert={selectedConcert}/>}
                </>
            )}
        </div>
    );
};

export default TicketManagementWrapper;