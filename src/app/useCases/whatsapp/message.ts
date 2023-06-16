import { Request, Response } from 'express';
import parsePhoneNumber, { isValidNumber } from 'libphonenumber-js';
import { client } from '../../../router';

export async function message(req: Request, res: Response) {
  try {
    const { to, message } = req.body;
    console.log('🚀 ~ file: message.ts:8 ~ message ~ to:', to);
    console.log('🚀 ~ file: message.ts:8 ~ message ~ message:', message);

    let phoneNumber = parsePhoneNumber(to, 'BR')
      ?.format('E.164')
      ?.replace('+', '') as string;

    if(!isValidNumber) return res.status(404).json({ error: 'Inválido'});

    phoneNumber = phoneNumber.includes('@c.us')
      ? phoneNumber
      : phoneNumber + '@c.us';

    console.log('send', client);
    await client.sendMessage(phoneNumber, message ?? '');
    console.log('send Ok');
    res.status(200).json({ success: 'Ok' });
  } catch {
    res.status(500).json({
      error: 'Internal server error'
    });
  }
}
