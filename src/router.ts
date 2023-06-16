import { Router } from 'express';
import { createOrder } from './app/useCases/orders/createOrder';
import { Client, LocalAuth } from 'whatsapp-web.js';
import { io } from './index';
import { disconect } from './app/useCases/whatsapp/disconect';
import { initialize } from './app/useCases/whatsapp/initialize';
import { message } from './app/useCases/whatsapp/message';
import { status } from './app/useCases/whatsapp/status';

export const router = Router();

export const client = new Client({
  authStrategy: new LocalAuth({ clientId: 'client' })
});

client.on('qr', (qr: any) => {
  // Generate and scan this code with your phone
  console.log('QR RECEIVED', qr);

  io.emit('qrCodeWhatsApp', qr);
});

client.on('ready', () => {
  console.log('Client is ready!');
  io.emit('qrCodeWhatsApp', '');
});

client.on('message', (msg: any) => {
  if (msg.body == '!ping') {
    msg.reply('pong');
  }
});

client.on('disconnected', (reason: any) => {
  console.log('disconectedconectedWhatsApp', reason);
});

client.on('authenticated', (session: any) => {
  console.log('authenticated', session);
  io.emit('conectedWhatsApp', true);
});

// if (read) {
//   client.sendMessage('554899852918@c.us', 'Ready');
// }

router.get('/whatsapp/status', status);

router.get('/whatsapp/initialize', initialize);

router.get('/whatsapp/disconect', disconect);

router.post('/whatsapp/message', message);

// Create order
router.post('/orders', createOrder);

