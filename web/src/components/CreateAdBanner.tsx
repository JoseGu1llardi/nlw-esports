import { MagnifyingGlassPlus } from 'phosphor-react';

export function CreateAdBanner() {
    return (
        <div className="pt-1 mt-8 bg-nlw-gradient self-stretch rounded-lg overflow-hidden">
            <div className="bg-[#2A2634] px-8 py-6 flex justify-between items-center">
                <div>
                    <strong className="text-2xl text-white font-black block">You coundn't find your duo?</strong>
                    <span className="text-zinc-400">Post an ad to find new players!</span>
                </div>

                <button className="py-3 px-4 bg-violet-500 text-white rounded font-semibold hover:bg-violet-600 flex items-center gap-3">
                    <MagnifyingGlassPlus size={24} /> Post to classifieds
                </button>
            </div>
        </div>
    )
};