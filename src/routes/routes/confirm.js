// updated new path for model import
import { getConfirmationById, getTicketOptionsForSchedule } from '../../models/model.js';

export default async (req, res) => {
    const { confirmationId } = req.params;

    const confirmation = await getConfirmationById(confirmationId);

    // calculate USD prices using the saved ticket and passenger count
    const tickets = await getTicketOptionsForSchedule(confirmation.scheduleId);
    const ticket = tickets.find(ticket => ticket.class === confirmation.ticketClass);
    const unitPrice = ticket.price;
    const totalPrice = Math.round(unitPrice * 100) * confirmation.passengers.length / 100;

    res.render('routes/confirm', {
        title: 'Trip Confirmation',
        confirmation,
        unitPrice,
        totalPrice
    });
};