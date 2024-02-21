const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Dummy data for rooms and bookings
let rooms = [];
let bookings = [];

app.use(bodyParser.json());

// API endpoint to create a room
app.post('/createRoom', (req, res) => {
    const { roomName, seatsAvailable, amenities, pricePerHour } = req.body;
    const roomId = rooms.length + 1;
    rooms.push({ roomId, roomName, seatsAvailable, amenities, pricePerHour });
    res.status(201).json({ message: 'Room created successfully', roomId });
});

// API endpoint to book a room
app.post('/bookRoom', (req, res) => {
    const { customerName, date, startTime, endTime, roomId } = req.body;
    const bookingId = bookings.length + 1;
    bookings.push({ bookingId, customerName, date, startTime, endTime, roomId });
    res.status(201).json({ message: 'Room booked successfully', bookingId });
});

// API endpoint to list all rooms with booking data
app.get('/listRooms', (req, res) => {
    const roomsWithBookings = rooms.map(room => {
        const bookingsForRoom = bookings.filter(booking => booking.roomId === room.roomId);
        return {
            ...room,
            bookings: bookingsForRoom
        };
    });
    res.json(roomsWithBookings);
});

// API endpoint to list all customers with booking data
app.get('/listCustomers', (req, res) => {
    const customersWithBookings = bookings.map(booking => {
        return {
            customerName: booking.customerName,
            date: booking.date,
            startTime: booking.startTime,
            endTime: booking.endTime
        };
    });
    res.json(customersWithBookings);
});

// API endpoint to list booking details for a customer
app.get('/customerBookingDetails/:customerName', (req, res) => {
    const customerName = req.params.customerName;
    const customerBookings = bookings.filter(booking => booking.customerName === customerName);
    res.json(customerBookings);
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
