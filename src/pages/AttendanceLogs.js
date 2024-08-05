import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Header from './Header';
import 'react-calendar/dist/Calendar.css';
import '../styles/CalendarStyles.css';
import { useSnackbar } from 'notistack';
import { useUser } from '../components/UserContext';

const PageContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#F3F3F3',
});

const MainContent = styled('div')({
    display: 'flex',
    flex: 1,
    overflow: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
});

const MainDiv = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    width: '90%',
    height: '80vh',
    padding: '20px',
    boxSizing: 'border-box',
});

const Table = styled('table')({
    borderRadius: '10px',
    backgroundColor: '#ffffff',
    width: '100%',
    height: '100%',
    borderCollapse: 'collapse',
    overflow: 'hidden',
    boxShadow: '0 8px 10px rgba(0, 0, 0, 0.2)',
    border: '1px solid #ddd',
});

const TableHead = styled('thead')({
    backgroundColor: '#f5f5f5',
});

const TableRow = styled('tr')({
    '&:nth-of-type(odd)': {
        backgroundColor: 'rgba(1, 133, 178, 0.10)',
    },
});

const TableCell = styled('td')({
    padding: '12px 20px',
    border: '1px solid #ddd',
    textAlign: 'left',
});

const TableHeaderCell = styled(TableCell)({
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#ffffff',
    borderTop: '1px solid #ddd',
    borderBottom: '1px solid #ddd',
});

const HeaderCell = styled(TableHeaderCell)({
    backgroundColor: '#f5f5f5',
});

const NavButton = styled('button')({
    margin: '0 10px',
    padding: '5px 10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#f5f5f5',
    cursor: 'pointer',
});

const MonthHeader = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', // Centering the content horizontally
    marginBottom: '10px',
    fontSize: '1.2rem', // Optional: Increase font size for better visibility
});

const TableTitle = styled('h2')({
    textAlign: 'center',
    marginBottom: '20px',
    marginTop: '-4vh',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333',
});

function AttendanceLogsTable() {
    const [attendanceLogs, setAttendanceLogs] = useState([
        // Sample data
        { date: '2024-07-01', timeInAM: '08:00:00', timeOutAM: '12:00:00', timeInPM: '13:00:00', timeOutPM: '17:00:00' },
        { date: '2024-07-15', timeInAM: '09:00:00', timeOutAM: '12:30:00', timeInPM: '13:30:00', timeOutPM: '18:00:00' },
        { date: '2024-08-01', timeInAM: '08:00:00', timeOutAM: '12:00:00', timeInPM: '13:00:00', timeOutPM: '17:00:00' },
        { date: '2024-08-02', timeInAM: '09:00:00', timeOutAM: '12:30:00', timeInPM: '14:00:00', timeOutPM: '18:00:00' },
        { date: '2024-09-01', timeInAM: '07:30:00', timeOutAM: '12:00:00', timeInPM: '13:00:00', timeOutPM: '16:30:00' },
        { date: '2024-09-10', timeInAM: '08:00:00', timeOutAM: '11:00:00', timeInPM: '12:00:00', timeOutPM: '17:00:00' },
        { date: '2024-09-20', timeInAM: '09:00:00', timeOutAM: '12:30:00', timeInPM: '13:00:00', timeOutPM: '18:00:00' },
    ]);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const { enqueueSnackbar } = useSnackbar();

    const calculateTotalHours = (timeIn, timeOut) => {
        const inTime = new Date(`1970-01-01T${timeIn}Z`);
        const outTime = new Date(`1970-01-01T${timeOut}Z`);

        let duration = (outTime - inTime) / (1000 * 60); // duration in minutes
        if (duration < 0) {
            // Handle case where timeOut is less than timeIn (e.g., overnight shifts)
            duration += 24 * 60;
        }

        const totalHours = Math.floor(duration / 60);
        const remainingMinutes = duration % 60;

        return { totalHours, remainingMinutes };
    };

    const groupByMonth = (logs) => {
        const groupedLogs = {};
        logs.forEach(log => {
            const date = new Date(log.date);
            const month = `${date.getFullYear()}-${date.getMonth() + 1}`.padStart(7, '0');
            if (!groupedLogs[month]) {
                groupedLogs[month] = [];
            }
            groupedLogs[month].push(log);
        });
        return groupedLogs;
    };

    const handlePreviousMonth = () => {
        setCurrentMonth(prev => {
            const newMonth = new Date(prev.getFullYear(), prev.getMonth() - 1, 1);
            return newMonth;
        });
    };

    const handleNextMonth = () => {
        setCurrentMonth(prev => {
            const newMonth = new Date(prev.getFullYear(), prev.getMonth() + 1, 1);
            return newMonth;
        });
    };

    const getMonthYearString = () => {
        return currentMonth.toLocaleDateString('default', { month: 'long', year: 'numeric' });
    };

    const groupedLogs = groupByMonth(attendanceLogs);
    const currentMonthKey = `${currentMonth.getFullYear()}-${currentMonth.getMonth() + 1}`.padStart(7, '0');
    const logsToDisplay = groupedLogs[currentMonthKey] || [];

    return (
        <MainDiv>
            <TableTitle>Daily Time Record</TableTitle>
            <MonthHeader>
                <NavButton onClick={handlePreviousMonth}>{'<'}</NavButton>
                <div>{getMonthYearString()}</div>
                <NavButton onClick={handleNextMonth}>{'>'}</NavButton>
            </MonthHeader>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeaderCell>#</TableHeaderCell>
                        <TableHeaderCell>Date</TableHeaderCell>
                        <HeaderCell colSpan="2">AM</HeaderCell>
                        <HeaderCell colSpan="2">PM</HeaderCell>
                        <TableHeaderCell colSpan="2">Total Time</TableHeaderCell>
                    </TableRow>
                    <TableRow>
                        <TableHeaderCell></TableHeaderCell>
                        <TableHeaderCell></TableHeaderCell>
                        <TableHeaderCell>IN</TableHeaderCell>
                        <TableHeaderCell>OUT</TableHeaderCell>
                        <TableHeaderCell>IN</TableHeaderCell>
                        <TableHeaderCell>OUT</TableHeaderCell>
                        <TableHeaderCell>HOURS</TableHeaderCell>
                        <TableHeaderCell>MINS</TableHeaderCell>
                    </TableRow>
                </TableHead>
                <tbody>
                    {logsToDisplay.length > 0 ? (
                        logsToDisplay.map((log, index) => {
                            const { totalHours: amHours, remainingMinutes: amMinutes } = calculateTotalHours(log.timeInAM, log.timeOutAM);
                            const { totalHours: pmHours, remainingMinutes: pmMinutes } = calculateTotalHours(log.timeInPM, log.timeOutPM);
                            const totalHours = amHours + pmHours;
                            const totalMinutes = amMinutes + pmMinutes;
                            const displayHours = totalHours + Math.floor(totalMinutes / 60);
                            const displayMinutes = totalMinutes % 60;

                            return (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell> {/* Number column */}
                                    <TableCell>{log.date}</TableCell>
                                    <TableCell>{log.timeInAM || '-'}</TableCell>
                                    <TableCell>{log.timeOutAM || '-'}</TableCell>
                                    <TableCell>{log.timeInPM || '-'}</TableCell>
                                    <TableCell>{log.timeOutPM || '-'}</TableCell>
                                    <TableCell>{displayHours}</TableCell>
                                    <TableCell>{displayMinutes}</TableCell>
                                </TableRow>
                            );
                        })
                    ) : (
                        <TableRow>
                            <TableCell colSpan="8">No attendance logs found.</TableCell>
                        </TableRow>
                    )}
                </tbody>
            </Table>
        </MainDiv>
    );
}

function AttendanceLogsPage() {
    return (
        <PageContainer>
            <Header />
            <MainContent>
                <AttendanceLogsTable />
            </MainContent>
        </PageContainer>
    );
}

export default AttendanceLogsPage;