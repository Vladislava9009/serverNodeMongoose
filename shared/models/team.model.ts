export interface ITeamModel {
    _id:any;
    img: string,
    name: string,
    about:string,
    schedule:Array<{
        data:{
            10:boolean,
            11:boolean,
            12:boolean,
            13:boolean,
            14:boolean,
            15:boolean,
            16:boolean,
            17:boolean,
            18:boolean,
            19:boolean,
            20:boolean,
            21:boolean,
            22:boolean,
        }
    }>
}