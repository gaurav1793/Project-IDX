import dotenv from 'dotenv'

dotenv.config();

export const PORT = process.env.PORT ||4000

export const PROJECT_COMMAND= process.env.PROJECT_COMMAND;
