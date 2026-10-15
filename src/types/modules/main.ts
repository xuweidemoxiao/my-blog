export type GroupData = {
    id:number;
    name:string;
    count:number;
    moment:string; //创建时间
}


export type Messages = {
    count?:number;
    list:{
        id:number;
        user: {
            id:string | number;
            name:string;
            avatar:string;
        }
        content:string; //内容
        moment:string; //时间
    }[];
}
export type MessageData = Messages['list'][0];