export const CJ_DEEPLINK = 'https://www.anrdoezrs.net/click-101704146-15734754?url='
export const FLIGHTS_URL = 'https://www.dpbolvw.net/s5105dlurlt8A9AG9DADF8AG9ECBBB'
export const HOTELS_HOME_URL = 'https://www.tkqlhce.com/tn83vpyvpxCEDEKDHEHJCEIKGHKIH'
export const CAR_HIRE_URL = ''
export const HOTEL_OPEN_MODE: 'deeplink' | 'evergreen' = 'deeplink'

// TODO: Add the correct Booking.com Car Rentals CJ link before rendering car hire.
export function hotelUrl(hotelName: string, city: string) {
  return `${CJ_DEEPLINK}${encodeURIComponent(`https://www.booking.com/searchresults.html?ss=${encodeURIComponent(`${hotelName} ${city}`)}`)}`
}

export function cityHotelsUrl(city: string) {
  return hotelUrl('', city)
}
