import { Request, Response } from 'express';
import { client } from '../../../router';

export async function disconect(req: Request, res: Response) {
  try {
    console.log('reset State', client);
    await client.logout();
    console.log('state Reseted');
    res.status(200).json({ success: 'Ok' });
  } catch {
    res.status(500).json({
      error: 'Internal server error'
    });
  }
}
