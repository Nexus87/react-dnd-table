export type DataType = {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    gender: "Male" | "Female",
    ip_address: string,
    birthday: string
}

export type HeaderType = {[x in keyof DataType]: string}
export type PropertyType = keyof DataType;