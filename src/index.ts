import * as dotenv from 'dotenv'
import * as path from 'node:path'
import * as fs from 'node:fs'
import axios from 'axios'
import { EpicGamesResponse, SearchStoreElement } from './@types/epic-games-response'
import { AppData } from './@types/app-data'

dotenv.config({
    path: path.resolve('.env'),
});

(async function run() {
    try {
        const freeGamesEndpoint: string = `https:/store-site-backend-static-ipv4.ak.epicgames.com/freeGamesPromotions`

        const rawData: EpicGamesResponse = (await axios.get(freeGamesEndpoint, {})).data

        const appData: AppData = JSON.parse(fs.readFileSync(path.resolve('storage/app-data.json')).toString())
        const games: SearchStoreElement[] = rawData.data.Catalog.searchStore.elements.filter((game: SearchStoreElement) => {
            return game.price.totalPrice.discountPrice === 0
        })

        const embeds = []
        for (const game of games) {
            if (!appData.reported_game_ids.includes(game.id)) {
                embeds.push(createEmbed(game))
            }
        }

        if (embeds.length === 0) {
            // There have been no new games since the last time we ran
            return
        }

        const message = {
            content: `Here are the newest free game promotions as of <t:${new Date().getTime()}:F>`,
            embeds: embeds,
            username: 'Free Epic Games',
            avatar_url: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.8CNEvCmi2hvOgM6BZFF7AgHaHa%26pid%3DApi&f=1&ipt=e2575e06928a768a5fc8181a81e9c3f0c0cb3789ddee2358b5582b812208b0ff&ipo=images',
        }

        axios.post(process.env.DISCORD_WEBHOOK, message, {
            headers: {
                'Content-Type': 'application/json',
            }
        })

        appData.reported_game_ids = games.map((game) => {
            return game.id
        })
        fs.writeFileSync(path.resolve('storage/app-data.json'), JSON.stringify(appData))
    } catch (error) {
        console.error(`[ERROR]`, error)
    }
})()

function createEmbed(game: SearchStoreElement) {
    const FALLBACK_PRODUCT_URL = 'https://store.epicgames.com/en-US/free-games'
    let productUrl = `https://store.epicgames.com/en-US`
    switch (game.offerType) {
        case 'BUNDLE':
            productUrl += `/bundle`
            break
        case 'BASE_GAME':
            productUrl += `/p`
            break
    }

    if (game.productSlug !== null) {
        productUrl += `/${game.productSlug}`
    } else if (game.catalogNs.mappings !== null) {
        productUrl += `/${game.catalogNs.mappings[0].pageSlug}`
    } else {
        productUrl = FALLBACK_PRODUCT_URL
    }

    let imageUrl = game.keyImages.find((image) => {
        return image.type === 'Thumbnail'
    })?.url

    return {
        title: game.title.length > 256
            ? `${game.title.substring(0, 253)}...`
            : game.title,
        description: game.description.length > 2048
            ? `${game.description.substring(0, 2025)}...`
            : game.description,
        url: productUrl,
        color: null as null | number,
        author: {
            name: game.seller.name.length > 256
                ? `${game.seller.name.substring(0, 253)}...`
                : game.seller.name,
        },
        footer: {
            text: `Sale Ends`,
        },
        timestamp: game.price.lineOffers[0].appliedRules.length > 0
            ? game.price.lineOffers[0].appliedRules[0].endDate
            : new Date((new Date(game.effectiveDate).setDate((new Date(game.effectiveDate).getDate() + 7)))).toISOString(),
        image: {
            url: imageUrl,
        }
    }
}