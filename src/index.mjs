import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import api from './api/index.mjs';
import mongoose from './mongo/index.mjs';


/**
 * Run function for connecting to the database.
 */
mongoose()
    /**
     * After successful connection to the database run Express.js
     */
    .then(() => {
        const port = 8080;
        const app = express();

        app.use(morgan('tiny'));
        app.use(cors());
        app.use(express.json());
        app.use(express.urlencoded({extended: false}));

        app.use('/api', api);

        app.listen(port);
    })
    /**
     * Capture error and notify about connection error.
     */
    .catch(error => {
        console.error(error);
    });

