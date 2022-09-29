import { useState, useEffect } from 'react';

import axios from 'axios';

import * as Dialog from '@radix-ui/react-dialog';

import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import { CreateAdModal } from './components/CreateAdModal';

import './styles/main.css';

import logoImg from './assets/logo-nlw-esports.svg';

export interface GameProps {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

function App() {
  const [games, setGames] = useState<GameProps[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3333/games')
      .then(res => {
        setGames(res.data)
      })
      .catch(error => console.log(error))
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} />

      <h1 className="text-6xl text-white font-black mt-20">
        Your <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> is here.
      </h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>
        {
          games.map(game => {
            return (
              <GameBanner
                key={game.id}
                bannerUrl={game.bannerUrl}
                title={game.title}
                adsCount={game._count.ads}
              />
            )
          })
        }

      </div>

      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}

export default App
