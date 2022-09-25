import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

import { convertHoursStringToMinutes } from '../src/utils/convert-hour-string-to-minutes';
import { convertMinutesToHoursString } from '../src/utils/converter-minutes-to-hour-string';

const app = express();

app.use(express.json());
app.use(cors());

const prisma = new PrismaClient();

app.get('/games', async (req, res) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true
                }
            }
        }
    });

    return res.json(games);
});

app.post('/games/:id/ads', async (req, res) => {
    const gameId = req.params.id;
    const { name, yearsPlaying, discord, useVoiceChannel } = req.body;

    const ad = await prisma.ad.create({
        data: {
            gameId,
            name,
            yearsPlaying,
            discord,
            weekdays: req.body.weekdays.join(', '),
            hourStart: convertHoursStringToMinutes(req.body.hourStart),
            hourEnd: convertHoursStringToMinutes(req.body.hourEnd),
            useVoiceChannel
        }
    })

    return res.status(201).json(ad);
});

app.get('/games/:id/ads', async (req, res) => {
    const gameId = req.params.id;

    const ads = await prisma.ad.findMany({
        where: {
            gameId
        },
        select: {
            id: true,
            name: true,
            weekdays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true,
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return res.json(ads.map((ad) => {
        return {
            ...ad,
            weekdays: ad.weekdays.split(', '),
            hourStart: convertMinutesToHoursString(ad.hourStart),
            hourEnd: convertMinutesToHoursString(ad.hourEnd),
        }
    }));
});

app.get('/ads/:id/discord', async (req, res) => {
    const adId = req.params.id;

    const ad = await prisma.ad.findUniqueOrThrow({
        where: {
            id: adId,
        },
        select: {
            discord: true
        }
    })

    return res.json({
        discord: ad.discord
    });
});

app.listen(3333);