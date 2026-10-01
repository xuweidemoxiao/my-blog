export type Comments = {
    count?:number;
    list:{
        id:number;
        atricle?:{
            id:number;
            title:string;
        }; //考虑到文章可能被删除/隐藏
        user: {
            id:string | number;
            name:string;
            avatar:string;
        }
        content:string; //内容
        moment:string; //时间
        complaint?:number; //举报数
    }[];
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

export type CommentData = Comments['list'][0];
export type MessageData = Messages['list'][0];