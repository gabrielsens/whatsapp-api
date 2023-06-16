import { Request, Response } from 'express';
import { client } from '../../../router';

export async function status(req: Request, res: Response) {
  try {
    console.log('State');
    const state = await client.getState();
    console.log('state resp');
    res.status(200).json({ success: state });
  } catch {
    res.status(500).json({
      error: 'Internal server error'
    });
  }
}
