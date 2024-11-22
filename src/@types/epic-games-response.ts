export type EpicGamesResponse = {
    errors: EpicGamesResponseError
    data: ResponseData,
    extensions: {}
}

export type ResponseData = {
    Catalog: {
        searchStore: {
            elements: [],
            paging: {
                count: number,
                total: number,
            }
        }
    }
}
export type SearchStoreElement = {
    title: string,
    id: string,
    namespace: string,
    description: string,
    effectiveDate: string,
    offerType: OfferType,
    expiryDate: null | string,
    viewableDate: string,
    status: ElementStatus,
    isCodeRedemptionOnly: boolean,
    keyImages: ElementKeyImage[],
    seller: ElementSeller,
    productSlug: null | string,
    urlSlug: string,
    url: null | string,
    items: ElementItem[],
    customAttributes: ElementCustomAttribute[],
    categories: ElementCategory[],
    tags: ElementTag[],
    catalogNs: {
        mappings: null | Mapping[]
    },
    offerMappings: null | Mapping[],
    price: {
        totalPrice: {
            discountPrice: number,
            originalPrice: number,
            voucherDiscount: number,
            discount: number,
            currencyCode: string,
            currencyInfo: {
                decimals: number,
            },
            fmtPrice: {
                originalPrice: string,
                discountPrice: string,
                intermediatePrice: string,
            }
        },
        lineOffers: {
            appliedRules: AppliedRule[],
        }[],
    },
    promotions: null | Promotion[],
}

export type Promotion = {
    promotionalOffers: {
        promotionalOffers: {
            startDate: string,
            endDate: string,
            discountSetting: {
                discountType: string,
                discountPercentage?: number
            }
        }[]
    }[]
}

export type AppliedRule = {
    id: string,
    endDate: string,
    discountSetting: {
        discountType: string,
    }
}

export type Mapping = {
    pageSlug: string,
    pageType: string,
}

export type ElementTag = {
    id: string,
}

export type ElementCategory = {
    path: string,
}

export type ElementCustomAttribute = {
    key: string,
    value: string,
}

export type ElementItem = {
    id: string,
    namespace: string,
}

export type ElementSeller = {
    id: string,
    name: string,
}

export type ElementKeyImage = {
    type: 'OfferImageWide' | 'OfferImageTall' | 'Thumbnail' | string,
    url: string,
}

export type ElementStatus = 'ACTIVE'

export type OfferType = 'BASE_GAME' | 'OTHERS' | 'ADD_ON' | 'BUNDLE'

export type EpicGamesResponseError = {
    message: string,
    locations: ResponseErrorLocation[],
    correlationId: string,
    serviceResponse: string,
    stack: any,
    path: ResponseErrorPath[],
}

export type ResponseErrorLocation = {
    line: number,
    column: number,
}

export type ResponseErrorPath = string | number