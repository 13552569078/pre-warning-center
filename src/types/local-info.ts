interface IlocalInfo {
    longitude: string,
    latitude: string,
    address: string,
    addressComponent: Record<string, any>
    location:{lat:string, lon:string}
}

export { IlocalInfo };
