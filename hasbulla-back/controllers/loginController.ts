import { Request, Response } from 'express';

export const postLogin = (req: Request, res: Response) => {
  // Realiza la lógica de autenticación u otras acciones necesarias

  const redirectUrl = '/dashboard'; // URL de redireccionamiento deseada

  // Devuelve un objeto JSON con la URL de redireccionamiento
  res.status(200).json({ redirectUrl });
};

export const getLogin = (req: Request, res: Response) => {
  // Renderiza la vista de login o devuelve una respuesta JSON con datos relacionados con el login
  // Aquí puedes incluir lógica adicional según tus necesidades
  res.sendFile(__dirname + '/views/login.html');
  //res.status(200).send('Página de login');
};
